// Cookie
const cookieArr = document.cookie.split("=");
const userId = cookieArr[1];
console.log(userId);

// DOM Elements
const userStatsContainer = document.getElementById("user-stats");
const workoutsList = document.getElementById("workouts-list");
const workoutDetails = document.querySelector(".workoutDetails");
const workoutTitleElement = document.getElementById("workoutTitle");
const workoutDescriptionElement = document.getElementById("workoutDescription");
const workoutDurationElement = document.getElementById("workoutDuration");
const workoutDifficultyElement = document.getElementById("workoutDifficulty");
const exerciseListElement = document.getElementById("exerciseList");

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
        const userAgeElement = document.getElementById("user-age");
        const userHeightElement = document.getElementById("user-height");
        const userWeightElement = document.getElementById("user-weight");

        userNameElement.textContent = userData.name;
        userAgeElement.textContent = userData.age;
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

    // Create a div for the close "x" icon
    const closeIcon = document.createElement("div");
    closeIcon.classList.add("close-icon");
    closeIcon.textContent = "x"; // You can customize the styling of this "x" icon with CSS

    // Create an event listener to delete the workout
    closeIcon.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent the click from propagating to the workout card
        deleteWorkout(workout.workoutId);
    });

    const workoutImage = document.createElement("img");
    workoutImage.src = "https://www.mensjournal.com/.image/t_share/MTk2MTM3NDUxNzA0NzU1MzQ1/man-lifting-main.jpg"; // Set the image source
    workoutImage.alt = "Workout Image";
    workoutImage.classList.add("workout-image");

    const workoutTitle = document.createElement("h3");
    workoutTitle.classList.add("workout-title");
    workoutTitle.textContent = workout.title;

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
    });

    // Add click event listener to the document body
    document.body.addEventListener("click", (event) => {
        const clickedElement = event.target;

        // Check if the click target is not the workout card
        if (!workoutCard.contains(clickedElement)) {
            // Hide the workout details
            workoutDetails.style.display = "none";
        }
    });

    // Prevent clicks within workoutDetails from closing it
    workoutDetails.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    // Append elements to the initial view
    initialView.appendChild(closeIcon);
    initialView.appendChild(workoutImage);
    initialView.appendChild(workoutTitle);

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
        const workoutsData = await response.json();

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
