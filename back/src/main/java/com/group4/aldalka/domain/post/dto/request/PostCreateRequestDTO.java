package com.group4.aldalka.domain.post.dto.request;

import com.group4.aldalka.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostCreateRequestDTO {
    private String title;
    private String content;
    private String recipe;
    private boolean isShaken;
    private int difficulty;
    private boolean isOfficial;
    private String imageUrl;
    private List<String> baseLiquors;
    private List<String> ingredients;

}
