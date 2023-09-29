// WorkoutDto.java

package com.devmountain.daekwondo.dtos;

import com.devmountain.daekwondo.entities.Workout;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutDto implements Serializable {
    private Long workoutId; // Primary Key
    private Long userId; // Foreign Key
    private String title;
    private String description;
    private int duration;
    private String difficultyLevel;
    private UserDto userDto;
    private List<ExerciseDto> exerciseDtos;

    public WorkoutDto(Workout workout) {
        this.workoutId = workout.getWorkoutId() != null ? workout.getWorkoutId() : 0L;
        this.userId = workout.getUser() != null ? workout.getUser().getUserId() : 0L;
        this.title = workout.getTitle() != null ? workout.getTitle() : "";
        this.description = workout.getDescription() != null ? workout.getDescription() : "";
        this.duration = workout.getDuration();
        this.difficultyLevel = workout.getDifficultyLevel() != null ? workout.getDifficultyLevel() : "";
    }
}
