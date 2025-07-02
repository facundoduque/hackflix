import React from "react";
import "./HeroSection.css";
import SearchInput from "../../ui/SearchInput/SearchInput";

function HeroSection() {
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

        <SearchInput />
      </div>
    </section>
  );
}

export default HeroSection;
