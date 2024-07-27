import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCastById } from "../../services/getMovies";
import { BASE_POSTER_URL } from "../../services/getMovies";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const cast = await fetchMovieCastById(movieId);
        setCast(cast);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCast();
  }, [movieId]);

  const defaultImg =
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

  return (
    <>
      <ul className={s.actorsList}>
        {cast.map(({ id, profile_path, original_name, character }) => (
          <li key={id} className={s.actorItem}>
            <img
              src={
                profile_path ? `${BASE_POSTER_URL}${profile_path}` : defaultImg
              }
              width={200}
              alt="actor img"
            />
            <h3>Actor name</h3>
            <p>{original_name}</p>
            <h3>Character</h3>
            <p>{character}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieCast;
