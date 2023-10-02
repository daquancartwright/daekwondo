// UserService.java

package com.devmountain.daekwondo.services;

import com.devmountain.daekwondo.dtos.UserDto;
import com.devmountain.daekwondo.entities.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserService {
    @Transactional
    List<String> addUser(UserDto userDto);
    List<String> userLogin(UserDto userDto);
    UserDto getUserById(Long userId);
}