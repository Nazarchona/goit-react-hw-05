import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzY3ZTU0Y2JlNGY3Zjk4ZjUzYTQwYWYzMTc0ZDQ5NCIsIm5iZiI6MTcyMjE4NjE3Ny4wOTQxMjIsInN1YiI6IjY2YTY3N2NmZTNlOTAyM2VhMjc0NjM4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IwO5uMfO2mp3ZP89ubIAxbNZCst2yXB5pJIPsoQRtdI',
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        setError('Failed to fetch trending movies');
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={styles.homePage}>
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.movieList}>
        {movies.map(movie => (
          <li key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

