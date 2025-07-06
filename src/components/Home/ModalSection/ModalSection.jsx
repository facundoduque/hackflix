import React, { useState, useEffect } from 'react';
import './ModalSection.css';
import { useNavigate } from "react-router-dom";

export default function ModalSection({ isOpen, onClose, title, children, backdrop, movieId }) {
  const navigate = useNavigate();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (movieId) {
      const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
      setIsInWatchlist(watchlist.some(movie => movie.id === movieId));
    }
  }, [movieId]);

  if (!isOpen) return null;

  const handleVerMas = () => {
    onClose();
    navigate(`/pelicula/${movieId}`);
  };

  const handleWatchlistToggle = () => {
    setIsLoading(true);

    try {
      const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');

      if (isInWatchlist) {
        const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
        setIsInWatchlist(false);
      } else {
        const movieData = {
          id: movieId,
          title: title,
          backdrop: backdrop,
          dateAdded: new Date().toISOString()
        };

        const movieExists = watchlist.some(movie => movie.id === movieId);
        if (!movieExists) {
          watchlist.push(movieData);
          localStorage.setItem('watchlist', JSON.stringify(watchlist));
          setIsInWatchlist(true);
        }
      }

      window.dispatchEvent(new Event('watchlistUpdated'));

    } catch (error) {
      console.error('Error updating watchlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div
          className="modal-backdrop"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4)), url(https://image.tmdb.org/t/p/original${backdrop})`,
          }}
        ></div>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          <h2 className="modal-title">{title}</h2>
          <div className="modal-description">{children}</div>
          <div className="modal-buttons">
            <button className="modal-add-btn primary" onClick={handleVerMas}>
              Ver más
            </button>
            <button
              className={`modal-add-btn ${isInWatchlist ? 'in-watchlist' : 'secondary'}`}
              onClick={handleWatchlistToggle}
              disabled={isLoading}
            >
              {isLoading ? (
                '⏳'
              ) : isInWatchlist ? (
                <>✓ En mi lista</>
              ) : (
                <>+ Agregar a mi lista</>
              )}
            </button>
           </div>
        </div>
      </div>
    </div>
  );
}