package com.group4.aldalka.global.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;

import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.UserRole;
import com.group4.aldalka.domain.user.dto.response.CustomClaims;
import com.group4.aldalka.domain.user.service.JwtProvider;
import com.group4.aldalka.global.error.ErrorCode;
import com.group4.aldalka.global.error.exception.BusinessException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JJwtProvider implements JwtProvider {

    private static final String ROLE = "role";

    private final String issuer;
    private final int expirySeconds;
    private final SecretKey secretKey;
    private final JwtParser accessTokenParser;

    public JJwtProvider(String issuer, int expirySeconds, String secret) {
        this.issuer = issuer;
        this.expirySeconds = expirySeconds;
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenParser = Jwts.parser().verifyWith(secretKey).build();
    }

    @Override
    public CustomClaims parseAccessToken(String accessToken) {
        try {
            Claims payload = accessTokenParser.parseSignedClaims(accessToken).getPayload();
            String username = payload.getSubject();
            UserRole userRole = UserRole.find(payload.get(ROLE, String.class));
            return new CustomClaims(username, userRole);
        } catch (ExpiredJwtException e) {
            // TODO: 새로운 ErrorCode 정의 필요. EXPIRED_TOKEN으로 하는게?
            throw new BusinessException(ErrorCode.FORBIDDEN_ERROR);
        } catch (RuntimeException e) {
            log.debug("액세스 토큰이 유효하지 않습니다. token={}", accessToken);
            // TODO: 새로운 ErrorCode 정의 필요. Invalid_Token으로 하는게?
            throw new BusinessException(ErrorCode.INPUT_VALUE_INVALID);
        }
    }

    @Override
    public String createAccessToken(User user) {
        Date now = new Date();
        Date expiresAt = new Date(now.getTime() + expirySeconds * 1000L);
        return Jwts.builder()
                .issuer(issuer)
                .issuedAt(now)
                .subject(user.getUsername())
                .expiration(expiresAt)
                .claim(ROLE, user.getUserRole().getValue())
                .signWith(secretKey)
                .compact();
    }
}
