import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams(); // Captura el :id de la URL
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=907a9fb809fb11078579d97f9714bd2b&language=es-ES`
        );
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar la película:", error);
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (loading) return <p>Cargando detalles de la película...</p>;

  if (!movie) return <p>No se encontró la película.</p>;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div style={{ padding: "20px" }}>
      <h1>{movie.title}</h1>
      <img src={imageUrl} alt={movie.title} style={{ maxWidth: "300px" }} />
      <p>
        <strong>Descripción:</strong> {movie.overview}
      </p>
      <p>
        <strong>Fecha de estreno:</strong> {movie.release_date}
      </p>
      <button onClick={() => navigate("/")}>Volver al inicio</button>
    </div>
  );
}
