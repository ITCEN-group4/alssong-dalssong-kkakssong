package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryCustom{

//    @Modifying
//    @Query(
//            value =
//                    "insert into Users (" +
//                            ") values (:name, :age, :email, :status)",
//            nativeQuery = true)
//    void insertUser(Post post);

    

}

