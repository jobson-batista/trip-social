FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
COPY . /app
WORKDIR /app
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Configurações para economizar RAM na JVM (Essencial para o Render)
ENV JAVA_OPTS="-Xmx300m -Xms200m -XX:MaxMetaspaceSize=100m"

EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
