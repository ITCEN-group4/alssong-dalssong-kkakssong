package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.service.BaseLiquor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BaseLiquorRepository extends JpaRepository<BaseLiquor, Long> {

    Optional<BaseLiquor> findByName(String baseLiquorNames);

}
