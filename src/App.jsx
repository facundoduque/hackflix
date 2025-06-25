import { useState } from "react";
import { Navbar } from "./components/ui/Navbar/Navbar";
import { HeroSection } from "./components/Home/HeroSection/HeroSection";
import { MoviesSection } from "./components/Home/MoviesSection/MoviesSection";
import "./App.css";
import Footer from "./components/ui/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <HeroSection />
      <MoviesSection />
      <Footer />

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
    </Routes>


    </>
  );
}

export default App;
