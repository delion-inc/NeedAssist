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
    public RequestResponseDTO addRequest(RequestRequestDTO requestDTO, String email) {
        User user = getUserByEmail(email);
        Request request = Request.builder()
                .title(requestDTO.getTitle())
                .description(requestDTO.getDescription())
                .priority(requestDTO.getPriority())
                .createdAt(createTime())
                .city(requestDTO.getCity())
                .user(user)
                .build();
        requestRepository.save(request);
        return mapRequestToRequestResDTO(request);
    }

    private String createTime() {
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of(ZONE_ID));
        return now.format(DateTimeFormatter.ofPattern(DATA_TIME_FORMAT));
    }

    @Override
    public List<RequestResponseDTO> getAll(String role) {
        return requestRepository.findAll().stream()
                .filter(request -> request.getUser().getRoles().stream().anyMatch(r -> r.name().equals(role)))
                .map(this::mapRequestToRequestResDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RequestResponseDTO getRequestById(Long id) {
        Request request = requestRepository.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));
        return mapRequestToRequestResDTO(request);
    }

    private RequestResponseDTO mapRequestToRequestResDTO(Request request) {
        return RequestResponseDTO.builder()
                .id(request.getId())
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .createdAt(request.getCreatedAt())
                .city(request.getCity())
                .user(UserDTO.builder()
                        .name(request.getUser().getName())
                        .surname(request.getUser().getSurname())
                        .email(request.getUser().getEmail())
                        .phone(request.getUser().getPhone())
                        .build())
                .build();
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
