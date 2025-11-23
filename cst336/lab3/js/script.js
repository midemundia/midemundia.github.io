//event listeners

document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("change", checkPassword);
document.querySelector("#password").addEventListener("focus", displayPasswordSuggestion);
document.querySelector("#retypePassword").addEventListener("change", checkRetypePassword);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateForm(event);
    //validatePassword(event);
});

//functions

async function displayStates() {
    let url = 'https://csumb.space/api/allStatesAPI.php';
    let response = await fetch(url);
    let data = await response.json();
    let stateDropdown = document.querySelector("#state");
    stateDropdown.innerHTML = "<option>Select One</option>";
    for (let i = 0; i < data.length; i++) {
        stateDropdown.innerHTML += `<option value="${data[i].abbreviation}">${data[i].state}</option>`;
    }
}

//Call displayStates when page loads
displayStates();

//Displaying city from Web API after entering a zip code
async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    //console.log(zipCode);
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data);
    let zipError = document.querySelector("#zipError");
    zipError.innerHTML = "";
    
    if (data === false) {
        zipError.innerHTML = "Zip code not found";
        zipError.style.color = "red";
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#latitude").innerHTML = "";
        document.querySelector("#longitude").innerHTML = "";
    } else {
        document.querySelector("#city").innerHTML = data.city;
        document.querySelector("#latitude").innerHTML = data.latitude;
        document.querySelector("#longitude").innerHTML = data.longitude;
    }
}

async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for (let i = 0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county} </option>`;
    }
}

async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");
    if (data.available) {
        usernameError.innerHTML = "Username is available";
        usernameError.style.color = "green";
    } else {
        usernameError.innerHTML = "Username is NOT available";
        usernameError.style.color = "red";
    }
}

function checkPassword() {
    let password = document.querySelector("#password").value;
    let passwordError = document.querySelector("#passwordError");
    
    if (password.length >= 6) {
        passwordError.innerHTML = "Password is valid";
        passwordError.style.color = "green";
    } else {
        passwordError.innerHTML = "Password must be at least 6 characters (e.g., abc123)";
        passwordError.style.color = "red";
    }
}

function checkRetypePassword() {
    let password = document.querySelector("#password").value;
    let retypePassword = document.querySelector("#retypePassword").value;
    let passwordError = document.querySelector("#passwordError");
    
    if (passwordError) {
        if (retypePassword === password) {
            passwordError.innerHTML = "Passwords match";
            passwordError.style.color = "green";
        } else {
            passwordError.innerHTML = "Passwords do not match";
            passwordError.style.color = "red";
        }
    }
}

function displayPasswordSuggestion() {
    let passwordError = document.querySelector("#suggestedPwd");
    let suggestion = suggestPassword();
    passwordError.innerHTML = `Must be at least 6 alphanumeric characters (Suggestion: ${suggestion})`;
}

function validateForm(event) {
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let retypePassword = document.querySelector("#retypePassword").value;
    let usernameError = document.querySelector("#usernameError");
    let suggestedPwd = document.querySelector("#suggestedPwd");
    let passwordError = document.querySelector("#passwordError");
    
    passwordError.innerHTML = "";
    if (username.length === 0) {
        usernameError.innerHTML = "Username Required!";
        isValid = false;
    }
    if (password.length < 6 ) {
        displayPasswordSuggestion();
        passwordError.innerHTML = "Password is too short! ";
        isValid = false;
    }
    if (password !== retypePassword) {
        passwordError.innerHTML += "Passwords do not match!";
        isValid = false;
    }
    if (!isValid) {
        event.preventDefault();
    }
}

function suggestPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}
