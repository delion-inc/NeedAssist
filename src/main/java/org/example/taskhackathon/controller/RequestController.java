package org.example.taskhackathon.controller;

import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.dto.RequestDTO;
import org.example.taskhackathon.entity.Request;
import org.example.taskhackathon.service.RequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/request")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping("/add")
    public ResponseEntity<?> addRequest(@RequestBody RequestDTO request) {
        return requestService.addRequest(request);
    }

    @GetMapping("/get-all-requests")
    public ResponseEntity<?> getAllRequest() {
        return requestService.getAllRequest();
    }

    @GetMapping("/get-all-propose")
    public ResponseEntity<?> getAllPropose() {
        return requestService.getAllPropose();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getRequestById(@PathVariable Long id) {
        return requestService.getRequestById(id);
    }
}

