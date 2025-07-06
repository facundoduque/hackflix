import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSearchMovies } from "../../hooks/useMovies";
import ModalSection from "../Home/ModalSection/ModalSection";
import "../Home/MovieDetails/MovieDetails.css";
import "./SearchResults.css";

const SearchResults = () => {
  const { query: urlQuery } = useParams();
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentQuery, setCurrentQuery] = useState(
    urlQuery ? decodeURIComponent(urlQuery).trim() : ""
  );
  const [debouncedQuery, setDebouncedQuery] = useState(currentQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(currentQuery);
      if (currentQuery.trim()) {
        const currentUrlQuery = urlQuery ? decodeURIComponent(urlQuery) : "";
        if (currentQuery !== currentUrlQuery) {
          navigate(`/search/${encodeURIComponent(currentQuery)}`, { replace: true });
        }
      } else {
        navigate("/search", { replace: true });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [currentQuery, navigate, urlQuery]);

  useEffect(() => {
    const decodedQuery = urlQuery ? decodeURIComponent(urlQuery).trim() : "";
    setCurrentQuery(decodedQuery);
    setDebouncedQuery(decodedQuery);
  }, [urlQuery]);

  const {
    data: movieData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useSearchMovies(debouncedQuery.trim(), {
    enabled: debouncedQuery.trim().length > 0,
  });

  const movies = movieData?.results || [];
  const hasSearched = debouncedQuery.trim().length > 0;

  const getImageUrl = (posterPath) =>
    posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : "/placeholder-movie.jpg";

  const handleInputChange = (e) => {
    setCurrentQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setDebouncedQuery(currentQuery);
    }
  };

  return (
    <div className="search-results-container">
      <div className="search-header">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M12 19L5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Volver
        </button>

        <div className="search-section">
          <div className="search-wrapper-results">
            <input
              type="text"
              placeholder="Buscar películas..."
              value={currentQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="search-input-results"
            />
            <div className="search-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {isError && (
        <div className="error-container">
          <h3>Error en la búsqueda</h3>
          <p>{error?.message || 'Ha ocurrido un error al buscar películas'}</p>
        </div>
      )}

      {hasSearched && debouncedQuery.trim() && !isError && (
        <div className="results-info">
          <h2 className="results-title">
            Resultados para: <span className="query-highlight">"{debouncedQuery}"</span>
          </h2>
          <p className="results-count">
            {isLoading || isFetching ? "Buscando..." : `${movies.length} película${movies.length !== 1 ? 's' : ''} encontrada${movies.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      )}

      {hasSearched && !currentQuery.trim() && !isLoading && (
        <div className="search-prompt">
          <div className="search-prompt-icon">✏️</div>
          <h3>Escribe para buscar películas</h3>
          <p>El campo de búsqueda está vacío</p>
        </div>
      )}

      {(isLoading || isFetching) && debouncedQuery.trim() && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Buscando películas...</p>
        </div>
      )}

      {!isLoading && !isFetching && hasSearched && debouncedQuery.trim() && !isError && (
        <div className="movie-grid-container">
          {movies.length > 0 ? (
            <div className="movie-grid">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-card"
                  onClick={() => setSelectedMovie(movie)}
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
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🎬</div>
              <h3>No se encontraron películas</h3>
              <p>Intenta con una búsqueda diferente</p>
            </div>
          )}
        </div>
      )}

      {!hasSearched && !isLoading && (
        <div className="search-prompt">
          <div className="search-prompt-icon">🔍</div>
          <h3>¿Qué película buscas?</h3>
          <p>Escribe el nombre de una película en el buscador</p>
        </div>
      )}

      <ModalSection
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
        title={selectedMovie?.title}
        backdrop={selectedMovie?.backdrop_path}
        movieId={selectedMovie?.id}
      >
        <p>{selectedMovie?.overview || "Sin descripción disponible."}</p>
      </ModalSection>
    </div>
  );
};

export default SearchResults;