package org.example.taskhackathon.dto.response;

import lombok.Builder;
import lombok.Data;
import org.example.taskhackathon.entity.constant.Priority;

@Data
@Builder
public class RequestResponseDTO {
    private Long id;
    private String title;
    private String description;
    private Priority priority;
    private String createdAt;
    private UserDTO user;
}
