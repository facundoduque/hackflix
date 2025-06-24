import { useState, useEffect } from "react";
import "./Navbar.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.main-navbar')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <nav className={`main-navbar ${showNavbar ? "show" : "hide"}`}>
      <div className="navbar-container">
        <div className="hackflix">HackFlix</div>
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
        </div>
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>
            <a href="#inicio" onClick={() => setIsOpen(false)}>Inicio</a>
          </li>
          <li>
            <a href="#peliculas" onClick={() => setIsOpen(false)}>Películas</a>
          </li>
          <li>
            <a href="#series" onClick={() => setIsOpen(false)}>Series</a>
          </li>
          <li>
            <a href="#mi-lista" onClick={() => setIsOpen(false)}>Mi Lista</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};