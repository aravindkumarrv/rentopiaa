var movies = [
    {
        name: "Inception",
        starring: "Leonardo DiCaprio",
        language: "English",
        rating: 8.8
    },
    {
        name: "3 Idiots",
        starring: "Aamir Khan",
        language: "Hindi",
        rating: 8.4
    },
    {
        name: "Parasite",
        starring: "Song Kang-ho",
        language: "Korean",
        rating: 8.6
    }
];

var container = document.getElementById("movieContainer");

for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];

    var details = "<p><strong>Name:</strong> " + movie.name + "<br>" +
                  "<strong>Starring:</strong> " + movie.starring + "<br>" +
                  "<strong>Language:</strong> " + movie.language + "<br>" +
                  "<strong>Rating:</strong> " + movie.rating + "</p><hr>";

    container.innerHTML += details;
}
