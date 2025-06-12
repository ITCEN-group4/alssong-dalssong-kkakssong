package com.group4.aldalka.domain.post.controller;

import com.group4.aldalka.domain.post.dto.response.PagedResponse;
import com.group4.aldalka.domain.post.dto.response.PostResponse;
import com.group4.aldalka.domain.post.entity.*;
import com.group4.aldalka.domain.post.repository.*;
import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.UserRole;
import com.group4.aldalka.domain.user.dto.response.LoginResponse;
import com.group4.aldalka.domain.user.repository.UserRepository;
import com.group4.aldalka.domain.user.service.AuthService;
import com.group4.aldalka.domain.user.service.JwtProvider;
import com.group4.aldalka.domain.user.service.PasswordEncoder;
import com.group4.aldalka.global.result.ResultResponse;

import com.group4.aldalka.global.security.JJwtProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "classpath:application.yml")
class PostControllerTest {

    @LocalServerPort
    private int port;

    private String baseUrl;
    private RestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private IngredientRepository ingredientRepository;
    @Autowired
    private BaseLiquorRepository baseLiquorRepository;

    @Autowired
    private PostBaseLiquorRepository postBaseLiquorRepository;

    @Autowired
    private PostIngredientRepository postIngredientRepository;

    // 테스트 데이터
    private Ingredient fruitJuice;
    private Ingredient soda;
    private Ingredient etc;
    private BaseLiquor rum;
    private BaseLiquor gin;
    private BaseLiquor vodka;

    // 다양한 Post 엔티티
    private Post officialJuiceSodaRumPost;
    private Post unofficialUnshakenGinPost;
    private Post officialVodkaJuicePost;
    private Post officialEtcPost;

    private String email;
    private String nickname;
    private String rawPassword;
    private User savedUser;
    private AuthService authService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    private JwtProvider jwtProvider =
            new JJwtProvider("test", 3600, "thisisjusttestaccesssecretsodontworry");

    private String accessToken;

    @Nested
    class WithBasePost {
        @BeforeEach
        void setUp() {
            clearAllData();
            setupWithBaseUser();
            setupWithBasePost();
        }

        @Test
        @DisplayName("0. 로그인하지 않은 비회원의 경우")
        void searchPostsAsGuestTest() throws Exception {

            String requestJson = """
                    {
                    }
                    """;

            HttpEntity<String> httpEntity = createHttpRequestWithoutToken(requestJson);

            // when
            ResultResponse<PagedResponse<PostResponse>> resultResponse = sendPostRequest(baseUrl, httpEntity);
            PagedResponse<PostResponse> response = resultResponse.getData();


            // then
            assertThat(resultResponse.getStatus()).isEqualTo(200);
            assertThat(response.getTotalElements()).isEqualTo(3);
            assertThat(response.getPosts()).hasSize(3);
        }


        @Test
        @DisplayName("1. 아무 파라미터가 없을 때 (기본 검색)")
        void searchPostsNoParameters() throws Exception {
            // given: 빈 JSON 객체 (모든 파라미터가 기본값으로 설정될 것임)
            String requestJson = "{}";
            HttpEntity<String> httpEntity = createHttpRequest(requestJson);

            // when
            ResultResponse<PagedResponse<PostResponse>> resultResponse = sendPostRequest(baseUrl, httpEntity);
            PagedResponse<PostResponse> response = resultResponse.getData();


            // then
            assertThat(resultResponse.getStatus()).isEqualTo(200);
            assertThat(resultResponse.getData()).isNotNull();
            // 기본값: isOfficial=true, page=1, sort="like"
            // 모든 공식 게시글이 반환될 것으로 예상

            assertThat(response.getTotalElements()).isEqualTo(3);
            assertThat(response.getTotalPages()).isEqualTo(1);
            assertThat(response.getPosts().size()).isEqualTo(3);

            List<PostResponse> posts = response.getPosts();

            // 모든 제목을 하나의 리스트로 추출
            List<String> titles = posts.stream()
                    .map(PostResponse::getTitle)
                    .collect(Collectors.toList());

            assertThat(titles).anyMatch(title -> title.contains("모히또"));
            assertThat(titles).anyMatch(title -> title.contains("보드카 라임"));
            assertThat(titles).anyMatch(title -> title.contains("과일주스 칵테일"));

        }

