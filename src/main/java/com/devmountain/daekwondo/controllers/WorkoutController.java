// WorkoutController.java

package com.devmountain.daekwondo.controllers;

import com.devmountain.daekwondo.dtos.WorkoutDto;
import com.devmountain.daekwondo.services.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/workouts")
public class WorkoutController {
    private final WorkoutService workoutService;

    @Autowired
    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    // Create a new workout
    @PostMapping("/create")
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

    // Get all workouts
    @GetMapping("/all")
    public List<WorkoutDto> getAllWorkouts() {
        return workoutService.getAllWorkouts();
    }

    // Get workout by ID
    @GetMapping("/{workoutId}")
    public WorkoutDto getWorkoutById(@PathVariable Long workoutId) {
        return workoutService.getWorkoutById(workoutId);
    }
}