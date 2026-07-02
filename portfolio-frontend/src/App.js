// src/App.js
import React, { Suspense, lazy, useEffect } from "react";
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
  // Reset scroll position on page load/refresh
  useEffect(() => {
    // Scroll to top on initial load
    window.scrollTo(0, 0);
    
    // Handle browser back/forward navigation
    const handlePopState = () => {
      // You can add custom logic here if needed
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1b2a] to-[#1a2a3a] text-white">
        <Header />

        {/* Suspense fallback shown while components load */}
        <Suspense
          fallback={
            <div className="flex flex-col justify-center items-center h-screen">
              <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-blue-500/10 border border-blue-400/20">
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-blue-400 font-mono text-lg">Loading Portfolio...</span>
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
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