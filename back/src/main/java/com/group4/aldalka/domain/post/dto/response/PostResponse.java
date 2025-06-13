package com.group4.aldalka.domain.post.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.group4.aldalka.domain.post.entity.Post;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // Jackson 역직렬화를 위해 기본생성자 필요, 외부 호출 차단
@AllArgsConstructor
@Builder
public class PostResponse {

    @JsonProperty("post_id")
    private Long postId;

    private String title;

    private String content;

    private Integer difficulty;

    @JsonProperty("is_shaken")
    private Boolean isShaken;

    @JsonProperty("like_count")
    private Integer likeCount;

    @JsonProperty("is_liked")
    private Boolean isLiked;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("base_liquors")
    private List<String> baseLiqueurs;

    private List<String> ingredients;

    public static PostResponse from(Post post, int likeCount, boolean isLiked) {
        return new PostResponse(
                post.getPostId(),
                post.getTitle(),
                post.getContent(),
                post.getDifficulty(),
                post.isShaken(),
                likeCount,
                isLiked,
                post.getImageUrl(),
                post.getPostBaseLiquors().stream()
                        .map(pbl -> pbl.getBaseLiquor().getName())
                        .toList(),
                post.getPostIngredients().stream()
                        .map(pi -> pi.getIngredient().getName())
                        .toList()
        );
    }

}


