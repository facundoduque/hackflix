import React from "react";
import "./HeroSection.css";

export const HeroSection = () => {
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(/imagen_horizontal_hero.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        }}
        >
      <div className="hero-content">
        <h1>Buscá tu película ahora</h1>
        <div className="search-box">
          <input type="text" placeholder="Buscar..." />
          <button>Buscar</button>
        </div>
      </div>
    </section>
  );
};