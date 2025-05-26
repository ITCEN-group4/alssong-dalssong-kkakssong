package com.group4.aldalka.global.security;

import java.util.NoSuchElementException;

import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.service.PasswordEncoder;


public class BCryptPasswordEncoder implements PasswordEncoder {

    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder =
            new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();

    @Override
    public String encode(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    @Override
    public void checkMatches(User user, String rawPassword) {
        if (passwordEncoder.matches(rawPassword, user.getPassword())) {
            return;
        }
        throw new NoSuchElementException("아이디/패스워드가 일치하지 않습니다.");
    }
}
