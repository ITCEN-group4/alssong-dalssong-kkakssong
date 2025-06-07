package com.group4.aldalka.domain.user;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.group4.aldalka.domain.post.entity.UserLike;
import com.group4.aldalka.domain.post.entity.Post;
import jakarta.persistence.*;

import com.group4.aldalka.domain.BaseEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@AllArgsConstructor
@Table(name = "`user`")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<UserLike> likes = new ArrayList<UserLike>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Post> posts = new ArrayList<Post>();

    public User(String email, String password, UserRole userRole) {
        this.email = email;
        this.password = password;
        this.userRole = userRole;
    }

    public User(String email, String nickname, String password, UserRole userRole, ZonedDateTime createdAt) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.userRole = userRole;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(userId, user.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(userId);
    }

    public void updateNickname(String nickname) {
        if (nickname == null || nickname.isBlank()) {
            throw new IllegalArgumentException("닉네임은 공백일 수 없습니다.");
        }
        this.nickname = nickname;
    }

    public void updatePassword(String encode) {
        if (encode == null || encode.isBlank()) {
            throw new IllegalArgumentException("비밀번호는 공백일 수 없습니다.");
        }
        this.password = encode;
    }
}
