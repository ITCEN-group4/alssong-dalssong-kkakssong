package com.group4.aldalka.domain.post.controller;

import com.group4.aldalka.domain.common.LoginUser;
import com.group4.aldalka.domain.post.dto.request.MypagePostSearchRequest;
import com.group4.aldalka.domain.post.service.PostService;
import com.group4.aldalka.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.group4.aldalka.global.result.ResultCode.GET_MYPAGE_POSTS_INFO_SUCCESS;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MypageController {

    private final PostService postService;
    @GetMapping("/posts")
    public ResponseEntity<ResultResponse> getMyPosts(@LoginUser String userEmail, @RequestBody MypagePostSearchRequest mypagePostSearchRequest){
        mypagePostSearchRequest.applyDefaults();
        return ResponseEntity.ok(
                ResultResponse.of(GET_MYPAGE_POSTS_INFO_SUCCESS, postService.getMypagePosts(userEmail, mypagePostSearchRequest))
        );
    }
}
