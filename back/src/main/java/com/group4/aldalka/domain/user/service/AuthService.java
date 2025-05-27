package com.group4.aldalka.domain.user.service;

import java.util.NoSuchElementException;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.dto.response.LoginResponse;
import com.group4.aldalka.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public LoginResponse login(String username, String rawPassword) {
        User user =
                userRepository
                        .findByUsername(username)
                        .orElseThrow(() -> new NoSuchElementException("이메일/비밀번호가 일치하지 않습니다."));
        passwordEncoder.checkMatches(user, rawPassword);
        String accessToken = jwtProvider.createAccessToken(user);
        return LoginResponse.of(user, accessToken);
    }
}
