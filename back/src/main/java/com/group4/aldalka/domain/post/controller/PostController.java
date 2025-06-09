package com.group4.aldalka.domain.post.controller;

import com.group4.aldalka.domain.common.LoginUser;
import com.group4.aldalka.domain.post.dto.request.PostSearchRequest;
import com.group4.aldalka.domain.post.service.PostLikeService;
import com.group4.aldalka.domain.post.dto.PostSearchRequest;
import com.group4.aldalka.domain.post.dto.request.PostCreateRequestDTO;
import com.group4.aldalka.domain.post.dto.request.PostRequestDTO;
import com.group4.aldalka.domain.post.dto.response.PostResponseDTO;
import com.group4.aldalka.domain.post.dto.response.PostSelectResponseDTO;
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
    public ResponseEntity<ResultResponse> searchPosts(@LoginUser String userEmail, @RequestBody PostSearchRequest postRequest) {
        postRequest.applyDefaults();
        return ResponseEntity.ok(
                ResultResponse.of(GET_POST_INFO_SUCCESS, postService.searchPosts(userEmail, postRequest))
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
                ResultResponse.of(GET_POST_INFO_SUCCESS, postService.searchPosts(userEmail, postRequest))
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

    // 게시글 생성
    @PostMapping ("/create")// 게시글 목록 조회와 중복으로 구분
    public ResponseEntity<PostRequestDTO> createPost(@RequestBody PostCreateRequestDTO postCreateDTO, @LoginUser String userName) {
        return ResponseEntity.ok(postService.createPost(postCreateDTO, userName));
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
    public ResponseEntity<PostRequestDTO> deletePost(@PathVariable Long postId, @LoginUser String userName) {
        postService.deletePost(postId);
        return ResponseEntity.noContent().build();  // HTTP 204 (No Content) 반환
    }

    @DeleteMapping("/{postId}/likes")
    public ResponseEntity<ResultResponse> unlikePost(@LoginUser String userEmail, @PathVariable Long postId){
        return ResponseEntity.ok(
                ResultResponse.of(DELETE_LIKE_SUCCESS, postLikeService.removeLike(userEmail, postId)));
    }


}
