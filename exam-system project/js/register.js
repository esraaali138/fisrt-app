document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const errorMessage = document.getElementById("errorMessage");
    //regular expresion//////////////////////////
    const regularFirstName = /^[a-zA-Z]+$/.test(firstName.value);
    const regularLastName = /^[a-zA-Z]+$/.test(lastName.value);
    const regularEmail = /\S+@\S+\.\S+/.test(email.value);
    const inputField = document.querySelector('input');
    /////////////////////////
    const clearMessages = () => {
      const errorMessages = document.querySelectorAll(".error-message"); ///nodelist
      errorMessages.forEach((message) => {
        message.textContent = "";
      });
    };

    if (!regularFirstName) {
      document.getElementById("firstNameMessage").textContent =
        "Must contain only alphabetical characters.";
    } else {
      document.getElementById("firstNameMessage").style.display = "none";
    }
    //////////////
    if (!regularLastName) {
      document.getElementById("lastNameMessage").textContent =
        "Must contain only alphabetical characters.";
    } else {
      document.getElementById("lastNameMessage").style.display = "none";
    }
    //////////////
    if (!regularEmail) {
      document.getElementById("emailMessage").textContent =
        "Enter a valid email address.";
    } else {
      document.getElementById("emailMessage").style.display = "none";
    }
    /////////////////
    if (password.value.length < 8) {
      document.getElementById("passwordMessage").textContent =
        "Password should be at least 8 characters long.";
    } else {
      document.getElementById("passwordMessage").style.display = "none";
    }
    //////////////////////////
    if (password.value !== confirmPassword.value) {
      document.getElementById("confirmPasswordMessage").textContent =
        "Passwords do not match.";
    } else {
      document.getElementById("confirmPasswordMessage").style.display = "none";
    }
    ////////////////////
    if (
      regularFirstName &&
      regularLastName &&
      regularEmail &&
      password.value.length >= 8 &&
      password.value === confirmPassword.value
    ) {
      //  document.querySelector("input[type='submit']").disabled = false;
      localStorage.setItem("firstName", firstName.value);
      // localStorage.setItem("lastName", lastName.value);
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);
      // Redirect to a success page or perform any necessary action
      // setTimeout(() => {
      //     window.location = "form.html";
      // }, 1500);
      location.replace("form2.html"); //you can not go to this page if you submitted 
    }
    // else {
    //   document.querySelector("input[type='submit']").disabled = true;
    // }
    
  });
