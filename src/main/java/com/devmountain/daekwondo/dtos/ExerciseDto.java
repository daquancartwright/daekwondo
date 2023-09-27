package com.devmountain.daekwondo.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseDto implements Serializable {
    private Long exerciseId;
    private String exerciseName;
    private int sets;
    private int reps;
    private double weight;
    private String notes;

    public ExerciseDto(String exerciseName, int sets, int reps, double weight, String notes) {
        this.exerciseName = exerciseName;
        this.sets = sets;
        this.reps = reps;
        this.weight = weight;
        this.notes = notes;
    }
}
