package org.example.taskhackathon.controller;

import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.dto.AuthRequest;
import org.example.taskhackathon.entity.User;
import org.example.taskhackathon.service.HelperService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/helper")
@RequiredArgsConstructor
public class HelperController {

    private final HelperService helperService;

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestBody User helper) {
        return helperService.registration(helper);
    }

    @PostMapping("/authorization")
    public ResponseEntity<?> authorization(@RequestBody AuthRequest authRequest) {
        return helperService.authorization(authRequest);
    }
}
