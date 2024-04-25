package org.example.taskhackathon.service;

import jakarta.servlet.http.HttpServletResponse;
import org.example.taskhackathon.dto.AuthRequest;
import org.example.taskhackathon.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    ResponseEntity<?> registration(User user, String role);
    ResponseEntity<?> authorization(AuthRequest authRequest, HttpServletResponse response);
}
