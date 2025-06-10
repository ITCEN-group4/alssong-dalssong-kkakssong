package com.group4.aldalka.domain.post.service;

import com.group4.aldalka.domain.post.dto.ImageUploadRecord;
import com.group4.aldalka.domain.post.dto.request.ImageUploadRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.Base64;
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


    public ImageUploadRecord uploadImageTest(ImageUploadRequestDTO dto) {
        byte[] bytes = decodeBase64(dto.getBase64Data());
        String filename = sanitizeFilename(dto.getFilename());
        String ext = extractExtension(filename);
        String key = generateKey(ext);
        uploadToS3(key, bytes, dto.getContentType());
        return buildRecord(key);
    }

    private byte[] decodeBase64(String dataUri) {
        String base64 = dataUri.contains(",")
                ? dataUri.split(",", 2)[1]
                : dataUri;
        return Base64.getDecoder().decode(base64);
    }

    private String sanitizeFilename(String raw) {
        return Paths.get(raw).getFileName().toString();
    }

    private String extractExtension(String filename) {
        int idx = filename.lastIndexOf('.');
        return idx > 0 ? filename.substring(idx) : "";
    }

    private String generateKey(String ext) {
        return "images/" + UUID.randomUUID() + ext;
    }

    private void uploadToS3(String key, byte[] data, String contentType) {
        PutObjectRequest req = PutObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .contentType(contentType)
                .build();
        s3Client.putObject(req, RequestBody.fromBytes(data));
    }

    private ImageUploadRecord buildRecord(String key) {
        String url = String.format("https://%s.s3.%s.amazonaws.com/%s",
                bucket, regionName, key);
        return new ImageUploadRecord(key, url);
    }

    public void deleteImage(String key) {

        if (key == null || key.isBlank()) {
            return;
        }

        // S3 오브젝트 키는 "images/{uuid}.png" 형태로 되어 있으므로 prefix 추가
        String objectKey = "images/" + key;

        DeleteObjectRequest deleteReq = DeleteObjectRequest.builder()
                .bucket(bucket)
                .key(objectKey)
                .build();

        s3Client.deleteObject(deleteReq);
    }
}

