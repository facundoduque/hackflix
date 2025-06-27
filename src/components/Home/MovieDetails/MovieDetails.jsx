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

        const resCredits = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=es-ES`
        );
        const creditsData = await resCredits.json();

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

  return (
    <div
      className="details-backdrop"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0,0,0,0.1)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <h1 className="details-title">{movie.title}</h1>

      <div className="details-content">
        <div className="details-grid">
          <div>
            <p><strong>🎬 Director:</strong> {director?.name || "Desconocido"}</p>
            <p><strong>⭐ Rating:</strong> {movie.vote_average?.toFixed(1)} / 10</p>
            <p><strong>🎭 Actores:</strong> {actors?.map(a => a.name).join(", ")}</p>
          </div>
          <div>
            <p><strong>📅 Estreno:</strong> {movie.release_date}</p>
            <p><strong>📝 Descripción:</strong></p>
            <p className="details-overview">{movie.overview}</p>
          </div>
        </div>

        <button className="movie-button" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
}
