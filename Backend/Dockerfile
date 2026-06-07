FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -q --no-transfer-progress

COPY src ./src
RUN mvn package -DskipTests -q --no-transfer-progress

FROM eclipse-temurin:17-jre-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache curl && \
    addgroup -S tiger && \
    adduser -S tiger -G tiger

COPY --from=builder /app/target/*.jar app.jar
RUN mkdir -p uploads && chown -R tiger:tiger /app

USER tiger
EXPOSE 8090

ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
