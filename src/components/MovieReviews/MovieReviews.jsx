import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviewById } from "../../services/getMovies";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [review, setReview] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const Reviews = await fetchMovieReviewById(movieId);
        setReview(Reviews);
      } catch (e) {
        console.log(e);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      <ul className={s.reviewsList}>
        {review.map(({ id, author, content }) => (
          <li key={id}>
            <h3 className={s.reviewsTitle}>Author: {author}</h3>
            <p className={s.reviewsContent}>{content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieReviews;
