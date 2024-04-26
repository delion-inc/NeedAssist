package org.example.taskhackathon.entity.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public enum Role {
    ROLE_HELPER(2001),
    ROLE_RECIPIENT(5320);
    private int value;
}