---
name: "Security Lab #001 — Cybersecurity From a Developer's Perspective"
description: 'The first entry in the Security Lab: what security actually means when you are the one writing the endpoint, demonstrated with a five-line vulnerability in my own lab API.'
status: 'Active'
technologies: ['Spring Boot 3', 'Spring Security', 'PostgreSQL', 'Docker', 'HTTP']
featured: false
order: 2
draft: false
---

> Entry 001 of the [deV633 Security Lab](/rnd/dev633-security-lab). Format:
> problem, theory, lab, experiment, result, cause, fix, detection, checklist,
> references.

## Problem

I can build an authenticated API. I have done it many times: an identity provider
issues a token, a filter validates it, the controller runs. When that flow works, the
endpoint feels finished, and "secure" feels like a property I already have because the
login worked.

That feeling is the actual problem. A logged-in user is not the same as an authorized
one, and an application can be completely correct for every request I thought to write
and completely broken for the one I did not. I wanted the first entry to replace that
vague sense of "we have security" with something I can point at.

## Theory

Three ideas do most of the work.

**The CIA triad.** Security is protecting three properties, not one.

| Property | The question it answers | How it breaks in an API |
| --- | --- | --- |
| Confidentiality | Who is allowed to see this? | A record returned to the wrong tenant |
| Integrity | Who may change this, and can I prove what changed? | An unvalidated field promoting a user to admin |
| Availability | Is the system there when it is needed? | One unbounded query exhausting the pool |

Most of the bugs I expect to find in my own code are confidentiality bugs, because
that is what an API mostly does: hand data back.

**Vulnerability, exploit, threat, risk.** These are not synonyms, and conflating them
is why security conversations stall.

- A **vulnerability** is the flaw in the code. It exists whether or not anyone finds it.
- An **exploit** is the concrete act that turns the flaw into an effect.
- A **threat actor** is whoever would do that, and with what motive and budget.
- **Risk** is the flaw weighted by likelihood and impact. Risk is the number that
  decides what gets fixed this sprint.

An unauthenticated flaw on an internet-facing tenant endpoint and the same flaw on an
internal tool behind a VPN are the same vulnerability and very different risks.

**Attack surface.** Every input that crosses a trust boundary. For a typical service
of mine that is broader than it first looks: the REST endpoints, the path and query
parameters, the request body, the headers, the token claims, the file uploads, the
webhook receivers, the message consumers, the admin console, and the database port
that Docker Compose helpfully published to the host.

The last one is the point. Attack surface includes things I never wrote.

## Lab setup

Everything here runs locally. The stack is one Spring Boot 3 service, PostgreSQL, and
nothing exposed beyond the loopback interface.

```text
docker compose up        →  postgres:16   (127.0.0.1:5432)
./mvnw spring-boot:run   →  lab-api       (127.0.0.1:8080)
```

Two seeded users, each owning one invoice:

| User | Invoice ID | Amount |
| --- | --- | --- |
| alice | 1001 | 4,200.00 |
| bob | 1002 | 18,750.00 |

The endpoint under test is the kind I have written a hundred times.

```java
@GetMapping("/api/invoices/{id}")
public InvoiceDto get(@PathVariable Long id) {
    return invoiceService.findById(id);
}
```

Spring Security is configured, and it is configured correctly for what it was asked to
do: `/api/**` requires an authenticated request. No token, no response.

## Experiment

Three requests, all as alice, all with a valid token.

1. Fetch her own invoice: `GET /api/invoices/1001`
2. Fetch with no token at all: `GET /api/invoices/1001`
3. Fetch bob's invoice with alice's token: `GET /api/invoices/1002`

The only variable that changes between the first request and the third is a single
digit in the path.

## What happened

| Request | Expected | Actual |
| --- | --- | --- |
| alice → 1001 | 200, her invoice | 200, her invoice |
| no token → 1001 | 401 | 401 |
| alice → 1002 | 403 | **200, bob's invoice** |

The authentication layer did its job perfectly and the application still handed one
customer another customer's financial record. Nothing crashed, nothing was logged as
an error, and the response was a clean 200. In an access log this is
indistinguishable from ordinary traffic.

This is broken access control, and specifically an insecure direct object reference.
It sits at number one on the OWASP Top 10, and having now produced it in five lines of
my own code, I understand why.

