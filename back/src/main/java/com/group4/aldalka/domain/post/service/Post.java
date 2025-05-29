package com.group4.aldalka.domain.post.service;

import com.group4.aldalka.domain.BaseEntity;
import com.group4.aldalka.domain.user.User;
import jakarta.persistence.*;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Table(name = "post")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long post_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(columnDefinition = "TEXT")
    private String recipe;

    @Column(nullable = false)
    private int difficulty;

    @Column(name = "isShaken", nullable = false)
    private boolean isShaken;

    @Column(name = "likeCount", nullable = false)
    private int likeCount;

    @Column(name = "isOfficial", nullable = false)
    private boolean isOfficial;

    @Column(name = "imageUrl")
    private String imageUrl;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostIngredient> postIndgredients = new ArrayList<PostIngredient>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserLike> likes = new ArrayList<UserLike>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostBaseLiquor> postBaseLiquors = new ArrayList<PostBaseLiquor>();
}
