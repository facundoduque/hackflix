import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

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

  const updateWatchlistCount = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlistCount(watchlist.length);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    updateWatchlistCount();

    const handleStorageChange = () => {
      updateWatchlistCount();
    };

    window.addEventListener('storage', handleStorageChange);

    window.addEventListener('watchlistUpdated', updateWatchlistCount);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('watchlistUpdated', updateWatchlistCount);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".main-navbar")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const handleNavigation = (path) => {
    setIsOpen(false);
    if (path === "/") {
      navigate("/");
    } else if (path === "/search") {
      navigate("/search");
    } else if (path === "/mi-lista") {
      navigate("/mi-lista");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className={`main-navbar ${showNavbar ? "show" : "hide"}`}>
      <div className="navbar-container">
        <div
          className="hackflix"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          HackFlix
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
        </div>
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>
            <a
              onClick={() => handleNavigation("/")}
              className={location.pathname === "/" ? "active-link" : ""}
              style={{ cursor: "pointer" }}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNavigation("/search")}
              className={location.pathname.startsWith("/search") ? "active-link" : ""}
              style={{ cursor: "pointer" }}
            >
              Buscar
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNavigation("/mi-lista")}
              className={location.pathname === "/mi-lista" ? "active-link" : ""}
              style={{ cursor: "pointer" }}
            >
              Mi Lista
              {watchlistCount > 0 && (
                <span className="watchlist-badge">{watchlistCount}</span>
              )}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;