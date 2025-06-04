package com.group4.aldalka.domain.post.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class PostSelectResponseDTO {
    private Long postId;
    private String userName;
    private String title;
    private String content;
    private String recipe;
    private boolean isShaken;
    private int difficulty;
    private boolean isOfficial;
    private int likeCount;
    private String imageUrl;

    private List<String> baseLiquors;
    private List<String> ingredients;
}
