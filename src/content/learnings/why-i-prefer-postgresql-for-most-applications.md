---
title: 'Why I Prefer PostgreSQL for Most Applications'
description: 'One engine that handles relational data, JSON documents, full text search, and queues well enough to postpone every other datastore.'
published: 2026-08-14
category: Database
tags: ['PostgreSQL', 'Database', 'Architecture']
draft: false
---

Most applications do not have a data problem that requires more than one database.
PostgreSQL covers enough ground that adding a second engine is usually a decision to
defer rather than to make early.

## It is several datastores in one

- **Relational core** with real constraints, so the database rejects invalid data
  instead of trusting every writer.
- **`jsonb` columns** for genuinely schemaless fields, indexable with GIN.
- **Full text search** that is good enough well past the first hundred thousand rows.
- **`LISTEN`/`NOTIFY` and `SKIP LOCKED`** for simple job queues without a broker.

```sql
-- A queue worker that never blocks behind another worker
SELECT id, payload
FROM jobs
WHERE status = 'pending'
ORDER BY created_at
FOR UPDATE SKIP LOCKED
LIMIT 10;
```

## Constraints are documentation that executes

A `CHECK` constraint or a foreign key states an invariant once, in the place that can
actually enforce it. Application-level validation is still useful, but it is advisory:
every new service, script, and manual fix bypasses it.

## Operational reasons

Transactional DDL means a failed migration rolls back rather than leaving the schema
half-applied. `EXPLAIN (ANALYZE, BUFFERS)` explains slow queries honestly. The extension
ecosystem, `pg_stat_statements` in particular, tells you where time is actually going.

## When I would not reach for it

Ultra-high-write telemetry, cache-shaped workloads, and anything needing a real
streaming log. Those are genuine reasons to add Redis, ClickHouse, or Kafka, and they
are easy to recognise when they arrive.
