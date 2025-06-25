import "./Card.css";
import { Link } from "react-router-dom";

export const Card = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.overview.slice(0, 100)}...</p>
        <Link to={`/pelicula/${movie.id}`} className="watch-button">
          Ver ahora
        </Link>
      </div>
    </div>
  );
};
export default Card;
