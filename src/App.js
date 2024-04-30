import React, { useState, useEffect } from "react";
import FilterOptions from "./FilterOptions";
import MovieList from "./MovieList";

import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    languages: [],
    countries: [],
    genres: [],
  });
  const [prevFilteredMovies, setPrevFilteredMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/moviesData.json");
        const data = await response.json();
        setMovies(data);
        setFilteredMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    let tempMovies = movies;
    if (filterOptions.languages.length > 0) {
      tempMovies = tempMovies.filter((movie) =>
        filterOptions.languages.every((lang) =>
          movie.movielanguages.includes(lang.target.name)
        )
      );
    }
    if (filterOptions.countries.length > 0) {
      tempMovies = tempMovies.filter((movie) =>
        filterOptions.countries.every((country) =>
          movie.moviecountries.includes(country.target.name)
        )
      );
    }
    if (filterOptions.genres.length > 0) {
      tempMovies = tempMovies.filter((movie) =>
        filterOptions.genres.every((genre) =>
          movie.moviegenres.includes(genre.target.name)
        )
      );
    }
    setPrevFilteredMovies(filteredMovies);
    setFilteredMovies(tempMovies);
  }, [filterOptions, movies]);

  const handleFilterChange = (name, value) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value.target.checked
        ? [...prevOptions[name], value]
        : prevOptions[name].filter(
            (option) => option.target.name !== value.target.name
          ),
    }));
  };

  return (
    <div>
      <div className="app">
        <FilterOptions
          options={Array.from(
            new Set(movies.flatMap((movie) => movie.movielanguages))
          )}
          heading="Languages Filter"
          selectedOptions={filterOptions.languages}
          onChange={(value) => handleFilterChange("languages", value)}
        />
        <FilterOptions
          options={Array.from(
            new Set(movies.flatMap((movie) => movie.moviecountries))
          )}
          heading="Countries Filter"
          selectedOptions={filterOptions.countries}
          onChange={(value) => handleFilterChange("countries", value)}
        />
        <FilterOptions
          options={Array.from(
            new Set(movies.flatMap((movie) => movie.moviegenres))
          )}
          heading="Genres Filter"
          selectedOptions={filterOptions.genres}
          onChange={(value) => handleFilterChange("genres", value)}
        />
      </div>
      <MovieList
        movies={filteredMovies.length > 0 ? filteredMovies : prevFilteredMovies}
      />
    </div>
  );
};

export default App;
