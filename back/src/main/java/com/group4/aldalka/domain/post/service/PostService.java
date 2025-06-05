package com.group4.aldalka.domain.post.service;

import com.group4.aldalka.domain.post.dto.*;
import com.group4.aldalka.domain.post.entity.Post;
import com.group4.aldalka.domain.post.repository.PostRepository;
import com.group4.aldalka.domain.post.repository.UserLikeRepository;
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

    public PagedPostResponse searchPosts(String userId, PostSearchRequest postSearchRequest) {

        PostSearchResult result = postRepository.searchPosts(postSearchRequest);
        int pageSize = 8;
        int totalPages = Math.max(1, (int) Math.ceil((double) result.getTotalElements() / pageSize));


        return PagedPostResponse.builder()
                .posts(getPostsWithLikeInfo(userId, result.getPosts()))
                .totalPages(totalPages)
                .totalElements(result.getTotalElements())
                .build();

    }

    public List<PostResponse> getPostsWithLikeInfo(String userId, List<Post> posts) {
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

    public OfficialPostDetailResponse getOfficialPostDetail(String userId, Long postId) {











    }
}
