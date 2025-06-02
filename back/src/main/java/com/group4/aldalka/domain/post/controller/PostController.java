package com.group4.aldalka.domain.post.controller;

import com.group4.aldalka.domain.common.CurrentUserProvider;
import com.group4.aldalka.domain.post.dto.PostSearchRequest;
import com.group4.aldalka.domain.post.entity.Post;
import com.group4.aldalka.domain.post.service.PostService;
import com.group4.aldalka.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.group4.aldalka.global.result.ResultCode.GET_POST_INFO_SUCCESS;

@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController
{

    private final PostService postService;

    @PostMapping("/create")
    public String createPost() {
        return null;
    }

    @PutMapping("/update")
    public String updatePost(Post post) {
        return null;
    }

    @DeleteMapping("/delete")
    public String deletePost(Post post) {
        return null;

    }

    @GetMapping("")
    public ResponseEntity<ResultResponse> searchPosts(@ModelAttribute PostSearchRequest postRequest) {
        String userId = CurrentUserProvider.getCurrentUserId();

        return ResponseEntity.ok(
                ResultResponse.of(GET_POST_INFO_SUCCESS, postService.searchPosts(userId, postRequest))
        );
    }
}
