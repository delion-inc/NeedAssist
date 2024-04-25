package org.example.taskhackathon.service.implemantation;

import lombok.RequiredArgsConstructor;
import org.example.taskhackathon.dto.AuthRequest;
import org.example.taskhackathon.entity.User;
import org.example.taskhackathon.entity.constant.Role;
import org.example.taskhackathon.repository.UserRepository;
import org.example.taskhackathon.service.RecipientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class RecipientServiceImpl implements RecipientService {

    private final UserRepository recipientRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public ResponseEntity<?> registration(User recipient) {
        if(recipient.getEmail() == null || recipient.getPassword() == null || recipient.getCity() == null || recipient.getPhone() == null) {
            return new ResponseEntity<>("All fields must be filled", HttpStatus.BAD_REQUEST);
        }
        if(recipientRepository.findByEmail(recipient.getEmail()) != null) {
            return new ResponseEntity<>("User with email " + recipient.getEmail() + " already exist", HttpStatus.BAD_REQUEST);
        }
        recipient.setPassword(bCryptPasswordEncoder.encode(recipient.getPassword()));
        recipient.setRole(Collections.singletonList(Role.valueOf("ROLE_RECIPIENT")));
        recipientRepository.save(recipient);
        return new ResponseEntity<>(recipient, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> authorization(AuthRequest authRequest) {
        User recipient = recipientRepository.findByEmail(authRequest.getEmail());
        if (recipient == null) {
            return new ResponseEntity<>("Recipient not found", HttpStatus.NOT_FOUND);
        }
        if (!bCryptPasswordEncoder.matches(authRequest.getPassword(), recipient.getPassword())) {
            return new ResponseEntity<>("Invalid password", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(recipient, HttpStatus.OK);
    }
}
