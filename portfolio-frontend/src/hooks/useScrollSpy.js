// src/hooks/useScrollSpy.js
import { useState, useEffect } from "react";
import { throttle } from "../utils/helpers";

const useScrollSpy = (
  sections = ["home", "about", "skills", "projects", "experience", "contact"],
  options = {}
) => {
  const [activeSection, setActiveSection] = useState("home");

  const { offset = 100, throttleMs = 100 } = options;

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY + offset;

      // Find the current section
      let currentSection = sections[0];

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;

          if (scrollPosition >= elementTop) {
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    }, throttleMs);

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections, offset, throttleMs]);

  return activeSection;
};

export default useScrollSpy;
