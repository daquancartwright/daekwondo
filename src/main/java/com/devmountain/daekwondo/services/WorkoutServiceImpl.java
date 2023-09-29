// WorkoutServiceImpl.java

package com.devmountain.daekwondo.services;

import com.devmountain.daekwondo.dtos.WorkoutDto;
import com.devmountain.daekwondo.entities.Workout;
import com.devmountain.daekwondo.repositories.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepository workoutRepository;

    @Autowired
    public WorkoutServiceImpl(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkoutDto> getAllWorkouts() {
        List<Workout> workouts = workoutRepository.findAll();
        return workouts.stream()
                .map(WorkoutDto::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public WorkoutDto getWorkoutById(Long id) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Workout not found with ID: " + id));
        return new WorkoutDto(workout);
    }

    @Override
    @Transactional
    public WorkoutDto createWorkout(WorkoutDto workoutDto) {
        try {
            Workout workout = new Workout(workoutDto);
            workout = workoutRepository.save(workout);
            return new WorkoutDto(workout);
        } catch (Exception e) {
            // Log and return an error message
            throw new RuntimeException("Failed to create the workout. Please check your input data.");
        }
    }

    @Override
    @Transactional
    public WorkoutDto updateWorkout(Long id, WorkoutDto workoutDto) {
        Workout existingWorkout = workoutRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Workout not found with ID: " + id));

        // Update the existing workout with the new data
        existingWorkout.updateFromDto(workoutDto);

        return new WorkoutDto(workoutRepository.save(existingWorkout));
    }

    @Override
    @Transactional
    public void deleteWorkout(Long id) {
        workoutRepository.deleteById(id);
    }


}
