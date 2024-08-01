import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const prevLocation = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzY3ZTU0Y2JlNGY3Zjk4ZjUzYTQwYWYzMTc0ZDQ5NCIsIm5iZiI6MTcyMjE4NjE3Ny4wOTQxMjIsInN1YiI6IjY2YTY3N2NmZTNlOTAyM2VhMjc0NjM4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IwO5uMfO2mp3ZP89ubIAxbNZCst2yXB5pJIPsoQRtdI'
          }
        });
        setMovie(response.data);
      } catch (error) {
        setError('Failed to fetch movie details');
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className={styles.movieDetailsPage}>
      <button onClick={() => navigate(prevLocation.current)} className={styles.goBackButton}>Go back</button>
      {error && <p className={styles.error}>{error}</p>}
      {movie && (
        <div className={styles.movieDetails}>
          <h1>{movie.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={styles.moviePoster} />
          <p>{movie.overview}</p>
          <Link to="cast" className={styles.link}>Cast</Link>
          <Link to="reviews" className={styles.link}>Reviews</Link>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;

