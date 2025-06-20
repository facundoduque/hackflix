import { useState, useEffect } from 'react';
import { fetcher } from '../../../api/fetcher';
import './MoviesSection.css';

export const MoviesSection = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getImageUrl = (posterPath) => {
    return posterPath 
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : '/placeholder-movie.jpg';
  };

  const fetchMovies = async () => {
    if (loading || !hasMore) return;

    
    if (movies.length >= 54) {
      setHasMore(false);
      return;
    }

    setLoading(true);
    try {
      const data = await fetcher(`/movie/popular?page=${page}`);
      const newMovies = data.results?.slice(0, 18) || [];

      setMovies((prev) => [...prev, ...newMovies]);

      if (newMovies.length < 18 || movies.length + newMovies.length >= 90) {
        setHasMore(false);
      }

      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(); 
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchMovies();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [movies, loading, hasMore]);

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

      {loading && (
        <div className="loader-container">
          <div className="custom-loader"></div>
        </div>
      )}

      {!hasMore && (
        <div className="loader-container">
          <p>No hay más películas para mostrar.</p>
        </div>
      )}
    </div>
  );
};

