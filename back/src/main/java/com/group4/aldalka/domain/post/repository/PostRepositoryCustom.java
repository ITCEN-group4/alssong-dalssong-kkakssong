package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.dto.request.MypagePostSearchRequest;
import com.group4.aldalka.domain.post.dto.request.PostSearchRequest;
import com.group4.aldalka.domain.post.dto.PostSearchResult;

public interface  PostRepositoryCustom {

    PostSearchResult searchPosts(PostSearchRequest postSearchRequest);

    PostSearchResult findPostsByUserAndCondition(Long userId, MypagePostSearchRequest searchRequest);
}
