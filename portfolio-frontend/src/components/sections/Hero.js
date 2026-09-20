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
  Code2, 
  Server, 
  Globe, 
  Briefcase, 
  Award 
} from "lucide-react";
import { scrollToSection } from "../../utils/helpers";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../../utils/constants";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useViewportScroll();
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [binaryRows, setBinaryRows] = useState([]);
  const [ipAddresses, setIpAddresses] = useState([]);
  
  const phrases = [
    "Full Stack Developer",
    "System Architect",
    "Cloud Engineer",
    "DevOps Specialist",
    "Tech Lead"
  ];

  // Hooks must be called unconditionally
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });
  
  const transformX = useTransform(springX, (v) => -v * 0.5);
  const transformY = useTransform(springY, (v) => -v * 0.5);

  // Check mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate binary rows (0s and 1s) - SLOWER SPEED
  useEffect(() => {
    const generateBinaryRows = () => {
      const rows = [];
      const numRows = isMobile ? 15 : 30;
      const charsPerRow = isMobile ? 30 : 60;
      
      for (let i = 0; i < numRows; i++) {
        let row = "";
        for (let j = 0; j < charsPerRow; j++) {
          row += Math.random() > 0.5 ? "1" : "0";
        }
        rows.push({
          id: i,
          text: row,
          x: Math.random() * 100,
          speed: 0.1 + Math.random() * 0.5,
          delay: Math.random() * 20,
          opacity: 0.05 + Math.random() * 0.15,
        });
      }
      setBinaryRows(rows);
    };
    generateBinaryRows();
  }, [isMobile]);

  // Generate fake IP addresses
  useEffect(() => {
    const generateIPs = () => {
      const ips = [];
      const numIPs = isMobile ? 8 : 20;
      
      for (let i = 0; i < numIPs; i++) {
        const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
        const ports = ["22", "80", "443", "8080", "3306", "5432", "27017", "6379", "9200", "5601"];
        const statuses = ["CONNECTED", "SCANNING", "OPEN", "CLOSED", "FILTERED"];
        ips.push({
          id: i,
          ip: ip,
          port: ports[Math.floor(Math.random() * ports.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          speed: 0.3 + Math.random() * 1.2,
          delay: Math.random() * 10,
          opacity: 0.15 + Math.random() * 0.2,
        });
      }
      setIpAddresses(ips);
    };
    generateIPs();
  }, [isMobile]);

  // Terminal display text effect
  useEffect(() => {
    const terminalTexts = [
      "> Initializing connection...",
      "> Scanning ports...",
      "> 192.168.1.1:22 OPEN",
      "> 10.0.0.1:443 OPEN",
      "> 172.16.0.1:8080 FILTERED",
      "> Establishing secure channel...",
      "> Access granted.",
      "> Welcome to the system.",
      "> Let's build something amazing."
    ];
    
    let index = 0;
    let charIndex = 0;
    let currentText = "";
    
    const typeInterval = setInterval(() => {
      if (charIndex < terminalTexts[index].length) {
        currentText += terminalTexts[index][charIndex];
        setDisplayText(currentText);
        charIndex++;
      } else {
        index++;
        charIndex = 0;
        currentText = "";
        if (index >= terminalTexts.length) {
          clearInterval(typeInterval);
        }
      }
    }, isMobile ? 100 : 60);
    
    return () => clearInterval(typeInterval);
  }, [isMobile]);

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
  useEffect(() => {
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
  }, [mouseX, mouseY, isMobile]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-[#050505] pt-16 sm:pt-20"
    >
      {/* ===== HACKING BACKGROUND ===== */}
      
      {/* Binary Rows - SLOWER ANIMATION */}
      {binaryRows.map((row) => (
        <motion.div
          key={row.id}
          className="absolute font-mono text-green-500/30 whitespace-nowrap overflow-hidden pointer-events-none"
          style={{
            left: `${row.x}%`,
            fontSize: isMobile ? '8px' : '10px',
            opacity: row.opacity,
            letterSpacing: '2px',
            width: '100%',
            textShadow: '0 0 3px rgba(0, 255, 0, 0.05)',
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [row.opacity * 0.3, row.opacity, row.opacity * 0.3],
          }}
          transition={{
            duration: row.speed * 12,
            repeat: Infinity,
            delay: row.delay,
            ease: "linear",
          }}
        >
          {row.text}
        </motion.div>
      ))}

      {/* IP Addresses */}
      {ipAddresses.map((ip) => (
        <motion.div
          key={ip.id}
          className="absolute font-mono text-xs sm:text-sm pointer-events-none"
          style={{
            left: `${ip.x}%`,
            top: `${ip.y}%`,
            opacity: ip.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [ip.opacity * 0.3, ip.opacity, ip.opacity * 0.3],
          }}
          transition={{
            duration: ip.speed * 4,
            repeat: Infinity,
            delay: ip.delay,
            ease: "easeInOut",
          }}
        >
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-2 py-1 rounded border border-green-500/10">
            <span className="text-green-400/60">{ip.ip}</span>
            <span className="text-green-500/40">:{ip.port}</span>
            <span className={`text-[8px] sm:text-[10px] font-bold ${
              ip.status === 'CONNECTED' || ip.status === 'OPEN' 
                ? 'text-green-400/70' 
                : ip.status === 'SCANNING' 
                ? 'text-yellow-400/70' 
                : 'text-red-400/50'
            }`}>
              [{ip.status}]
            </span>
          </div>
        </motion.div>
      ))}

      {/* Matrix Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? '30px 30px' : '50px 50px'
        }} />
      </div>

      {/* Scanning Line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent shadow-lg shadow-green-500/20 pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/5 blur-3xl pointer-events-none" />
      
      {!isMobile && (
        <>
          <motion.div
            style={{ x: springX, y: springY }}
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-green-500/10 blur-3xl pointer-events-none"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            style={{ x: transformX, y: transformY }}
            className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-500/10 to-transparent pointer-events-none" />

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Terminal Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 backdrop-blur-sm mx-auto lg:mx-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-[10px] sm:text-xs font-mono">root@prakash:~$</span>
              <span className="text-green-400/50 text-[10px] sm:text-xs">— CONNECTED</span>
            </motion.div>

            {/* Terminal Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-xs sm:text-sm text-green-400/70 bg-black/40 p-2 sm:p-3 rounded-lg border border-green-500/20 max-w-lg mx-auto lg:mx-0"
            >
              <div className="flex items-start gap-2">
                <span className="text-green-500">$</span>
                <span className="text-green-300/80">{displayText}</span>
                <span className="animate-pulse text-green-400">█</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                <span className="text-gray-400">I'm </span>
                <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block sm:inline">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
            </motion.div>

            {/* Dynamic Typing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-mono"
            >
              <div className="text-base sm:text-xl md:text-2xl text-green-400">
                <span className="text-gray-500">$</span> 
                <span className="text-green-300">./</span>
                {typedText}
                <span className="animate-pulse text-green-400">|</span>
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

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 pt-2"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-green-500/10 border border-green-400/20">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-green-400 font-bold text-base sm:text-lg">4.5+</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-mono">Years</div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-cyan-400 font-bold text-base sm:text-lg">12+</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-mono">Projects</div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 border border-blue-400/20">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-blue-400 font-bold text-base sm:text-lg">8+</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-mono">Clients</div>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2 overflow-x-auto pb-2"
            >
              {["React", "Node.js", "TypeScript", "AWS", "Docker", "Kubernetes", "Go", "Python"].map((tag, i) => (
                <span
                  key={i}
                  className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono rounded-md bg-black/40 border border-green-500/20 text-green-400 hover:border-green-400/50 hover:text-green-300 hover:bg-green-500/10 transition-all cursor-default whitespace-nowrap"
                >
                  # {tag}
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
              <button
                onClick={() => window.open("/psahoo-react-node.pdf", "_blank")}
                className="border-2 border-green-500/30 hover:border-green-400/60 text-green-400 hover:text-green-300 bg-black/40 backdrop-blur-sm px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-mono flex items-center justify-center transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="group bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-lg shadow-green-500/30 text-sm sm:text-base font-mono flex items-center justify-center transition-all duration-300"
              >
                <span className="text-green-300 group-hover:text-white transition">$</span>
                Get In Touch
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
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
                  className="p-2 sm:p-3 rounded-lg bg-black/40 backdrop-blur-sm border border-green-500/20 text-gray-400 hover:bg-green-500/10 hover:border-green-400/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className={`w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-all ${social.color}`} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - Profile Image with Fingerprint Scanner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center mt-6 lg:mt-0 order-1 lg:order-2"
          >
            <div className="relative">
              {/* Animated Rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-green-400/30 hidden sm:block pointer-events-none"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ width: "120%", height: "120%", top: "-10%", left: "-10%" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-400/30 hidden sm:block pointer-events-none"
                animate={{ scale: [1, 1.2, 1], rotate: [360, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ width: "140%", height: "140%", top: "-20%", left: "-20%" }}
              />

              {/* Profile Image with Fingerprint Scanner */}
              <motion.div
                className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-green-400/40 shadow-2xl shadow-green-500/30 mx-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Fingerprint Scanner Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {/* Scanner Line - Horizontal */}
                  <motion.div
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-400/80 to-transparent shadow-lg shadow-green-400/50"
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Scanner Line - Vertical */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-green-400/60 to-transparent shadow-lg shadow-green-400/30"
                    animate={{ left: ['0%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />

                  {/* Diagonal Scanner */}
                  <motion.div
                    className="absolute w-[200%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
                    style={{ transform: 'rotate(-45deg)' }}
                    animate={{ 
                      top: ['-50%', '150%'],
                      left: ['-50%', '150%']
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />

                  {/* Fingerprint Grid Pattern */}
                  <div className="absolute inset-0 opacity-[0.15]">
                    <div className="w-full h-full" style={{
                      backgroundImage: `
                        radial-gradient(circle at 20% 50%, rgba(0, 255, 0, 0.1) 1px, transparent 1px),
                        radial-gradient(circle at 80% 50%, rgba(0, 255, 0, 0.1) 1px, transparent 1px),
                        radial-gradient(circle at 50% 20%, rgba(0, 255, 0, 0.1) 1px, transparent 1px),
                        radial-gradient(circle at 50% 80%, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px, 30px 30px, 30px 30px, 30px 30px'
                    }} />
                  </div>

                  {/* Corner Markers - Like fingerprint scanner UI */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400/30" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-400/30" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400/30" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400/30" />

                  {/* Scanning Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-t from-green-500/20 via-transparent to-transparent"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                {/* Profile Image */}
                <img
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://ui-avatars.com/api/?name=" + PERSONAL_INFO.name.replace(" ", "+") + "&background=0a0a0a&color=22c55e&size=200";
                  }}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-5" />
                
                {/* Status - Smaller on mobile */}
                <motion.div
                  className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-1 sm:gap-2 bg-black/80 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-green-400/30 z-10"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[8px] sm:text-xs text-green-400 font-mono font-medium">SCANNING</span>
                </motion.div>

                {/* Company Logo */}
                <motion.div
                  className="absolute -bottom-1 -right-1 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg bg-black/90 backdrop-blur-sm border-2 border-green-400/30 flex items-center justify-center shadow-xl z-10"
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={PERSONAL_INFO.companyLogo}
                    alt="Company"
                    className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* Floating Stats - Hacker Style */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-1 -right-1 sm:-top-4 sm:-right-4 bg-black/80 backdrop-blur-sm p-1.5 sm:p-3 lg:p-4 rounded-lg border border-green-500/30 shadow-xl shadow-green-500/20"
              >
                <div className="text-center">
                  <div className="flex items-center gap-0.5 sm:gap-1 text-green-400 text-[6px] sm:text-xs font-mono">
                    <Server className="w-2 h-2 sm:w-3 sm:h-3" />
                    <span className="hidden xs:inline">EXP</span>
                  </div>
                  <div className="text-xs sm:text-base lg:text-xl font-bold text-green-400">4.5+</div>
                  <div className="text-[6px] sm:text-xs text-gray-500 font-mono">Years</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -bottom-1 -left-1 sm:-bottom-4 sm:-left-4 bg-black/80 backdrop-blur-sm p-1.5 sm:p-3 lg:p-4 rounded-lg border border-cyan-500/30 shadow-xl shadow-cyan-500/20"
              >
                <div className="text-center">
                  <div className="flex items-center gap-0.5 sm:gap-1 text-cyan-400 text-[6px] sm:text-xs font-mono">
                    <Code2 className="w-2 h-2 sm:w-3 sm:h-3" />
                    <span className="hidden xs:inline">PROJ</span>
                  </div>
                  <div className="text-xs sm:text-base lg:text-xl font-bold text-cyan-400">12+</div>
                  <div className="text-[6px] sm:text-xs text-gray-500 font-mono">Delivered</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        onClick={() => scrollToSection("about")}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 sm:gap-2 text-gray-600 hover:text-green-400 transition-colors"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-widest font-mono text-green-400/50">[ SCROLL ]</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-green-400/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;