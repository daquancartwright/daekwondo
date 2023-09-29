// ExerciseService.java

package com.devmountain.daekwondo.services;

import com.devmountain.daekwondo.dtos.ExerciseDto;
import com.devmountain.daekwondo.entities.Exercise;

import java.util.List;

public interface ExerciseService {
    List<ExerciseDto> getAllExercises();
    ExerciseDto getExerciseById(Long exerciseId);
    ExerciseDto createExercise(ExerciseDto exerciseDto);
    ExerciseDto updateExercise(Long exerciseId, ExerciseDto exerciseDto);
    void deleteExercise(Long exerciseId);
}

