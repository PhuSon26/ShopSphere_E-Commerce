FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /src

COPY pom.xml .
COPY src ./src

RUN mvn -q -DskipTests package

FROM eclipse-temurin:17-jre

WORKDIR /app

ARG APP_ROLE=api
ENV APP_ROLE=${APP_ROLE}

COPY --from=build /src/target/payment-service-0.1.0.jar app.jar

EXPOSE 8084

ENTRYPOINT ["sh", "-c", "java -jar /app/app.jar --app.role=${APP_ROLE}"]