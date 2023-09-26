package com.devmountain.daekwondo.repositories;

import com.devmountain.daekwondo.entities.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
}
