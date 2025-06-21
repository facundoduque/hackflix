import React from 'react';
import './ModalSection.css';

export default function ModalSection({ isOpen, onClose, title, children, backdrop }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div
          className="modal-backdrop"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4)), url(https://image.tmdb.org/t/p/original${backdrop})`,
          }}
        >
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
          <div className="modal-content">
            <h2 className="modal-title">{title}</h2>
            <div className="modal-description">{children}</div>
            <button className="modal-add-btn">+ Agregar a mi lista</button>
          </div>
        </div>
      </div>
    </div>
  );
}

