// User.java

package com.devmountain.daekwondo.entities;

import com.devmountain.daekwondo.dtos.UserDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Users")
@Data // Using Lombok to generate getters and setters
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true)
    private String username;

    @Column
    private String password;
    private String name;
    private int age;
    private double height;
    private double weight;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonBackReference
    private List<Workout> workouts;

    public User(UserDto userDto) {
        this.userId = userDto.getUserId() != null ? userDto.getUserId() : 0L;
        this.username = userDto.getUsername() != null ? userDto.getUsername() : "";
        this.password = userDto.getPassword() != null ? userDto.getPassword() : "";
        this.name = userDto.getName() != null ? userDto.getName() : "";
        this.age = userDto.getAge();
        this.height = userDto.getHeight();
        this.weight = userDto.getWeight();
    }

}



