---
name: 'Messaging Blast Platform'
description: 'A text-messaging blast tool for bulk communication and automation workflows.'
status: 'Archived'
technologies: ['Java', 'SMS Gateway', 'SQL']
featured: false
order: 8
draft: false
---

## What it is

A tool for sending text messages to large recipient lists, built for bulk
communication and automation use cases.

## The constraint that shapes everything

Sending to one recipient is a function call. Sending to many thousands is a queueing
problem. The gateway has a throughput ceiling, delivery is asynchronous and
best-effort, and the failure modes are partial by nature: some recipients receive the
message, some do not, and the difference only surfaces later through delivery reports.

That pushes the design toward durable job state rather than in-memory batching. A blast
has to survive a restart mid-send without either dropping recipients or messaging
anyone twice.

## My role

Built the tool and the send pipeline behind it.
