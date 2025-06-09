package com.group4.aldalka.domain.post.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostResponseDTO {

    // 게시글에 포함된 기본 정보들
    @JsonProperty("post_id")
    private Long postId;

    @JsonProperty("user_name")
    private String userName;
    private String title;
    private String content;
    private String recipe;
    private Integer difficulty;

    @JsonProperty("is_shaken")
    private boolean isShaken;

    @JsonProperty("is_official")
    private boolean isOfficial;

    @JsonProperty("image_url")
    private String imageUrl;

    // 게시글 작성자
    @JsonProperty("user_id")
    private Long userId;

    // 외부 테이블에 속하는 게시글의 기본 정보들
    @JsonProperty("base_liquors")
    private List<String> baseLiquors;
    private List<String> ingredients;
}
