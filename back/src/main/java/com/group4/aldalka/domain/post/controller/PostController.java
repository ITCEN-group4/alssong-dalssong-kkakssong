package com.group4.aldalka.domain.post.controller;

import com.group4.aldalka.domain.common.LoginUser;
import com.group4.aldalka.domain.post.dto.request.PostCreateRequestDTO;
import com.group4.aldalka.domain.post.dto.response.PostRequestDTO;
import com.group4.aldalka.domain.post.dto.response.PostResponseDTO;
import com.group4.aldalka.domain.post.dto.response.PostSelectResponseDTO;
import com.group4.aldalka.domain.post.service.PostService;
import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.repository.UserRepository;
import com.group4.aldalka.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final UserRepository userRepository;
    private final PostService postService;

    // 게시글 생성
    @PostMapping
    public ResponseEntity<PostRequestDTO> createPost(@RequestBody PostCreateRequestDTO postCreateDTO, @LoginUser String userName) {
        User userEntity = userRepository.findByUsername(userName).orElseThrow();
        return ResponseEntity.ok(postService.createPost(postCreateDTO, userEntity));
    }

    // 게시글 불러오기
    @GetMapping("/{postId}")
    public ResponseEntity<PostSelectResponseDTO> selectPost(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.selectPost(postId));
    }

    // 게시글 수정
    @PutMapping("/{postId}")
    public ResponseEntity<PostResponseDTO> updatePost(@PathVariable Long postId, @RequestBody PostRequestDTO requestDTO) {
        return ResponseEntity.ok(postService.updatePost(requestDTO, postId));
    }

    // 게시글 삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId, @LoginUser String userName) {
        postService.deletePost(postId);
        return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
    }
}
