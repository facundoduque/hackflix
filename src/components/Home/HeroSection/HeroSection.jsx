import React from "react";
import "./HeroSection.css";

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="tv-content">
        <h1>¿Qué verás hoy?</h1>
        <input
          type="text"
          placeholder="Hoy veré..."
          autoComplete="off"
        />
      </div>
    </section>
  );
};