# 빌드 단계
FROM --platform=linux/arm64 eclipse-temurin:17-jdk-alpine-3.21 AS build
WORKDIR /app

COPY gradlew .
COPY gradle ./gradle
COPY build.gradle settings.gradle . 

RUN chmod +x gradlew

RUN ./gradlew dependencies --no-daemon || true

COPY src ./src

RUN ./gradlew bootJar -x test --no-daemon --no-build-cache

# 실행 단계
FROM --platform=linux/arm64 eclipse-temurin:17-jre-alpine
WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Xms512m", "-Xmx512m", "-jar", "app.jar"]
