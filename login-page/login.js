var signupForm = document.getElementById("main-form");
var signupButton = document.getElementById("signup-button");
var usernameErrorMessage = document.getElementById("username-error-message")
var passwordErrorMessage = document.getElementById("password-error-message")

signupButton.addEventListener("click", (e) => {
  e.preventDefault();
  signupButton.innerHTML = "<span>Signing up...</span> <div class='loader'></div>"
  signupButton.setAttribute("disabled", "true")

  setTimeout(() => {
    if (signupForm.checkValidity()) {
      console.log("SUBMITTING FORM NOW!");
      // signupForm.submit();
    
    } else {
      console.log("INVALID VALUES!!")
      signupButton.innerHTML = "<span>Sign up</span>"
      signupButton.removeAttribute("disabled")
    }
  }, 1000)
});

signupForm.elements['username'].addEventListener("keyup", (e) => {
  if (!!e.target.value) {
    signupForm.elements['username'].classList.add('dirty')
  }

  if (!isUsernameValid(e.target.value)) {
    signupForm.elements['username'].setCustomValidity('Invalid')

    usernameErrorMessage.innerText = generateInvalidUsernameError(e.target.value)
    usernameErrorMessage.style.display = "block"
  } else {
    signupForm.elements['username'].setCustomValidity('')

    usernameErrorMessage.style.display = "none"
  }

  checkFormValidity()
})

signupForm.elements['password'].addEventListener("keyup", (e) => {
  if (!!e.target.value) {
    signupForm.elements['password'].classList.add('dirty')
  }

  if (!isPasswordValid(e.target.value)) {
    signupForm.elements['password'].setCustomValidity('Invalid')

    passwordErrorMessage.innerText = generateInvalidPasswordError(e.target.value)
    passwordErrorMessage.style.display = "block"
  } else {
    signupForm.elements['password'].setCustomValidity('')

    passwordErrorMessage.style.display = "none"
  }

  checkFormValidity()
})

function isUsernameValid(username) {
  return !!username && isContainingValidWordCharacters(username) && (username.length >= 5 && username.length <= 15)
}

function isPasswordValid(password) {
  return !!password && isContainingValidWordCharacters(password) && password.length >= 8 
}

function addUserToDB() {

}

function generateInvalidUsernameError(username) {
  var errorMessage = "Invalid username"

  if (!!!username) {
    errorMessage = "Username is required"
  } else if (!isContainingValidWordCharacters(username)) {
    errorMessage = "Username must contain only alphanumeric or underscore characters"
  } else if (username.length < 5 || username.length > 15 ) {
    errorMessage = "Username must have at least 5-15 characters"
  } 

  return errorMessage
}

function generateInvalidPasswordError(password) {
  var errorMessage = "Invalid password"

  if (!!!password) {
    errorMessage = "Password is required"
  } else if (!isContainingValidWordCharacters(password)) {
    errorMessage = "Password must contain only alphanumeric or underscore characters"
  } else if (password.length < 8) {
    errorMessage = "Password must have at least 8 characters"
  }

  return errorMessage
}

function isContainingValidWordCharacters(value) {
  const regexMatchData = value.match(/\w+/)

  return !!regexMatchData && regexMatchData[0] === regexMatchData['input']
}

function checkFormValidity() {
  const formElements = [...signupForm.elements]
  var isFormValid = true

  formElements.forEach(item => {
    if (item.type !== 'submit') {
      if (!item.checkValidity()) {
        isFormValid = false
      }
    }
  });

  if (isFormValid) {
    signupButton.removeAttribute("disabled")
  } else {
    signupButton.setAttribute("disabled", "true")
  }
}
