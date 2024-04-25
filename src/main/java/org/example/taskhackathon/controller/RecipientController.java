package org.example.taskhackathon.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.dto.AuthRequest;
import org.example.taskhackathon.entity.User;
import org.example.taskhackathon.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/recipient")
@RequiredArgsConstructor
public class RecipientController {

    private final UserService userService;

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestBody User recipient) {
        return userService.registration(recipient, "ROLE_RECIPIENT");
    }

    @PostMapping("/authorization")
    public ResponseEntity<?> authorization(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        return userService.authorization(authRequest, response);
    }
}
