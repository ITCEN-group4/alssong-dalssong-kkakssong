package com.group4.aldalka.domain.post.controller;


import com.group4.aldalka.domain.post.dto.request.PostCreateRequestDTO;
import com.group4.aldalka.domain.post.dto.response.PostRequestDTO;
import com.group4.aldalka.domain.post.repository.*;
import com.group4.aldalka.domain.post.service.PostService;
import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tests")
public class Tests {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostBaseLiquorRepository postBaseLiquorRepository;
    private final BaseLiquorRepository baseLiquorRepository;
    private final PostIngredientRepository postIngredientRepository;
    private final IngredientRepository ingredientRepository;
    private final PostService postService;

    /*@GetMapping
    public String healthCheck() {
        return "✅ 서버 연결 성공!";
    }*/

    @RequestMapping("/{userId}")
    public ResponseEntity<PostRequestDTO> createPost(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<String> ingredients = List.of(new String[]{"one", "two"});
        List<String> liquors = List.of(new String[]{"three", "four"});

        PostCreateRequestDTO dto = new PostCreateRequestDTO("title", "content", "recipe", false, 10, false, "imageUrl", ingredients, liquors);

        PostRequestDTO response = postService.createPost(dto, user);

        return ResponseEntity.ok(response);
    }

}
