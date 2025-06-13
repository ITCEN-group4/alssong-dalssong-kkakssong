package com.group4.aldalka.domain.post.controller;

import com.group4.aldalka.domain.common.LoginUser;
import com.group4.aldalka.domain.post.dto.request.MypagePostSearchRequest;
import com.group4.aldalka.domain.post.service.PostService;
import com.group4.aldalka.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.group4.aldalka.global.result.ResultCode.GET_MYPAGE_POSTS_INFO_SUCCESS;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MypageController {

    private final PostService postService;
    @PostMapping("/posts")
    public ResponseEntity<ResultResponse> getMyPosts(@LoginUser String userEmail, @RequestBody MypagePostSearchRequest mypagePostSearchRequest){
        return ResponseEntity.ok(
                ResultResponse.of(GET_MYPAGE_POSTS_INFO_SUCCESS, postService.getMypagePosts(userEmail, mypagePostSearchRequest))
        );
    }
}
