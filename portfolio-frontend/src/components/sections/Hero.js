// src/components/sections/Hero.js
import React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, Download } from "lucide-react";
import Button from "../ui/Button";
import { scrollToSection } from "../../utils/helpers";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../../utils/constants";


const Hero = () => {
  const { scrollY } = useViewportScroll();

  // Floating shapes
  const floatX = useTransform(scrollY, [0, 500], [0, 80]);
  const floatY = useTransform(scrollY, [0, 500], [0, -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.3 } 
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-6 bg-gradient-to-b from-blue-900 to-gray-800"
    >
      {/* Background shapes */}
      <motion.div
        style={{ x: floatX, y: floatY }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl animate-float"
      />
      <motion.div
        style={{ x: floatX, y: floatY }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gray-400/20 blur-3xl animate-float"
      />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Image with Company Logo on Border */}
        <motion.div
          className="relative inline-block"
          variants={itemVariants}
        >
          <motion.img
            src={PERSONAL_INFO.profileImage}
            alt="Profile"
            className="w-36 h-36 md:w-44 md:h-44 rounded-full mx-auto border-4 border-blue-400/50 shadow-2xl object-cover hover:scale-105 transition-transform duration-500"
          />

          {/* Company Logo Badge (on the border) */}
          <div
          className={`absolute top-3/4 -right-5 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 
                      rounded-full border-2 border-black bg-black shadow-xl flex items-center justify-center 
                      hover:scale-110 transition-transform duration-300`}
          title={PERSONAL_INFO.currentCompany}  // Tooltip on hover
        >
          <img
            src={PERSONAL_INFO.companyLogo}  // Your company logo path
            alt={PERSONAL_INFO.currentCompany || "Company Logo"}
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
          />
        </div>

        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-4 mt-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-gray-400 to-blue-500 animate-gradient-x"
        >
          {PERSONAL_INFO.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-200 mb-6"
        >
          {PERSONAL_INFO.title}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {PERSONAL_INFO.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
        >
          <Button onClick={() => scrollToSection("contact")} variant="primary" size="lg">
            Get In Touch
          </Button>
          <Button
            onClick={() => window.open("/pc_react_node_4years.pdf", "_blank")}
            variant="secondary"
            size="lg"
            icon={<Download className="w-4 h-4" />}
          >
            Download CV
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-6 mb-16"
        >
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition duration-300"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition duration-300"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition duration-300"
          >
            <Mail className="w-6 h-6" />
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={() => scrollToSection("about")}
        >
          <ChevronDown className="w-6 h-6 text-blue-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
