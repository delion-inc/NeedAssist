package org.example.taskhackathon.service.implemantation;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.config.JwtTokenService;
import org.example.taskhackathon.dto.request.AuthRequest;
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
        List<Role> roles = user.getRole();
        List<SimpleGrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public ResponseEntity<?> registration(User user, String role) {
        if(user.getEmail() == null || user.getPassword() == null || user.getCity() == null || user.getPhone() == null) {
            return new ResponseEntity<>("All fields must be filled", HttpStatus.BAD_REQUEST);
        }
        if(userRepository.findByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>("User with email " + user.getEmail() + " already exist", HttpStatus.BAD_REQUEST);
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRole(Collections.singletonList(Role.valueOf(role)));
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> authorization(AuthRequest authRequest, HttpServletResponse response) {
        User user = getUserByEmail(authRequest.getEmail());
        if (!bCryptPasswordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("Invalid password", HttpStatus.UNAUTHORIZED);
        }

        List<GrantedAuthority> authorities = user.getRole().stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
        String accessToken = jwtTokenService.generateToken(userDetails);
        String refreshToken = jwtTokenService.generateRefreshToken(userDetails);
        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        Map<String, Object> responseBody = new HashMap<>();
        jwtTokenService.setTokenCookies(response, refreshToken);
        List<Integer> roleValues = user.getRole().stream()
                .map(Role::getValue)
                .toList();
        responseBody.put("roles", roleValues);
        responseBody.put("accessToken", accessToken);
        return  new ResponseEntity<> (responseBody, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> refreshAuthToken(String refreshToken, HttpServletResponse response) {
        User user = userRepository.findByRefreshToken(refreshToken);
        if (user == null) {
            return new ResponseEntity<>("Invalid refreshToken", HttpStatus.BAD_REQUEST);
        }

        UserDetails userDetails = loadUserByUsername(user.getEmail());
        String accessToken = jwtTokenService.generateToken(userDetails);

        Map<String, Object> responseBody = new HashMap<>();
        jwtTokenService.setTokenCookies(response, refreshToken);
        List<Integer> roleValues = user.getRole().stream()
                .map(Role::getValue)
                .toList();
        responseBody.put("roles", roleValues);
        responseBody.put("accessToken", accessToken);
        jwtTokenService.setTokenCookies(response, refreshToken);
        userRepository.save(user);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> logout(String refreshToken, HttpServletResponse response) {
        User user = userRepository.findByRefreshToken(refreshToken);
        if (user == null) {
            return new ResponseEntity<>("Invalid refreshToken", HttpStatus.BAD_REQUEST);
        }
        user.setRefreshToken("");
        userRepository.save(user);
        response.setHeader("Set-Cookie", "refreshToken=; HttpOnly; SameSite=None; Secure; Max-age=0");
        return ResponseEntity.noContent().build();
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
