package com.group4.aldalka.domain.post.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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

        private Integer difficulty;

        @JsonProperty("is_shaken")
        private Boolean isShaken;

        @JsonProperty("like_count")
        private Integer likeCount;

        @JsonProperty("is_liked")
        private Boolean isLiked;

        @JsonProperty("image_url")
        private String imageUrl;

        @JsonProperty("base_liqueurs")
        private List<String> baseLiqueurs;

        private List<String> ingredients;

}
