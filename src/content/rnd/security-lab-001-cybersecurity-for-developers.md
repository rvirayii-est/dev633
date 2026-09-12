---
name: 'Security Lab #001 — What Is Cybersecurity From a Developer''s Perspective?'
description: 'The framing entry of the Security Lab. Developers ask whether a feature works. Security asks how it can be abused. Same system, second question.'
status: 'Active'
technologies: ['HTTP', 'REST', 'Spring Boot', 'Vue', 'Threat Modeling', 'OWASP']
featured: false
order: 2
draft: false
---

> Entry 001 of the [deV633 Security Lab](/rnd/dev633-security-lab). This one is the
> framing entry: mostly concept, some code, and a threat-modeling exercise at the end
> you can run against your own application in an afternoon.

## The second question

When I build a feature, I ask one question and I ask it constantly:

> Does this work?

I have gotten good at answering it. I know how to decompose a requirement, write the
endpoint, cover it with tests, and ship it. Ten years of that question.

Security adds a second one:

> How can this be abused?

That is the whole shift. Not a new stack, not a new tool, not a separate phase at the
end of the sprint. The same feature, examined from the other side. Everything else in
this series is a consequence of taking that second question seriously.

The reason it needs saying out loud is that the first question has an obvious owner
and the second one does not. Somebody writes the ticket, somebody writes the test,
somebody signs off that it works. Nobody is assigned to ask how it breaks on purpose.

## The same system, seen twice

Take an ordinary application. Nothing exotic: a frontend, an API, authentication, a
database, some file storage, an admin panel. When I design it, the picture in my head
is a flow of features.

```text
User logs in
    ↓
Frontend
    ↓
REST API
    ↓
Database
```

That diagram answers "does this work." Every arrow is a thing that has to happen for
the happy path to complete.

A security engineer looks at the identical system and draws something else. Not a
flow, but a set of surfaces and the things behind them.

```text
                INTERNET
                    │
                    ▼
             ┌─────────────┐
             │  Frontend   │
             └──────┬──────┘
                    │
               API requests
                    │
                    ▼
             ┌─────────────┐
             │ Backend API │
             └──────┬──────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
   Authentication          Database
          │                   │
          ▼                   ▼
       Tokens              User Data
```

Same boxes. Different questions:

- Can authentication be bypassed?
- Can one user read another user's data?
- Can input manipulate a database query?
- Can a stolen token be replayed?
- Are secrets sitting in the frontend bundle?
- Can a user upload something dangerous?
- Can an employee act outside their authority?
- Is any of this recorded anywhere?
- What happens on the ten thousandth request instead of the first?

Not one of those is a feature. Every one of them is about a feature.

> Cybersecurity is not a separate feature. It is another way of looking at every
> feature.

## Start with assets, not attacks

The instinct is to jump straight to attacks, because attacks are the interesting part.
That is backwards. Attacks only matter in proportion to what they reach, so the first
question is what is worth protecting.

An asset is anything that would hurt if it were exposed, altered, destroyed, or made
unavailable.

```text
Customer information
Passwords
Authentication tokens
Financial records
Employee payroll
Inventory
API keys
Database credentials
Source code
Administrative privileges
System availability
```

The list is not universal, which is the point. Assets are domain-specific, and the
domain decides where the effort goes.

| System | The asset that dominates |
| --- | --- |
| HR platform | Payroll and personal employee records |
| Point of sale | Transactions and payment data |
| Learning management | Student records and assessment integrity |
| IoT deployment | The physical device itself |

That last row is worth sitting with. In an IoT system, compromise is not only a data
problem. It can be a door that opens, a valve that closes, a motor that runs.

So the framing question for any system I build:

> What would hurt this business if someone could read it, change it, destroy it, or
> keep us from reaching it?

Read it. Change it. Keep us from reaching it. Those three verbs are not a coincidence.

## The CIA triad, in endpoints

Confidentiality, integrity, availability. Every textbook opens with them, and they
stay abstract until you attach each one to a real request.

### Confidentiality

Information reaches only those authorized to see it.

Here is an endpoint that works:

```http
GET /api/employees/123/payslip
```

It returns employee 123's payslip. The test passes. The feature is done.

Now the user edits the URL:

```http
GET /api/employees/124/payslip
```

If that returns employee 124's payslip, the application is functioning exactly as
written and is not secure. Nothing crashed. No error was logged. The response was a
clean 200, and it is indistinguishable in the access log from legitimate traffic.

