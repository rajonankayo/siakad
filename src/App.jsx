import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

import Home from "./route/home";
import About from "./route/about";
import Service from "./route/service";
import Blog from "./route/blog";
import Contact from "./route/contact";
import Login from "./route/login";
// import Galaxy from "./komponen/GalaxySection";

function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved) {
      setDark(saved === "dark");
    } else {
      setDark(true); // default dark
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="relative min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">

      {/* 🌌 Galaxy background */}
      {/* <div className="fixed inset-0 -z-10">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div> */}

      {/* UI utama */}
      <Navbar dark={dark} setDark={setDark} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;