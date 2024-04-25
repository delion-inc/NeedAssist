package org.example.taskhackathon.service.implemantation;

import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.dto.AuthRequest;
import org.example.taskhackathon.entity.User;
import org.example.taskhackathon.entity.constant.Role;
import org.example.taskhackathon.repository.UserRepository;
import org.example.taskhackathon.service.HelperService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class HelperServiceImpl implements HelperService {

    private final UserRepository helperRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public ResponseEntity<?> registration(User helper) {
        if(helper.getEmail() == null || helper.getPassword() == null || helper.getCity() == null || helper.getPhone() == null) {
            return new ResponseEntity<>("All fields must be filled", HttpStatus.BAD_REQUEST);
        }
        if(helperRepository.findByEmail(helper.getEmail()) != null) {
            return new ResponseEntity<>("User with email " + helper.getEmail() + " already exist", HttpStatus.BAD_REQUEST);
        }
        helper.setPassword(bCryptPasswordEncoder.encode(helper.getPassword()));
        helper.setRole(Collections.singletonList(Role.valueOf("ROLE_HELPER")));
        helperRepository.save(helper);
        return new ResponseEntity<>(helper, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> authorization(AuthRequest authRequest) {
        User helper = helperRepository.findByEmail(authRequest.getEmail());
        if (helper == null) {
            return new ResponseEntity<>("Helper not found", HttpStatus.NOT_FOUND);
        }
        if (!bCryptPasswordEncoder.matches(authRequest.getPassword(), helper.getPassword())) {
            return new ResponseEntity<>("Invalid password", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(helper, HttpStatus.OK);
    }
}
