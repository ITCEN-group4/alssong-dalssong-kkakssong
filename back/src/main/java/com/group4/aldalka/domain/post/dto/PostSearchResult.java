package com.group4.aldalka.domain.post.dto;

import com.group4.aldalka.domain.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class PostSearchResult {
    private List<Post> posts;
    private long totalElements;
}