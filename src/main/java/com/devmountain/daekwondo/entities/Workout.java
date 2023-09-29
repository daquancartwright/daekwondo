// Workout.java

package com.devmountain.daekwondo.entities;

import com.devmountain.daekwondo.dtos.ExerciseDto;
import com.devmountain.daekwondo.dtos.WorkoutDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import jakarta.persistence.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "workouts")
@Data // Using Lombok for generating getters and setters
@AllArgsConstructor
@NoArgsConstructor
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workout_id")
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

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Exercise> exercises;

    public Workout(WorkoutDto workoutDto) {
        this.title = workoutDto.getTitle();
        this.duration = workoutDto.getDuration();
        this.difficultyLevel = workoutDto.getDifficultyLevel();
        this.description = workoutDto.getDescription();
        this.user = new User(workoutDto.getUserDto());
        this.exercises = workoutDto.getExerciseDtos() != null
                ? workoutDto.getExerciseDtos().stream().map(Exercise::new).collect(Collectors.toList())
                : Collections.emptyList();
    }

    public void updateFromDto(WorkoutDto workoutDto) {
        this.title = workoutDto.getTitle();
        this.duration = workoutDto.getDuration();
        this.difficultyLevel = workoutDto.getDifficultyLevel();
        this.description = workoutDto.getDescription();
    }
}
