package com.group4.aldalka.domain.user.dto.request;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private final String nickname;

    public UserUpdateRequest(String nickname) {
        this.nickname = nickname;
    }
}
