package org.example.taskhackathon.controller;

import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.dto.request.RequestRequestDTO;
import org.example.taskhackathon.service.RequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController()
@CrossOrigin
@RequestMapping("/api/request")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping("/add")
    public ResponseEntity<?> addRequest(@RequestBody RequestRequestDTO request, Principal principal) {
        return requestService.addRequest(request, principal.getName());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getRequestById(@PathVariable Long id) {
        return requestService.getRequestById(id);
    }

    @GetMapping("/get-all-requests")
    public ResponseEntity<?> getAllRequest() {
        return requestService.getAll("ROLE_RECIPIENT");
    }

    @GetMapping("/get-all-proposes")
    public ResponseEntity<?> getAllPropose() {
        return requestService.getAll("ROLE_HELPER");
    }
}

