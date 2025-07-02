import "./App.css";
import SearchInput from "./components/ui/SearchInput/SearchInput.jsx";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import MovieDetails from "./components/Home/MovieDetails/MovieDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pelicula/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
