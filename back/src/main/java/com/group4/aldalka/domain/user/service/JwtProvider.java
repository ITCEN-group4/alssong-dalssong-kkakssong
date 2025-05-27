package com.group4.aldalka.domain.user.service;


import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.dto.response.CustomClaims;

public interface JwtProvider {
    CustomClaims parseAccessToken(String accessToken);

    String createAccessToken(User user);
}
