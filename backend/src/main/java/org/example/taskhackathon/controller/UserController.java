package org.example.taskhackathon.controller;


import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.dto.request.AuthRequest;
import org.example.taskhackathon.dto.response.UserDTO;
import org.example.taskhackathon.entity.User;
import org.example.taskhackathon.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/registration")
    public ResponseEntity<UserDTO> registrationRecipient(@RequestBody User recipient) {
        UserDTO userDTO = userService.registration(recipient);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    @PostMapping("/authorization")
    public ResponseEntity<Map<String, Object>> authorization(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        Map<String, Object> responseBody = userService.authorization(authRequest, response);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, Object>> refreshAuthToken(@CookieValue("jwt") String refreshToken, HttpServletResponse response) {
        Map<String, Object> responseBody = userService.refreshAuthToken(refreshToken, response);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@CookieValue("jwt") String refreshToken, HttpServletResponse response) {
        userService.logout(refreshToken, response);
        return ResponseEntity.noContent().build();
    }
}

