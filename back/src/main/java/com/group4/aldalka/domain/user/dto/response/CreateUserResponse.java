package com.group4.aldalka.domain.user.dto.response;

import com.group4.aldalka.domain.user.User;

import lombok.Data;

@Data
public class CreateMemberResponse {
    private final Long memberId;

    public static CreateMemberResponse from(User user) {
        return new CreateMemberResponse(user.getUserId());
    }
}