The distinction underneath it is the one that generates the most real-world bugs I
expect to find:

> Authentication establishes who the user is. Authorization establishes what that user
> may do. They are separate, and only one of them is handled for you.

Broken access control and insecure direct object references get their own entry later.
For now it is enough to notice that the flaw is a missing question, not a broken
mechanism.

### Integrity

Information is not modified improperly.

```json
{
  "employeeId": 124,
  "salary": 150000
}
```

As a developer I check that the payload deserializes, the employee exists, the salary
is a positive number, and the update commits. All green.

As a security engineer:

```text
Who sent this request?
Does that person have permission to change salaries?
Can they change their own?
Can a branch-level HR user reach another branch?
The frontend hides this form, but does the API refuse it?
Is the change recorded, with the before value and who made it?
```

Notice that none of those questions involve an outsider. A fully authenticated,
entirely legitimate user can perform an unauthorized action, and in practice that is a
larger category than the hoodie-and-terminal scenario. Integrity failures are usually
about authority, not about intrusion.

### Availability

The system stays usable.

```http
POST /api/reports/generate
```

The report needs a heavy query. One request is fine. That is the only case I tested.

```text
1 request         →  fine
100 requests      →  slow
10,000 requests   →  connection pool exhausted
```

Nothing was stolen. Nothing was modified. Nobody logged in who should not have. And
the system is down, which for most businesses is the incident their customers actually
notice. Availability belongs in the triad because uptime is a security property, not
only an operations metric.

## Vocabulary that actually distinguishes things

These four words get used as if they mean the same thing, and the sloppiness has a
cost: you cannot prioritize what you cannot name. One example carries all four.

Suppose the backend serves this:

```text
/admin/users
```

and never verifies that the caller is an administrator.

**Vulnerability** is the weakness itself.

```text
Missing authorization check on an administrative route.
```

It exists whether or not anyone has noticed. It existed the moment the code merged.

**Threat** is who or what could act on it.

```text
A malicious user
A compromised account
An automated scanner
A rogue employee
```

**Exploit** is the concrete act.

```http
DELETE /api/admin/users/123
```

sent from an ordinary, non-admin account.

**Impact** is what follows.

```text
Users deleted
Data exposed
Financial loss
Downtime
Reputation damage
```

**Risk** ties them together:

```text
Risk ≈ Likelihood × Impact
```

That approximation is what turns a findings list into a work queue. A flaw that is
hard to reach and exposes a public display name is not the same as a flaw that is one
URL edit away from payroll, even when a scanner labels both "high." Severity is a
property of the finding. Risk is a property of the finding in your system, and only
you can compute it.

## Attack surface

Attack surface is everything an attacker can interact with. For developers it is the
single most clarifying concept in this entry, because the honest list is always longer
than the application.

```text
                       APPLICATION

       ┌───────────┐       ┌────────────┐
       │ Web Client│──────▶│    API     │
       └───────────┘       └──────┬─────┘
                                  │
                     ┌────────────┼────────────┐
                     ▼            ▼            ▼
                  Database      Storage       Auth
                     │
                     ▼
                  Backups
```

And around it, everything that is not the application:

```text
Web application       Object storage        CI/CD pipelines
API endpoints         Cloud console         Git repositories
Login page            DNS                   Third-party APIs
Password reset        Email                 Dependencies
Admin portal          Employee accounts     IoT devices
Mobile application    Backups               Humans
```

Half of that list is infrastructure I configured once and stopped thinking about. Some
of it I never wrote at all: a transitive dependency, a managed service default, a
Docker Compose file that published a database port to the host because that was
convenient during development.

> Every component you expose is something that has to be understood, configured,
> monitored, and maintained. Not once. Continuously.

## Developers test happy paths

This is the habit the whole series is trying to break, and it is a habit precisely
because it is the professional, responsible-looking one.

My normal verification:

```text
Log in with valid credentials
    ↓
Open profile
    ↓
Edit profile
    ↓
Save
    ↓
Success
```

Every step is a step a real user takes. That is what makes it feel like enough.

Adversarial verification of the same feature:

```text
What if the ID in the path changes?
What if the role in the payload changes?
What if a required field is missing?
What if the request skips the frontend entirely?
What if the same request arrives a thousand times?
What if the token expired an hour ago?
What if the token belongs to a different organization?
What if the number is negative?
What if the string contains SQL syntax?
What if the field contains HTML or JavaScript?
What if I call the endpoint the UI never shows me?
```

