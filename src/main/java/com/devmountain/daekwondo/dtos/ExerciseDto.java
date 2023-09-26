package com.devmountain.daekwondo.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseDto {
    private Long exerciseId;
    private String exerciseName;
    private int sets;
    private int reps;
    private double weight;
    private String notes;
}
