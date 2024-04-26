package org.example.taskhackathon.service;

import jakarta.servlet.http.HttpServletResponse;
import org.example.taskhackathon.dto.request.AuthRequest;
import org.example.taskhackathon.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    ResponseEntity<?> registration(User user);

    ResponseEntity<?> authorization(AuthRequest authRequest, HttpServletResponse response);

    ResponseEntity<?> refreshAuthToken(String refreshToken, HttpServletResponse response);

    ResponseEntity<?> logout(String refreshToken, HttpServletResponse response);
}
