function generateTable() {
  var table = document.getElementById("numberTable");

  for (var i = 5; i <= 15; i++) {
    var row = document.createElement("tr");

    var numberCell = document.createElement("td");
    numberCell.textContent = i;

    var squareCell = document.createElement("td");
    squareCell.textContent = i * i;

    var cubeCell = document.createElement("td");
    cubeCell.textContent = i * i * i;

    row.appendChild(numberCell);
    row.appendChild(squareCell);
    row.appendChild(cubeCell);

    table.appendChild(row);
  }
}

generateTable(); 
