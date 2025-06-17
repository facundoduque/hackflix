import { useState, useEffect } from 'react';
import { fetcher } from '../../../api/fetcher';
import './MoviesSection.css';

export const MoviesSection = () => { 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetcher('/movie/popular');
        setMovies(data.results?.slice(0, 18) || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const getImageUrl = (posterPath) => {
    return posterPath 
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : '/placeholder-movie.jpg';
  };

  if (loading) {
    return (
      <div className="movie-grid-container">
        <div className="loading-grid">
          {[...Array(18)].map((_, index) => (
            <div key={index} className="loading-card"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="movie-grid-container">
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="movie-poster">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                loading="lazy"
              />
              <div className="movie-overlay">
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-rating">
                    <span className="star">⭐</span>
                    <span>{movie.vote_average?.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
