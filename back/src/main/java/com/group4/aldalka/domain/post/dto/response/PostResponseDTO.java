package com.group4.aldalka.domain.post.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostResponseDTO {

    // 게시글에 포함된 기본 정보들
    private Long postId;
    private String userName;
    private String title;
    private String content;
    private String recipe;
    private Integer difficulty;
    private boolean isShaken;
    private boolean isOfficial;
    private String imageUrl;

    // 게시글 작성자
    private String authorUsername;

    // 외부 테이블에 속하는 게시글의 기본 정보들
    private List<String> ingredientNames;
    private List<String> baseLiquorNames;
}
