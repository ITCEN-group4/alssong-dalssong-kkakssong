package com.group4.aldalka.domain.post.service;

import com.group4.aldalka.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Table(name = "base_liquior")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BaseLiquor extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "base_liquor_id")
    private Long baseLiquorId;

    @Column(name = "name")
    private String name;

    @Builder.Default
    @OneToMany(mappedBy = "baseLiquor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostBaseLiquor> postBaseLiquors = new ArrayList<>();
}