Every one of those is a test I know how to write. None of them were in the ticket.

The mindset is not:

> How do I attack somebody?

It is:

> How could somebody misuse what I built?

I want to be precise about that, because it sets the tone for everything that follows.
The offensive material in this series exists to make the defensive material real. Not
the other way around.

## Trust boundaries

A trust boundary is any point where data moves between levels of trust. Naming them
turns a vague sense of caution into a specific place where a check belongs.

```text
Browser
  │
  │ UNTRUSTED INPUT
  ▼
Backend API
  │
  │ AUTHENTICATED, AUTHORIZED, VALIDATED
  ▼
Business logic
  │
  ▼
Database
```

The thick line is between the browser and the API, and it produces the one rule that
survives every framework change:

> Never trust the client.

Concretely, this is not security:

```vue
<button v-if="canDeleteUser">
  Delete
</button>
```

That is a user experience decision. It hides an action from someone who should not
take it, which is good design and no protection at all. The button is not the API. A
terminal, a proxy, or a modified bundle reaches the endpoint without ever rendering
the component.

Everything real lives on the far side of the boundary:

```text
authentication
authorization
input validation
business rules
tenant isolation
```

I like this concept because it is not really a security concept. It is layering, and I
already believe in layering. Security just insists that the layer boundary is also a
trust boundary, and that the check goes on the trusted side.

## A login is not a security model

The belief worth dismantling early:

```text
I added login.
Therefore the application is secure.
```

A user can be perfectly authenticated and still attack the system.

```text
Alice logs in.               ✓ valid credentials
Alice's token verifies.      ✓ correct signature, not expired
Alice requests:              GET /api/customers/{bobs-customer-id}
```

The question the application must answer is not "is Alice logged in." It answered that
correctly. The question is "is Alice allowed to see this particular customer," and
nothing in the authentication layer knows what a customer is, let alone who owns one.

Authentication is cross-cutting, so a framework can own it globally. Object-level
authorization depends on what the resource means, so no framework can infer it. That
code is mine to write, per resource, every time. When I forget, nothing fails loudly.
Silence is the failure mode. That is exactly why this class of bug is everywhere, and
why entry 002 is about nothing else.

## Security is layers

No single control holds. Defense in depth assumes each one eventually fails and asks
what is behind it.

```text
Internet
   ↓
Firewall / edge (Cloudflare)
   ↓
Rate limiting
   ↓
Authentication
   ↓
Authorization
   ↓
Input validation
   ↓
Business rules
   ↓
Database constraints
   ↓
Audit logs
   ↓
Monitoring and alerting
```

Read that bottom-up and it is a list of second chances. The authorization check was
forgotten, but the database constraint refused the write. The constraint was missing,
but the audit log captured it. Nothing caught it live, but monitoring surfaced the
pattern the next morning.

This is a more honest engineering target than one perfect gate, and it is the same
instinct as retries, timeouts, and circuit breakers. I already design for component
failure. Defense in depth is designing for control failure.

## A very small lab

This is Security Lab #001, so it needs an actual experiment. It does not need Kali
Linux or a single tool you do not already have.

Stand up any API you have with two users' data in it. Authenticate as the first user
and request your own record:

```http
GET /api/profile/1
```

```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.test"
}
```

Now change one character. Same token, same session, same everything:

```http
GET /api/profile/2
```

If you get this back:

```json
{
  "id": 2,
  "name": "Bob",
  "email": "bob@example.test"
}
```

then stop and answer four questions:

```text
Should Alice be able to read Bob's profile?
Where should that be enforced: frontend, backend, database, or all three?
What should the response be — 403, or 404?
How would you know, from the logs, that this had happened?
```

That is cybersecurity. Not the payload, not the tooling. You found a real problem by
understanding an application and refusing to accept one of its assumptions.

Two notes on the answers, because they matter later. The enforcement belongs in the
query, so the row cannot be returned rather than being returned and then filtered. And
404 usually beats 403, because a 403 confirms that record 2 exists, which is enough to
enumerate a customer list one identifier at a time.

## The mindset, as a translation table

The shift becomes concrete when you put the two readings of a requirement side by side.

| The developer says | The security engineer asks |
| --- | --- |
| The user enters their email. | What else can they enter? |
| Only managers see this button. | Can the endpoint still be called directly? |
| The request contains a store ID. | Who decides which store IDs this user may send? |
| The upload accepts PDFs. | Does the server verify that, or trust the extension? |
| The reset link expires. | Can it be used twice before it does? |
| The frontend validates the form. | What reaches the API when the frontend is skipped? |
| Errors return a helpful message. | Does that message describe our internals? |

