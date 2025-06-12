import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="main-navbar">
      <div className="hackflix"> HackFlix</div>

      <div className="hamburger" onClick={toggleMenu}>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
      </div>

      <ul className={"nav-links " + `${isOpen ? "active" : ""}`}>
        <li>
          <a href="#inicio" onClick={() => setIsOpen(false)}>
            Inicio
          </a>
        </li>
        <li>
          <a href="#servicios" onClick={() => setIsOpen(false)}>
            Servicios
          </a>
        </li>
        <li>
          <a href="#nosotros" onClick={() => setIsOpen(false)}>
            Nosotros
          </a>
        </li>
        <li>
          <a href="#contacto" onClick={() => setIsOpen(false)}>
            Contacto
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
