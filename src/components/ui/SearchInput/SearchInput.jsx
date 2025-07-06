import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchInput.css";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsTyping(false);
    navigate(`/search/${encodeURIComponent(query)}`);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.match(/^[a-zA-Z0-9\s]$/) && document.activeElement.tagName !== 'INPUT') {
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`search-input-container ${isTyping ? 'typing' : ''}`}>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-wrapper">
          <input
            ref={inputRef}
            type="text"
            placeholder="Hoy veré..."
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="search-input"
            autoComplete="off"
            spellCheck="false"
            aria-label="Buscar películas y series"
          />
          <button
            type="submit"
            className="search-button"
            disabled={!query.trim()}
            aria-label="Buscar"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;