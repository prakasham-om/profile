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
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1)",
          }}
          whileTap={{
            scale: 0.95,
            y: 1,
          }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Scroll to top"
        >
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl group-hover:bg-blue-500/30 transition-all duration-300"></div>
          
          {/* Progress Ring */}
          <svg className="absolute -inset-1 w-[58px] h-[58px] -rotate-90">
            <circle
              cx="29"
              cy="29"
              r="27"
              fill="none"
              stroke="rgba(59, 130, 246, 0.1)"
              strokeWidth="2"
            />
            <circle
              cx="29"
              cy="29"
              r="27"
              fill="none"
              stroke="url(#scrollGradient)"
              strokeWidth="2"
              strokeDasharray={`${scrollProgress * 1.7} 170`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Button */}
          <div className="relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full p-3.5 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 group-hover:border-blue-400/50">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-blue-400/50 group-hover:text-blue-400 transition-colors" />
              <ChevronUp className="w-5 h-5 text-blue-400 group-hover:text-cyan-400 transition-colors group-hover:-translate-y-0.5 transform" />
            </div>
          </div>

          {/* Tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-blue-400/20 whitespace-nowrap">
            <span className="text-xs font-mono text-blue-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              $ scroll --top
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;