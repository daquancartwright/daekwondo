// dashboard.js

// Cookie
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];

console.log(userId)

// DOM Elements
const userStatsContainer = document.getElementById("user-stats");

// Headers
const headers = {
    'Content-Type': 'application/json'
}

// User Info API Endpoint URL
const userApiUrl = `http://localhost:8888/api/v1/users/${userId}`;

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

// Call the functions to fetch and populate the data
getUserInfo(userId);

