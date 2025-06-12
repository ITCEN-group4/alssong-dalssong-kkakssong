package com.group4.aldalka.global.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import com.group4.aldalka.ResolverTestController;
import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.UserRole;
import com.group4.aldalka.domain.user.service.JwtProvider;
import com.group4.aldalka.global.config.SecurityConfig;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ResolverTestController.class)
@Import({SecurityConfig.class})
class LoginUserArgumentResolverTest {

    @Nested
    @DisplayName("핸들러 메서드 파라미터에 @LoginMember가 포함되어 있으면")
    class ParameterHasLoginMember {

        private User admin;
        private String adminBearerToken;

        @Autowired
        private JwtProvider jwtProvider;
        private MockMvc mockMvc;

        private static final String AUTHORIZATION_HEADER = "Authorization";

        @BeforeEach
        void setUp(
                WebApplicationContext applicationContext
        ) {
            this.mockMvc =
                    MockMvcBuilders.webAppContextSetup(applicationContext)
                            .alwaysDo(print())
                            .apply(springSecurity())
                            .addFilter(new CharacterEncodingFilter("UTF-8", true))
                            .build();
            admin = new User("admin@admin.com", "admin", "password", UserRole.ADMIN);
            adminBearerToken = "Bearer " + jwtProvider.createAccessToken(admin);
        }

        @Test
        @DisplayName("인증 컨텍스트에서 사용자 이메일을 꺼내온다.")
        void getLoginMemberEmail() throws Exception {
            // given

            // when
            ResultActions result =
                    mockMvc.perform(
                            get("/api/test/resolver")
                                    .header(AUTHORIZATION_HEADER, adminBearerToken));

            // then
            result.andExpect(status().isOk())
                    .andExpect(MockMvcResultMatchers.jsonPath("$").value(admin.getEmail()));
        }
    }
}
