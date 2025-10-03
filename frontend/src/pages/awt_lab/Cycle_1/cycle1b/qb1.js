function calculateInterest() {
  var principal = document.getElementById("principal").value;
  var rate = document.getElementById("rate").value;
  var time = document.getElementById("time").value;

  principal = Number(principal);
  rate = Number(rate);
  time = Number(time);

  var interest = (principal * rate * time) / 100;

  alert("Simple Interest is: " + interest);
}
