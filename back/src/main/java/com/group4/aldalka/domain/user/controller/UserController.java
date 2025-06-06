package com.group4.aldalka.domain.user.controller;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group4.aldalka.domain.common.LoginUser;
import com.group4.aldalka.domain.user.dto.request.UserCreationRequest;
import com.group4.aldalka.domain.user.dto.request.UserUpdateRequest;
import com.group4.aldalka.domain.user.dto.response.CreateUserResponse;
import com.group4.aldalka.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<CreateUserResponse> createUser(
            @RequestBody @Valid UserCreationRequest request) {
        CreateUserResponse response = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping
    public ResponseEntity<CreateUserResponse> updateUser(
            @LoginUser String userEmail,
            @RequestBody @Valid UserUpdateRequest request) {
        CreateUserResponse response = userService.updateUser(userEmail, request);
        return ResponseEntity.ok(response);
    }
}
