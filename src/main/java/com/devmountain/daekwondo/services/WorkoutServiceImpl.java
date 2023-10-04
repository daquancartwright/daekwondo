package com.devmountain.daekwondo.services;

import com.devmountain.daekwondo.dtos.ExerciseDto;
import com.devmountain.daekwondo.dtos.WorkoutDto;
import com.devmountain.daekwondo.entities.Exercise;
import com.devmountain.daekwondo.entities.Workout;
import com.devmountain.daekwondo.repositories.WorkoutRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    public List<WorkoutDto> getWorkoutsByUserId(Long userId) {
        List<Workout> workouts = workoutRepository.findByUserUserId(userId);
        return workouts.stream()
                .map(WorkoutDto::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkoutDto> getAllWorkouts() {
        List<Workout> workouts = workoutRepository.findAll();
        List<WorkoutDto> workoutDtos = new ArrayList<>();
        for (Workout workout : workouts) {
            WorkoutDto workoutDto = new WorkoutDto();
            BeanUtils.copyProperties(workout, workoutDto);
            workoutDtos.add(workoutDto);
        }
        return workoutDtos;
    }

    @Override
    @Transactional(readOnly = true)
    public WorkoutDto getWorkoutById(Long workoutId) {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new IllegalArgumentException("Workout not found with ID: " + workoutId));
        WorkoutDto workoutDto = new WorkoutDto();
        BeanUtils.copyProperties(workout, workoutDto);
        return workoutDto;
    }

    @Override
    @Transactional
    public WorkoutDto createWorkout(WorkoutDto workoutDto) {
        Workout workout = new Workout(workoutDto);
        workout.setExercises(mapExerciseDtos(workoutDto.getExerciseDtos(), workout));
        workout = workoutRepository.save(workout);
        workoutDto.setWorkoutId(workout.getWorkoutId());
        return workoutDto;
    }

    @Override
    @Transactional
    public WorkoutDto updateWorkout(Long workoutId, WorkoutDto workoutDto) {
        Workout existingWorkout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new IllegalArgumentException("Workout not found with ID: " + workoutId));

        existingWorkout.updateFromDto(workoutDto);
        existingWorkout.setExercises(mapExerciseDtos(workoutDto.getExerciseDtos(), existingWorkout));

        existingWorkout = workoutRepository.save(existingWorkout);
        BeanUtils.copyProperties(existingWorkout, workoutDto);
        return workoutDto;
    }

    @Override
    @Transactional
    public void deleteWorkout(Long workoutId) {
        workoutRepository.deleteById(workoutId);
    }

    private List<Exercise> mapExerciseDtos(List<ExerciseDto> exerciseDtos, Workout workout) {
        List<Exercise> exercises = new ArrayList<>();
        if (exerciseDtos != null) {
            for (ExerciseDto exerciseDto : exerciseDtos) {
                Exercise exercise = new Exercise(exerciseDto, workout);
                exercises.add(exercise);
            }
        }
        return exercises;
    }
}