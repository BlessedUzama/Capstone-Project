import React from "react";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      className="border p-4 rounded shadow cursor-pointer"
      onClick={() => onClick(movie)}
    >
      <h3 className="font-bold">{movie.Title}</h3>
      <p>{movie.Year}</p>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded"
      />
    </div>
  );
};

export default MovieCard;
