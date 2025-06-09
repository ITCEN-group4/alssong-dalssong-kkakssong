package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.entity.PostIngredient;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostIngredientRepository extends JpaRepository<PostIngredient, Long> {

    @Modifying
    @Query("DELETE FROM PostIngredient pi WHERE pi.post.postId = :postId")
    void deleteByPostId(@Param("postId") Long postId);

}
