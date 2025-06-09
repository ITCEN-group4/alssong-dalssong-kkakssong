package com.group4.aldalka.domain.user.dto.response;

import com.group4.aldalka.domain.user.UserRole;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CustomClaims {
    private final String email;
    private final UserRole userRole;
}
