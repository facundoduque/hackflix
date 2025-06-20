import React from "react";
import "./HeroSection.css";

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="input-overlay">
        <input type="text" placeholder="Buscar..." />
      </div>
    </section>
  );
};
