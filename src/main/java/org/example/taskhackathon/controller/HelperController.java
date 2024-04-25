package org.example.taskhackathon.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.dto.AuthRequest;
import org.example.taskhackathon.entity.User;
import org.example.taskhackathon.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/helper")
@RequiredArgsConstructor
public class HelperController {

    private final UserService userService;

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestBody User helper) {
        return userService.registration(helper, "ROLE_HELPER");
    }

    @PostMapping("/authorization")
    public ResponseEntity<?> authorization(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        return userService.authorization(authRequest, response);
    }
}
