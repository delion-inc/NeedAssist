package org.example.taskhackathon.service;

import org.example.taskhackathon.dto.RequestDTO;
import org.example.taskhackathon.entity.Request;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RequestService {

    ResponseEntity<?> addRequest(RequestDTO request);

    ResponseEntity<?> getAllRequest();

    ResponseEntity<?> getRequestById(Long id);

    ResponseEntity<?> getAllPropose();
}
