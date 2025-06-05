package com.group4.aldalka.domain.post.service;

import com.group4.aldalka.domain.post.dto.request.PostCreateRequestDTO;
import com.group4.aldalka.domain.post.dto.request.PostRequestDTO;
import com.group4.aldalka.domain.post.dto.response.PostResponseDTO;
import com.group4.aldalka.domain.post.dto.response.PostSelectResponseDTO;
import com.group4.aldalka.domain.post.repository.*;
import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.post.dto.PagedPostResponse;
import com.group4.aldalka.domain.post.dto.PostResponse;
import com.group4.aldalka.domain.post.dto.PostSearchRequest;
import com.group4.aldalka.domain.post.dto.PostSearchResult;
import com.group4.aldalka.domain.post.entity.*;
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
    private final PostBaseLiquorRepository postBaseLiquorRepository;
    private final PostIngredientRepository postIngredientRepository;
    private final BaseLiquorRepository baseLiquorRepository;
    private final IngredientRepository ingredientRepository;
    private final UserLikeRepository userLikeRepository;
    private final ImageService imageService;

    public PostRequestDTO createPost(PostCreateRequestDTO Request, User user) {
        // Request의 정보로 부터 Post 객체 생성
        Post post = Post.builder()
                .user(user)
                .title(Request.getTitle())
                .content(Request.getContent())
                .recipe(Request.getRecipe())
                .difficulty(Request.getDifficulty())
                .isShaken(Request.isShaken())
                .isOfficial(Request.isOfficial())
                .imageUrl(Request.getImageUrl())
                .build();

        // Post 생성
        Post saved = postRepository.save(post);

        // Ingredient List를 추출 하여 PostIngredient 생성
        for (String ingredientName : Request.getIngredients()) {
            Ingredient ingredient = ingredientRepository.findByName(ingredientName)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid ingredient name: " + ingredientName));
            PostIngredient postIngredient = PostIngredient.builder()
                    .ingredient(ingredient)
                    .post(saved)
                    .build();
            postIngredientRepository.save(postIngredient);
            post.getPostIngredients().add(postIngredient);
        }
        // BaseLiquor List를 추출 하여 PostBaseLiquor 생성
        for (String baseLiquorName : Request.getBaseLiquors()) {
            BaseLiquor baseLiquor = baseLiquorRepository.findByName(baseLiquorName)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 베이스 주: " + baseLiquorName));

            PostBaseLiquor postBaseLiquor = PostBaseLiquor.builder()
                    .baseLiquor(baseLiquor)
                    .post(saved)
                    .build();

            postBaseLiquorRepository.save(postBaseLiquor);
            post.getPostBaseLiquors().add(postBaseLiquor);
        }

        // Request Return을 위해 Ingredient, BaseLiquor List를 다시 구성
        List<String> ingredientNames = saved.getPostIngredients().stream()
                .map(pi -> pi.getIngredient().getName())
                .toList();

        List<String> baseLiquorNames = saved.getPostBaseLiquors().stream()
                .map(pi -> pi.getBaseLiquor().getName())
                .toList();

        return new PostRequestDTO(saved.getPostId(), saved.getTitle(), saved.getContent()
                , saved.getRecipe(), saved.isShaken(), saved.getDifficulty()
                , saved.isOfficial(), saved.getImageUrl(), ingredientNames, baseLiquorNames);

    }

    @Transactional(readOnly = true)
    public PostSelectResponseDTO selectPost(Long postId) {
        // postId 존재 여부 검사(기존 Controller 에서 Service 로 이동)
        Post post = postRepository.findById(postId)
                .orElseThrow();

        // 작성자 정보 추출
        User author = post.getUser();

        // 연관된 PostIngredient 엔티티들로부터 Ingredient 이름만 추출
        List<String> ingredientNames = post.getPostIngredients()
                .stream()
                .map(pi -> pi.getIngredient().getName())
                .toList();

        // 연관된 PostBaseLiquor 엔티티들로부터 BaseLiquor 이름만 추출
        List<String> baseLiquorNames = post.getPostBaseLiquors()
                .stream()
                .map(pl -> pl.getBaseLiquor().getName())
                .toList();

        // like_count 테이블에서 해당 post와 연관된 행을 가져와 개수 저장
        int likeCount = post.getLikes().size();

        // DTO 빌드 후 리턴
        return PostSelectResponseDTO.builder()
                .postId(post.getPostId())
                .title(post.getTitle())
                .content(post.getContent())
                .recipe(post.getRecipe())
                .difficulty(post.getDifficulty())
                .isShaken(post.isShaken())
                .isOfficial(post.isOfficial())
                .imageUrl(post.getImageUrl())
                .userName(author.getUsername())
                .likeCount(likeCount)
                .ingredients(ingredientNames)
                .baseLiquors(baseLiquorNames).build();
    }

    @Transactional
    public PostResponseDTO updatePost(PostRequestDTO requestDTO, Long postId) {

        Post postEntity = postRepository.findById(postId).orElse(null);

        // 새 Post 객체를 빌더로 생성 (기존 postId, user만 복사하고, 나머지는 requestDTO에서 가져옴)
        Post newPost = Post.builder()
                .postId(postEntity.getPostId())
                .user(postEntity.getUser())
                .title(requestDTO.getTitle())
                .content(requestDTO.getContent())
                .recipe(requestDTO.getRecipe())
                .difficulty(requestDTO.getDifficulty())
                .isShaken(requestDTO.isShaken())
                .isOfficial(requestDTO.isOfficial())
                .imageUrl(requestDTO.getImageUrl())
                .build();

        // 원본 연관 PostIngredient, PostBaseLiquor 모두 삭제
        // (cascade=ALL, orphanRemoval=true가 붙어 있어도 명시적으로 삭제)
        postIngredientRepository.deleteAll(postEntity.getPostIngredients());
        postEntity.getPostIngredients().clear();

        postBaseLiquorRepository.deleteAll(postEntity.getPostBaseLiquors());
        postEntity.getPostBaseLiquors().clear();

        // 요청 DTO에 담긴 재료 이름 리스트를 순회하며, 새 PostIngredient 생성 → newPost 에 연관
        List<String> newIngredients = requestDTO.getIngredients();
        if (newIngredients != null) {
            for (String ingName : newIngredients) {
                Ingredient ingredient = ingredientRepository.findByName(ingName)
                        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 재료: " + ingName));

                PostIngredient pi = PostIngredient.builder()
                        .ingredient(ingredient)
                        .post(newPost)
                        .build();

                postIngredientRepository.save(pi);
                newPost.getPostIngredients().add(pi);
            }
        }

        //요청 DTO에 담긴 베이스 주류 이름 리스트를 순회하며, 새 PostBaseLiquor 생성 → newPost 에 연관
        List<String> newBaseLiquors = requestDTO.getBaseLiquors();
        if (newBaseLiquors != null) {
            for (String blName : newBaseLiquors) {
                BaseLiquor baseLiquor = baseLiquorRepository.findByName(blName)
                        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 베이스 주류: " + blName));

                PostBaseLiquor pbl = PostBaseLiquor.builder()
                        .baseLiquor(baseLiquor)
                        .post(newPost)      // 연관 대상은 newPost
                        .build();
                postBaseLiquorRepository.save(pbl);
                newPost.getPostBaseLiquors().add(pbl);
            }
        }
        // newPost를 save() → 기존 same ID 레코드를 merge(UPDATE), 새 관계들 저장
        Post updated = postRepository.save(newPost);
        // 최종 결과를 DTO로 변환하여 반환
        List<String> ingredientNames = updated.getPostIngredients().stream()
                .map(pi -> pi.getIngredient().getName())
                .collect(Collectors.toList());

        List<String> baseLiquorNames = updated.getPostBaseLiquors().stream()
                .map(pbl -> pbl.getBaseLiquor().getName())
                .collect(Collectors.toList());


        return PostResponseDTO.builder()
                .postId(updated.getPostId())
                .title(updated.getTitle())
                .content(updated.getContent())
                .recipe(updated.getRecipe())
                .difficulty(updated.getDifficulty())
                .isShaken(updated.isShaken())
                .isOfficial(updated.isOfficial())
                .imageUrl(updated.getImageUrl())
                .userId(updated.getUser().getUserId())
                .ingredients(ingredientNames)
                .baseLiquors(baseLiquorNames)
                .build();
    }

    public void deletePost(Long postId) {
        // 게시글 존재 여부 조회
        Post post = postRepository.findById(postId)
                .orElseThrow();

        // 엔티티에 이미지 키(imageKey)를 저장했다고 가정
        String imageKey = post.getImageUrl();
        if (imageKey != null && !imageKey.isBlank()) {
            imageService.deleteImage(post.getImageUrl());
        }

        // DB에서 게시글 삭제
        postRepository.delete(post);
    }

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

}
