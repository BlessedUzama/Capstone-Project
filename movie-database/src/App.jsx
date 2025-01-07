import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState("");

  const fetchMovies = async (query) => {
    const API_KEY = "6d9e9765"; 
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search); // Update state with movie data
        setError(""); // Clear any previous error
        setSelectedMovie(null); // Reset selected movie
      } else {
        setMovies([]); // Clear movies
        setError(response.data.Error); // Display API error message
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies. Please try again."); // Handle network error
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBack = () => {
    setSelectedMovie(null);
  };

   return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
       <div className="text-center w-full max-w-3xl">
         <h1 className="text-3xl md:text-4xl font-bold mb-6">
           Movie Search App
         </h1>
         <SearchBar onSearch={fetchMovies} />
         {error && <p className="text-red-500 mt-4">{error}</p>}
       </div>
       {!selectedMovie ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full max-w-6xl">
           {movies.map((movie) => (
             <MovieCard
               key={movie.imdbID}
               movie={movie}
               onClick={handleMovieClick}
             />
           ))}
         </div>
       ) : (
         <div className="w-full max-w-4xl mt-8">
           <MovieDetails movie={selectedMovie} onBack={handleBack} />
         </div>
       )}
     </div>
   );
};

export default App;
