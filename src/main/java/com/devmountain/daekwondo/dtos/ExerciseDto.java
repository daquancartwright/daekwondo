// ExerciseDto.java

package com.devmountain.daekwondo.dtos;

import com.devmountain.daekwondo.entities.Exercise;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseDto implements Serializable {
    private Long exerciseId; // Primary Key
    private String exerciseName;
    private int sets;
    private int reps;
    private double weight;
    private String notes;

    public ExerciseDto(Exercise exercise) {
        this.exerciseId = exercise.getExerciseId() != null ? exercise.getExerciseId() : 0L;
        this.exerciseName = exercise.getExerciseName() != null ? exercise.getExerciseName() : "";
        this.sets = exercise.getSets();
        this.reps = exercise.getReps();
        this.weight = exercise.getWeight();
        this.notes = exercise.getNotes() != null ? exercise.getNotes() : "";
    }
}
