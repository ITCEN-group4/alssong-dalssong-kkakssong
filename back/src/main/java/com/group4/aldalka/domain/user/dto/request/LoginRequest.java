package com.group4.aldalka.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;

    @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
    private String password;

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
