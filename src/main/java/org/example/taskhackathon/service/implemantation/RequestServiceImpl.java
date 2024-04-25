package org.example.taskhackathon.service.implemantation;

import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.dto.RequestDTO;
import org.example.taskhackathon.entity.Request;
import org.example.taskhackathon.entity.User;
import org.example.taskhackathon.repository.RequestRepository;
import org.example.taskhackathon.repository.UserRepository;
import org.example.taskhackathon.service.RequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

import static org.example.taskhackathon.entity.constant.Status.TODO;

@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;
    private final UserRepository recipientRepository;

    @Override
    public ResponseEntity<Request> addRequest(RequestDTO requestDTO) {
        User recipient = recipientRepository.findByEmail(requestDTO.getRecipientEmail());
        if (recipient == null) {
            throw new IllegalArgumentException("Recipient with email " + requestDTO.getRecipientEmail() + " not found");
        }
        Request request = Request.builder()
                .title(requestDTO.getTitle())
                .description(requestDTO.getDescription())
                .priority(requestDTO.getPriority())
                .status(TODO)
                .createdAt(String.valueOf(System.currentTimeMillis()))
                .user(recipient)
                .build();
        requestRepository.save(request);
        return new ResponseEntity<>(request, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<Request>> getAllRequest() {
        List<Request> allRequests = requestRepository.findAll();
        List<Request> requests = null;
        for (Request request : allRequests) {
            if(request.getUser().getRole().get(0).name().equals("ROLE_HELPER")) {
                requests.add(request);
            }
        }
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Request>> getAllPropose() {
        List<Request> allRequests = requestRepository.findAll();
        List<Request> requests = null;
        for (Request request : allRequests) {
            if(request.getUser().getRole().get(0).name().equals("ROLE_HELPER")) {
                requests.add(request);
            }
        }
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Request> getRequestById(Long id) {
        Request request = requestRepository.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));
        return new ResponseEntity<>(request, HttpStatus.OK);
    }
}
