import { useState } from "react";
import Navbar from "./components/ui/Navbar/Navbar";
import { HeroSection } from "./components/Home/HeroSection/HeroSection";
import "./App.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <HeroSection></HeroSection>
    </>
  );
}

export default App;
