package com.group4.aldalka.domain.post.controller;

import com.group4.aldalka.domain.common.LoginUser;
import com.group4.aldalka.domain.post.dto.request.PostSearchRequest;
import com.group4.aldalka.domain.post.service.PostLikeService;
import com.group4.aldalka.domain.post.service.PostService;
import com.group4.aldalka.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.group4.aldalka.global.result.ResultCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController
{

    private final PostService postService;
    private final PostLikeService postLikeService;

    //비회원, 회원 모두 접근가능
    @PostMapping("/search")
    public ResponseEntity<ResultResponse> searchPosts(@LoginUser String userEmail, @RequestBody PostSearchRequest postSearchRequest) {
        return ResponseEntity.ok(
                ResultResponse.of(GET_POST_INFO_SUCCESS, postService.searchPosts(userEmail, postSearchRequest))
        );
    }

    //비회원, 회원 모두 접근가능
    @GetMapping("/{postId}")
    public ResponseEntity<ResultResponse> getOfficialPostDetail(@LoginUser String userEmail, @PathVariable Long postId){
        return ResponseEntity.ok(
                ResultResponse.of(GET_OFFICIAL_DETAIL_INFO_SUCCESS, postService.getOfficialPostDetail(userEmail, postId))
        );
    }

    @PostMapping("/{postId}/likes")
    public ResponseEntity<ResultResponse> likePost(@LoginUser String userEmail, @PathVariable Long postId){
        return ResponseEntity.ok(
                ResultResponse.of(POST_LIKE_SUCCESS, postLikeService.addLike(userEmail, postId)));
    }

    @DeleteMapping("/{postId}/likes")
    public ResponseEntity<ResultResponse> unlikePost(@LoginUser String userEmail, @PathVariable Long postId){
        return ResponseEntity.ok(
                ResultResponse.of(DELETE_LIKE_SUCCESS, postLikeService.removeLike(userEmail, postId)));
    }


}
