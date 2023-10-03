// ExerciseRepository.java

package com.devmountain.daekwondo.repositories;

import com.devmountain.daekwondo.entities.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    @Query("SELECT e FROM Exercise e WHERE e.workout.workoutId = :workoutId")
    List<Exercise> findByWorkout_WorkoutId(Long workoutId);
}