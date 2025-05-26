package com.group4.aldalka.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group4.aldalka.domain.user.User;

public interface MemberRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
