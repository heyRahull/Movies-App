import React, { useEffect, useState } from "react";
import "./App.css";
import Movie from "./Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=80cce31ca8f9a620527ba9296a3501c7";

const IMAGE_API = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=80cce31ca8f9a620527ba9296a3501c7&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      fetch(SEARCH_API + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMovies(data.results);
        });

      setSearchTerm("");
    }
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit} action="">
          <input
            type="search"
            className="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie__container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;

// Api stuff
// featured : "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=80cce31ca8f9a620527ba9296a3501c7"
// images : "https://image.tmdb.org/t/p/w1280"
// search : "https://api.themoviedb.org/3/search/movie?&api_key=80cce31ca8f9a620527ba9296a3501c7&query="
