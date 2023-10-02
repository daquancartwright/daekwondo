// WorkoutService.java

package com.devmountain.daekwondo.services;

import com.devmountain.daekwondo.dtos.WorkoutDto;
import com.devmountain.daekwondo.entities.Workout;

import java.util.List;

public interface WorkoutService {
    List<WorkoutDto> getAllWorkouts();
    WorkoutDto getWorkoutById(Long workoutId);
    WorkoutDto createWorkout(WorkoutDto workoutDto);
    WorkoutDto updateWorkout(Long workoutId, WorkoutDto workoutDto);
    void deleteWorkout(Long workoutId);
}