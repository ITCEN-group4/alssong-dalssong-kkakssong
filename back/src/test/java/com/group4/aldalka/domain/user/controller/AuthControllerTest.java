package com.group4.aldalka.domain.user.controller;

import java.time.ZonedDateTime;
import java.util.NoSuchElementException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.UserRole;
import com.group4.aldalka.domain.user.dto.request.LoginRequest;
import com.group4.aldalka.domain.user.dto.response.LoginResponse;
import com.group4.aldalka.domain.user.repository.UserRepository;
import com.group4.aldalka.domain.user.service.AuthService;
import com.group4.aldalka.domain.user.service.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthControllerTest {

    @LocalServerPort
    private int port;

    private String baseUrl;

    private RestTemplate restTemplate;

    private String username;
    private String rawPassword;
    private User savedUser;

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public class BCryptPasswordEncoder implements PasswordEncoder {

        private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder =
                new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();

        @Override
        public String encode(String rawPassword) {
            return passwordEncoder.encode(rawPassword);
        }

        @Override
        public void checkMatches(User user, String rawPassword) {
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return;
            }
            throw new NoSuchElementException("아이디/패스워드가 일치하지 않습니다.");
        }
    }


    @BeforeEach
    void setUp() {
        restTemplate = new RestTemplate();
        baseUrl = "http://localhost:" + port + "/api/v1/login";

        username = "test";
        rawPassword = "test1234";
        String password = passwordEncoder.encode(rawPassword);
        UserRole userRole = UserRole.USER;
        savedUser = new User(username, password, userRole, ZonedDateTime.now());
        userRepository.saveAndFlush(savedUser);
    }

    @Test
    @DisplayName("로그인 API 호출 시 RestTemplate 테스트")
    void login() {
        // given
        LoginRequest request = new LoginRequest("test", "test1234");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<LoginRequest> httpEntity = new HttpEntity<>(request, headers);

        // when
        ResponseEntity<LoginResponse> responseEntity =
                restTemplate.postForEntity(baseUrl, httpEntity, LoginResponse.class);

        // then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isNotNull();

        LoginResponse response = responseEntity.getBody();
        System.out.println("userId: " + response.getUserId());
        System.out.println("accessToken: " + response.getAccessToken());
    }
}