Every left-hand statement is true. Every right-hand question is unanswered by it. That
gap is where the work is.

## OWASP, briefly

The OWASP Top 10 is a periodically updated, community-assembled list of the most
significant web application security risks. It is not a standard or a certification.
It is a shared vocabulary, and it is the map the middle arc of this series follows.

The broad categories:

```text
Broken access control
Cryptographic failures
Injection
Insecure design
Security misconfiguration
Vulnerable and outdated components
Identification and authentication failures
Software and data integrity failures
Security logging and monitoring failures
Server-side request forgery
```

Two things to know before using it. The list is reordered and rewritten every few
years as the data changes, so check the current edition on the OWASP site rather than
trusting a copy someone pasted into a blog post, including this one. And the
categories are risk classes, not bugs. "Broken access control" is not something you
fix. It is a shelf that the specific fixes sit on.

Later entries take these one at a time, each in a lab I control.

## It is not only code

Worth establishing in the first entry, so the series does not read as if application
code were the whole discipline.

```text
Flawless application security
+ admin password of "password123"
= insecure
```

```text
Hardened backend
+ production credentials committed to a public repository
= an incident already in progress
```

Neither of those is a coding error, and both end the same way. The field is wider than
the application:

```text
Application security      Data security
Network security          Monitoring and detection
Cloud security            Incident response
Identity management       Security policy and governance
Endpoint security         Physical security
Supply chain              Human behavior
```

I am starting with application security because it is where I already live, and
because the fastest way to learn a discipline is to enter it through the door you
already have a key to. The series will branch outward from there.

## The checklist

Fourteen questions to run against any feature before it merges. This is the practical
residue of everything above.

```text
□ Who is allowed to access this?
□ How does the server know who the caller is?
□ How does the server know they may do this specific thing?
□ Can any part of the request be manipulated?
□ Am I trusting anything the client supplied?
□ Could one user reach another user's resources?
□ Could one tenant reach another tenant's resources?
□ Is sensitive information in the response that the caller does not need?
□ What happens if this endpoint is called a thousand times a minute?
□ What happens on unexpected input: empty, negative, enormous, malformed?
□ Are the important actions logged, with actor and target?
□ Are secrets outside the repository and outside the frontend bundle?
□ Do error messages describe internals to the caller?
□ If this component fails, what still holds?
```

Fourteen questions is a few minutes per feature. It is a bad trade only if you never
find anything.

## Your first threat model

An assignment, and the real deliverable of this entry. Pick an application you have
built. Not a tutorial app, something with real users or real data.

Draw it, roughly, on paper:

```text
Users
  ↓
Frontend
  ↓
Backend
  ↓
Database
  ↓
External services
```

Then write down:

```text
5 assets worth protecting
5 entry points where input crosses into your system
3 trust boundaries
3 things an unauthorized user must never be able to do
3 things that would hurt if the system went down
```

That is a threat model. A rough one, and rough is the point: the version that exists on
paper beats the rigorous one you never started. The exercise takes under an hour and
usually produces at least one uncomfortable discovery. When it does, that discovery is
your real entry into this material, and it will be more memorable than anything in this
article.

Entry 017 comes back to threat modeling properly, with structure and a whiteboard. This
version is deliberately crude, because the habit matters more than the method.

## Where this goes next

```text
#002  Authentication vs authorization
#003  How the web actually works before you attack it
#007  Broken access control and IDOR
#017  Threat modeling an application I built
```

Entry 002 is the natural continuation, because this entry kept running into the same
wall from different directions: the payslip with the edited ID, Alice reaching Bob's
customer, the hidden Vue button, the admin route with no check. All the same gap. The
next entry takes it apart properly, through OAuth2, OpenID Connect, tokens, and the
Keycloak setup I use in production work.

## References

- OWASP Top 10, current edition, at owasp.org
- OWASP Application Security Verification Standard, for a fuller requirements checklist
- OWASP Cheat Sheet Series: Authorization, Threat Modeling
- NIST SP 800-53, Access Control family
- Adam Shostack, *Threat Modeling: Designing for Security*

---

> The point of entry 001, if it reduces to one line: cybersecurity starts long before
> exploitation. It starts when a developer learns to question the assumptions inside
> the system they just built.
