// src/components/sections/About.js
import React from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Mail, Briefcase, Cpu, Terminal, 
  User, Award, Code, Server, Database, Cloud,
  Zap, Rocket, Target, Brain, Coffee, Heart
} from "lucide-react";
import { PERSONAL_INFO, ANIMATION_VARIANTS } from "../../utils/constants";

const About = () => {
  const stats = [
    {
      icon: <Code className="w-6 h-6 text-blue-400" />,
      label: "Experience",
      value: "4.5+ Years",
      subValue: "Full Stack Development"
    },
    {
      icon: <Award className="w-6 h-6 text-cyan-400" />,
      label: "Projects",
      value: "12+",
      subValue: "Successfully Delivered"
    },
    {
      icon: <Rocket className="w-6 h-6 text-purple-400" />,
      label: "Mission",
      value: "Build & Scale",
      subValue: "Cloud-Native Solutions"
    },
  ];

  const personalDetails = [
    {
      icon: <MapPin className="w-4 h-4 text-blue-400" />,
      label: "Location",
      value: PERSONAL_INFO.location,
    },
    {
      icon: <Mail className="w-4 h-4 text-cyan-400" />,
      label: "Email",
      value: PERSONAL_INFO.email,
    },
    {
      icon: <Briefcase className="w-4 h-4 text-purple-400" />,
      label: "Company",
      value: PERSONAL_INFO.currentCompany,
    },
    {
      icon: <Cpu className="w-4 h-4 text-green-400" />,
      label: "Expertise",
      value: "Full Stack · Cloud · DevOps",
    },
  ];

  const journeyStories = [
    {
      icon: <Brain className="w-5 h-5 text-blue-400" />,
      title: "The Beginning",
      description: "Started as a self-taught developer, building small projects and learning the fundamentals of web development.",
      year: "2018"
    },
    {
      icon: <Code className="w-5 h-5 text-cyan-400" />,
      title: "The Growth",
      description: "Mastered full-stack development with React, Node.js, and cloud technologies. Built real-world applications for healthcare and enterprise domains.",
      year: "2020"
    },
    {
      icon: <Server className="w-5 h-5 text-purple-400" />,
      title: "The Scale",
      description: "Architected scalable cloud-native solutions, reduced processing times by 70%, and optimized system performance for enterprise clients.",
      year: "2022"
    },
    {
      icon: <Rocket className="w-5 h-5 text-green-400" />,
      title: "The Future",
      description: "Continuing to push boundaries in system architecture, cloud infrastructure, and building products that make a difference.",
      year: "2024"
    },
  ];

  const values = [
    { icon: <Zap className="w-4 h-4 text-yellow-400" />, label: "Fast & Reliable" },
    { icon: <Target className="w-4 h-4 text-red-400" />, label: "Goal Oriented" },
    { icon: <Brain className="w-4 h-4 text-purple-400" />, label: "Continuous Learning" },
    { icon: <Coffee className="w-4 h-4 text-orange-400" />, label: "Passionate" },
    { icon: <Heart className="w-4 h-4 text-pink-400" />, label: "User First" },
    { icon: <Cloud className="w-4 h-4 text-blue-400" />, label: "Cloud Native" },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-b from-[#0a0e1a] via-[#0d1b2a] to-[#1a2a3a]">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={ANIMATION_VARIANTS.fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-400/20 font-mono text-sm text-blue-400 mb-4">
            <Terminal className="w-4 h-4" />
            <span>$ cat about.md</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            <span className="text-blue-400">/* </span>
            Full Stack Developer | System Architect | Cloud Engineer
            <span className="text-blue-400"> */</span>
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="space-y-12"
          variants={ANIMATION_VARIANTS.fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Introduction Card with Hacker Style */}
          <motion.div
            className="relative overflow-hidden bg-gradient-to-br from-blue-950/40 via-gray-900/40 to-purple-950/40 backdrop-blur-sm rounded-3xl border border-blue-500/20 p-8 md:p-12 shadow-2xl shadow-blue-500/5"
            variants={ANIMATION_VARIANTS.fadeInUp}
          >
            {/* Glowing Orbs */}
            <motion.div
              className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />

            {/* Matrix-like line overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }} />
            </div>

            <div className="relative z-10">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 text-blue-400/60 font-mono text-sm mb-6 pb-4 border-b border-blue-500/10">
                <Terminal className="w-4 h-4" />
                <span>developer@portfolio:~$ ./about --detail</span>
                <span className="ml-auto text-green-400/50 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  active
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="text-blue-400">Hi, I'm</span> {PERSONAL_INFO.name.split(" ")[0]}
                <span className="text-cyan-400"> {PERSONAL_INFO.name.split(" ")[1]}</span>
                <span className="text-gray-400"> 👋</span>
              </h3>

              <div className="space-y-4 text-gray-300 text-lg leading-relaxed max-w-3xl">
                <p className="relative pl-6 border-l-2 border-blue-400/30">
                  <span className="text-blue-400 font-mono text-sm">// </span>
                  {PERSONAL_INFO.description}
                </p>
                <p className="relative pl-6 border-l-2 border-cyan-400/30">
                  <span className="text-cyan-400 font-mono text-sm">// </span>
                  Currently at <span className="text-purple-400 font-medium">{PERSONAL_INFO.currentCompany}</span>, 
                  I specialize in building scalable, cloud-native solutions that drive business growth and innovation.
                </p>
                <p className="relative pl-6 border-l-2 border-purple-400/30">
                  <span className="text-purple-400 font-mono text-sm">// </span>
                  Proficient in <span className="text-blue-400 font-mono">JavaScript</span>, 
                  <span className="text-cyan-400 font-mono"> React</span>, 
                  <span className="text-purple-400 font-mono"> Node.js</span>, 
                  <span className="text-green-400 font-mono"> Go</span>, and 
                  <span className="text-yellow-400 font-mono"> Cloud Infrastructure</span>. 
                  <span className="block mt-2 text-sm text-gray-400">
                    {`// Passionate about clean code, system architecture, and building products that matter.`}
                  </span>
                </p>
              </div>

              {/* Values Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {values.map((value, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/30 border border-gray-700/30 rounded-full text-xs text-gray-300 hover:border-blue-400/30 hover:text-blue-400 transition-all"
                  >
                    {value.icon}
                    {value.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Personal Details Grid */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {personalDetails.map((detail, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm rounded-xl border border-blue-500/10 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group"
                variants={ANIMATION_VARIANTS.fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5, y: -3 }}
              >
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-colors border border-blue-400/10">
                  {detail.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-gray-400 text-[10px] font-mono uppercase tracking-wider">{detail.label}</p>
                  <p className="text-white font-medium truncate text-sm">{detail.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Row with Hacker Style */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden text-center p-6 bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm rounded-2xl border border-blue-500/10 hover:border-blue-400/30 transition-all duration-300 group"
                variants={ANIMATION_VARIANTS.fadeInUp}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/10">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1 font-mono">{stat.value}</div>
                  <p className="text-gray-400 text-sm font-mono">{stat.label}</p>
                  <p className="text-gray-500 text-xs mt-1">{stat.subValue}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Journey Timeline */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm rounded-2xl border border-blue-500/10 p-6"
          >
            <div className="flex items-center gap-2 text-blue-400/60 font-mono text-sm mb-6">
              <Terminal className="w-4 h-4" />
              <span>$ journey --timeline</span>
              <span className="text-gray-500 text-xs ml-2">(2018 - Present)</span>
            </div>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-cyan-500/30 to-purple-500/30"></div>
              
              <div className="space-y-8">
                {journeyStories.map((story, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-16"
                    variants={ANIMATION_VARIANTS.fadeInUp}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ x: 5 }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 top-1 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-2 border-gray-900 shadow-lg shadow-blue-500/20"></div>
                    
                    {/* Content */}
                    <div className="bg-black/20 rounded-xl p-4 border border-blue-500/10 hover:border-blue-400/30 transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          {story.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{story.title}</h4>
                          <span className="text-blue-400 text-xs font-mono">{story.year}</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm pl-11">{story.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <motion.button
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium px-8 py-3.5 rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-300 font-mono"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10 flex items-center">
                <Terminal className="w-4 h-4 mr-2" />
                ./connect.sh
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;