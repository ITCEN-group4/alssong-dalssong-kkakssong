package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.dto.PostSearchRequest;
import com.group4.aldalka.domain.post.dto.PostSearchResult;
public interface  PostRepositoryCustom {

    PostSearchResult searchPosts(PostSearchRequest postSearchRequest);
}
