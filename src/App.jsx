import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import MovieDetails from "./components/Home/MovieDetails/MovieDetails";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pelicula/:id" element={<MovieDetails />} />
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>
    </>
  );
}

export default App;
