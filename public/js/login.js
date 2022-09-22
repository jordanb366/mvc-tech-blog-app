const loginFormHandler = async (event) => {
  //  Prevent default form behavior
  event.preventDefault();
  // Gets value from input
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  // If has email and password
  if (email && password) {
    // Send the e-mail and password to the back end
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    // Take to dashboard if successful login, else
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to log in");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  // Gets signup values from input
  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  // Sends to back end route to create user
  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    // If signup is ok then will take user to dashboard else error message
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};
// For login form event listener
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
// For signup event listener
document
  .querySelector(".sign-up-form")
  .addEventListener("submit", signupFormHandler);
