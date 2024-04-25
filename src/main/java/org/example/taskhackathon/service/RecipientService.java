package org.example.taskhackathon.service;

import org.example.taskhackathon.dto.AuthRequest;
import org.example.taskhackathon.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface RecipientService {

        ResponseEntity<?> registration(User recipient);

        ResponseEntity<?> authorization(AuthRequest authRequest);
}
