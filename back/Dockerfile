# 빌드 단계
FROM --platform=linux/arm64 gradle:8.13-jdk17 AS build
WORKDIR /app

COPY gradlew gradle build.gradle settings.gradle ./
RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon || true

COPY src ./src

# 최종 빌드
RUN ./gradlew bootJar -x test --no-daemon

# 실행 단계
FROM --platform=linux/arm64 amazoncorretto:17
WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Xms512m", "-Xmx512m", "-jar", "app.jar"]
