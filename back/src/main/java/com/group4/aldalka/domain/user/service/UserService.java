package com.group4.aldalka.domain.user.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.UserRole;
import com.group4.aldalka.domain.user.dto.UserInfoResponse;
import com.group4.aldalka.domain.user.dto.request.ChangePasswordRequest;
import com.group4.aldalka.domain.user.dto.request.UserCreationRequest;
import com.group4.aldalka.domain.user.dto.request.UserUpdateRequest;
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
        userRepository
                .findByEmail(request.getEmail())
                .ifPresent(
                        user -> {
                            throw new BusinessException(ErrorCode.EMAIL_EXISTS_ERROR);
                        });
        User user =
                User.builder()
                        .email(request.getEmail())
                        .nickname(request.getNickname())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .userRole(UserRole.USER)
                        .build();
        userRepository.save(user);
        return CreateUserResponse.from(user);
    }

    public CreateUserResponse updateUser(String userEmail, UserUpdateRequest request) {
        if(userEmail == null){
            throw new BusinessException(ErrorCode.INPUT_VALUE_INVALID);
        }

        User user =
                userRepository
                        .findByEmail(userEmail)
                        .orElseThrow(
                                () ->
                                        new BusinessException(
                                                ErrorCode.ENTITY_NOT_FOUND));
        User existingUser =
                userRepository
                        .findByNickname(request.getNickname())
                        .orElse(null);
        if (existingUser != null && !existingUser.getEmail().equals(userEmail)) {
            throw new BusinessException(ErrorCode.INPUT_VALUE_INVALID);
        }

        user.updateNickname(request.getNickname());
        return CreateUserResponse.from(user);
    }

    public UserInfoResponse getUser(String userEmail) {
        if(userEmail == null){
            throw new BusinessException(ErrorCode.INPUT_VALUE_INVALID);
        }

        User user =
                userRepository
                        .findByEmail(userEmail)
                        .orElseThrow(
                                () ->
                                        new BusinessException(
                                                ErrorCode.ENTITY_NOT_FOUND));
        return UserInfoResponse.fromUser(user);
    }

    public CreateUserResponse updatePassword(String userEmail, ChangePasswordRequest request) {
        if(userEmail == null){
            throw new BusinessException(ErrorCode.INPUT_VALUE_INVALID);
        }

        User user =
                userRepository
                        .findByEmail(userEmail)
                        .orElseThrow(
                                () ->
                                        new BusinessException(
                                                ErrorCode.ENTITY_NOT_FOUND));
        passwordEncoder.checkMatches(user, request.getCurrentPassword());

        user.updatePassword(passwordEncoder.encode(request.getNewPassword()));
        return CreateUserResponse.from(user);
    }

    public void deleteUser(String userEmail) {
        User user =
                userRepository
                        .findByEmail(userEmail)
                        .orElseThrow(
                                () ->
                                        new BusinessException(
                                                ErrorCode.ENTITY_NOT_FOUND));
        userRepository.delete(user);
    }

    public Long getUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXISTS))
                .getUserId();
    }
}
