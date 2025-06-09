# 빌드 단계
FROM --platform=linux/arm64 gradle:8.13-jdk17 AS build
WORKDIR /app

COPY gradle ./gradle
COPY gradlew .
COPY build.gradle settings.gradle . 

RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon

COPY src ./src
RUN ./gradlew bootJar --no-daemon --no-build-cache -x test

# 실행 단계
FROM --platform=linux/arm64 amazoncorretto:17
WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Xms512m", "-Xmx512m", "-jar", "app.jar"]