        @Test
        @DisplayName("2. 공식/유저 포스트 구별 - is_official=false인 경우")
        void searchPostsIsOfficialParamTest() throws Exception {
            // given: isOfficial=false 파라미터를 포함한 요청 JSON
            String requestJson = """
                    {
                        "is_official": false
                    }
                    """;

            HttpEntity<String> httpEntity = createHttpRequest(requestJson);

            // when
            ResultResponse<PagedResponse<PostResponse>> resultResponse = sendPostRequest(baseUrl, httpEntity);
            PagedResponse<PostResponse> response = resultResponse.getData();

            // then
            assertThat(resultResponse.getStatus()).isEqualTo(200);
            assertThat(response.getTotalElements()).isEqualTo(1);
            assertThat(response.getPosts()).hasSize(1);
            assertThat(response.getPosts().get(0).getTitle()).isEqualTo("진토닉");
        }


    }

    @Nested
    class WithoutBasePost {

        @BeforeEach
        void setupWithoutBasePost() {
            clearAllData();
            setupWithBaseUser();
        }

        @Test
        @DisplayName("3. 페이지네이션 테스트 - page =2 인 경우")
        void searchPostsPageParamTest() throws Exception {

            for (int i = 1; i <= 10; i++) {
                Post post = Post.builder()
                        .title("Test Post " + i)
                        .content("Content " + i)
                        .isOfficial(true)
                        .difficulty(1)
                        .user(savedUser)
                        .build();
                postRepository.save(post);
            }

            // given: page=1 (두 번째 페이지 요청)
            String requestJson = """
                    {
                        "page": 2
                    }
                    """;

            HttpEntity<String> httpEntity = createHttpRequest(requestJson);

            // when
            ResultResponse<PagedResponse<PostResponse>> resultResponse = sendPostRequest(baseUrl, httpEntity);
            PagedResponse<PostResponse> response = resultResponse.getData();

            // then
            assertThat(resultResponse.getStatus()).isEqualTo(200);
            assertThat(response.getTotalElements()).isEqualTo(10);
            assertThat(response.getPosts()).hasSize(2);
        }

        @Test
        @DisplayName("13. 정렬 테스트 - sort= new인 경우")
        void searchPosts_sortParamTest() throws Exception {

            for (int i = 0; i < 8; i++) {
                Post post = Post.builder()
                        .title(String.valueOf(i))
                        .content("Content " + i)
                        .isOfficial(true)
                        .difficulty(1)
                        .user(savedUser)
                        .build();

                postRepository.save(post);

                try {
                    Thread.sleep(1000);  // 1초 대기
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }

            // given: page=1 (두 번째 페이지 요청)
            String requestJson = """
                    {
                        "sort": "new"
                    }
                    """;

            HttpEntity<String> httpEntity = createHttpRequest(requestJson);

            // when
            ResultResponse<PagedResponse<PostResponse>> resultResponse = sendPostRequest(baseUrl, httpEntity);
            PagedResponse<PostResponse> response = resultResponse.getData();

            // then
            assertThat(resultResponse.getStatus()).isEqualTo(200);

            List<PostResponse> posts = response.getPosts();
            for (int i = 0; i < posts.size() - 1; i++) {
                Long currentId = posts.get(i).getPostId();
                Long nextId = posts.get(i + 1).getPostId();
                assertThat(currentId).isGreaterThanOrEqualTo(nextId);

            }
        }
    }

    private void clearAllData() {
        postBaseLiquorRepository.deleteAllInBatch();
        postIngredientRepository.deleteAllInBatch();
        ingredientRepository.deleteAllInBatch(); // 모든 Ingredient 삭제
        baseLiquorRepository.deleteAllInBatch(); // 모든 BaseLiquor 삭제
        postRepository.deleteAllInBatch(); // 모든 Post 및 연관 엔티티 삭제
        userRepository.deleteAllInBatch(); // 모든 User 삭제

    }

    void setupWithBaseUser() {

        restTemplate = new RestTemplate();
        baseUrl = "http://localhost:" + port + "/api/v1/posts/search";

        // 1. User 생성 및 저장
        email = "test@gmail.com";
        nickname = "nickname";
        rawPassword = "test1234";
        String password = passwordEncoder.encode(rawPassword);
        UserRole userRole = UserRole.USER;
        savedUser = new User(email, nickname, password, userRole, ZonedDateTime.now());
        authService = new AuthService(userRepository, passwordEncoder, jwtProvider);

        userRepository.save(savedUser);

        LoginResponse loginResponse = authService.login(email, rawPassword);
        accessToken = loginResponse.getAccessToken();
    }

