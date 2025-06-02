package com.group4.aldalka.domain.post.controller;

import com.group4.aldalka.domain.post.entity.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController
{
    @PostMapping("/create")
    public String createPost() {
        return null;
    }

    @PutMapping("/update")
    public String updatePost(Post post) {
        return null;
    }

    @DeleteMapping("/delete")
    public String deletePost(Post post) {
        return null;

    }
}
