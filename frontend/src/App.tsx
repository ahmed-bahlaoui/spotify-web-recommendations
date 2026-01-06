import Demo from "./components/Demo";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/navigation/Navbar";
import "./index.css";

export function App() {
  return (
    <div className="container px-5 mx-auto w-full ">
      <Navbar />
      <Hero />
      <Features />
      <Demo />
      <Footer />
    </div>
  );
}

export default App;
