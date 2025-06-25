import { useState, useEffect, useCallback } from "react";
import { fetcher } from "../../../api/fetcher";
import ModalSection from "../ModalSection/ModalSection";
import "./MoviesSection.css";

function MoviesSection() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const MAX_PAGES = 3;

  const getImageUrl = (posterPath) =>
    posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : "/placeholder-movie.jpg";

  const fetchMovies = useCallback(
    async (pageToLoad) => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const data = await fetcher("/movie/popular", {
          params: {
            page: pageToLoad,
            language: "es-ES",
          },
        });

        const newMovies = data.results.slice(0, 18);

        setMovies((prevMovies) => {
          const filteredNewMovies = newMovies.filter(
            (movie) => !prevMovies.some((m) => m.id === movie.id)
          );
          return [...prevMovies, ...filteredNewMovies];
        });

        if (pageToLoad >= MAX_PAGES || newMovies.length < 18) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    fetchMovies(page);
  }, [page, fetchMovies]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (
        scrollTop + clientHeight >= scrollHeight - 150 &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const handleClickMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <div className="movie-grid-container">
        <div className="movie-grid">
          {movies.map((movie) => (
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

        {loading && (
          <div className="loader-container">
            <div className="custom-loader"></div>
          </div>
        )}

        {hasMore && !loading && (
          <div
            className="load-more-container"
            style={{ textAlign: "center", margin: "20px 0" }}
          >
            <button onClick={handleLoadMore} className="load-more-button">
              Cargar más
            </button>
          </div>
        )}

        {!hasMore && (
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
      >
        <p>{selectedMovie?.overview || "Sin descripción disponible."}</p>
      </ModalSection>
    </>
  );
}

export default MoviesSection;
