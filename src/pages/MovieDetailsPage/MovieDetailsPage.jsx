import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzY3ZTU0Y2JlNGY3Zjk4ZjUzYTQwYWYzMTc0ZDQ5NCIsIm5iZiI6MTcyMjY4OTE4NS40OTU3NzgsInN1YiI6IjY2YTY3N2NmZTNlOTAyM2VhMjc0NjM4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.scrkp818LzbLops9vAOom4gdJiNECn116JGejy89uq4';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const prevLocation = useRef(location.state?.from || '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
        setError('Failed to fetch movie details.');
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.movieDetails}>
      <button onClick={() => navigate(prevLocation.current)}>Go Back</button>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;




