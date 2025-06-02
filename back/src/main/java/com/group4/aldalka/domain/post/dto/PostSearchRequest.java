package com.group4.aldalka.domain.post.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostSearchRequest {

    private Boolean isOfficial;
    private Integer page;
    private String sort;
    private Integer difficulty;
    private List<String> ingredients;
    private List<String> baseLiqueurs;
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
