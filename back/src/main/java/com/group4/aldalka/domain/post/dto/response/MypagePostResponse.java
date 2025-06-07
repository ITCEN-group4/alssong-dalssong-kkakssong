package com.group4.aldalka.domain.post.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.group4.aldalka.domain.post.entity.Post;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // Jackson 역직렬화를 위해 기본생성자 필요, 외부 호출 차단
@AllArgsConstructor
@Builder
public class MypagePostResponse {

    @JsonProperty("post_id")
    private Long postId;

    private String title;

    @JsonProperty("like_count")
    private Integer likeCount;

    @JsonProperty("is_liked")
    private Boolean isLiked;

    @JsonProperty("created_at")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;

    @JsonProperty("image_url")
    private String imageUrl;

}


