// UserDto.java

package com.devmountain.daekwondo.dtos;

import com.devmountain.daekwondo.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements Serializable {
    private Long userId;
    private String username;
    private String password;
    private String name;
    private int age;
    private double height;
    private double weight;

    public UserDto(User user) {
        this.userId = user.getUserId() != null ? user.getUserId() : 0L;
        this.username = user.getUsername() != null ? user.getUsername() : "";
        this.password = user.getPassword() != null ? user.getPassword() : "";
        this.name = user.getName() != null ? user.getName() : "";
        this.age = user.getAge();
        this.height = user.getHeight();
        this.weight = user.getWeight();
    }
}