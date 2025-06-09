package com.group4.aldalka.domain.post.service;

import com.group4.aldalka.domain.post.dto.*;
import com.group4.aldalka.domain.post.dto.request.MypagePostSearchRequest;
import com.group4.aldalka.domain.post.dto.request.PostSearchRequest;
import com.group4.aldalka.domain.post.dto.response.MypagePostResponse;
import com.group4.aldalka.domain.post.dto.response.OfficialPostDetailResponse;
import com.group4.aldalka.domain.post.dto.response.PagedResponse;
import com.group4.aldalka.domain.post.dto.response.PostResponse;
import com.group4.aldalka.domain.post.entity.Post;
import com.group4.aldalka.domain.post.repository.PostRepository;
import com.group4.aldalka.domain.post.repository.UserLikeRepository;
import com.group4.aldalka.domain.user.service.UserService;
import com.group4.aldalka.global.error.ErrorCode;
import com.group4.aldalka.global.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;
    private final UserLikeRepository userLikeRepository;
    private final UserService userService;

    public PagedResponse searchPosts(String userEmail, PostSearchRequest postSearchRequest) {

        Long userId = userService.getUserIdByEmail(userEmail);

        PostSearchResult result = postRepository.searchPosts(postSearchRequest);
        int pageSize = 8;
        int totalPages = Math.max(1, (int) Math.ceil((double) result.getTotalElements() / pageSize));

        return PagedResponse.<PostResponse> builder()
                .posts(mapToPostResponses(userId, result.getPosts()))
                .totalPages(totalPages)
                .totalElements(result.getTotalElements())
                .build();

    }

    private List<PostResponse> mapToPostResponses(Long userId, List<Post> posts) {
        return posts.stream()
                .map(post -> PostResponse.from(
                        post,
                        post.getLikes().size(),
                        userLikeRepository.existsByUserUserIdAndPostPostId(userId, post.getPostId())
                ))
                .collect(Collectors.toList());
    }

    public OfficialPostDetailResponse getOfficialPostDetail(String userEmail, Long postId) {

        Long userId = userService.getUserIdByEmail(userEmail);

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new BusinessException(ErrorCode.POST_NOT_FOUND));

        boolean isLiked = false;
        if (userId != null) isLiked = userLikeRepository.existsByUserUserIdAndPostPostId(userId, postId);

        int likeCount = post.getLikes().size();

        return buildOfficialPostDetailResponse(post, likeCount, isLiked);
    }

    private OfficialPostDetailResponse buildOfficialPostDetailResponse(Post post, int likeCount, boolean isLiked) {
        List<String> ingredients = post.getPostIndgredients().stream()
                .map(p -> p.getIngredient().getName())
                .toList();

        List<String> baseLiqueurs = post.getPostBaseLiquors().stream()
                .map(b -> b.getBaseLiquor().getName())
                .toList();

        return OfficialPostDetailResponse.builder()
                .postId(post.getPostId())
                .title(post.getTitle())
                .content(post.getContent())
                .recipe(post.getRecipe())
                .difficulty(post.getDifficulty())
                .isShaken(post.isShaken())
                .createdAt(post.getCreatedAt().toLocalDate())
                .likeCount(likeCount)
                .isLiked(isLiked)
                .imageUrl(post.getImageUrl())
                .baseLiqueurs(baseLiqueurs)
                .ingredients(ingredients)
                .build();
    }


    public PagedResponse getMypagePosts(String userEmail, MypagePostSearchRequest mypagePostSearchRequest) {

        Long userId = userService.getUserIdByEmail(userEmail);

        PostSearchResult posts = postRepository.findPostsByUserAndCondition(userId, mypagePostSearchRequest);

        int pageSize = 8;
        int totalPages = Math.max(1, (int) Math.ceil((double) posts.getTotalElements() / pageSize));

        return PagedResponse.<MypagePostResponse>builder()
                .totalElements(posts.getTotalElements())
                .totalPages(totalPages)
                .posts(mapToMypagePostResponses(userId, posts.getPosts()))
                .build();
    }

    private List<MypagePostResponse> mapToMypagePostResponses(Long userId, List<Post> posts) {
        return posts.stream()
                .map(post -> MypagePostResponse.builder()
                        .postId(post.getPostId())
                        .title(post.getTitle())
                        .likeCount(post.getLikes().size())
                        .isLiked(userLikeRepository.existsByUserUserIdAndPostPostId(userId, post.getPostId()))
                        .createdAt(post.getCreatedAt().toLocalDate())
                        .imageUrl(post.getImageUrl())
                        .build())
                .toList();
    }

}
