// register.js
const registerForm = document.getElementById("register-form");
const registerUsername = document.getElementById("register-username");
const registerPassword = document.getElementById("register-password");
const registerName = document.getElementById("register-name"); // Added for name
const registerAge = document.getElementById("register-age"); // Added for age
const registerHeight = document.getElementById("register-height"); // Added for height
const registerWeight = document.getElementById("register-weight"); // Added for weight

const headers = {
    "Content-Type": "application/json"
};

const baseUrl = "http://localhost:8888/api/v1/users";

// Create a function that will handle submitting the form.
const handleSubmit = async (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();

    // Grab the value's of the inputs and store them inside an object for the POST request
    let bodyObj = {
        username: registerUsername.value,
        password: registerPassword.value,
        name: registerName.value,
        age: registerAge.value,
        height: registerHeight.value,
        weight: registerWeight.value
    };

    // Make request
    const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: headers
    }).catch((err) => console.error(err.message));

    const responseArr = await response.json();

    if (response.status === 200) {
        window.location.replace(responseArr[0]);
    }
};

// Invoke handleSubmit function on click
registerForm.addEventListener("submit", handleSubmit);