    void setupWithBasePost() {

        // Ingredients 및 BaseLiquors 생성 및 저장
        fruitJuice = Ingredient.builder().name("과일주스").build();
        soda = Ingredient.builder().name("탄산음료").build();
        etc = Ingredient.builder().name("기타").build();
        ingredientRepository.saveAll(Arrays.asList(fruitJuice, soda, etc));

        rum = BaseLiquor.builder().name("럼").build();
        gin = BaseLiquor.builder().name("진").build();
        vodka = BaseLiquor.builder().name("보드카").build();
        baseLiquorRepository.saveAll(Arrays.asList(rum, gin, vodka));

        // 다양한 Post 생성 및 저장
        // Post 1: 모히또 (official, shaken, 과일주스, 탄산음료, 럼, difficulty 2)
        officialJuiceSodaRumPost = Post.builder()
                .title("모히또")
                .content("청량한 레시피")
                .recipe("럼, 라임, 탄산수, 민트")
                .isOfficial(true)
                .isShaken(true)
                .difficulty(2)
                .user(savedUser)
                .build();
        // 연관 엔티티 추가 (CascadeType.ALL과 편의 메서드가 있다고 가정)
        officialJuiceSodaRumPost.addPostIngredient(PostIngredient.builder().ingredient(fruitJuice).build());
        officialJuiceSodaRumPost.addPostIngredient(PostIngredient.builder().ingredient(soda).build());
        officialJuiceSodaRumPost.addPostBaseLiquor(PostBaseLiquor.builder().baseLiquor(rum).build());
        postRepository.save(officialJuiceSodaRumPost);

        // Post 2: 진토닉 (unofficial, unshaken, 진, difficulty 0)
        unofficialUnshakenGinPost = Post.builder()
                .title("진토닉")
                .content("간단한 레시피")
                .recipe("진, 토닉워터")
                .isOfficial(false)
                .isShaken(false)
                .difficulty(0)
                .user(savedUser)
                .build();
        unofficialUnshakenGinPost.addPostBaseLiquor(PostBaseLiquor.builder().baseLiquor(gin).build());
        postRepository.save(unofficialUnshakenGinPost);

        // Post 3: 과일주스 칵테일  (과일주스, 보드카, difficulty 1)
        officialVodkaJuicePost = Post.builder()
                .title("과일주스 칵테일")
                .content("상큼한 칵테일")
                .recipe("과일주스, 보드카")
                .isOfficial(true)
                .isShaken(false)
                .difficulty(1)
                .user(savedUser)
                .build();
        officialVodkaJuicePost.addPostIngredient(PostIngredient.builder().ingredient(fruitJuice).build());
        officialVodkaJuicePost.addPostBaseLiquor(PostBaseLiquor.builder().baseLiquor(vodka).build());
        postRepository.save(officialVodkaJuicePost);

        // Post 4: 보드카 라임 (기타, difficulty 3)
        officialEtcPost = Post.builder()
                .title("보드카 라임")
                .content("강렬한 칵테일")
                .recipe("보드카, 라임주스, 설탕")
                .isOfficial(true)
                .isShaken(false)
                .difficulty(3)
                .user(savedUser)
                .build();

        officialEtcPost.addPostIngredient(PostIngredient.builder().ingredient(etc).build());
        postRepository.save(officialEtcPost);

    }

    private ResultResponse<PagedResponse<PostResponse>> sendPostRequest(
            String url,
            HttpEntity<?> httpEntity
    ) {
        ResponseEntity<ResultResponse<PagedResponse<PostResponse>>> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.POST,
                httpEntity,
                new ParameterizedTypeReference<>() {}
        );
        return responseEntity.getBody();
    }


    // AccessToken을 Authorization 헤더에 추가하는 헬퍼 메서드
    private HttpEntity<String> createHttpRequest(String jsonBody) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        if (accessToken != null) {
            headers.setBearerAuth(accessToken); // Bearer 토큰 형식으로 추가
        }
        return new HttpEntity<>(jsonBody, headers);
    }
    private HttpEntity<String> createHttpRequestWithoutToken(String jsonBody) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new HttpEntity<>(jsonBody, headers);
    }


}