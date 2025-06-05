package com.group4.aldalka.domain.post.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class PostSelectResponseDTO {
    @JsonProperty("post_id")
    private Long postId;

    @JsonProperty("user_name")
    private String userName;
    private String title;
    private String content;
    private String recipe;

    @JsonProperty("is_shaken")
    private boolean isShaken;
    private int difficulty;

    @JsonProperty("is_official")
    private boolean isOfficial;

    @JsonProperty("like_count")
    private int likeCount;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("base_liquors")
    private List<String> baseLiquors;
    private List<String> ingredients;

    @JsonProperty("like_check")
    boolean likeCheck;
}
