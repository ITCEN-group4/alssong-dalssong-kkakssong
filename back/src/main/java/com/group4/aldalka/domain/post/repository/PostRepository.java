package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryCustom{

}

