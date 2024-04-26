package org.example.taskhackathon.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.taskhackathon.entity.constant.Role;

import java.util.ArrayList;
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

    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "surname", nullable = false)
    String surname;

    @Column(name = "email", nullable = false)
    String email;

    @Column(name = "password", nullable = false)
    String password;

    @Column(name = "phone", nullable = false)
    String phone;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    List<Request> requests;

    @Column(name = "refresh-token")
    private String refreshToken;

    @Column(name = "user_role")
    private Role role;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<Role> roles = new ArrayList<>();

}
