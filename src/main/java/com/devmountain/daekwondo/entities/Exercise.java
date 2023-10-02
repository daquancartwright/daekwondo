// Exercise.java

package com.devmountain.daekwondo.entities;

import com.devmountain.daekwondo.dtos.ExerciseDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "exercises")
@Data // Using Lombok for generating getters and setters
@AllArgsConstructor
@NoArgsConstructor
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_id")
    private Long exerciseId;

    @Column(nullable = false)
    private String exerciseName;

    private int sets;
    private int reps;
    private double weight;

    @Column
    private String notes;

    @ManyToOne
    @JoinColumn(name = "workout_id")
    @JsonBackReference
    private Workout workout;

    public Exercise(ExerciseDto exerciseDto) {
        this.exerciseName = exerciseDto.getExerciseName();
        this.sets = exerciseDto.getSets();
        this.reps = exerciseDto.getReps();
        this.weight = exerciseDto.getWeight();
        this.notes = exerciseDto.getNotes();
    }

    // Constructor to create Exercise with both ExerciseDto and Workout
    public Exercise(ExerciseDto exerciseDto, Workout workout) {
        this(exerciseDto);
        this.workout = workout;
    }

}
