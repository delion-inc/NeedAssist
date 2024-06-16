package org.example.taskhackathon.service;

import org.example.taskhackathon.dto.request.RequestRequestDTO;
import org.example.taskhackathon.dto.response.RequestResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RequestService {

    RequestResponseDTO addRequest(RequestRequestDTO request, String email);

    RequestResponseDTO getRequestById(Long id);

    List<RequestResponseDTO> getAll(String role);
}

