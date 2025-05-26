package com.group4.aldalka.domain.user.dto.response;

import com.group4.aldalka.domain.user.User;

import lombok.Data;

@Data
public class CreateUserResponse {
    private final Long userId;

    public static CreateUserResponse from(User user) {
        return new CreateUserResponse(user.getUserId());
    }
}
