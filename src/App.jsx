import "./App.css";

import { Routes, Route } from "react-router-dom";
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
