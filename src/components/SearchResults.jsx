import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ModalSection from "./Home/ModalSection/ModalSection";
import "./Home/MovieDetails/MovieDetails.css";

const SearchResults = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const API_KEY = "907a9fb809fb11078579d97f9714bd2b";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
          )}&language=es-ES`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error al buscar películas:", error);
      }
    };

    fetchMovies();
  }, [query]);

  const getImageUrl = (posterPath) =>
    posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : "/placeholder-movie.jpg";

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Resultados para: <strong>{decodeURIComponent(query)}</strong>
      </h2>

      <div className="movie-grid-container">
        <div className="movie-grid">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => setSelectedMovie(movie)}
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
      </div>

      {/* Modal */}
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
