const apiKey = '17a08feb'; 
const apiUrl = 'https://www.omdbapi.com/';

const searchForm = document.getElementById('searchForm');
const moviesContainer = document.getElementById('moviesContainer');
const pagination = document.getElementById('pagination');
const movieDetails = document.getElementById('movieDetails');

let currentPage = 1;
let currentQuery = '';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('searchInput').value.trim();
    const type = document.getElementById('typeSelect').value;
    currentQuery = `s=${searchInput}&type=${type}`;
    currentPage = 1;
    fetchMovies(currentQuery, currentPage);
});

function fetchMovies(query, page) {
    fetch(`${apiUrl}?${query}&page=${page}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                displayMovies(data.Search);
                setupPagination(Math.ceil(data.totalResults / 10));
            } else {
                moviesContainer.innerHTML = `<p>${data.Error}</p>`;
                pagination.innerHTML = '';
            }
        });
}

function displayMovies(movies) {
    moviesContainer.innerHTML = movies.map(movie => `
        <div class="movie">
            <span>${movie.Title} (${movie.Year})</span>
            <button onclick="fetchMovieDetails('${movie.imdbID}')">Details</button>
        </div>
    `).join('');
}

function setupPagination(totalPages) {
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            fetchMovies(currentQuery, currentPage);
        };
        if (i === currentPage) button.style.fontWeight = 'bold';
        pagination.appendChild(button);
    }
}

function fetchMovieDetails(id) {
    fetch(`${apiUrl}?i=${id}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(movie => {
            if (movie.Response === 'True') {
                const actors = movie.Actors
                    ? movie.Actors.split(',').slice(0, 5).join(', ')
                    : 'Not available';

                    movieDetails.innerHTML = `
                    <div class="movie-details">
                        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
                        <div class="movie-details-content">
                            <h3>${movie.Title} (${movie.Year})</h3>
                            <p><strong>Release Date:</strong> ${movie.Released}</p>
                            <p><strong>Genre:</strong> ${movie.Genre}</p>
                            <p><strong>Country:</strong> ${movie.Country}</p>
                            <p><strong>Director:</strong> ${movie.Director}</p>
                            <p><strong>Writers:</strong> ${movie.Writer}</p>
                            <p><strong>Actors:</strong> ${movie.Actors.split(', ').slice(0, 5).join(', ')}</p>
                            <p><strong>Plot:</strong> ${movie.Plot}</p>
                        </div>
                    </div>
                `;
                
            } else {
                movieDetails.innerHTML = `<p>${movie.Error}</p>`;
            }
        })
        .catch(error => {
            movieDetails.innerHTML = `<p>Error fetching details: ${error.message}</p>`;
        });
}