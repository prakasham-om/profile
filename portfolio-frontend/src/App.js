// src/App.js
import React, { Suspense, lazy } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import "./styles/globals.css";

// Lazy-loaded components
const Hero = lazy(() => import("./components/sections/Hero"));
const About = lazy(() => import("./components/sections/About"));
const Skills = lazy(() => import("./components/sections/Skills"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Experience = lazy(() => import("./components/sections/Experience"));
const Contact = lazy(() => import("./components/sections/Contact"));

function App() {
  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <Header />

        {/* Suspense fallback shown while components load */}
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen text-lg font-semibold animate-pulse">
              Loading Portfolio...
            </div>
          }
        >
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
        </Suspense>

        <Footer />
        <ScrollToTop />
      </div>
    </ParallaxProvider>
  );
}

export default App;
