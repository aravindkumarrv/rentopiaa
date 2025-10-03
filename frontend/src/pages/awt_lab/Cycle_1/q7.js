
function findLargest() {
  var num1 = prompt("Enter the first number:");
  var num2 = prompt("Enter the second number:");
  var num3 = prompt("Enter the third number:");

  
  num1 = Number(num1);
  num2 = Number(num2);
  num3 = Number(num3);

  var largest;

  if (num1 >= num2 && num1 >= num3) {
    largest = num1;
  } else if (num2 >= num1 && num2 >= num3) {
    largest = num2;
  } else {
    largest = num3;
  }

  alert("The largest number is: " + largest);
}

findLargest(); 
