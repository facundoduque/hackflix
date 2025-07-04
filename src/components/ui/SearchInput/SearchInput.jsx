import React, { useState } from "react";
import { useNavigate } from "react-router";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); //
  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    // 👇 redirige a la nueva página de resultados
    navigate(`/search/${encodeURIComponent(query)}`);
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
    </div>
  );
};

export default SearchInput;
