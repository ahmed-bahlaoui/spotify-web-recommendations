import Features from "./components/Features";
import Hero from "./components/Hero";
import Navbar from "./components/navigation/Navbar";
import "./index.css";

export function App() {
  return (
    <div className="mx-[30] lg:mx-[300]">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}

export default App;
