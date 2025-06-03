package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.dto.PostSearchRequest;
import com.group4.aldalka.domain.post.entity.Post;

import java.util.List;

public interface  PostRepositoryCustom {

    List<Post> searchPosts(PostSearchRequest postSearchRequest);
}
