---
name: 'Enterprise CRM Modernization'
description: 'Maintaining and upgrading a long-lived Java and Vaadin 8 CRM for an overseas client, including upgrade planning and deployment.'
status: 'Production'
technologies: ['Java', 'Vaadin 8', 'SQL', 'Maven']
featured: true
order: 3
draft: false
---

## What it is

A customer relationship management system in daily production use by an overseas
client, built on Java and Vaadin 8. The engagement covered ongoing maintenance,
feature delivery, and planning the path off an aging framework version.

## The interesting problem

Upgrading a framework underneath a system that cannot stop running. The work is less
about the new version and more about sequencing: establishing what the current
behaviour actually is, finding the parts that depend on framework internals, and
staging the migration so each step is independently deployable and reversible.

## My role

Senior engineer on the system. Maintained and extended the existing application, led
the upgrade planning, and carried the development and deployment work through.

## What it reinforced

Legacy is not a code quality judgement. It is a description of how much production
behaviour depends on assumptions nobody wrote down. The upgrade plan is mostly an
exercise in recovering those assumptions before touching anything.
