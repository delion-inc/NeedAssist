package org.example.taskhackathon.service.implemantation;

import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.dto.request.RequestRequestDTO;
import org.example.taskhackathon.dto.response.RequestResponseDTO;
import org.example.taskhackathon.dto.response.UserDTO;
import org.example.taskhackathon.entity.Request;
import org.example.taskhackathon.entity.User;
import org.example.taskhackathon.repository.RequestRepository;
import org.example.taskhackathon.repository.UserRepository;
import org.example.taskhackathon.service.RequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;
    private final UserRepository userRepository;

    private static final String ZONE_ID = "Europe/Kiev";
    private static final String DATA_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    @Override
    public ResponseEntity<RequestResponseDTO> addRequest(RequestRequestDTO requestDTO, String email) {
        User user = getUserByEmail(email);
        Request request = Request.builder()
                .title(requestDTO.getTitle())
                .description(requestDTO.getDescription())
                .priority(requestDTO.getPriority())
                .createdAt(createTime())
                .user(user)
                .build();
        requestRepository.save(request);
        return new ResponseEntity<>(mapRequestToRequestResDTO(request), HttpStatus.CREATED);
    }

    private String createTime() {
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of(ZONE_ID));
        return now.format(DateTimeFormatter.ofPattern(DATA_TIME_FORMAT));
    }

    @Override
    public ResponseEntity<List<RequestResponseDTO>> getAll(String role) {
        List<RequestResponseDTO> requests = requestRepository.findAll().stream()
                .filter(request -> request.getUser().getRole().stream().anyMatch(r -> r.name().equals(role)))
                .map(this::mapRequestToRequestResDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<RequestResponseDTO> getRequestById(Long id) {
        Request request = requestRepository.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));
        return new ResponseEntity<>(mapRequestToRequestResDTO(request), HttpStatus.OK);
    }

    private RequestResponseDTO mapRequestToRequestResDTO(Request request) {
        return RequestResponseDTO.builder()
                .id(request.getId())
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .createdAt(request.getCreatedAt())
                .user(UserDTO.builder()
                        .username(request.getUser().getUsername())
                        .email(request.getUser().getEmail())
                        .phone(request.getUser().getPhone())
                        .city(request.getUser().getCity())
                        .build())
                .build();
    }

    @Override
    public ResponseEntity<?> deleteRequest(Long id, String name) {
        Request request = requestRepository.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));
        if (!request.getUser().getEmail().equals(name)) {
            return new ResponseEntity<>("You can't delete this request", HttpStatus.FORBIDDEN);
        }
        requestRepository.delete(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
