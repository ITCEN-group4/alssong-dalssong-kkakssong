package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.entity.PostBaseLiquor;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostBaseLiquorRepository extends JpaRepository<PostBaseLiquor, Long> {

    @Modifying
    @Query("DELETE FROM PostBaseLiquor pi WHERE pi.post.postId = :postId")
    void deleteByPostId(@Param("postId") Long postId);

}
