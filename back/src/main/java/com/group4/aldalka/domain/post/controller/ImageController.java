package com.group4.aldalka.domain.post.controller;

import com.group4.aldalka.domain.post.dto.ImageUploadRecord;
import com.group4.aldalka.domain.post.service.ImageService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/img")
public class ImageController {

    private final ImageService imageService;

    // presign URL 발급 요청
    @PostMapping("/upload")
    public ResponseEntity<ImageUploadRecord> upload(@RequestPart("file") @NotNull MultipartFile file) throws IOException {
        return ResponseEntity.ok(imageService.uploadImage(file));
    }
}
