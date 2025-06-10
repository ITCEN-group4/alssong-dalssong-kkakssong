package com.group4.aldalka.domain.post.dto.request;

import lombok.Data;

@Data
public class ImageUploadRequestDTO {
    private String filename;       // ex) "watermelon.png"
    private String base64Data;     // ex) "iVBORw0KGgoAAAANSUhEUgAA…"
    private String ContentType;
}
