---
title: 'Getting Started with Spring Boot'
description: 'The minimum you need to understand about auto-configuration, starters, and the application context before writing a real service.'
published: 2026-09-11
category: Backend
tags: ['Spring Boot', 'Java']
draft: false
---

Spring Boot is not a new framework. It is Spring plus a set of opinionated defaults
that remove most of the XML and boilerplate the older stack required.

## What a starter actually does

A starter such as `spring-boot-starter-web` is a dependency with no code of its own.
It pulls in a curated set of libraries that are known to work together, so version
alignment stops being your problem.

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

## Auto-configuration in one sentence

At startup Boot inspects the classpath and the existing bean definitions, then
registers the beans you did not define yourself. Because it backs off whenever you
declare your own bean, overriding a default is just a matter of defining it.

Run with `--debug` to see the full report of what matched and what did not:

```bash
./mvnw spring-boot:run -Dspring-boot.run.arguments=--debug
```

## A minimal service

```java
@SpringBootApplication
public class ShopApplication {
  public static void main(String[] args) {
    SpringApplication.run(ShopApplication.class, args);
  }
}

@RestController
class HealthController {
  @GetMapping("/health")
  Map<String, String> health() {
    return Map.of("status", "up");
  }
}
```

That is a running HTTP service with an embedded server, JSON serialization, and
sensible error handling already wired.

## What to read next

- Configuration binding with `@ConfigurationProperties` instead of scattered `@Value`
- Profiles for environment-specific configuration
- Actuator endpoints, before you need them in production
