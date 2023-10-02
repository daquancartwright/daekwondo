// workouts.js

// DOM Elements
const createWorkoutForm = document.getElementById("create-workout-form");

// Headers
const headers = {
    'Content-Type': 'application/json',
};

// API Endpoint URL for creating workouts
const createWorkoutApiUrl = "http://localhost:8888/api/v1/workouts/create"; // Adjust this URL as needed

// Function to handle the submission of the workout creation form
const handleSubmit = async (e) => {
    e.preventDefault();

    // Get values from the form
    const title = document.getElementById("workout-title").value;
    const duration = document.getElementById("workout-duration").value;
    const difficulty = document.getElementById("workout-difficulty").value;
    const description = document.getElementById("workout-description").value;

    // Create a workout object
    const workoutObj = {
        title,
        duration,
        difficulty,
        description,
        // Add more fields here as needed for your workout schema
    };

    // Send a POST request to create the workout
    try {
        const response = await fetch(createWorkoutApiUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(workoutObj),
        });

        if (response.status === 201) {
            // Workout created successfully, you can redirect or show a success message
            console.log("Workout created successfully");
            // Example: window.location.href = "/dashboard.html";
        } else {
            console.error("Error creating workout");
        }
    } catch (error) {
        console.error("Error creating workout:", error);
    }
};

// Add a submit event listener to the form
createWorkoutForm.addEventListener("submit", handleSubmit);
