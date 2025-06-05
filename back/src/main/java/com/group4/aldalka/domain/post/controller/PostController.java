package com.group4.aldalka.domain.post.controller;

import com.group4.aldalka.domain.common.LoginUser;
import com.group4.aldalka.domain.post.dto.request.PostCreateRequestDTO;
import com.group4.aldalka.domain.post.dto.request.PostDeleteRequestDTO;
import com.group4.aldalka.domain.post.dto.request.PostRequestDTO;
import com.group4.aldalka.domain.post.dto.response.PostResponseDTO;
import com.group4.aldalka.domain.post.dto.response.PostSelectResponseDTO;
import com.group4.aldalka.domain.post.service.PostService;
import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.repository.UserRepository;
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
    @PostMapping("/create") // 게시글 목록 조회와 중복으로 구분
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

    // 게시글 삭제, @LoginUser를 유지시켜 삭제 권한 유저를 확인
    @DeleteMapping("/{postId}")
    public ResponseEntity<PostDeleteRequestDTO> deletePost(@PathVariable Long postId, @LoginUser String userName) {
        postService.deletePost(postId);             // 이미지 URL 삭제
        return ResponseEntity.noContent().build();  // HTTP 204 (No Content) 반환
    }
}
