package com.group4.aldalka.domain.post.controller;

import com.group4.aldalka.domain.common.LoginUser;
import com.group4.aldalka.domain.post.dto.PostSearchRequest;
import com.group4.aldalka.domain.post.service.PostService;
import com.group4.aldalka.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.group4.aldalka.global.result.ResultCode.GET_POST_INFO_SUCCESS;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController
{

    private final PostService postService;

    //비회원, 회원 모두 접근가능
    @PostMapping("")
    public ResponseEntity<ResultResponse> searchPosts(@LoginUser String userId, @RequestBody PostSearchRequest postRequest) {
        postRequest.applyDefaults();
        return ResponseEntity.ok(
                ResultResponse.of(GET_POST_INFO_SUCCESS, postService.searchPosts(userId, postRequest))
        );
    }
}
