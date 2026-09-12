---
name: 'deV633 Security Lab'
description: 'An ongoing series where I learn security the way I learn everything else: break something in a lab I own, then engineer the defense.'
status: 'Active'
technologies: ['Spring Boot', 'Keycloak', 'Docker', 'Burp Suite', 'Linux', 'OWASP']
featured: true
order: 1
draft: false
---

## What it is

deV633 Security Lab is a running series about learning offensive security from a
developer's chair. I have spent ten years building the systems that get attacked:
REST APIs, multi-tenant SaaS, identity integrations, background jobs. I have not
spent those years attacking them. This series is me closing that gap in public.

I am not writing it as an expert. I am writing it as an engineer who already knows
where the code is and now wants to know where the holes are.

## Why a series and not scattered notes

A vulnerability write-up that stops at "here is the payload" teaches the wrong half.
The half that matters to me is the other one: why the code allowed it, what the fix
looks like in a real framework, and what signal would have shown the attempt in the
logs. That is a repeatable shape, so it deserves a repeatable format.

Once the labs start, every entry follows the same ten sections:

```text
Problem  →  Theory  →  Lab Setup  →  Experiment  →  What Happened
         →  Why It Happened  →  Fix  →  How to Detect It
         →  Developer Checklist  →  References
```

The middle of that chain is the offensive part. The tail is the engineering response,
and the tail is the reason the series exists. Entry 001 is the exception: it sets up
the mindset the format depends on, so it runs on concepts and a threat-modeling
exercise instead.

## Ground rules

- **Everything runs in a lab I own.** Local Docker stacks, deliberately vulnerable
  applications, and sanctioned training platforms. No third-party targets, ever.
- **Working exploit code stays out of the posts** when the concept can be shown
  without it. The goal is understanding, not a copy-paste kit.
- **Every entry ends in a defense.** If I cannot write the fix and the detection, the
  entry is not finished.
- **I show what I got wrong.** Failed attempts and wrong mental models are the part
  worth reading.

## The roadmap

Twenty entries, grouped into four arcs. The order is deliberate: fundamentals before
web mechanics, web mechanics before exploitation, exploitation before defensive
architecture.

### Arc I — Foundations

| # | Entry |
| --- | --- |
| 001 | What is cybersecurity from a developer's perspective |
| 002 | Authentication vs authorization: the difference that causes real bugs |
| 003 | How the web actually works before you attack it |
| 004 | Linux basics for security work |
| 005 | Networking for security engineers |

### Arc II — The OWASP core

| # | Entry |
| --- | --- |
| 006 | The OWASP Top 10, read as a developer |
| 007 | Broken access control and IDOR |
| 008 | SQL injection, and why parameterized queries end it |
| 009 | Cross-site scripting: stored, reflected, DOM-based |
| 010 | CSRF and the SameSite cookie |

### Arc III — Identity and tooling

| # | Entry |
| --- | --- |
| 011 | Password storage: hashing, salts, Argon2, rate limiting, MFA |
| 012 | JWT mistakes developers keep making |
| 013 | Securing a Spring Boot REST API end to end |
| 014 | API security testing with Burp Suite in a local lab |
| 015 | Reconnaissance in a legal lab |

### Arc IV — Applying it to my own systems

| # | Entry |
| --- | --- |
| 016 | My first capture-the-flag: methodology, not just the flag |
| 017 | Threat modeling an application I built |
| 018 | Security review of a multi-tenant SaaS |
| 019 | A secure coding checklist I actually run before deploying |
| 020 | Thirty days in: what changed in how I write code |

## Where this is going

The near-term goal is fluency: being able to read an endpoint and see the attack
surface without being told it is there. The longer-term goal is to carry that into
the work, so that threat modeling and access-control review become part of design
rather than a pass someone else does later.

Entries land here as they are finished. Arc I is in progress.
