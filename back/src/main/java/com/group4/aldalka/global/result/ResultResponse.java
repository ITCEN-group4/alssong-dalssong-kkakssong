package com.group4.aldalka.global.result;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResultResponse<T> {

    private int status;
    private String message;
    private T data;

    private ResultResponse(ResultCode resultCode, T data) {
        this.status = resultCode.getStatus();
        this.message = resultCode.getMessage();
        this.data = data;
    }

    public static ResultResponse of(ResultCode resultCode, Object data) {
        return new ResultResponse(resultCode, data);
    }

    public static ResultResponse of(ResultCode resultCode) {
        return new ResultResponse(resultCode, "");
    }
}