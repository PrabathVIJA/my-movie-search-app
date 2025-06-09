import { useState, useEffect } from "react";
import Loader from "./components/Loader.jsx";

import "./App.css";
import ErrorMessage from "./components/ErrorMessage.jsx";
let key = "1445ada9";
function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setErrorMessage] = useState("");

  useEffect(
    function () {
      async function temp() {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`
          );

          if (!res.ok) {
            throw new Error("Something went wrong with error");
          }

          const data = await res.json();
          console.log(data);

          if (data.Response === "False") {
            throw new Error("There is no such Movie");
          }
          console.log("hola");

          console.log(data.Search);

          if (!data.Search || query.length < 3) {
            setMovies([]);
            console.log("setting to empty array");
          } else {
            setMovies(data.Search);
            setLoading(true);
            setErrorMessage("");
          }
        } catch (err) {
          setErrorMessage(err.message);
        } finally {
          setLoading(true);
        }
      }
      temp();
    },
    [query]
  );

  function queryHandler(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Enter the movie"
        onChange={queryHandler}
      />
      <>
        {loading ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <h3>{movie.Title}</h3>
                <img src={movie.Poster} alt="moviePoster" />
                <h4>{movie.Year}</h4>
              </li>
            ))}
          </ul>
        ) : (
          <Loader />
        )}
        {error && <ErrorMessage message={error} />}
      </>
    </>
  );
}

export default App;
