// dashboard.js

document.addEventListener("DOMContentLoaded", () => {

// Cookie
const cookieArr = document.cookie.split("=");
const userId = cookieArr[1];
console.log(userId);

// DOM Elements
const userStatsContainer = document.getElementById("user-stats");
const workoutsList = document.getElementById("workouts-list");
const workoutDetails = document.getElementById("workoutDetails"); // Changed querySelector to getElementById
const workoutTitleElement = document.getElementById("workoutTitle");
const workoutDescriptionElement = document.getElementById("workoutDescription");
const workoutDurationElement = document.getElementById("workoutDuration");
const workoutDifficultyElement = document.getElementById("workoutDifficulty");
const exerciseListElement = document.getElementById("exerciseList");
const deleteWorkoutButton = document.getElementById("deleteWorkoutButton"); // Added this line
const addExerciseButtton = document.getElementById("add-exercise-button"); // Added this line
const exerciseForm = document.getElementById("exercise-form");
let workoutsData = []

const workoutImages = [
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2669&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    "https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2704&q=80",
    "https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    "https://prod-ne-cdn-media.puregym.com/media/819394/gym-workout-plan-for-gaining-muscle_header.jpg?quality=80",
    "https://images.unsplash.com/photo-1480264104733-84fb0b925be3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6PkGFkQcqySesYpLXDeoV0tvg0Dq7kAGBqA&usqp=CAU",
    "https://mensfitness.co.uk/wp-content/uploads/sites/2/2023/07/shutterstock_2313734745-2.jpg?w=900"
]

// Add Exercise Button Click Event
addExerciseButtton.addEventListener("click", () => {
    // Toggle the visibility of the exercise form
    if (exerciseForm.style.display === "none" || exerciseForm.style.display === "") {
        exerciseForm.style.display = "block"; // Show the exercise form
    } else {
        exerciseForm.style.display = "none"; // Hide the exercise form
    }
});

// Headers
const headers = {
    'Content-Type': 'application/json'
};

// User Info API Endpoint URL
const userApiUrl = `http://localhost:8888/api/v1/users/${userId}`;
const workoutsApiUrl = `http://localhost:8888/api/v1/workouts/user/${userId}`;

// Function to get user information and populate the user-stats section
async function getUserInfo(userId) {
    try {
        const response = await fetch(userApiUrl, {
            method: "GET",
            headers: headers
        });
        const userData = await response.json();

        // Populate user data
        const userNameElement = document.getElementById("user-name");
        const userHeightElement = document.getElementById("user-height");
        const userWeightElement = document.getElementById("user-weight");

        userNameElement.textContent = userData.name;
        userHeightElement.textContent = userData.height;
        userWeightElement.textContent = userData.weight;

    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// Function to create workout cards with initial view
function createWorkoutCard(workout) {
    // Create elements for the workout card
    const workoutCard = document.createElement("div");
    workoutCard.classList.add("workout-card");

    // Create a div for the initial view
    const initialView = document.createElement("div");
    initialView.classList.add("initial-view");

    // Assign an image URL based on the workout's index in the array
    const imageIndex = workoutsData.indexOf(workout) % workoutImages.length;
    const workoutImage = document.createElement("img");
    workoutImage.src = workoutImages[imageIndex]; // Set the image source
    workoutImage.alt = "Workout Image";
    workoutImage.classList.add("workout-image");

    const workoutTitle = document.createElement("h3");
    workoutTitle.classList.add("workout-title");
    workoutTitle.textContent = workout.title;

    // Append elements to the initial view
    initialView.appendChild(workoutImage);
    initialView.appendChild(workoutTitle);

    // Add click event listener to show workout details when clicked
    initialView.addEventListener("click", (event) => {
        // Prevent the click event from propagating to the body click event
        event.stopPropagation();

        // Populate workout details
        workoutTitleElement.textContent = workout.title;
        workoutDescriptionElement.textContent = `Description: ${workout.description}`;
        workoutDurationElement.textContent = `Duration: ${workout.duration} minutes`;
        workoutDifficultyElement.textContent = `Difficulty: ${workout.difficultyLevel}`;

        // Load exercises
        loadExercises(workout.workoutId);

        // Display workout details
        workoutDetails.style.display = "block";

        // Set the delete button's click event handler to delete the specific workout
        deleteWorkoutButton.onclick = () => {
            deleteWorkout(workout.workoutId);
        };
    });

    // Append initial view to the workout card
    workoutCard.appendChild(initialView);

    return workoutCard;
}

// Function to fetch and populate workout cards (continued)
async function getWorkouts(userId) {
    try {
        const response = await fetch(workoutsApiUrl, {
            method: "GET",
            headers: headers
        });
        workoutsData = await response.json(); // Assign the response to the global variable

        // Clear existing workout cards
        workoutsList.innerHTML = "";

        // Create workout cards for each workout
        workoutsData.forEach((workout) => {
            const workoutCard = createWorkoutCard(workout);

            // Append the workout card to the workouts list
            workoutsList.appendChild(workoutCard);
        });

    } catch (error) {
        console.error("Error fetching workouts data:", error);
    }
}

// Function to delete a workout by ID
function deleteWorkout(workoutId) {
    // Make an API request to delete the workout by ID
    fetch(`http://localhost:8888/api/v1/workouts/${workoutId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Workout deleted successfully, you can update the UI or take other actions as needed
            console.log(`Workout with ID ${workoutId} deleted successfully.`);

            // Reload the page to reflect the changes
            location.reload();

        } else {
            // Handle errors or display an error message
            console.error(`Error deleting workout with ID ${workoutId}`);
        }
    })
    .catch(error => {
        console.error("Error deleting workout:", error);
    });
}

// Function to load exercises by workout ID and populate the exerciseList
async function loadExercises(workoutId) {
    try {
        const response = await fetch(`http://localhost:8888/api/v1/exercises/workout/${workoutId}`, {
            method: "GET",
            headers: headers,
        });
        const exerciseData = await response.json();

        // Clear existing exercise list
        exerciseListElement.innerHTML = "";

        // Create a table to organize the exercises
        const exerciseTable = document.createElement("table");
        exerciseTable.classList.add("exercise-table");

        // Create table headers row
        const headersRow = document.createElement("tr");

        // Create headers for Exercise, Weight, and Sets/Reps
        const exerciseHeader = document.createElement("th");
        exerciseHeader.textContent = "Exercise";
        const weightHeader = document.createElement("th");
        weightHeader.textContent = "Weight";
        const setsRepsHeader = document.createElement("th");
        setsRepsHeader.textContent = "Sets";

        // Append headers to the headers row
        headersRow.appendChild(exerciseHeader);
        headersRow.appendChild(weightHeader);
        headersRow.appendChild(setsRepsHeader);

        // Append headers row to the table
        exerciseTable.appendChild(headersRow);

        // Loop through exercise data
        exerciseData.forEach((exercise) => {
            // Create a row for each exercise
            const exerciseRow = document.createElement("tr");

            // Create a cell for exercise name
            const exerciseCell = document.createElement("td");
            exerciseCell.textContent = exercise.exerciseName;
            exerciseRow.appendChild(exerciseCell);

            // Create a cell for weight
            const weightCell = document.createElement("td");
            weightCell.textContent = `${exercise.weight} lbs`;
            exerciseRow.appendChild(weightCell);

            // Create a cell for sets and reps
            const setsRepsCell = document.createElement("td");

            // Create an array to hold the repetitions
            const repsArray = [];
            for (let i = 0; i < exercise.sets; i++) {
                repsArray.push(`${exercise.reps}x`);
            }

            // Format sets and reps
            setsRepsCell.textContent = repsArray.join(" ");
            exerciseRow.appendChild(setsRepsCell);

            // Add the exercise row to the table
            exerciseTable.appendChild(exerciseRow);
        });

        // Append the table to the exercise list element
        exerciseListElement.appendChild(exerciseTable);

    } catch (error) {
        console.error("Error fetching exercises by workout ID:", error);
    }
}

// Call the functions to fetch and populate user data and workout cards
getUserInfo(userId);
getWorkouts(userId);

});
