package com.devmountain.daekwondo.services;

import com.devmountain.daekwondo.entities.Exercise;

import java.util.List;

public interface ExerciseService {
    Exercise getExerciseById(Long exerciseId);
    List<Exercise> getAllExercises();
    void createExercise(Exercise exercise);
    void updateExercise(Exercise exercise);
    void deleteExercise(Long exerciseId);
}

