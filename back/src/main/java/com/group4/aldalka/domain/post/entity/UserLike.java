package com.group4.aldalka.domain.post.entity;

import com.group4.aldalka.domain.BaseEntity;
import com.group4.aldalka.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Table(name = "user_like")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class UserLike extends BaseEntity {  // DB 이름을 Like로 사용할 수 없어서 UserLike로 변경

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

}
