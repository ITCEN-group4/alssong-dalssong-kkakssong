package com.group4.aldalka.domain.post.service;

import com.group4.aldalka.domain.post.entity.Post;
import com.group4.aldalka.domain.post.entity.UserLike;
import com.group4.aldalka.domain.post.repository.PostRepository;
import com.group4.aldalka.domain.post.repository.UserLikeRepository;
import com.group4.aldalka.domain.user.User;
import com.group4.aldalka.domain.user.repository.UserRepository;
import com.group4.aldalka.global.error.ErrorCode;
import com.group4.aldalka.global.error.exception.BusinessException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PostLikeService {

    private final UserLikeRepository userLikeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public boolean addLike(String username, Long postId) {

        Long userId = userRepository.findByUsername(username)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXISTS))
                .getUserId();

        try {
            User user = userRepository.getReferenceById(userId);
            Post post = postRepository.getReferenceById(postId);

            UserLike userLike = UserLike.builder()
                    .user(user)
                    .post(post)
                    .build();

            userLikeRepository.save(userLike);

            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public boolean removeLike(String username, Long postId) {
        Long userId = userRepository.findByUsername(username)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXISTS))
                .getUserId();

        int deletedCount = userLikeRepository.deleteByUserIdAndPostId(userId, postId);

        if (deletedCount == 0) throw new BusinessException(ErrorCode.LIKE_NOT_FOUND);
        return true;
    }


}

