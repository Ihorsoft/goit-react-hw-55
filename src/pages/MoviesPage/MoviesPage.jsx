import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { fetchMovieByQuery } from "../../services/getMovies";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentQuery = searchParams.get("query");
    if (!currentQuery) return;

    const movieByQuery = async () => {
      try {
        const getMovieByQuery = await fetchMovieByQuery(currentQuery);
        setMovies(getMovieByQuery);
      } catch (e) {
        console.log(e);
      }
    };
    movieByQuery();
  }, [searchParams]);

  const initialValues = {
    query: "",
  };

  const onSubmit = (values) => {
    setSearchParams({ query: values.query });
  };

  return (
    <>
      <h1 className={s.title}>Search movies</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className={s.searchBar}>
          <Field
            className={s.searchInput}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
          <button type="submit" className={s.searchBtn}>
            Search
          </button>
        </Form>
      </Formik>
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};

export default MoviesPage;
