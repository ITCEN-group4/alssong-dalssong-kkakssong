package com.group4.aldalka.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MypagePostSearchRequest{
    private Integer page;
    private String sort;
    private String query;

    // 기본값 세팅 메서드
    public void applyDefaults() {
        if (this.page == null) {
            this.page = 1;
        }
        if (this.sort == null || this.sort.isEmpty()) {
            this.sort = "like";
        }
    }

}
