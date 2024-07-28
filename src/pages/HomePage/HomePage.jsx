import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzY3ZTU0Y2JlNGY3Zjk4ZjUzYTQwYWYzMTc0ZDQ5NCIsIm5iZiI6MTcyMjE4NjE3Ny4wOTQxMjIsInN1YiI6IjY2YTY3N2NmZTNlOTAyM2VhMjc0NjM4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IwO5uMfO2mp3ZP89ubIAxbNZCst2yXB5pJIPsoQRtdI',
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
