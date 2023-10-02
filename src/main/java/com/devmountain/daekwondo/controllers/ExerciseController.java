// ExerciseController.java

package com.devmountain.daekwondo.controllers;

import com.devmountain.daekwondo.dtos.ExerciseDto;
import com.devmountain.daekwondo.services.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/exercises")
public class ExerciseController {
    @Autowired
    private ExerciseService exerciseService;

    // Create an Exercise
    @PostMapping("/create")
    public ExerciseDto createExercise(@RequestBody ExerciseDto exerciseDto) {
        return exerciseService.createExercise(exerciseDto);
    }

    // Update an Exercise by ID
    @PutMapping("/{exerciseId}")
    public ExerciseDto updateExercise(@PathVariable Long exerciseId, @RequestBody ExerciseDto exerciseDto) {
        return exerciseService.updateExercise(exerciseId, exerciseDto);
    }

    // Delete an Exercise by ID
    @DeleteMapping("/{exerciseId}")
    public void deleteExercise(@PathVariable Long exerciseId) {
        exerciseService.deleteExercise(exerciseId);
    }

    // Get all Exercises
    @GetMapping("/all")
    public List<ExerciseDto> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    // Get Exercise by ID
    @GetMapping("/{exerciseId}")
    public ExerciseDto getExerciseById(@PathVariable Long exerciseId) {
        return exerciseService.getExerciseById(exerciseId);
    }
}