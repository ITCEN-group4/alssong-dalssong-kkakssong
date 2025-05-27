package com.group4.aldalka.domain.user.service;


import com.group4.aldalka.domain.user.User;

public interface PasswordEncoder {

    String encode(String rawPassword);

    void checkMatches(User user, String rawPassword);
}
