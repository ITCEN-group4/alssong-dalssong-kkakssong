package com.group4.aldalka.domain.post.service;

import com.group4.aldalka.domain.post.dto.PostResponse;
import com.group4.aldalka.domain.post.dto.PostSearchRequest;
import com.group4.aldalka.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;


    public List<PostResponse> searchPosts(String userid, PostSearchRequest postRequest) {

        return postRepository.getFilteredPosts(userid, postRequest);

    }

}
