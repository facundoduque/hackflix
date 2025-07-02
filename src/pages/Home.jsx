import Navbar from "../components/ui/Navbar/Navbar";
import HeroSection from "../components/Home/HeroSection/HeroSection";
import MoviesSection from "../components/Home/MoviesSection/MoviesSection";
import Footer from "../components/ui/Footer/Footer";
import SearchInput from "../components/ui/SearchInput/SearchInput.jsx";

function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <SearchInput />
      <MoviesSection />
      <Footer />
    </div>
  );
}

export default Home;
