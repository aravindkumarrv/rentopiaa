function calculateSquare() {
    var number = document.getElementById("numberInput").value;
    var square = number * number;
    document.getElementById("result").innerText = "Square is: " + square;
}
