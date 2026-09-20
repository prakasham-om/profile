// src/components/common/Header.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { scrollToSection } from "../../utils/helpers";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setIsOpen(false);
    setTimeout(() => {
      scrollToSection(id);
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0e1a]/95 backdrop-blur-lg border-b border-green-500/10 shadow-lg shadow-green-500/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
            className="flex items-center gap-2 text-lg sm:text-xl font-bold text-white hover:text-green-400 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              {">_"}
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 relative ${
                  activeSection === item.id
                    ? "text-green-400"
                    : "text-gray-400 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">
                  {activeSection === item.id && (
                    <span className="text-green-400 mr-1">$</span>
                  )}
                  {item.label.toLowerCase()}
                </span>
                {activeSection === item.id && (
                  <motion.div
                    className="absolute inset-0 bg-green-500/10 rounded-lg border border-green-400/20"
                    layoutId="activeNav"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-green-500/10 transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <nav className="flex flex-col gap-1 py-3 border-t border-green-500/10 mt-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`px-4 py-2.5 rounded-lg text-sm font-mono transition-all ${
                  activeSection === item.id
                    ? "bg-green-500/10 text-green-400 border border-green-400/20"
                    : "text-gray-400 hover:text-white hover:bg-green-500/5"
                }`}
              >
                <span className="flex items-center gap-2">
                  {activeSection === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  )}
                  {item.label.toLowerCase()}
                </span>
              </a>
            ))}
          </nav>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;