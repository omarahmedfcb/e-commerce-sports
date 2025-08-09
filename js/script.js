// initialize array of objects var arr;
var arr;
if (!window.localStorage.getItem("registered")) {
  arr = [];
} else {
  arr = JSON.parse(window.localStorage.getItem("registered"));
}

function getBasePath() {
  const isLocalhost =
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost";
  const repoName = "E-commerce-project";

  return isLocalhost ? "/" : `/${repoName}/`;
}
// Get form elements
const container = document.getElementById("container");
const registerBtn = document.getElementById("register"); // Button to toggle to Sign Up
const loginBtn = document.getElementById("login"); // Button to toggle to Sign In
// Handle Sign Up Form Submission
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  if (!window.localStorage.getItem("registered")) {
    arr = [];
  } else {
    arr = JSON.parse(window.localStorage.getItem("registered"));
  }
  const usernameField = document.getElementById("username");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("pass");

  const username = usernameField.value.trim();
  const email = emailField.value.trim();
  const pass = passwordField.value.trim();

  const usernameError = document.getElementById("username-error");
  const emailError = document.getElementById("email-error");
  const passError = document.getElementById("password-error");

  // Clear previous error messages and border styles
  usernameError.textContent = "";
  emailError.textContent = "";
  passError.textContent = "";

  usernameField.style.border = "";
  emailField.style.border = "";
  passwordField.style.border = "";

  let isValid = true;

  // Validate Username
  const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_]{2,20}$/;
  if (!usernamePattern.test(username)) {
    usernameField.style.border = "2px solid red"; // Apply red border
    usernameError.textContent =
      "Username must start with a letter and be 3–20 characters.";
    isValid = false;
  }
  // Validate Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    emailField.style.border = "2px solid red"; // Apply red border
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].Email == email) {
      emailField.style.border = "2px solid red"; // Apply red border
      emailError.textContent = "This Email was used before";
      isValid = false;
      break;
    }
  }

  // Validate Password
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordPattern.test(pass)) {
    passwordField.style.border = "2px solid red"; // Apply red border
    passError.textContent =
      "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character.";
    isValid = false;
  }

  // If all validations pass, save data to localStorage
  if (isValid) {
    arr.push({
      UserName: username,
      Email: email,
      password: pass,
    });
    window.localStorage.setItem("registered", JSON.stringify(arr));
    usernameField.value = "";
    emailField.value = "";
    passwordField.value = "";
    // localStorage.setItem("username", username);
    // localStorage.setItem("email", email);
    // localStorage.setItem("password", pass);
    alert("the data is saved successfully");
  }
});

// Handle Sign In Form Submission
const signinForm = document.getElementById("signin-form");
signinForm.addEventListener("submit", function (event) {
  var loginArr = JSON.parse(window.localStorage.getItem("registered")) || [];
  event.preventDefault(); // Prevent form submission
  var errorFlag = false;
  const signinEmail = document.getElementById("signin-email").value.trim();
  const signinPass = document.getElementById("signin-pass").value.trim();
  if (loginArr.length === 0) {
    alert("No registered users. Please sign up first.");
    return;
  }

  // Validate if user exists
  for (let i = 0; i < loginArr.length; i++) {
    if (loginArr[i].Email == signinEmail) {
      if (loginArr[i].password == signinPass) {
        window.sessionStorage.setItem("username", loginArr[i].UserName);
        errorFlag = false;
        break;
      } else {
        errorFlag = true;
      }
    } else {
      errorFlag = true;
    }
  }
  if (errorFlag == true) {
    alert("Email or Password is incorrect");
  } else {
    window.open(getBasePath() + "home.html", "_self");
  }
});

// Toggle to sign up form (register)
registerBtn.addEventListener("click", function () {
  container.classList.add("active"); // Show Sign Up form
});

// Toggle to sign in form (login)
loginBtn.addEventListener("click", function () {
  container.classList.remove("active"); // Show Sign In form
});
