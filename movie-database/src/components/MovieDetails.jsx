import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieDetails = ({ movie, onBack }) => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      const API_KEY = "6d9e9765"; 
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
        );
        if (response.data.Response === "True") {
          setDetails(response.data);
          setError("");
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie details. Please try again.");
      }
    };

    fetchDetails();
  }, [movie]);

  if (error) {
    return (
      <div className="flex flex-col items-center">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
        >
          Back to Results
        </button>
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  if (!details) {
    return <p className="text-center">Loading movie details...</p>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <button
        onClick={onBack}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
      >
        Back to Results
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl bg-white rounded shadow p-6">
        <div className="flex justify-center">
          <img
            src={details.Poster !== "N/A" ? details.Poster : "/placeholder.png"}
            alt={details.Title}
            className="w-full max-w-xs h-auto rounded shadow"
          />
        </div>
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-4">{details.Title}</h2>
          <p className="mb-2">
            <strong>Year:</strong> {details.Year}
          </p>
          <p className="mb-2">
            <strong>Genre:</strong> {details.Genre}
          </p>
          <p className="mb-2">
            <strong>Director:</strong> {details.Director}
          </p>
          <p className="mb-2">
            <strong>Plot:</strong> {details.Plot}
          </p>
          <p className="mb-2">
            <strong>Actors:</strong> {details.Actors}
          </p>
          <p className="mb-2">
            <strong>IMDB Rating:</strong> {details.imdbRating}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
