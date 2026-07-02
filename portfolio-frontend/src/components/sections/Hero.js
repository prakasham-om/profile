// src/components/sections/Hero.js
import React, { useEffect, useRef, useState } from "react";
import { motion, useViewportScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ArrowRight, 
  ChevronDown, 
  Terminal, 
  Code2, 
  Server, 
  Cpu, 
  Zap, 
  Layers, 
  Cloud, 
  Database, 
  Globe, 
  Briefcase, 
  Award 
} from "lucide-react";
import Button from "../ui/Button";
import { scrollToSection } from "../../utils/helpers";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../../utils/constants";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useViewportScroll();
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  const phrases = [
    "Full Stack Developer",
    "System Architect",
    "Cloud Engineer",
    "DevOps Specialist",
    "Tech Lead"
  ];

  // Typing effect
  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[loopNum % phrases.length];
      const isComplete = typedText === currentPhrase;
      
      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
        if (typedText === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      } else {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
        if (typedText === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum]);

  // Mouse tracking - disabled on mobile
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handleMouse = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x * 30);
        mouseY.set(y * 30);
      }
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  // Digital particles - reduced for mobile
  const getParticles = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 15 : 40;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.2 + 0.05,
    }));
  };

  const digitalParticles = getParticles();

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#0a0e1a] via-[#0d1b2a] to-[#1a2a3a]"
    >
      {/* Digital Particles Background - Mobile optimized */}
      {digitalParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 25, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid Pattern - lighter on mobile */}
      <div className="absolute inset-0 opacity-[0.02] md:opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated Gradient Orbs - Hidden on mobile */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl hidden md:block"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        style={{ x: useTransform(springX, (v) => -v * 0.5), y: useTransform(springY, (v) => -v * 0.5) }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-3xl hidden md:block"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-blue-500/10 border border-blue-400/20 backdrop-blur-sm mx-auto lg:mx-0"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 text-xs sm:text-sm font-medium">Available for opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                <span className="text-white">I'm </span>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent block sm:inline">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
            </motion.div>

            {/* Dynamic Typing Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-mono"
            >
              <div className="text-base sm:text-xl md:text-2xl text-cyan-400">
                <span className="text-gray-400">{"<"}</span>
                {typedText}
                <span className="animate-pulse">|</span>
                <span className="text-gray-400">{"/>"}</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 max-w-lg text-sm sm:text-base md:text-lg leading-relaxed mx-auto lg:mx-0"
            >
              {PERSONAL_INFO.description}
            </motion.p>

            {/* Stats - Mobile optimized */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 pt-2"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 border border-blue-400/20">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-base sm:text-lg">4.5+</div>
                  <div className="text-gray-400 text-[10px] sm:text-xs">Years</div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-base sm:text-lg">12+</div>
                  <div className="text-gray-400 text-[10px] sm:text-xs">Projects</div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/10 border border-purple-400/20">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-base sm:text-lg">8+</div>
                  <div className="text-gray-400 text-[10px] sm:text-xs">Clients</div>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack Tags - Scrollable on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2 overflow-x-auto pb-2"
            >
              {["React", "Node.js", "TypeScript", "AWS", "Docker", "Kubernetes", "Go", "Python"].map((tag, i) => (
                <span
                  key={i}
                  className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono rounded-md bg-gray-800/30 border border-gray-700/30 text-gray-300 hover:border-blue-400/30 hover:text-blue-400 hover:bg-blue-500/5 transition-all cursor-default whitespace-nowrap"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
            >
              <Button
                onClick={() => scrollToSection("contact")}
                size="md"
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-lg shadow-blue-500/20 text-sm sm:text-base"
              >
                Get In Touch
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => window.open("/psahoo-react-node.pdf", "_blank")}
                variant="secondary"
                size="md"
                icon={<Download className="w-4 h-4" />}
                className="border-2 border-blue-500/30 hover:border-blue-400/60 text-blue-400 hover:text-blue-300 bg-black/20 backdrop-blur-sm px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base"
              >
                Download CV
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
            >
              {[
                { href: SOCIAL_LINKS.github, icon: Github, label: "GitHub", color: "hover:text-white" },
                { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
                { href: `mailto:${PERSONAL_INFO.email}`, icon: Mail, label: "Email", color: "hover:text-red-400" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:bg-white/10 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className={`w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-all ${social.color}`} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Profile - Hidden on mobile, shown on larger screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex relative justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated Rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-blue-400/20"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ width: "120%", height: "120%", top: "-10%", left: "-10%" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-400/20"
                animate={{ scale: [1, 1.2, 1], rotate: [360, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ width: "140%", height: "140%", top: "-20%", left: "-20%" }}
              />

              {/* Profile Image */}
              <motion.div
                className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-400/30 shadow-2xl shadow-blue-500/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Status */}
                <motion.div
                  className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg border border-blue-400/30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-blue-400 text-xs font-medium">Active</span>
                </motion.div>

                {/* Company Logo */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-16 h-16 rounded-lg bg-black/90 backdrop-blur-sm border-2 border-blue-400/30 flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={PERSONAL_INFO.companyLogo}
                    alt="Company"
                    className="w-10 h-10 object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-10 -right-10 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-blue-500/30 shadow-xl"
              >
                <div className="text-center">
                  <div className="flex items-center gap-2 text-blue-400 text-xs">
                    <Server className="w-3 h-3" />
                    <span>Experience</span>
                  </div>
                  <div className="text-xl font-bold text-cyan-400">4.5+</div>
                  <div className="text-xs text-gray-400">Years</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -bottom-10 -left-10 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30 shadow-xl"
              >
                <div className="text-center">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs">
                    <Code2 className="w-3 h-3" />
                    <span>Projects</span>
                  </div>
                  <div className="text-xl font-bold text-blue-400">12+</div>
                  <div className="text-xs text-gray-400">Delivered</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Mobile optimized */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection("about")}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 sm:gap-2 text-gray-500 hover:text-blue-400 transition-colors"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-widest font-light">Scroll Down</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;