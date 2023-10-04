//dashboard.js

// Cookie
const cookieArr = document.cookie.split("=");
const userId = cookieArr[1];
console.log(userId);

// DOM Elements
const userStatsContainer = document.getElementById("user-stats");
const workoutsList = document.getElementById("workouts-list");

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

    const workoutImage = document.createElement("img");
    workoutImage.src = "workout-image.jpg"; // Set the image source
    workoutImage.alt = "Workout Image";

    const workoutTitle = document.createElement("h3");
    workoutTitle.classList.add("workout-title");
    workoutTitle.textContent = workout.title;

    // Add a button to show/hide detailed view
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-button");
    toggleButton.textContent = "Show Details";

    // Create a div for the detailed view (hidden by default)
    const detailedView = document.createElement("div");
    detailedView.classList.add("detailed-view");
    detailedView.style.display = "none"; // Initially hide detailed view

    // Create a container for exercises and hide it initially
    const exerciseContainer = document.createElement("div");
    exerciseContainer.classList.add("exercise-container");
    exerciseContainer.style.display = "none"; // Initially hide exercise container

    // Populate detailed view with workout information
    const workoutDescription = document.createElement("p");
    workoutDescription.textContent = `Description: ${workout.description}`;

    const workoutDuration = document.createElement("p");
    workoutDuration.textContent = `Duration: ${workout.duration} minutes`;

    const workoutDifficulty = document.createElement("p");
    workoutDifficulty.textContent = `Difficulty: ${workout.difficultyLevel}`;

    // Append elements to the initial view
    initialView.appendChild(workoutImage);
    initialView.appendChild(workoutTitle);
    initialView.appendChild(toggleButton);

    // Append elements to the detailed view
    detailedView.appendChild(workoutDescription);
    detailedView.appendChild(workoutDuration);
    detailedView.appendChild(workoutDifficulty);
    detailedView.appendChild(exerciseContainer);

    // Add click event listener to toggle detailed view
    toggleButton.addEventListener("click", () => {
        if (detailedView.style.display === "none") {
            detailedView.style.display = "block";
            exerciseContainer.style.display = "block"; // Show exercise details
        } else {
            detailedView.style.display = "none";
            exerciseContainer.style.display = "none"; // Hide exercise details
        }
    });

    // Append initial view and detailed view to the workout card
    workoutCard.appendChild(initialView);
    workoutCard.appendChild(detailedView);
//    workoutCard.appendChild(exerciseContainer);

    return workoutCard;
}

// Function to fetch and populate workout cards
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
        workoutsData.forEach(async (workout) => {
            const workoutCard = createWorkoutCard(workout);

            // Get exercises by workout ID
            const exercises = await getExercisesByWorkoutId(workout.workoutId);

            // Create a container for exercises and append them to the workout card
            const exerciseContainer = document.createElement("div");
            exerciseContainer.classList.add("exercise-container");

            exercises.forEach((exercise) => {
                const exerciseItem = document.createElement("p");
                exerciseItem.textContent = `${exercise.exerciseName}, Sets: ${exercise.sets}, Reps: ${exercise.reps}, Weight: ${exercise.weight}`;
                exerciseContainer.appendChild(exerciseItem);
            });

            workoutCard.appendChild(exerciseContainer);

            // Append the workout card to the workouts list
            workoutsList.appendChild(workoutCard);
        });

    } catch (error) {
        console.error("Error fetching workouts data:", error);
    }
}

// Function to get exercises by workout ID
async function getExercisesByWorkoutId(workoutId) {
    try {
        const response = await fetch(`http://localhost:8888/api/v1/exercises/workout/${workoutId}`, {
            method: "GET",
            headers: headers,
        });
        const exerciseData = await response.json();
        return exerciseData;
    } catch (error) {
        console.error("Error fetching exercises by workout ID:", error);
    }
}

// Call the functions to fetch and populate user data and workout cards
getUserInfo(userId);
getWorkouts(userId);
