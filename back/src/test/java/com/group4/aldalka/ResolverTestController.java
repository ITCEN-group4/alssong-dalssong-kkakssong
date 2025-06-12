package com.group4.aldalka;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group4.aldalka.domain.common.LoginUser;

@RestController
@RequestMapping("/api/test/resolver")
public class ResolverTestController {

    @GetMapping
    public String resolve(@LoginUser String email) {
        return email;
    }
}
