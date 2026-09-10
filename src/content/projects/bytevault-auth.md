---
name: 'ByteVault Auth'
description: 'Starter entry. A self-hosted authentication layer built around Keycloak, with WebAuthn passkeys and role-based access.'
status: 'Experiment'
technologies: ['Java', 'Keycloak', 'PostgreSQL', 'Supabase']
featured: true
order: 3
draft: false
---

> **Starter content.** This entry exists to exercise the project layout. Replace the
> body with a real case study, or delete the file.

## What the system is

An authentication service that fronts Keycloak, adding passkey registration and a
role model that application services can query without embedding identity logic.

## Problem being solved

Every new side project re-implements login. Consolidating on one self-hosted identity
provider removes that work and keeps credentials in a single place.

## Architecture sketch

```text
client → auth service → Keycloak (OIDC) → PostgreSQL
                     ↘ passkey registration (WebAuthn)
```

## Design decisions to document

- Token lifetimes and refresh strategy
- Where roles live: Keycloak claims versus application-side permissions
- Recovery flow when a user loses every registered authenticator

## Status

Experimental. Not exposed publicly.
