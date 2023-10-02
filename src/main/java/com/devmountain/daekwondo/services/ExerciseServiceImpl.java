// ExerciseServiceImpl.java

package com.devmountain.daekwondo.services;

import com.devmountain.daekwondo.dtos.ExerciseDto;
import com.devmountain.daekwondo.entities.Exercise;
import com.devmountain.daekwondo.exceptions.ExerciseNotFoundException;
import com.devmountain.daekwondo.repositories.ExerciseRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;

    @Autowired
    public ExerciseServiceImpl(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExerciseDto> getAllExercises() {
        List<Exercise> exercises = exerciseRepository.findAll();
        List<ExerciseDto> exerciseDtos = new ArrayList<>();
        for (Exercise exercise : exercises) {
            ExerciseDto exerciseDto = new ExerciseDto();
            BeanUtils.copyProperties(exercise, exerciseDto);
            exerciseDtos.add(exerciseDto);
        }
        return exerciseDtos;
    }

    @Override
    @Transactional(readOnly = true)
    public ExerciseDto getExerciseById(Long exerciseId) {
        Optional<Exercise> optionalExercise = exerciseRepository.findById(exerciseId);
        if (optionalExercise.isPresent()) {
            ExerciseDto exerciseDto = new ExerciseDto();
            BeanUtils.copyProperties(optionalExercise.get(), exerciseDto);
            return exerciseDto;
        } else {
            throw new ExerciseNotFoundException("Exercise with ID " + exerciseId + " not found");
        }
    }

    @Override
    @Transactional
    public ExerciseDto createExercise(ExerciseDto exerciseDto) {
        Exercise exercise = new Exercise();
        BeanUtils.copyProperties(exerciseDto, exercise);
        Exercise savedExercise = exerciseRepository.save(exercise);
        BeanUtils.copyProperties(savedExercise, exerciseDto);
        return exerciseDto;
    }

    @Override
    @Transactional
    public ExerciseDto updateExercise(Long exerciseId, ExerciseDto exerciseDto) {
        Optional<Exercise> optionalExercise = exerciseRepository.findById(exerciseId);
        if (optionalExercise.isPresent()) {
            Exercise exercise = optionalExercise.get();
            BeanUtils.copyProperties(exerciseDto, exercise);
            Exercise updatedExercise = exerciseRepository.save(exercise);
            BeanUtils.copyProperties(updatedExercise, exerciseDto);
            return exerciseDto;
        } else {
            throw new ExerciseNotFoundException("Exercise with ID " + exerciseId + " not found");
        }
    }

    @Override
    @Transactional
    public void deleteExercise(Long exerciseId) {
        exerciseRepository.deleteById(exerciseId);
    }
}