package com.devmountain.daekwondo.services;

import com.devmountain.daekwondo.entities.Workout;

import java.util.List;

public interface WorkoutService {
    Workout getWorkoutById(Long workoutId);
    List<Workout> getAllWorkouts();
    void createWorkout(Workout workout);
    void updateWorkout(Workout workout);
    void deleteWorkout(Long workoutId);
}
