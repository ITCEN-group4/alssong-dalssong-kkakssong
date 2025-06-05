package com.group4.aldalka.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonProperty("is_shaken")
    private boolean isShaken;
    private int difficulty;

    @JsonProperty("is_official")
    private boolean isOfficial;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("base_liquors")
    private List<String> baseLiquors;
    private List<String> ingredients;

}
