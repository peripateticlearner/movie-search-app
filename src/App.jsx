import { useState, useEffect } from 'react';
import './App.css';

import MovieDisplay from './components/MovieDisplay';
import Form from './components/Form';

export default function App() {
  // Constant with your API Key
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  // State to hold movie data
  const [movie, setMovie] = useState(null);

  // Function to get movies
  const getMovie = async (searchTerm) => {
    // Make fetch request and store the response
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      // Parse JSON response into a JavaScript object
      const data = await response.json();
      // Set the Movie state to the received data
      setMovie(data);
    } catch (e) {
      console.error("Error fetching movie:", e);
    }
  };

  // This will run on the first render but not on subsequent renders
  useEffect(() => {
    const getRandomMovie = () => {
      // List of popular movies to choose from
      const popularMovies = [
        "The Godfather", "The Dark Knight", "Inception",
        "Pulp Fiction", "Fight Club", "Forrest Gump",
        "The Matrix", "The Lord of the Rings", "Titanic",
        "Star Wars", "Avengers: Endgame", "The Shawshank Redemption"
      ];

      // Select a random movie from the list
      const randomMovie = popularMovies[Math.floor(Math.random() * popularMovies.length)];

      // Fetch full movie details using the existing getMovie function
      getMovie(randomMovie);
    };

    getRandomMovie(); // Call function on first render
  }, []);

  // We pass the getMovie function as a prop called moviesearch
  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  );
}
