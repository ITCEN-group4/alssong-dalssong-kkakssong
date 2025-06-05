package com.group4.aldalka.domain.user.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.UserRole;
import com.group4.aldalka.domain.user.dto.request.UserCreationRequest;
import com.group4.aldalka.domain.user.dto.response.CreateUserResponse;
import com.group4.aldalka.domain.user.repository.UserRepository;
import com.group4.aldalka.global.error.ErrorCode;
import com.group4.aldalka.global.error.exception.BusinessException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public CreateUserResponse createUser(UserCreationRequest request) {
        //TODO: 새로운 ErrorCode 만들지 허가 받기
        userRepository
                .findByEmail(request.getEmail())
                .ifPresent(
                        user -> {
                            throw new BusinessException(ErrorCode.INPUT_VALUE_INVALID);
                        });
        User user =
                User.builder()
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .userRole(UserRole.USER)
                        .build();
        userRepository.save(user);
        return CreateUserResponse.from(user);
    }
}
