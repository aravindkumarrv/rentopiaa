function validateForm() {
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var message = document.getElementById("message");

  var namePattern = /^[A-Za-z]{6,}$/;
  if (!namePattern.test(name)) {
    message.textContent = "Name must be at least 6 letters and contain only alphabets.";
    return;
  }

  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters long.";
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    return;
  }

  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
  if (!emailPattern.test(email)) {
    message.textContent = "Please enter a valid email address.";
    return;
  }

  var phonePattern = /^\d{10}$/;
  if (!phonePattern.test(phone)) {
    message.textContent = "Phone number must be exactly 10 digits.";
    return;
  }

  message.style.color = "green";
  message.textContent = "Registration successful!";
}
