package com.group4.aldalka.domain.post.controller;

import com.group4.aldalka.domain.post.dto.request.PostCreateRequestDTO;
import com.group4.aldalka.domain.post.dto.response.PostDeleteRequestDTO;
import com.group4.aldalka.domain.post.dto.response.PostRequestDTO;
import com.group4.aldalka.domain.post.dto.response.PostResponseDTO;
import com.group4.aldalka.domain.post.dto.response.PostSelectResponseDTO;
import com.group4.aldalka.domain.post.repository.*;
import com.group4.aldalka.domain.post.service.PostService;
import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostService postService;

    // 게시글 생성
    @PostMapping
    public ResponseEntity<PostRequestDTO> createPost(@RequestBody PostCreateRequestDTO postCreateDTO, @AuthenticationPrincipal String userName) {
        User userEntity = userRepository.findByUsername(userName)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PostRequestDTO response = postService.createPost(postCreateDTO, userEntity);
        return ResponseEntity.ok(response);
    }


    // 게시글 불러오기
    @GetMapping("/{postId}")
    public ResponseEntity<PostSelectResponseDTO> selectPost(@PathVariable Long postId) {
        return postService.SelectPost(postId)
                .map(ResponseEntity::ok)                       // Optional<PostResponseDTO> → 200 OK
                .orElse(ResponseEntity.notFound().build());    // 없으면 404 Not Found
    }

    // 게시글 수정
    @PutMapping("/{postId}")
    public ResponseEntity<PostResponseDTO> updatePost(
            @PathVariable Long postId,
            @RequestBody PostRequestDTO requestDTO
    ) {
        return postService.updatePost(postId, requestDTO)
                .map(updatedDto -> ResponseEntity.ok(updatedDto))
                .orElse(ResponseEntity.notFound().build());
    }

    // 게시글 삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity<PostDeleteRequestDTO> deletePost(@PathVariable Long postId, @AuthenticationPrincipal String userName) {
        return postService.deletePost(postId, userName)
                .map(responseDto -> ResponseEntity.ok(responseDto))   // 삭제 성공 시 200 OK + DTO
                .orElse(ResponseEntity.notFound().build());
    }
}
