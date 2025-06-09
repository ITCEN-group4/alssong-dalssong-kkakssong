package com.group4.aldalka.domain.user.service;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchException;

import java.time.ZonedDateTime;
import java.util.NoSuchElementException;

import com.group4.aldalka.domain.user.config.TestQueryDslConfig;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.UserRole;
import com.group4.aldalka.domain.user.dto.response.LoginResponse;
import com.group4.aldalka.domain.user.repository.UserRepository;
import com.group4.aldalka.global.security.JJwtProvider;


@DataJpaTest
@Import(TestQueryDslConfig.class)
class AuthServiceTest {

    @Autowired private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;
    private JwtProvider jwtProvider =
            new JJwtProvider("test", 3600, "thisisjusttestaccesssecretsodontworry");

    @BeforeEach
    void setUp() {
        passwordEncoder =
                new PasswordEncoder() {

                    @Override
                    public String encode(String rawPassword) {
                        return new StringBuilder(rawPassword).reverse().toString();
                    }

                    @Override
                    public void checkMatches(User user, String rawPassword) {
                        String encodedPassword = encode(rawPassword);
                        if (encodedPassword.equals(user.getPassword())) {
                            return;
                        }
                        throw new NoSuchElementException("이메일/패스워드가 일치하지 않습니다.");
                    }
                };
    }

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
    }

    @Nested
    @DisplayName("로그인 메서드 호출 시")
    class LoginTest {

        private String email;
        private String nickname;
        private String rawPassword;
        private User savedUser;
        private AuthService authService;

        @BeforeEach
        void setUp() {
            email = "test@gmail.com";
            nickname = "nickname";
            rawPassword = "test1234";
            String password = passwordEncoder.encode(rawPassword);
            UserRole userRole = UserRole.USER;
            savedUser = new User(email, nickname, password, userRole, ZonedDateTime.now());
            authService = new AuthService(userRepository, passwordEncoder, jwtProvider);
        }

        @AfterEach
        void afterEach() {
            userRepository.deleteAll();
        }

        @Test
        @DisplayName("액세스 토큰과 회원 ID를 반환한다.")
        void login() {
            // given
            userRepository.save(savedUser);

            // when
            LoginResponse response = authService.login(email, rawPassword);

            // then
            assertThat(response.getAccessToken()).isNotBlank();
            assertThat(response.getUserId()).isEqualTo(savedUser.getUserId());
        }


        @Test
        @DisplayName("예외(noSuchElement): 사용자의 비밀번호와 일치하지 않으면")
        void noSuchElement_WhenPasswordIsNotMatches() {
            // given
            String wrongPassword = "wrongPassword";
            userRepository.save(savedUser);

            // when
            Exception exception = catchException(() -> authService.login(email, wrongPassword));

            // then
            assertThat(exception).isInstanceOf(NoSuchElementException.class);
        }
    }
}
