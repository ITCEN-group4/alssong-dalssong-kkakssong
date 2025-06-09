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
import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final UserLikeRepository userLikeRepository;

    public PagedResponse searchPosts(String userEmail, PostSearchRequest postSearchRequest) {

        PostSearchResult result = postRepository.searchPosts(postSearchRequest);
        int pageSize = 8;
        int totalPages = Math.max(1, (int) Math.ceil((double) result.getTotalElements() / pageSize));

        Long userId = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXISTS))
                .getUserId();

        return PagedResponse.<PostResponse> builder()
                .posts(getPostsWithLikeInfo(userId, result.getPosts()))
                .totalPages(totalPages)
                .totalElements(result.getTotalElements())
                .build();

    }

    public List<PostResponse> getPostsWithLikeInfo(Long userId, List<Post> posts) {
        List<Long> postIds = posts.stream().map(Post::getPostId).collect(Collectors.toList());

        // 쿼리 1: 특정 유저가 좋아요 누른 포스트 목록
        List<Long> likedPostIds = userId == null
                ? Collections.emptyList() //userId가 null이면 isLiked는 항상 false임
                : userLikeRepository.findLikedPostIdsByUserIdAndPostIds(userId, postIds);

        Set<Long> likedSet = new HashSet<>(likedPostIds);

        // 쿼리 2: 각 포스트의 좋아요 수
        List<UserLikeRepository.LikeCountProjection> likeCounts = userLikeRepository.countLikesByPostIds(postIds);
        Map<Long, Long> likeCountMap = likeCounts.stream()
                .collect(Collectors.toMap(UserLikeRepository.LikeCountProjection::getPostId, UserLikeRepository.LikeCountProjection::getCount));

        return mapToPostResponses(posts, likeCountMap, likedSet);
    }

    private List<PostResponse> mapToPostResponses(List<Post> posts, Map<Long, Long> likeCountMap, Set<Long> likedSet) {
        return posts.stream()
                .map(post -> PostResponse.from(
                        post,
                        likeCountMap.getOrDefault(post.getPostId(), 0L).intValue(),
                        likedSet.contains(post.getPostId())
                ))
                .collect(Collectors.toList());
    }

    public OfficialPostDetailResponse getOfficialPostDetail(String userEmail, Long postId) {

        Long userId = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXISTS))
                .getUserId();

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
        Long userId = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXISTS)).getUserId();

        PostSearchResult posts = postRepository.findPostsByUserAndCondition(userId, mypagePostSearchRequest);
        List<Long> likedPostIds = userLikeRepository.findLikedPostIdsByUserIdAndPostIds(
                userId,
                posts.getPosts().stream()
                        .map(Post::getPostId)
                        .collect(Collectors.toList())
        );


        Set<Long> likedPostIdSet = new HashSet<>(likedPostIds);

        PostSearchResult result = postRepository.findPostsByUserAndCondition(userId, mypagePostSearchRequest);
        int pageSize = 8;
        int totalPages = Math.max(1, (int) Math.ceil((double) result.getTotalElements() / pageSize));

        return PagedResponse.<MypagePostResponse>builder()
                .totalElements(result.getTotalElements())
                .totalPages(totalPages)
                .posts(mapToMypagePostResponses(posts.getPosts(), likedPostIdSet))
                .build();
    }

    private List<MypagePostResponse> mapToMypagePostResponses(List<Post> posts, Set<Long> likedPostIdSet) {
        return posts.stream()
                .map(post -> MypagePostResponse.builder()
                        .postId(post.getPostId())
                        .title(post.getTitle())
                        .likeCount(post.getLikes().size())
                        .isLiked(likedPostIdSet.contains(post.getPostId()))
                        .createdAt(post.getCreatedAt().toLocalDate())
                        .imageUrl(post.getImageUrl())
                        .build())
                .toList();
    }

}
