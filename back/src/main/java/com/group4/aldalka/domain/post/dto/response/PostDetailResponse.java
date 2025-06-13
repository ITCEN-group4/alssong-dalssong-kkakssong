package com.group4.aldalka.domain.post.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // Jackson 역직렬화를 위해 기본생성자 필요, 외부 호출 차단
@AllArgsConstructor
@Builder
public class PostDetailResponse {

    @JsonProperty("post_id")
    private Long postId;

    @JsonProperty("user_id")
    private Long userId;

    private String user_nickname;

    private String title;

    private String content;

    private String recipe;

    private Integer difficulty;

    @JsonProperty("is_shaken")
    private Boolean isShaken;

    @JsonProperty("created_at")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;

    @JsonProperty("updated_at")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate updateAt;

    @JsonProperty("like_count")
    private Integer likeCount;

    @JsonProperty("is_liked")
    private Boolean isLiked;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("base_liquors")
    private List<String> baseLiqueurs;

    private List<String> ingredients;

}