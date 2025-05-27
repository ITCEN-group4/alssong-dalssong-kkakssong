package com.group4.aldalka.domain.user.dto.response;

import com.group4.aldalka.domain.user.User;

import lombok.Data;

@Data
public class LoginResponse {
    private Long userId;
    private String accessToken;

    public LoginResponse(Long userId, String accessToken) {
        this.userId = userId;
        this.accessToken = accessToken;
    }

    public static LoginResponse of(User user, String accessToken) {
        return new LoginResponse(user.getUserId(), accessToken);
    }
}
