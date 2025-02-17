// Înlocuiește YOUR_API_KEY cu cheia ta de la OMDb API
const API_KEY = "YOUR_API_KEY";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("movies");

searchBtn.addEventListener("click", searchMovies);

// Permite și căutarea la apăsarea tastei Enter
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchMovies();
  }
});

function searchMovies() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === "") return;

  // URL-ul pentru căutarea filmelor
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
    searchTerm
  )}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayMovies(data);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
}

function displayMovies(data) {
  moviesContainer.innerHTML = "";
  if (data.Response === "True") {
    data.Search.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");

      movieCard.innerHTML = `
        <img src="${
          movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"
        }" alt="${movie.Title}" />
        <h2>${movie.Title}</h2>
        <p>${movie.Year}</p>
      `;
      moviesContainer.appendChild(movieCard);
    });
  } else {
    moviesContainer.innerHTML = `<p>No movies found. Try another title!</p>`;
  }
}
