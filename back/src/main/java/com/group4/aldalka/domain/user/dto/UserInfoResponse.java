package com.group4.aldalka.domain.user.dto;

import com.group4.aldalka.domain.user.User;

import lombok.Data;

@Data
public class UserInfoResponse {
    private Long userId;
    private String email;
    private String nickname;

    public UserInfoResponse(Long userId, String email, String nickname) {
        this.userId = userId;
        this.email = email;
        this.nickname = nickname;
    }

    public static UserInfoResponse fromUser(User user) {
        return new UserInfoResponse(user.getUserId(), user.getEmail(), user.getNickname());
    }
}
