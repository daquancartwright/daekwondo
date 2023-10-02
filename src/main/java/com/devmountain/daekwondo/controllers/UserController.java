// UserController.java

package com.devmountain.daekwondo.controllers;

import com.devmountain.daekwondo.dtos.UserDto;
import com.devmountain.daekwondo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register User Method
    @PostMapping("/register")
    public List<String> addUser(@RequestBody UserDto userDto) {
        String passHash = passwordEncoder.encode(userDto.getPassword());
        userDto.setPassword(passHash);
        return userService.addUser(userDto);
    }

    // Login Method
    @PostMapping("/login")
    public List<String> userLogin(@RequestBody UserDto userDto) { return userService.userLogin(userDto); }

    // Get User Information
    @GetMapping("/{userId}")
    public UserDto getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }}