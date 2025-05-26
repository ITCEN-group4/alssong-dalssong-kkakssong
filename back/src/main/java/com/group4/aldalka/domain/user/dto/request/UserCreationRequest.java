package com.group4.aldalka.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCreationRequest {
    private String username;

    @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
    private String password;
}
