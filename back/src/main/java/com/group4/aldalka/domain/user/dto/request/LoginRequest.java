package com.group4.aldalka.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;

    @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
    private String password;

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
