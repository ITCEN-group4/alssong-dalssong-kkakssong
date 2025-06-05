package com.group4.aldalka.global.security;

import java.io.IOException;
import java.util.Objects;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.group4.aldalka.domain.user.dto.response.CustomClaims;
import com.group4.aldalka.domain.user.service.JwtProvider;
import com.group4.aldalka.global.error.ErrorCode;
import com.group4.aldalka.global.error.exception.BusinessException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class AuthenticationFilter extends OncePerRequestFilter {

    private static final String HEADER = "Authorization";
    private static final String BEARER = "Bearer ";

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        log.debug("[auth] JWT 인증 인터셉터 시작");
        String bearerAccessToken = request.getHeader(HEADER);
        if (Objects.nonNull(bearerAccessToken)) {
            log.debug("[auth] JWT 인증 프로세스 시작");
            String accessToken = removeBearer(bearerAccessToken);
            JwtAuthentication jwtAuthentication = authenticate(accessToken);
            UsernamePasswordAuthenticationToken authentication =
                    UsernamePasswordAuthenticationToken.authenticated(
                            jwtAuthentication.getPrincipal(),
                            accessToken,
                            jwtAuthentication.getAuthorities().stream()
                                    .map(SimpleGrantedAuthority::new)
                                    .toList());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.debug(
                    "[auth] JWT 인증 프로세스 종료. 사용자 인증됨. principal={}",
                    jwtAuthentication.getPrincipal());
        }
        log.debug("[auth] Jwt 인증 인터셉터 종료");
        filterChain.doFilter(request, response);
    }

    private String removeBearer(String bearerAccessToken) {
        // TODO: 새로운 ErrorCode 만들지 허가 받기 line 62
        if (bearerAccessToken.contains(BEARER)) {
            return bearerAccessToken.replace(BEARER, "");
        }
        throw new BusinessException(ErrorCode.FORBIDDEN_ERROR);
    }

    private JwtAuthentication authenticate(String accessToken) {
        CustomClaims customClaims = jwtProvider.parseAccessToken(accessToken);
        return new JwtAuthentication(
                customClaims.getEmail(), customClaims.getUserRole(), accessToken);
    }
}
