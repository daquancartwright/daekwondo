package com.devmountain.daekwondo.entities;

import com.devmountain.daekwondo.dtos.WorkoutDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "workouts")
@Data // Using Lombok for generating getters and setters
@AllArgsConstructor
@NoArgsConstructor
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workoutId;

    @Column(nullable = false)
    private String title;
    private int duration;
    private String difficultyLevel;

    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Exercise> exercises;

    public Workout(WorkoutDto workoutDto) {
        this.title = workoutDto.getTitle();
        this.duration = workoutDto.getDuration();
        this.difficultyLevel = workoutDto.getDifficultyLevel();
        this.description = workoutDto.getDescription();
        // Maybe
//        this.user = new User(workoutDto.getUserDto());
//        this.exercises =
    }

    public void updateFromDto(WorkoutDto workoutDto) {
        this.title = workoutDto.getTitle();
        this.duration = workoutDto.getDuration();
        this.difficultyLevel = workoutDto.getDifficultyLevel();
        this.description = workoutDto.getDescription();
    }

}
