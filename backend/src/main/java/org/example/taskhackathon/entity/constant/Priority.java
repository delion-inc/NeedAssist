package org.example.taskhackathon.entity.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public enum Priority {
    LOW(0),
    MEDIUM(1),
    HIGH(2);

    private int value;
}

