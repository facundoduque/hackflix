import Navbar from "../components/ui/Navbar/Navbar";
import HeroSection from "../components/Home/HeroSection/HeroSection";
import MoviesSection from "../components/Home/MoviesSection/MoviesSection";
import Footer from "../components/ui/Footer/Footer";
function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MoviesSection />
      <Footer />
    </div>
  );
}

export default Home;
