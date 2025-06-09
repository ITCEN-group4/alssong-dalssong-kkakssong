package com.group4.aldalka.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class ChangePasswordRequest {
    @NotBlank(message = "현재 비밀번호는 필수입니다.")
    private String currentPassword;
    @NotBlank(message = "새 비밀번호는 필수입니다.")
    private String newPassword;

    public ChangePasswordRequest(String currentPassword, String newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
}
