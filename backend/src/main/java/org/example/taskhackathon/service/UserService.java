package org.example.taskhackathon.service;

import jakarta.servlet.http.HttpServletResponse;
import org.example.taskhackathon.dto.request.AuthRequest;
import org.example.taskhackathon.dto.response.UserDTO;
import org.example.taskhackathon.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface UserService {

    UserDTO registration(User user);

    Map<String, Object> authorization(AuthRequest authRequest, HttpServletResponse response);

    Map<String, Object> refreshAuthToken(String refreshToken, HttpServletResponse response);

    void logout(String refreshToken, HttpServletResponse response);
}

