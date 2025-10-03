function checkStrength() {
  var password = document.getElementById("password").value;
  var result = document.getElementById("result");

  var strength = "Weak";

  var hasNumber = /\d/;
  var hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length >= 8) {
    if (hasNumber.test(password) && hasSpecialChar.test(password)) {
      strength = "Strong";
    } else if (hasNumber.test(password) || hasSpecialChar.test(password)) {
      strength = "Medium";
    }
  }

  result.textContent = "Password Strength: " + strength;
}
