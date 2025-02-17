// API key obținut de la OMDb API
const API_KEY = "5f369cac";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("movies");
const spinner = document.getElementById("spinner");
const errorMessage = document.getElementById("errorMessage");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const typeFilter = document.getElementById("typeFilter");
const sortOrder = document.getElementById("sortOrder");
const themeToggle = document.getElementById("themeToggle");
const viewFavoritesBtn = document.getElementById("viewFavoritesBtn");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

let currentPage = 1;
let currentSearchTerm = "";
let currentTotalResults = 0;
let isFavoritesView = false;

// Căutare la click pe buton
searchBtn.addEventListener("click", () => {
  currentPage = 1;
  currentSearchTerm = searchInput.value.trim();
  if (currentSearchTerm !== "") {
    isFavoritesView = false;
    moviesContainer.innerHTML = "";
    fetchMovies(currentSearchTerm, currentPage);
  }
});

// Debounce pentru inputul de căutare
let debounceTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    currentPage = 1;
    currentSearchTerm = searchInput.value.trim();
    if (currentSearchTerm !== "") {
      isFavoritesView = false;
      moviesContainer.innerHTML = "";
      fetchMovies(currentSearchTerm, currentPage);
    }
  }, 500);
});

// Butonul "Load More" pentru paginare
loadMoreBtn.addEventListener("click", () => {
  if (currentSearchTerm !== "") {
    currentPage++;
    fetchMovies(currentSearchTerm, currentPage);
  }
});

// Comutare între Dark și Light mode
themeToggle.addEventListener("click", toggleTheme);

// Buton pentru vizualizarea filmelor favorite
viewFavoritesBtn.addEventListener("click", displayFavorites);

// Închiderea modalului
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Funcția pentru a prelua filme de la OMDb API
function fetchMovies(searchTerm, page) {
  errorMessage.textContent = "";
  spinner.style.display = "block";
  loadMoreBtn.style.display = "none";
  const type = typeFilter.value;
  let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`;
  if (type) {
    url += `&type=${type}`;
  }
  fetch(url)
    .then(response => response.json())
    .then(data => {
      spinner.style.display = "none";
      if (data.Response === "True") {
        currentTotalResults = parseInt(data.totalResults);
        displayMovies(data.Search);
        // Afișează butonul "Load More" dacă mai sunt rezultate
        if (currentPage * 10 < currentTotalResults) {
          loadMoreBtn.style.display = "block";
        }
      } else {
        if (page === 1) {
          errorMessage.textContent = data.Error;
          moviesContainer.innerHTML = "";
        }
      }
    })
    .catch(err => {
      spinner.style.display = "none";
      errorMessage.textContent = "Error fetching data. Please try again.";
      console.error(err);
    });
}

// Afișarea cardurilor de filme
function displayMovies(movies) {
  // Sortare după an (ascendent sau descendent)
  movies.sort((a, b) => {
    const yearA = parseInt(a.Year);
    const yearB = parseInt(b.Year);
    return sortOrder.value === "asc" ? yearA - yearB : yearB - yearA;
  });
  movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.setAttribute("data-id", movie.imdbID);
    
    movieCard.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}" alt="${movie.Title}" />
      <h2>${movie.Title}</h2>
      <p>${movie.Year}</p>
      <button class="details-btn">Details</button>
      <button class="fav-btn">Favorite</button>
    `;
    
    // Buton pentru detalii
    movieCard.querySelector(".details-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      showMovieDetails(movie.imdbID);
    });
    
    // Buton pentru adăugare/eliminare din favorite
    movieCard.querySelector(".fav-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(movie);
    });
    
    moviesContainer.appendChild(movieCard);
  });
}

// Afișează detaliile filmului în modal
function showMovieDetails(imdbID) {
  spinner.style.display = "block";
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      spinner.style.display = "none";
      if (data.Response === "True") {
        modalBody.innerHTML = `
          <h2>${data.Title}</h2>
          <p><strong>Year:</strong> ${data.Year}</p>
          <p><strong>Rated:</strong> ${data.Rated}</p>
          <p><strong>Released:</strong> ${data.Released}</p>
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>Director:</strong> ${data.Director}</p>
          <p><strong>Actors:</strong> ${data.Actors}</p>
          <p><strong>Plot:</strong> ${data.Plot}</p>
          <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/300x450?text=No+Image"}" alt="${data.Title}" />
        `;
        modal.style.display = "block";
      } else {
        alert("Movie details not found.");
      }
    })
    .catch(err => {
      spinner.style.display = "none";
      alert("Error fetching details.");
      console.error(err);
    });
}

// Comută tema
function toggleTheme() {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
}

// Funcționalitate favorite
function toggleFavorite(movie) {
  let favorites = getFavorites();
  const index = favorites.findIndex(item => item.imdbID === movie.imdbID);
  if (index > -1) {
    favorites.splice(index, 1);
    alert("Removed from favorites.");
  } else {
    favorites.push(movie);
    alert("Added to favorites.");
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Obține lista de favorite din localStorage
function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

// Afișează filmele favorite
function displayFavorites() {
  isFavoritesView = true;
  moviesContainer.innerHTML = "";
  loadMoreBtn.style.display = "none";
  const favorites = getFavorites();
  if (favorites.length === 0) {
    errorMessage.textContent = "No favorite movies found.";
  } else {
    errorMessage.textContent = "";
    displayMovies(favorites);
  }
}
