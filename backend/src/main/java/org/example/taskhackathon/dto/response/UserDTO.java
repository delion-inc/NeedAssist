package org.example.taskhackathon.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private String name;
    private String surname;
    private String email;
    private String phone;
}
