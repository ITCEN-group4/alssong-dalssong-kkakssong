package com.group4.aldalka.domain.post.service;

import com.group4.aldalka.domain.post.dto.PostSearchRequest;
import com.group4.aldalka.domain.post.entity.Post;
import com.group4.aldalka.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public List<Post> searchPosts(String userId, PostSearchRequest postSearchRequest) {
        boolean hasIngredients = postSearchRequest.getIngredients() != null && !postSearchRequest.getIngredients().isEmpty();
        boolean hasBaseLiqueurs = postSearchRequest.getBaseLiqueurs() != null && !postSearchRequest.getBaseLiqueurs().isEmpty();

        if (hasIngredients && hasBaseLiqueurs) {
            return postRepository.searchWithIngredientsAndBaseLiqueurs(postSearchRequest);
        } else if (hasIngredients) {
            return postRepository.searchWithIngredients(postSearchRequest);
        } else if (hasBaseLiqueurs) {
            return postRepository.searchWithBaseLiqueurs(postSearchRequest);
        } else {
            return postRepository.searchWithoutJoin(postSearchRequest);
        }
    }


}
