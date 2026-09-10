---
title: 'Smaller Images with Multi-Stage Docker Builds'
description: 'Separating the build toolchain from the runtime image, and why the final stage should not run as root.'
published: 2026-07-30
category: DevOps
tags: ['Docker', 'Security']
draft: false
---

A single-stage Dockerfile ships the compiler, the package cache, and the build tools
into production. A multi-stage build keeps them in a throwaway layer.

## The pattern

```dockerfile
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /src
COPY pom.xml .
RUN mvn -B dependency:go-offline
COPY src ./src
RUN mvn -B package -DskipTests

FROM eclipse-temurin:21-jre-alpine AS runtime
RUN addgroup -S app && adduser -S app -G app
USER app
WORKDIR /app
COPY --from=build /src/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
```

Two details do most of the work:

1. Copying `pom.xml` before the sources means the dependency layer is cached and only
   re-downloads when the manifest changes.
2. The runtime stage starts from a JRE image, so the JDK, Maven, and the local
   repository never reach production.

## Do not run as root

The default user in most base images is root. Creating an unprivileged user costs two
lines and removes an entire class of container escape consequences.

## Verify rather than assume

```bash
docker image ls my-service
docker run --rm my-service id
```

The first command shows whether the image actually shrank. The second confirms the
process is not running as uid 0.
