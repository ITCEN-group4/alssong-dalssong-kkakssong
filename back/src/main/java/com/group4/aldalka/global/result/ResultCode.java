package com.group4.aldalka.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {

    //User 예시
    GET_USER_INFO_SUCCESS(200, "회원 정보 조회에 성공하였습니다."),

    //포스트
    GET_POST_INFO_SUCCESS(200, "포스트 정보 조회에 성공하였습니다."),

    //공식 칵테일 레시피
    GET_OFFICIAL_DETAIL_INFO_SUCCESS(200, "포스트 정보 조회에 성공하였습니다."),
    POST_LIKE_SUCCESS(200, "좋아요가 등록되었습니다."),
    DELETE_LIKE_SUCCESS(200, "좋아요가 취소되었습니다."),
    GET_MYPAGE_POSTS_INFO_SUCCESS(200, "마이페이지 포스트 정보 조회에 성공하였습니다.");


    private final int status;
    private final String message;

}