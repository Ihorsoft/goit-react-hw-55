import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../services/getMovies";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies().then((data) => setMovies(data));
  }, []);

  return (
    <>
      <h1 className={s.title}>Trending movies today</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
