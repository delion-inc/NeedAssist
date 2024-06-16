package org.example.taskhackathon.service.implemantation;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.config.JwtTokenService;
import org.example.taskhackathon.dto.request.AuthRequest;
import org.example.taskhackathon.dto.response.UserDTO;
import org.example.taskhackathon.entity.User;
import org.example.taskhackathon.entity.constant.Role;
import org.example.taskhackathon.repository.UserRepository;
import org.example.taskhackathon.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserDetailsService, UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenService jwtTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = getUserByEmail(email);
        List<Role> roles = user.getRoles();
        List<SimpleGrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(), authorities);
    }

    @Override
    public UserDTO registration(User user) {
        if(user.getEmail() == null || user.getPassword() == null || user.getName() == null || user.getSurname() == null || user.getPhone() == null) {
            throw new IllegalArgumentException("All fields must be filled");
        }
        if(userRepository.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("User with email " + user.getEmail() + " already exists");
        }

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(Collections.singletonList(Role.fromValue(user.getRole())));
        userRepository.save(user);

        return UserDTO.builder()
                .name(user.getName())
                .surname(user.getSurname())
                .email(user.getEmail())
                .phone(user.getPhone())
                .build();
    }

    @Override
    public Map<String, Object> authorization(AuthRequest authRequest, HttpServletResponse response) {
        User user = getUserByEmail(authRequest.getEmail());
        if (!bCryptPasswordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
        String accessToken = jwtTokenService.generateToken(userDetails);
        String refreshToken = jwtTokenService.generateRefreshToken(userDetails);
        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        jwtTokenService.setTokenCookies(response, refreshToken);
        return createResponseBody(user, accessToken);
    }

    @Override
    public Map<String, Object> refreshAuthToken(String refreshToken, HttpServletResponse response) {
        User user = userRepository.findByRefreshToken(refreshToken);
        if (user == null) {
            throw new IllegalArgumentException("Invalid refreshToken");
        }

        UserDetails userDetails = loadUserByUsername(user.getEmail());
        String accessToken = jwtTokenService.generateToken(userDetails);

        jwtTokenService.setTokenCookies(response, refreshToken);
        userRepository.save(user);
        return createResponseBody(user, accessToken);
    }

    private Map<String, Object> createResponseBody(User user, String accessToken) {
        Map<String, Object> responseBody = new HashMap<>();
        List<Integer> roleValues = user.getRoles().stream()
                .map(Role::getValue)
                .toList();
        responseBody.put("roles", roleValues);
        responseBody.put("accessToken", accessToken);
        return responseBody;
    }

    @Override
    public void logout(String refreshToken, HttpServletResponse response) {
        User user = userRepository.findByRefreshToken(refreshToken);
        if (user == null) {
            throw new IllegalArgumentException("Invalid refreshToken");
        }
        user.setRefreshToken("");
        userRepository.save(user);
        response.setHeader("Set-Cookie", "refreshToken=; HttpOnly; SameSite=None; Secure; Max-age=0");
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}