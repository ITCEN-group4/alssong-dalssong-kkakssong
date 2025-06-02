package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.dto.PostResponse;
import com.group4.aldalka.domain.post.dto.PostSearchRequest;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface  PostRepositoryCustom {

    List<PostResponse> getFilteredPosts(String userId, PostSearchRequest postSearchRequest);


}
