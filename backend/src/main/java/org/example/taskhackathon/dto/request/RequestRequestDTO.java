package org.example.taskhackathon.dto.request;

import lombok.Data;
import org.example.taskhackathon.entity.constant.Priority;

@Data
public class RequestRequestDTO {
    private String title;
    private String description;
    private Priority priority;
    private String city;
}
