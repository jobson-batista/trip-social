# Estágio 1: Build com Maven e Java 17
FROM maven:3.8.4-openjdk-17-slim AS build
COPY . /app
WORKDIR /app
RUN mvn clean package -DskipTests

# Estágio 2: Runtime leve
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Configurações para economizar RAM na JVM (Essencial para o Render)
ENV JAVA_OPTS="-Xmx300m -Xms200m -XX:MaxMetaspaceSize=100m"

EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]