// DOM Elements
const createWorkoutForm = document.getElementById("create-workout-form");
const addExerciseButton = document.getElementById("add-exercise-button");
const exerciseForm = document.querySelector(".exercise-form");
const exerciseDtos = [];

// Cookie
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];
//const userId = 11;

// Initially hide the exercise form
exerciseForm.style.display = "none";

////////////////////////////////////////////// Create an Exercise //////////////////////////////////////////////
const exerciseApiUrl = "http://localhost:8888/api/v1/exercises/create"

// Function to handle the creation of exercise DTOs
const createExercise = async () => {
    const exerciseName = document.getElementById("exercise-name").value;
    const sets = parseInt(document.getElementById("exercise-sets").value);
    const reps = parseInt(document.getElementById("exercise-reps").value);
    const weight = parseFloat(document.getElementById("exercise-weight").value);
    const notes = document.getElementById("exercise-notes").value;

    // Create an exercise DTO object
    const exerciseDto = {
        exerciseName,
        sets,
        reps,
        weight,
        notes,
    };

    // Add the exerciseDto to the exerciseDtos array
    exerciseDtos.push(exerciseDto);

    // Clear the input fields after creating an exercise
    document.getElementById("exercise-name").value = "";
    document.getElementById("exercise-sets").value = "";
    document.getElementById("exercise-reps").value = "";
    document.getElementById("exercise-weight").value = "";
    document.getElementById("exercise-notes").value = "";

//////////////////////////////////////////////////////////////////////////////////

    // Update the "Added Exercises" section
        const exerciseTable = document.getElementById("exercise-table");

        // If this is the first exercise added, create the table structure
        if (exerciseTable.children.length === 0) {
            const headerRow = exerciseTable.insertRow();
            const headerCells = ["Exercise Name", "Sets", "Reps", "Weight", "Notes"];

            // Create header cells
            headerCells.forEach((headerText) => {
                const headerCell = document.createElement("th");
                headerCell.textContent = headerText;
                headerRow.appendChild(headerCell);
            });
        }

        // Create a new row for the exercise
        const exerciseRow = exerciseTable.insertRow();
        const exerciseValues = [exerciseName, sets, reps, weight, notes];

        // Create cells for exercise values
        exerciseValues.forEach((value) => {
            const exerciseCell = exerciseRow.insertCell();
            exerciseCell.textContent = value;
        });

};

// Add a click event listener to the "Add Exercise" button
addExerciseButton.addEventListener("click", () => {
    // Show the exercise form when the button is clicked
    exerciseForm.style.display = "block";
    // Focus on the first input field
    document.getElementById("exercise-name").focus();
});

// Add a click event listener to the "Create Exercise" button inside the exercise form
document.getElementById("create-exercise-button").addEventListener("click", () => {
    // Hide the exercise form after creating an exercise
    exerciseForm.style.display = "none";
    // Call the createExercise function to handle exercise creation
    createExercise();
});

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
    const difficultyLevel = document.getElementById("workout-difficulty").value;
    const description = document.getElementById("workout-description").value;

    // Create a workout object
    const workoutObj = {
        userId,
        title,
        duration,
        difficultyLevel,
        description,
        exerciseDtos,
        // Add more fields here as needed for your workout schema
    };

    // Log the workoutObj to verify the information
    console.log("workoutObj:", workoutObj);

    // Clear the exercise table
        const exerciseTable = document.getElementById("exercise-table");
        const rowCount = exerciseTable.rows.length;
        for (let i = rowCount - 1; i > 0; i--) {
            exerciseTable.deleteRow(i);
        }

        // Display an alert with the workout name
        alert(`${title} Workout created successfully!`);

    // Send a POST request to create the workout
    try {
        const response = await fetch(createWorkoutApiUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(workoutObj),
        });

        if (response.status === 200) {
            // Workout created successfully, you can redirect or show a success message
            console.log("Workout created successfully");
            // Example: window.location.href = "/dashboard.html";
        } else {
            console.error("Error creating workout 1");
        }
    } catch (error) {
        console.error("Error creating workout 2:", error);
    }
};

// Add a submit event listener to the form
createWorkoutForm.addEventListener("submit", handleSubmit);
