// WorkoutRepository.java

package com.devmountain.daekwondo.repositories;

import com.devmountain.daekwondo.entities.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUserUserId(Long userId);
}