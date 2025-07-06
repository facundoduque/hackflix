import { useState, useEffect, useMemo } from "react";
import { usePopularMovies } from "../../../hooks/useMovies";
import ModalSection from "../ModalSection/ModalSection";
import "./MoviesSection.css";

function MoviesSection() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = usePopularMovies();

  const movies = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page.results);
  }, [data]);

  const filteredMovies = useMemo(() => {
    if (selectedRating === 0) return movies;
    return movies.filter((movie) => {
      const movieRating = Math.floor(movie.vote_average / 2);
      return movieRating === selectedRating;
    });
  }, [movies, selectedRating]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (
        scrollTop + clientHeight >= scrollHeight - 150 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const getImageUrl = (posterPath) =>
    posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : "/placeholder-movie.jpg";

  const handleClickMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  // Manejo de errores
  if (isError) {
    return (
      <div className="error-container">
        <h3>Error al cargar las películas</h3>
        <p>{error?.message || 'Ha ocurrido un error inesperado'}</p>
        <button onClick={() => window.location.reload()}>
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="rating-filter-section">
        <div className="rating-filter">
          <label>⭐ Filtrar por rating ⭐</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= selectedRating ? "active" : ""}`}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          {selectedRating > 0 && (
            <button
              className="clear-rating"
              onClick={() => setSelectedRating(0)}
            >
              Mostrar todas
            </button>
          )}
          <div className="results-count">
            {selectedRating > 0 && (
              <span>Mostrando {filteredMovies.length} películas </span>
            )}
          </div>
        </div>
      </div>

      <div className="movie-grid-container">
        {isLoading && (
          <div className="loader-container">
            <div className="custom-loader"></div>
            <p>Cargando películas...</p>
          </div>
        )}

        {!isLoading && (
          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => handleClickMovie(movie)}
                style={{ cursor: "pointer" }}
              >
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
        )}
        {isFetchingNextPage && (
          <div className="loader-container">
            <div className="custom-loader"></div>
            <p>Cargando más películas...</p>
          </div>
        )}
        {!hasNextPage && !isLoading && movies.length > 0 && (
          <div className="loader-container">
            <p>No hay más películas para mostrar.</p>
          </div>
        )}
      </div>

      <ModalSection
        isOpen={!!selectedMovie}
        onClose={handleCloseModal}
        title={selectedMovie?.title}
        backdrop={selectedMovie?.backdrop_path}
        movieId={selectedMovie?.id}
      >
        <p>{selectedMovie?.overview || "Sin descripción disponible."}</p>
      </ModalSection>
    </>
  );
}

export default MoviesSection;