import React from "react";
import "./HeroSection.css";
import heroImage from "./assets/imagen_horizontal_hero.jpg";

const Hero = () => {
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
  )}>
      <div className="hero-content">
        <h1>Buscá tu película ahora</h1
        <div className="search-box">
          <input type="text" placeholder="Buscar..." />
          <button>Buscar</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
