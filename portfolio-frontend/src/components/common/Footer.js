// src/components/common/Footer.js
import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp, Terminal, Code, Zap } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../../utils/constants";
import { scrollToSection } from "../../utils/helpers";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, url: SOCIAL_LINKS.github, label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, url: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
    { icon: <Mail className="w-5 h-5" />, url: `mailto:${PERSONAL_INFO.email}`, label: "Email" },
  ];

  const quickLinks = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ];

  const techStack = [
    { name: "React", color: "text-cyan-400" },
    { name: "Node.js", color: "text-green-400" },
    { name: "Tailwind", color: "text-blue-400" },
    { name: "Framer", color: "text-purple-400" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0d1b2a] to-[#0a0e1a] border-t border-blue-500/10 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Top Grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-400" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </h3>
            </div>
            <p className="text-gray-400 text-sm font-mono">
              <Code className="w-3 h-3 inline mr-1 text-blue-400" />
              {PERSONAL_INFO.title}
            </p>
            <p className="text-gray-500 text-sm leading-relaxed font-mono">
              <span className="text-blue-400">// </span>
              Building scalable, cloud-native solutions with modern technologies.
            </p>
            
            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 text-xs font-mono rounded-md bg-gray-800/30 border border-gray-700/30 ${tech.color}`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h4 className="text-lg font-semibold text-white font-mono">Quick Links</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-gray-400 hover:text-blue-400 transition-all text-sm font-mono hover:translate-x-1 transform duration-200"
                >
                  <span className="text-blue-400/30">$</span> {link.label.toLowerCase()}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-400" />
              <h4 className="text-lg font-semibold text-white font-mono">Get In Touch</h4>
            </div>
            <p className="text-gray-400 text-sm font-mono">
              <span className="text-blue-400">// </span>
              <span className="text-gray-500">location:</span> {PERSONAL_INFO.location}
            </p>
            <p className="text-gray-400 text-sm font-mono">
              <span className="text-blue-400">// </span>
              <span className="text-gray-500">phone:</span> {PERSONAL_INFO.phone}
            </p>
            <p className="text-gray-400 text-sm font-mono">
              <span className="text-blue-400">// </span>
              <span className="text-gray-500">status:</span> 
              <span className="text-green-400 ml-1">● active</span>
            </p>
          </motion.div>
        </div>

        {/* Social Links & Back to Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between border-t border-blue-500/10 pt-6 gap-4 md:gap-0"
        >
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-xs font-mono">$ social --connect</span>
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2.5 rounded-xl bg-gray-800/30 border border-gray-700/30 text-gray-400 hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300 group"
              >
                <span className="group-hover:scale-110 transition-transform block">
                  {social.icon}
                </span>
              </a>
            ))}
          </div>

          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-all group font-mono text-sm"
            aria-label="Back to top"
          >
            <span>$ scroll --top</span>
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center pt-8 border-t border-blue-500/10 mt-8"
        >
          <p className="text-gray-500 text-sm font-mono flex items-center justify-center gap-2 flex-wrap">
            <span>© {currentYear}</span>
            <span className="text-gray-600">|</span>
            <span className="text-blue-400/60">$</span>
            <span>echo "Built with</span>
            <Heart className="w-3 h-3 text-red-400 animate-pulse" />
            <span>using React & Tailwind"</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-600 text-xs">{PERSONAL_INFO.name}</span>
          </p>
          <p className="text-gray-600 text-xs font-mono mt-1">
            <span className="text-blue-400/40">// </span>
            All rights reserved. Made with passion for clean code.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;