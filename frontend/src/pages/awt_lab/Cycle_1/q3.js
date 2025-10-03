function countVowels() {
    var str = document.getElementById("inputStr").value;
    var vowels = "aeiouAEIOU";
    var count = 0;

    for (var i = 0; i < str.length; i++) {
        if (vowels.indexOf(str[i]) !== -1) {
            count++;
        }
    }

    document.getElementById("result").innerHTML = "Number of vowels: " + count;
}
