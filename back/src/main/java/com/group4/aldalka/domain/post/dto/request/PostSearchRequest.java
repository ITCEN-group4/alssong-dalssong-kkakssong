package com.group4.aldalka.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class PostSearchRequest {

    private final Boolean isOfficial;
    private final Integer page;
    private final String sort;
    private final Integer difficulty;
    private final List<String> ingredients;
    private final List<String> baseLiqueurs;
    private final Boolean isShaken;
    private final String query;

    @JsonCreator
    public PostSearchRequest(
            @JsonProperty("is_official") Boolean isOfficial,
            @JsonProperty("page") Integer page,
            @JsonProperty("sort") String sort,
            @JsonProperty("difficulty") Integer difficulty,
            @JsonProperty("ingredients") List<String> ingredients,
            @JsonProperty("base_liqueurs") List<String> baseLiqueurs,
            @JsonProperty("is_shaken") Boolean isShaken,
            @JsonProperty("query") String query
    ) {
        this.isOfficial = (isOfficial != null) ? isOfficial : true;
        this.page = (page != null) ? page : 1;
        this.sort = (sort != null && !sort.isBlank()) ? sort : "like";
        this.difficulty = difficulty;
        this.ingredients = ingredients;
        this.baseLiqueurs = baseLiqueurs;
        this.isShaken = isShaken;
        this.query = query;
    }
}

