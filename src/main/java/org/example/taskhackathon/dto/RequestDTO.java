package org.example.taskhackathon.dto;

import lombok.Data;
import org.example.taskhackathon.entity.constant.Priority;

@Data
public class RequestDTO {
    private String title;
    private String description;
    private Priority priority;
    private String recipientEmail;
}
