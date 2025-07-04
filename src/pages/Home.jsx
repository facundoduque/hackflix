import Navbar from "../components/ui/Navbar/Navbar";
import HeroSection from "../components/Home/HeroSection/HeroSection";
import MoviesSection from "../components/Home/MoviesSection/MoviesSection";
import Footer from "../components/ui/Footer/Footer";
import SearchInput from "../components/ui/SearchInput/SearchInput.jsx";
import SearchResults from "../components/SearchResults.jsx";

function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <SearchResults />
      <MoviesSection />
      <Footer />
    </div>
  );
}

export default Home;
