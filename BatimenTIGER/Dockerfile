# Étape 1 : Build
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# Copier les fichiers Maven
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src ./src
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Installation de curl pour le healthcheck (NÉCESSAIRE pour que le docker-compose fonctionne)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copier le JAR depuis l'étape de build
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8090

# Lancer l'application
# L'ajout de -Djava.security.egd=file:/dev/./urandom aide à accélérer le démarrage de la JVM
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]