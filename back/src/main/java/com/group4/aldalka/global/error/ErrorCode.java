package com.group4.aldalka.global.error;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    //Global
    INTERNAL_SERVER_ERROR(500, "내부 서버 오류입니다."),
    METHOD_NOT_ALLOWED(405, "허용되지 않은 HTTP method입니다."),
    INPUT_VALUE_INVALID(400, "유효하지 않은 입력입니다."),
    INPUT_TYPE_INVALID(400, "입력 타입이 유효하지 않습니다."),
    HTTP_MESSAGE_NOT_READABLE(400, "request message body가 없거나, 값 타입이 올바르지 않습니다."),
    HTTP_HEADER_INVALID(400, "request header가 유효하지 않습니다."),
    IS_NOT_IMAGE(400, "이미지가 아닙니다."),
    TOKEN_INVALID(401, "토큰 값이 유효하지 않습니다."),
    FORBIDDEN_ERROR(403, "작업을 수행하기 위한 권한이 없습니다."),
    EXPIRED_TOKEN(401, "토큰이 만료되었습니다."),
    EMAIL_EXISTS_ERROR(409, "해당 이메일을 가진 유저가 존재합니다."),
    ENTITY_NOT_FOUND(500, "존재하지 않는 Entity입니다."),

    //User
    USER_NOT_EXISTS(404, "존재하지 않는 회원입니다."),


    //Post
    POST_NOT_FOUND(404, "존재하지 않는 게시글입니다."),
    LIKE_NOT_FOUND(404, "좋아요를 누르지 않은 게시글입니다.");


    private final int status;
    private final String message;

}