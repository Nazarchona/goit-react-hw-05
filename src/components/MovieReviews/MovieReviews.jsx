import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzY3ZTU0Y2JlNGY3Zjk4ZjUzYTQwYWYzMTc0ZDQ5NCIsIm5iZiI6MTcyMjE4NjE3Ny4wOTQxMjIsInN1YiI6IjY2YTY3N2NmZTNlOTAyM2VhMjc0NjM4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IwO5uMfO2mp3ZP89ubIAxbNZCst2yXB5pJIPsoQRtdI',
          },
        });
        setReviews(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2>Reviews</h2>
      <ul className={styles.list}>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id} className={styles.item}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
