package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.service.BaseLiquor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLikeRepository extends JpaRepository<BaseLiquor, Long> {
}
