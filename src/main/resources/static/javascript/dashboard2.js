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
    workoutImage.src = "https://www.mensjournal.com/.image/t_share/MTk2MTM3NDUxNzA0NzU1MzQ1/man-lifting-main.jpg"; // Set the image source
    workoutImage.alt = "Workout Image";
    workoutImage.classList.add("workout-image");

    const workoutTitle = document.createElement("h3");
    workoutTitle.classList.add("workout-title");
    workoutTitle.textContent = workout.title;

    // Create a div for the detailed view (hidden by default)
    const detailedView = document.createElement("div");
    detailedView.classList.add("detailed-view");
    detailedView.style.display = "none"; // Initially hide detailed view

    // Populate detailed view with workout information
    const workoutDescription = document.createElement("p");
    workoutDescription.classList.add("centered-text"); // Centered text class
    workoutDescription.textContent = `Description:`;

    const workoutDescriptionText = document.createElement("p");
    workoutDescriptionText.classList.add("centered-text"); // Centered text class
    workoutDescriptionText.textContent = workout.description;

    const workoutDuration = document.createElement("p");
    workoutDuration.classList.add("centered-text"); // Centered text class
    workoutDuration.textContent = `Duration: ${workout.duration} minutes`;

    const workoutDifficulty = document.createElement("p");
    workoutDifficulty.classList.add("centered-text"); // Centered text class
    workoutDifficulty.textContent = `Difficulty: ${workout.difficultyLevel}`;

    // Append elements to the initial view
    initialView.appendChild(workoutImage);
    initialView.appendChild(workoutTitle);

    // Append elements to the detailed view
    detailedView.appendChild(workoutDescription);
    detailedView.appendChild(workoutDescriptionText);
    detailedView.appendChild(workoutDuration);
    detailedView.appendChild(workoutDifficulty);

    // Create a container for exercises
    const exercisesContainer = document.createElement("div");
    exercisesContainer.classList.add("exercises-container");

    // Function to add exercises to the container
    function addExercise(exercise) {
        const exerciseInfo = document.createElement("p");
        exerciseInfo.classList.add("centered-text"); // Centered text class
        const exerciseText = `${exercise.exerciseName}: ${exercise.weight} lbs`;
        const exerciseSetsReps = document.createElement("p");
        exerciseSetsReps.classList.add("centered-text"); // Centered text class
        exerciseSetsReps.textContent = `${exercise.sets}x ${exercise.reps}x`;
        exerciseInfo.textContent = exerciseText;
        exercisesContainer.appendChild(exerciseInfo);
        exercisesContainer.appendChild(exerciseSetsReps);
    }

    // Get exercises by workout ID and add them to the container
    async function loadExercises() {
        try {
            const response = await fetch(`http://localhost:8888/api/v1/exercises/workout/${workout.workoutId}`, {
                method: "GET",
                headers: headers,
            });
            const exerciseData = await response.json();
            exerciseData.forEach(addExercise);
        } catch (error) {
            console.error("Error fetching exercises by workout ID:", error);
        }
    }

    // Add click event listener to toggle detailed view and load exercises
    initialView.addEventListener("click", () => {
        if (detailedView.style.display === "none") {
            detailedView.style.display = "block";
            loadExercises(); // Load exercises when expanded
        } else {
            detailedView.style.display = "none";
            exercisesContainer.innerHTML = ""; // Clear exercises when collapsed
        }
    });

    // Append initial view and detailed view to the workout card
    workoutCard.appendChild(initialView);
    workoutCard.appendChild(detailedView);
    workoutCard.appendChild(exercisesContainer);

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



// Call the functions to fetch and populate user data and workout cards
getUserInfo(userId);
getWorkouts(userId);
