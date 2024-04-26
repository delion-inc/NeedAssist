package org.example.taskhackathon.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.taskhackathon.entity.constant.Priority;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "requests")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    String title;

    @Column(name = "description", nullable = false)
    String description;

    @Column(name = "priority", nullable = false)
    Priority priority;

    @Column(name = "created_at", nullable = false)
    String createdAt;

    @Column(name = "city", nullable = false)
    String city;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
