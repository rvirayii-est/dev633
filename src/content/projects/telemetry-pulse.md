---
name: 'TelemetryPulse'
description: 'Starter entry. A lightweight metrics agent that scrapes container runtimes and exposes an aggregated view.'
status: 'Experiment'
technologies: ['Spring Boot', 'PostgreSQL', 'Docker', 'Vue 3']
featured: true
order: 2
draft: false
---

> **Starter content.** This entry exists to exercise the project layout. Replace the
> body with a real case study, or delete the file.

## What the system is

An agent that collects metrics from a container runtime, batches them, and stores
them in PostgreSQL, with a small Vue dashboard on top for querying.

## Problem being solved

Full observability stacks are heavy for a handful of self-hosted services. The goal is
the smallest thing that still answers "what changed, and when".

## Architecture sketch

```text
container runtime → agent → batch writer → PostgreSQL → query API → dashboard
```

## Design decisions to document

- Push versus pull collection, and what that means for agent restarts
- Retention and rollup strategy, since raw samples grow quickly
- Where backpressure is applied when the writer falls behind

## Status

Experimental. No production deployment.
