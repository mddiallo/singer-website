import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Music from "./components/sections/Music";
import TourDates from "./components/sections/TourDates";
import Gallery from "./components/sections/Gallery";
import FanSignup from "./components/sections/FanSignup";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Music />
        <TourDates />
        <Gallery />
        <FanSignup />
      </main>
      <Footer />
    </>
  );
}
