// UserRepository.java

package com.devmountain.daekwondo.repositories;

import com.devmountain.daekwondo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String userName);
//    Optional<User> findByUserId(String userName);
}
