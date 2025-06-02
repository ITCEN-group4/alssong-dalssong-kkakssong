package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.entity.BaseLiquor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BaseLiquorRepository extends JpaRepository<BaseLiquor, Long> {

}
