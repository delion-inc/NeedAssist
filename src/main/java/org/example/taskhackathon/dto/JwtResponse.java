package org.example.taskhackathon.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.entity.constant.Role;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class JwtResponse {
    private String jwtAccessToken;
    private String jwtRefreshToken;
    private List<Role> roles;
}
