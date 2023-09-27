package com.devmountain.daekwondo.controllers;

import com.devmountain.daekwondo.dtos.WorkoutDto;
import com.devmountain.daekwondo.services.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/workouts")
public class WorkoutController {
    @Autowired
    private WorkoutService workoutService;

    // Create a new workout
    @PostMapping
    public WorkoutDto createWorkout(@RequestBody WorkoutDto workoutDto) {
        return workoutService.createWorkout(workoutDto);
    }

    // Update an existing workout by ID
    @PutMapping("/{workoutId}")
    public WorkoutDto updateWorkout(@PathVariable Long workoutId, @RequestBody WorkoutDto workoutDto) {
        return workoutService.updateWorkout(workoutId, workoutDto);
    }

    // Delete a workout by ID
    @DeleteMapping("/{workoutId}")
    public void deleteWorkout(@PathVariable Long workoutId) {
        workoutService.deleteWorkout(workoutId);
    }
}
