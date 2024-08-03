// src/pages/MoviesPage/MoviesPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './MoviesPage.module.css';

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzY3ZTU0Y2JlNGY3Zjk4ZjUzYTQwYWYzMTc0ZDQ5NCIsIm5iZiI6MTcyMjY4OTE4NS40OTU3NzgsInN1YiI6IjY2YTY3N2NmZTNlOTAyM2VhMjc0NjM4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.scrkp818LzbLops9vAOom4gdJiNECn116JGejy89uq4';
const BASE_URL = 'https://api.themoviedb.org/3';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        try {
          const response = await axios.get(`${BASE_URL}/search/movie`, {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            params: {
              query,
            },
          });
          setMovies(response.data.results);
        } catch (error) {
          console.error('Failed to fetch movies:', error);
        }
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    setSearchParams({ query: e.target.value });
  };

  return (
    <div className={styles.moviesPage}>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for movies"
        className={styles.searchBar}
      />
      <div className={styles.movieList}>
        {movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`} className={styles.movieLink}>
            <div className={styles.movieItem}>
              <img
                src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                alt={movie.title}
                className={styles.movieImage}
              />
              <h3>{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;


