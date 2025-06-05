package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.entity.UserLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserLikeRepository extends JpaRepository<UserLike, Long> {

    // 특정 user가 좋아요 누른 post 목록
    @Query("SELECT ul.post.postId FROM UserLike ul WHERE ul.user.userId = :userId AND ul.post.postId IN :postIds")
    List<Long> findLikedPostIdsByUserIdAndPostIds(@Param("userId") String userId, @Param("postIds") List<Long> postIds);

    // 각 post의 좋아요 수
    @Query("SELECT ul.post.postId AS postId, COUNT(ul.likeId) AS count FROM UserLike ul WHERE ul.post.postId IN :postIds GROUP BY ul.post.postId")
    List<LikeCountProjection> countLikesByPostIds(@Param("postIds") List<Long> postIds);


    interface LikeCountProjection {
        Long getPostId();
        Long getCount();
    }

    boolean existsByUserUserIdAndPostPostId(Long user_userId, Long post_postId);

    int deleteByUserIdAndPostId(Long userId, Long postId);

}

