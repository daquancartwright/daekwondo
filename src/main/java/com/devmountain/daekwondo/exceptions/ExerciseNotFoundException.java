package com.devmountain.daekwondo.exceptions;

public class ExerciseNotFoundException extends RuntimeException{
    public ExerciseNotFoundException(String message) {
        super(message);
    }
}