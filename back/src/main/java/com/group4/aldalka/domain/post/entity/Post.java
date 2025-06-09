package com.group4.aldalka.domain.post.entity;

import com.group4.aldalka.domain.BaseEntity;
import com.group4.aldalka.domain.user.User;
import jakarta.persistence.*;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "post")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 380)
    private String title;

    @Column(nullable = false, length = 2200)
    private String content;

    @Column(length = 2200)
    private String recipe;

    @Column(nullable = false)
    private int difficulty;

    @Column(name = "is_shaken", nullable = false)
    private boolean isShaken;

    @Column(name = "is_official", nullable = false)
    private boolean isOfficial;

    @Column(name = "image_url", length = 2083)
    private String imageUrl;

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<PostIngredient> postIngredients = new ArrayList<PostIngredient>();

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<UserLike> likes = new ArrayList<UserLike>();

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<PostBaseLiquor> postBaseLiquors = new ArrayList<PostBaseLiquor>();
}
