package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientReposiroty extends JpaRepository<Ingredient, Long> {
}
