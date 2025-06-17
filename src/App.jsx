import { useState } from "react";
import Navbar from "./components/ui/Navbar/Navbar";
import { HeroSection } from "./components/Home/HeroSection/HeroSection";
import "./App.css";
import Footer from "./components/ui/Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      
       <div className="app">
      <header className="app-header">
        <h1>Bienvenido a StreamFlix</h1>
        <p>Tu plataforma de streaming favorita</p>
      </header>

      <main className="app-main">
        <p>Contenido de ejemplo...</p>
        <div style={{ height: '300px' }}></div>
      </main>

      <Footer />
    </div>
    
      <HeroSection></HeroSection>
    </>
  );
}

export default App;
