import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.moviemainphotos[0]} alt={movie.movietitle} />
      <h2>{movie.movietitle}</h2>
      <p>
        <strong>IMDB ID:</strong> {movie.imdbmovieid}
        <br />
        <strong>Languages:</strong> {movie.movielanguages.join(", ")}
        <br />
        <strong>Countries:</strong> {movie.moviecountries.join(", ")}
        <br />
        <strong>Genres:</strong> {movie.moviegenres.join(", ")}
      </p>
    </div>
  );
};

export default MovieCard;
