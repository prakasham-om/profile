// src/components/common/ScrollToTop.js
import React, { useState, useEffect } from "react";
import { ChevronUp, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.pageYOffset;
      setIsVisible(scrollY > 300);
      
      // Calculate scroll progress
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / maxScroll) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{
            scale: 1.1,
            y: -3,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={scrollToTop}
          className="fixed bottom-6 sm:bottom-8 right-4 sm:right-8 z-50 group"
          aria-label="Scroll to top"
          style={{
            boxShadow: '0 0 30px rgba(34, 197, 94, 0.15), 0 0 60px rgba(34, 197, 94, 0.05)',
          }}
        >
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl group-hover:bg-green-500/30 transition-all duration-300"></div>
          
          {/* Progress Ring */}
        

          {/* Main Button */}
          <div className="relative bg-gradient-to-br from-green-500/20 to-cyan-500/20 backdrop-blur-sm border border-green-400/30 rounded-full p-3 shadow-xl shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-300 group-hover:border-green-400/50">
            <div className="flex items-center justify-center gap-1">
              <Terminal className="w-3 h-3 text-green-400/50 group-hover:text-green-400 transition-colors" />
              <ChevronUp className="w-5 h-5 text-green-400 group-hover:text-cyan-400 transition-colors group-hover:-translate-y-0.5 transform" />
            </div>
          </div>

          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-green-400/20 whitespace-nowrap pointer-events-none">
            <span className="text-xs font-mono text-green-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              $ scroll --top
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ✅ ADD THIS EXPORT - This was missing!
export default ScrollToTop;