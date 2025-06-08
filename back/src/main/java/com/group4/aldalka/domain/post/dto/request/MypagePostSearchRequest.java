package com.group4.aldalka.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
public class MypagePostSearchRequest {
    private final Integer page;
    private final String sort;
    private final String query;

    @JsonCreator
    public MypagePostSearchRequest(
            @JsonProperty("page") Integer page,
            @JsonProperty("sort") String sort,
            @JsonProperty("query") String query) {
        this.page = (page != null) ? page : 1;
        this.sort = (sort != null && !sort.isBlank()) ? sort : "like";
        this.query = query;
    }
}
