package org.example.taskhackathon.service;

import org.example.taskhackathon.dto.request.RequestRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface RequestService {

    ResponseEntity<?> addRequest(RequestRequestDTO request, String email);

    ResponseEntity<?> getRequestById(Long id);

    ResponseEntity<?> getAll(String role);
}
