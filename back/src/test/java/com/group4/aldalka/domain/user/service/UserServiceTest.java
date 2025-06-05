package com.group4.aldalka.domain.user.service;

import com.group4.aldalka.domain.user.config.TestQueryDslConfig;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.UserRole;
import com.group4.aldalka.domain.user.dto.request.UserCreationRequest;
import com.group4.aldalka.domain.user.dto.response.CreateUserResponse;
import com.group4.aldalka.domain.user.repository.UserRepository;
import com.group4.aldalka.global.error.exception.BusinessException;
import org.springframework.context.annotation.Import;


@DataJpaTest
@Import(TestQueryDslConfig.class)
class UserServiceTest {

    private UserService userService;

    @Autowired private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

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
                        // 사용되지 않음
                    }
                };
        userService = new UserService(userRepository, passwordEncoder);
    }

    @Nested
    @DisplayName("사용자 생성 메서드 호출 시")
    class CreateUserTest {

        @Test
        @DisplayName("사용자를 생성한다.")
        void createUser() {
            // given
            String username = "username";
            String password = "password";
            UserCreationRequest request = new UserCreationRequest(username, password);

            // when
            CreateUserResponse response = userService.createUser(request);

            // then
            assertThat(userRepository.findById(response.getUserId()))
                    .isNotEmpty()
                    .get()
                    .satisfies(
                            user -> {
                                assertThat(user.getUsername()).isEqualTo(username);
                                assertThat(user.getPassword())
                                        .isEqualTo(passwordEncoder.encode(password));
                                assertThat(user.getUserRole()).isEqualTo(UserRole.USER);
                            });
        }

        @Test
        @DisplayName("예외(duplicateResource): 중복된 username을 가진 사용자가 있으면")
        void duplicateResource_WhenDuplicateUsername() {
            // given
            String duplicateUsername = "duplicate";
            String password = "password";
            User user =
                    User.builder()
                            .username(duplicateUsername)
                            .password(password)
                            .userRole(UserRole.USER)
                            .build();
            userRepository.save(user);

            UserCreationRequest request = new UserCreationRequest(duplicateUsername, password);

            // when
            Exception exception = catchException(() -> userService.createUser(request));

            // then
            assertThat(exception)
                    .isInstanceOf(BusinessException.class);
        }
    }
}