## Why it happened

The controller asked one question and skipped the second.

- **Who are you?** Answered by Spring Security, from the token. Correct.
- **Are you allowed to touch *this* object?** Never asked by anyone.

The identifier came from the client, and the service treated it as trusted input. The
implicit assumption baked into `findById(id)` is that a user only ever sends
identifiers they own, which is true of the browser I tested with and false of every
other client in the world.

The deeper cause is where the check lives. Authentication is cross-cutting, so a
framework can own it globally. Object-level authorization depends on the meaning of
the specific resource, so no framework can infer it. That check has to be written, per
resource, by me. If I do not write it, nothing fails loudly. Silence is the failure
mode, which is exactly why the class of bug is so common.

## Fix

Make ownership part of the query rather than an afterthought.

```java
@GetMapping("/api/invoices/{id}")
public InvoiceDto get(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
    return invoiceService.findByIdForOwner(id, jwt.getSubject())
        .orElseThrow(() -> new ResourceNotFoundException(id));
}
```

Three things changed, and each one matters on its own.

- **The owner is scoped in the repository**, not filtered in the controller. A query
  that cannot return another tenant's row is stronger than a query that returns it and
  then checks. The check cannot be forgotten by the next endpoint that reuses the
  method.
- **The failure is 404, not 403.** A 403 confirms that invoice 1002 exists, which is a
  small confidentiality leak that lets someone enumerate identifiers. Denying
  existence gives away nothing.
- **The subject comes from the verified token**, never from a request parameter. Any
  identity value the client can set is not an identity value.

Two follow-ups belong with it. Sequential integer identifiers make enumeration
trivial, so resources exposed to clients should use unguessable ones. And this pattern
needs a test, because it is the kind of thing a later refactor quietly removes:

```java
@Test
void aliceCannotReadBobsInvoice() {
    mvc.perform(get("/api/invoices/1002").with(jwt().jwt(aliceToken)))
       .andExpect(status().isNotFound());
}
```

That test is the real deliverable. The fix protects one endpoint. The test protects
the fix.

## How to detect it

Broken access control looks like normal traffic, so detection has to be built
deliberately.

- **Log the authorization decision, not just the request.** Subject, resource type,
  resource identifier, and allow or deny. Without the resource identifier there is
  nothing to correlate later.
- **Alert on denial bursts.** One 404 on someone else's invoice is a typo. Forty in a
  minute from one subject is enumeration.
- **Watch for identifier drift.** A subject whose requested identifiers stop clustering
  around the ones it owns is worth a look.
- **Keep an immutable audit trail for sensitive reads.** For financial or medical
  records, who read what matters as much as who changed what.
- **Test it in continuous integration.** An authorization test per protected resource
  catches the regression before an alert has to.

## Developer checklist

Pulled from this one experiment, and the list I carry into entry 002.

- [ ] Every endpoint answers both questions: who is this, and may they touch this object.
- [ ] Ownership and tenant scoping live in the query, not in a controller branch.
- [ ] Identity always comes from the verified token, never from a parameter or header.
- [ ] Client-facing identifiers are unguessable.
- [ ] Not-found is preferred over forbidden where existence itself is sensitive.
- [ ] Authorization decisions are logged with the resource identifier.
- [ ] An automated test proves a foreign user is refused, for each protected resource.
- [ ] Only the ports that need to be reachable are published.

## What I got wrong

I expected the vulnerability to feel like a mistake, something I would recognize as
sloppy during review. It does not. The vulnerable controller is the shorter, cleaner,
more idiomatic version, and it is the one that reads better in a pull request. That is
the uncomfortable part of this first entry: correct-looking code and secure code are
not the same thing, and only one of them is checked by the compiler.

## References

- OWASP Top 10 (2021), A01: Broken Access Control
- OWASP Cheat Sheet Series: Authorization, and Insecure Direct Object Reference Prevention
- NIST SP 800-53, Access Control family
- Spring Security reference documentation: method security and authorization architecture

---

**Next:** Security Lab #002 — Authentication vs authorization, the difference that
causes real security bugs. This entry ended on that distinction. The next one takes it
apart properly, through OAuth2, OpenID Connect, and the Keycloak setup I use in
production work.
