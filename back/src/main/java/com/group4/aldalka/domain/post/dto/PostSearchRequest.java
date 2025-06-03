package com.group4.aldalka.domain.post.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostSearchRequest {

    @JsonProperty("is_official")
    private Boolean isOfficial;
    private Integer page;
    private String sort;
    private Integer difficulty;
    private List<String> ingredients;
    @JsonProperty("base_liqueurs")
    private List<String> baseLiqueurs;
    @JsonProperty("is_shaken")
    private Boolean isShaken;
    private String query;

    // 기본값 세팅 메서드
    public void applyDefaults() {
        if (this.isOfficial == null) {
            this.isOfficial = true;
        }
        if (this.page == null) {
            this.page = 1;
        }
        if (this.sort == null || this.sort.isEmpty()) {
            this.sort = "like";
        }
    }

}
