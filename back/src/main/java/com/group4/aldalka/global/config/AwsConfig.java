package com.group4.aldalka.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.services.s3.S3Client;

import software.amazon.awssdk.regions.Region;

@Configuration
@RequiredArgsConstructor
public class AwsConfig {
    @Value("${cloud.aws.region}")
    private String regionName;

    // application.yml에 넣은 키·시크릿 가져오기
    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Bean
    public S3Client s3Client() {
        // 1) AwsBasicCredentials 생성
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKey, secretKey);

        // 2) StaticCredentialsProvider로 감싸기
        StaticCredentialsProvider staticProvider =
                StaticCredentialsProvider.create(awsCreds);

        return S3Client.builder()
                .region(Region.of(regionName))
                .credentialsProvider(staticProvider)
                .build();
    }
}

