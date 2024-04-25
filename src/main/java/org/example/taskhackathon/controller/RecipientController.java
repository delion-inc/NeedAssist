package org.example.taskhackathon.controller;

import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.dto.AuthRequest;
import org.example.taskhackathon.entity.User;
import org.example.taskhackathon.service.RecipientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/recipient")
@RequiredArgsConstructor
public class RecipientController {

    private final RecipientService recipientService;

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestBody User recipient) {
        return recipientService.registration(recipient);
    }

    @PostMapping("/authorization")
    public ResponseEntity<?> authorization(@RequestBody AuthRequest authRequest) {
        return recipientService.authorization(authRequest);
    }
}
