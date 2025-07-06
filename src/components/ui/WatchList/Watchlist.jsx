import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Watchlist.css';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = () => {
    try {
      const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
      setWatchlist(savedWatchlist);
    } catch (error) {
      console.error('Error loading watchlist:', error);
      setWatchlist([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);

    window.dispatchEvent(new Event('watchlistUpdated'));
  };

  const clearWatchlist = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar toda tu lista?')) {
      localStorage.removeItem('watchlist');
      setWatchlist([]);

      window.dispatchEvent(new Event('watchlistUpdated'));
    }
  };

  const goToMovie = (movieId) => {
    navigate(`/pelicula/${movieId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="watchlist-page">
          <div className="loading">Cargando tu lista...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="watchlist-page">
        <div className="watchlist-header">
          {watchlist.length > 0 && (
            <div className="watchlist-actions">
              <span className="watchlist-count">
                {watchlist.length} película{watchlist.length !== 1 ? 's' : ''}
              </span>
              <button className="clear-btn" onClick={clearWatchlist}>
                Limpiar Lista
              </button>
            </div>
          )}
        </div>

        {watchlist.length === 0 ? (
          <div className="empty-watchlist">
            <div className="empty-icon">📋</div>
            <h2>Tu lista está vacía</h2>
            <p>Agrega películas a tu lista para verlas más tarde</p>
            <button
              className="browse-btn"
              onClick={() => navigate('/')}
            >
              Explorar Películas
            </button>
          </div>
        ) : (
          <div className="watchlist-grid">
            {watchlist.map((movie) => (
              <div key={movie.id} className="watchlist-item">
                <div
                  className="watchlist-poster"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop})`,
                  }}
                  onClick={() => goToMovie(movie.id)}
                >
                  <div className="watchlist-overlay">
                    <button
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWatchlist(movie.id);
                      }}
                      title="Eliminar de la lista"
                    >
                      ×
                    </button>
                    <div className="play-icon">▶</div>
                  </div>
                </div>
                <div className="watchlist-info">
                  <h3 className="watchlist-title">{movie.title}</h3>
                  <p className="watchlist-date">
                    Agregado el {formatDate(movie.dateAdded)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}