package com.group4.aldalka.global.security;

import java.util.Set;

import com.group4.aldalka.domain.user.UserRole;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthentication {

    private final String username;
    private final UserRole userRole;
    private final String accessToken;

    public String getPrincipal() {
        return username;
    }

    public String getAuthority() {
        return userRole.getValue();
    }

    public String getCredential() {
        return accessToken;
    }

    public Set<String> getAuthorities() {
        return userRole.getAuthorities();
    }
}
