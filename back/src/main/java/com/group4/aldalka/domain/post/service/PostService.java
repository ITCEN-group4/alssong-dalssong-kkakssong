package com.group4.aldalka.domain.post.service;

import com.group4.aldalka.domain.post.dto.OfficialPostDetailResponse;
import com.group4.aldalka.domain.post.dto.request.MypagePostSearchRequest;
import com.group4.aldalka.domain.post.dto.request.PostSearchRequest;
import com.group4.aldalka.domain.post.dto.PostSearchResult;
import com.group4.aldalka.domain.post.entity.*;
import com.group4.aldalka.domain.post.dto.request.*;
import com.group4.aldalka.domain.post.dto.response.*;
import com.group4.aldalka.domain.post.repository.*;
import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.post.entity.Post;
import com.group4.aldalka.domain.post.repository.PostRepository;
import com.group4.aldalka.domain.post.repository.UserLikeRepository;
import com.group4.aldalka.domain.user.repository.UserRepository;
import com.group4.aldalka.global.error.ErrorCode;
import com.group4.aldalka.global.error.exception.BusinessException;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostBaseLiquorRepository postBaseLiquorRepository;
    private final PostIngredientRepository postIngredientRepository;
    private final BaseLiquorRepository baseLiquorRepository;
    private final IngredientRepository ingredientRepository;
    private final UserRepository userRepository;
    private final UserLikeRepository userLikeRepository;
    private final ImageService imageService;

    @Autowired
    private EntityManager em;

    public PostRequestDTO createPost(PostCreateRequestDTO Request, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();

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
                .userNickname(author.getNickname())
                .likeCount(likeCount)
                .createdAt(LocalDate.from(post.getCreatedAt()))
                .updatedAt(LocalDate.from(post.getUpdatedAt()))
                .ingredients(ingredientNames)
                .baseLiquors(baseLiquorNames).build();
    }

    @Transactional
    public PostResponseDTO updatePost(PostRequestDTO dto, Long postId) {

        Post post = postRepository.findById(postId)
                .orElseThrow(null);

        // 2) 필드 덮어쓰기
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setRecipe(dto.getRecipe());
        post.setDifficulty(dto.getDifficulty());
        post.setShaken(dto.isShaken());
        post.setOfficial(dto.isOfficial());
        post.setImageUrl(dto.getImageUrl());

        // 3) 자식(PostIngredient) 완전 삭제
        postIngredientRepository.deleteByPostId(postId);  // @Modifying @Query 로 직접 삭제
        postBaseLiquorRepository.deleteByPostId(postId);
        em.flush();  // ★ 여기서 DELETE 쿼리를 DB에 바로 실행

        // 4) 재삽입
        if (dto.getIngredients() != null) {
            for (String name : dto.getIngredients().stream().distinct().toList()) {
                Ingredient ing = ingredientRepository.findByName(name)
                        .orElseThrow();
                PostIngredient pi = PostIngredient.builder()
                        .post(post)
                        .ingredient(ing)
                        .build();
                post.getPostIngredients().add(pi);
            }
        }
        // 베이스 주류도 동일…
        if (dto.getBaseLiquors() != null) {
            for (String name : dto.getBaseLiquors()) {
                BaseLiquor bl = baseLiquorRepository.findByName(name)
                        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 주류: " + name));
                PostBaseLiquor pbl = PostBaseLiquor.builder()
                        .post(post)
                        .baseLiquor(bl)
                        .build();
                post.getPostBaseLiquors().add(pbl);
            }
        }
        // 5) 트랜잭션 커밋 시 INSERT가 실행

        List<String> ingNames = post.getPostIngredients().stream()
                .map(pi -> pi.getIngredient().getName())
                .toList();
        List<String> baseNames = post.getPostBaseLiquors().stream()
                .map(pb -> pb.getBaseLiquor().getName())
                .toList();

        return PostResponseDTO.builder()
                .postId(post.getPostId())
                .title(post.getTitle())
                .content(post.getContent())
                .recipe(post.getRecipe())
                .difficulty(post.getDifficulty())
                .isShaken(post.isShaken())
                .isOfficial(post.isOfficial())
                .imageUrl(post.getImageUrl())
                .userId(post.getUser().getUserId())
                .ingredients(ingNames)
                .baseLiquors(baseNames)
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
        List<String> ingredients = post.getPostIngredients().stream()
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
