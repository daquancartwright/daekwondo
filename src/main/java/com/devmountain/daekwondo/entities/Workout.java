// Workout.java

package com.devmountain.daekwondo.entities;

import com.devmountain.daekwondo.dtos.ExerciseDto;
import com.devmountain.daekwondo.dtos.WorkoutDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "workouts")
@Data
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
    private List<Exercise> exercises; // Use Exercise entities, not DTOs

    public Workout(WorkoutDto workoutDto) {
        this.title = workoutDto.getTitle();
        this.duration = workoutDto.getDuration();
        this.difficultyLevel = workoutDto.getDifficultyLevel();
        this.description = workoutDto.getDescription();

        // Create a new User with the provided userId
        User user = new User();
        user.setUserId(workoutDto.getUserId());

        this.user = user;

        // Initialize exercises list (not exerciseDtos)
        this.exercises = new ArrayList<>();

        // Add Exercise entities to the list
        if (workoutDto.getExerciseDtos() != null) {
            this.exercises.addAll(workoutDto.getExerciseDtos().stream()
                    .map(exerciseDto -> new Exercise(exerciseDto, this))
                    .collect(Collectors.toList()));
        }
    }

    public void updateFromDto(WorkoutDto workoutDto) {
        this.title = workoutDto.getTitle();
        this.duration = workoutDto.getDuration();
        this.difficultyLevel = workoutDto.getDifficultyLevel();
        this.description = workoutDto.getDescription();
    }

    public void addExercise(Exercise exercise) {
        if (this.exercises == null) {
            this.exercises = new ArrayList<>();
        }
        this.exercises.add(exercise);
        exercise.setWorkout(this);
    }
}