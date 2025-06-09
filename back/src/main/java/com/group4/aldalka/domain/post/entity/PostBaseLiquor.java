package com.group4.aldalka.domain.post.entity;

import com.group4.aldalka.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Table(
        name = "post_base_liquor",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"post_id", "base_liquor_id"})
        }
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PostBaseLiquor extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_base_liquor_id")
    private Long postBaseLiquorId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "base_liquor_id", nullable = false)
    private BaseLiquor baseLiquor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
}

