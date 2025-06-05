package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.entity.PostIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostIngredientRepository extends JpaRepository<PostIngredient, Long> {
}
