const email = document.getElementById("email");
const password = document.getElementById("password");
//////////////////
const getPassword = localStorage.getItem("password");
const getEmail = localStorage.getItem("email");
//////////////////
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const regularEmail = /\S+@\S+\.\S+/.test(email.value);

    if (!regularEmail) {
      document.getElementById("errorEmail").textContent =
        "Enter a valid email address"; 
    }
    if (password.value < 8) {
      document.getElementById("errorPassword").textContent = 
        "Password should be at least 8 characters long";
    }
    //////////////
    if (getEmail === email.value && getPassword === password.value) {
      setTimeout(() => {
        location.replace("exam.html"); 
      }, 1000);
    } else {
      document.getElementById("error").textContent =
        "your data does not match ";
    }
  });
