import React, { useState } from "react";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const VITE_TMDB_API_KEY = "907a9fb809fb11078579d97f9714bd2b";

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${VITE_TMDB_API_KEY}&query=${encodeURIComponent(
      query
    )}&language=es-ES`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("📦 Datos recibidos:", data.results);
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Hoy veré..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "0.5rem", width: "260px" }}
        />
      </form>

      {movies.length > 0 && (
        <ul
          style={{
            marginTop: "1rem",
            listStyle: "none",
            padding: 0,
          }}
        >
          {movies.map((m) => (
            <li key={m.id}>{m.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
