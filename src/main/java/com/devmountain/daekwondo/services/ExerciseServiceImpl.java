package com.devmountain.daekwondo.services;

import com.devmountain.daekwondo.entities.Exercise;
import com.devmountain.daekwondo.repositories.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseServiceImpl implements ExerciseService {
    private final ExerciseRepository exerciseRepository;

    @Autowired
    public ExerciseServiceImpl(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public Exercise getExerciseById(Long exerciseId) {
        return exerciseRepository.findById(exerciseId).orElse(null);
    }

    @Override
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @Override
    public void createExercise(Exercise exercise) {
        exerciseRepository.save(exercise);
    }

    @Override
    public void updateExercise(Exercise exercise) {
        exerciseRepository.save(exercise);
    }

    @Override
    public void deleteExercise(Long exerciseId) {
        exerciseRepository.deleteById(exerciseId);
    }
}
