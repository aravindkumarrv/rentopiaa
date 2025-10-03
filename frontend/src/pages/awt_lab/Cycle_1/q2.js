function show() {
    var student = {
        name: document.getElementById("name").value,
        rollNo: document.getElementById("roll").value,
        marks1: document.getElementById("m1").value,
        marks2: document.getElementById("m2").value,
        display: function() {
            var avg = (parseInt(this.marks1) + parseInt(this.marks2)) / 2;
            return "Name: " + this.name + "<br>" + 
                   "Roll No: " + this.rollNo + "<br>" + 
                   "Average: " + avg;
        }
    };

    document.getElementById("output").innerHTML = student.display();
}
