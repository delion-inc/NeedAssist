package org.example.taskhackathon.controller;

import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.dto.request.RequestRequestDTO;
import org.example.taskhackathon.dto.response.RequestResponseDTO;
import org.example.taskhackathon.service.RequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/request")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping("/add")
    public ResponseEntity<RequestResponseDTO> addRequest(@RequestBody RequestRequestDTO request, Principal principal) {
        RequestResponseDTO response = requestService.addRequest(request, principal.getName());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<RequestResponseDTO> getRequestById(@PathVariable Long id) {
        RequestResponseDTO response = requestService.getRequestById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get-all-requests")
    public ResponseEntity<List<RequestResponseDTO>> getAllRequest() {
        List<RequestResponseDTO> response = requestService.getAll("ROLE_RECIPIENT");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get-all-proposes")
    public ResponseEntity<List<RequestResponseDTO>> getAllPropose() {
        List<RequestResponseDTO> response = requestService.getAll("ROLE_HELPER");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
