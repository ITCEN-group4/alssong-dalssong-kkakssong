package com.group4.aldalka.domain.post.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostSearchRequest {

    private Boolean isOfficial;
    private Integer page = 1; // 기본값
    private String sort = "like";
    private Integer difficulty;
    private List<String> ingredients;
    private List<String> baseLiqueurs;
    private Boolean isShaken;
    private String query;

}
