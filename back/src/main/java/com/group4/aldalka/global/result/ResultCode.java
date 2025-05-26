package com.group4.aldalka.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {

    //User 예시
    GET_USER_INFO_SUCCESS(200, "회원 정보 조회에 성공하였습니다.");

    private final int status;
    private final String message;

}