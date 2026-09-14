---
name: 'Healthcare Management System'
description: 'A patient and records management platform built on Spring Boot and Vaadin, containerized with Docker and deployed to AWS.'
status: 'Production'
technologies: ['Java', 'Spring Boot', 'Vaadin', 'Docker', 'AWS']
featured: true
order: 5
draft: false
---

## What it is

A management system for healthcare operations, built as a single deployable Java
application. Spring Boot handles the domain logic, persistence and service layer;
Vaadin renders the interface server-side, which keeps the whole system in one language
and one deployment unit.

## Why this shape

Healthcare workflows are form-heavy and record-heavy rather than latency-sensitive.
A server-rendered UI framework removes an entire frontend build, API contract and
state-synchronization layer that would otherwise need maintaining for no user-visible
benefit.

## Delivery

```text
Spring Boot + Vaadin  →  Docker image  →  AWS
```

Packaging the application as a Docker image made the deployment reproducible: the same
artifact that ran locally ran in the cloud, with configuration supplied by the
environment rather than baked into the build.

## My role

Designed and built the application end to end, and handled the containerization and
cloud deployment.
