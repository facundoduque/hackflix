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

      <Footer />
   
    
      <HeroSection></HeroSection>
    </>
  );
}

export default App;
