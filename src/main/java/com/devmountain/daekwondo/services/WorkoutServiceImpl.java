package com.devmountain.daekwondo.services;

import com.devmountain.daekwondo.entities.Workout;
import com.devmountain.daekwondo.repositories.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutServiceImpl implements WorkoutService {
    private final WorkoutRepository workoutRepository;

    @Autowired
    public WorkoutServiceImpl(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    @Override
    public Workout getWorkoutById(Long workoutId) {
        return workoutRepository.findById(workoutId).orElse(null);
    }

    @Override
    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    @Override
    public void createWorkout(Workout workout) {
        workoutRepository.save(workout);
    }

    @Override
    public void updateWorkout(Workout workout) {
        workoutRepository.save(workout);
    }

    @Override
    public void deleteWorkout(Long workoutId) {
        workoutRepository.deleteById(workoutId);
    }
}
