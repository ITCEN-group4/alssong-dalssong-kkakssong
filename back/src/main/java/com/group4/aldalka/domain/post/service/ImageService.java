package com.group4.aldalka.domain.post.service;

import com.group4.aldalka.domain.post.dto.ImageUploadRecord;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final S3Client s3Client;

    @Value("${cloud.aws.bucket}")
    private String bucket;

    @Value("${cloud.aws.region}")
    private String regionName;

    // MultipartFile을 받아 S3에 업로드한 뒤, key와 URL을 리턴합니다.
    public ImageUploadRecord uploadImage(MultipartFile file) throws IOException {
        // 원본 파일 확장자 추출
        String originalFilename = file.getOriginalFilename();
        String ext = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            ext = originalFilename.substring(originalFilename.lastIndexOf('.'));
        }

        // S3에 저장할 키 생성
        String key = "images/%s%s".formatted(
                UUID.randomUUID(),  // 랜덤 UUID
                ext                 // 파일 확장자 (예: ".jpg", ".png" 등)
        );

        // PutObjectRequest 생성
        PutObjectRequest putReq = PutObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .contentType(file.getContentType())
                .build();

        // 실제 업로드 (MultipartFile → InputStream → S3)
        s3Client.putObject(
                putReq,
                RequestBody.fromInputStream(file.getInputStream(), file.getSize())
        );

        // 공개 URL 생성
        // S3Client 자체에는 region() 메서드가 없으므로, application.yml에서 주입받은 regionName 사용
        String url = "https://" + bucket + ".s3." + regionName + ".amazonaws.com/" + key;

        return new ImageUploadRecord(key, url);
    }

    public void deleteImage(String key) {
        String bucketDomainPrefix = "https://" + bucket + ".s3." + regionName + ".amazonaws.com/";
        if (key.startsWith(bucketDomainPrefix)) {
            // URL 전체 → Key 부분만 남김
            key = key.substring(bucketDomainPrefix.length());
        }

        System.out.println("Delete Image: " + key);

        // Key가 빈 문자열이거나 null이 아니면 삭제 요청
        if (key.isBlank()) {
            return;
        }

        DeleteObjectRequest deleteReq = DeleteObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .build();

        System.out.println(s3Client.deleteObject(deleteReq));
    }
}

