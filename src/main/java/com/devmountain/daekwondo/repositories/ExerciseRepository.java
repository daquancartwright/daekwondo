package com.devmountain.daekwondo.repositories;

import com.devmountain.daekwondo.entities.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
}
