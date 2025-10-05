// src/components/common/ScrollToTop.js
import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
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
            scale: 1.15,
            y: -2,
            boxShadow: "8px 8px 20px #a6a6a6, -8px -8px 20px #ffffff",
          }}
          whileTap={{
            scale: 0.95,
            y: 1,
            boxShadow: "inset 4px 4px 8px #a6a6a6, inset -4px -4px 8px #ffffff",
          }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gray-200 text-purple-600 rounded-full transition-all duration-300 focus:outline-none"
          style={{
            boxShadow: "8px 8px 15px #a6a6a6, -8px -8px 15px #ffffff",
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
