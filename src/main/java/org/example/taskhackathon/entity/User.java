package org.example.taskhackathon.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.taskhackathon.entity.constant.Role;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "username", nullable = false)
    String username;

    @Column(name = "email", nullable = false)
    String email;

    @Column(name = "password", nullable = false)
    String password;

    @Column(name = "phone", nullable = false)
    String phone;

    @Column(name = "city", nullable = false)
    String city;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    List<Request> requests;

    @Column(name = "refresh-token")
    private String refreshToken;

    @Column(name = "role", nullable = false)
    private List<Role> role;
}
