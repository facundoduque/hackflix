import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "907a9fb809fb11078579d97f9714bd2b";

        const resMovie = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`
        );
        const movieData = await resMovie.json();
        console.log("movieData", movieData);

        const resCredits = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=es-ES`
        );
        const creditsData = await resCredits.json();
        console.log("creditsData", creditsData);

        setMovie(movieData);
        setCredits(creditsData);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar la película:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Cargando detalles de la película...</p>;
  if (!movie) return <p>No se encontró la película.</p>;

  const director = credits?.crew.find((person) => person.job === "Director");
  const actors = credits?.cast?.slice(0, 5);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-details-container">
      <div className="movie-poster">
        <img src={imageUrl} alt={movie.title} />
      </div>

      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p>
          <strong>Director:</strong> {director?.name || "Desconocido"}
        </p>
        <p>
          <strong>Rating:</strong> {movie.vote_average?.toFixed(1)} / 10 ⭐
        </p>
        <p>
          <strong>Actores:</strong>{" "}
          {actors ? actors.map((actor) => actor.name).join(", ") : "No disponible"}
        </p>
        <p>
          <strong>Descripción:</strong> {movie.overview}
        </p>
        <p>
          <strong>Fecha de estreno:</strong> {movie.release_date}
        </p>

        <div className="movie-buttons">
          <button className="movie-button" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
