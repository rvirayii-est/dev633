---
title: 'How Dependency Injection Works in Spring'
description: 'Beans, the application context, and why constructor injection is the only form worth defaulting to.'
published: 2026-08-28
category: Backend
tags: ['Spring Boot', 'Java', 'Architecture']
draft: false
---

Dependency injection is a small idea with an outsized effect: a class declares what
it needs and something else supplies it. Spring's contribution is the container that
does the supplying.

## The application context

At startup Spring builds an `ApplicationContext`: a registry of bean definitions and
the graph of how they depend on one another. Beans are singletons by default, created
eagerly, and wired before the first request arrives.

## Prefer constructor injection

```java
@Service
public class OrderService {
  private final OrderRepository orders;
  private final PaymentGateway payments;

  public OrderService(OrderRepository orders, PaymentGateway payments) {
    this.orders = orders;
    this.payments = payments;
  }
}
```

Three properties come for free:

1. The fields can be `final`, so the object is immutable after construction.
2. The class cannot be built in an invalid state.
3. Tests instantiate it directly, with no Spring context at all.

Field injection with `@Autowired` gives none of those, and it hides the fact that a
class has grown eight collaborators.

## Choosing between competing beans

When two beans satisfy the same type, mark the default with `@Primary` or select
explicitly with `@Qualifier`.

| Situation | Mechanism |
| --- | --- |
| One obvious default | `@Primary` |
| Caller picks per injection point | `@Qualifier("name")` |
| Depends on environment | `@Profile` or `@ConditionalOnProperty` |

## The failure mode to watch

Circular dependencies. Spring can sometimes resolve them for you, but a cycle almost
always means the responsibility split is wrong. Extract the shared behaviour into a
third component rather than reaching for `@Lazy`.
