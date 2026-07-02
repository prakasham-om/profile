// src/components/sections/Skills.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Server, Database, Cloud, Layers, Cpu } from "lucide-react";
import {
  FaReact,
  FaAngular,
  FaNodeJs,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiGraphql,
  SiKubernetes,
  SiGo,
  SiRust,
  SiTerraform,
  SiJenkins,
  SiNginx,
} from "react-icons/si";

const skillsData = [
  {
    category: "Frontend",
    icon: <Layers className="w-5 h-5" />,
    items: [
      { name: "React", level: 90, icon: <FaReact className="text-3xl text-cyan-400" /> },
      { name: "Angular", level: 85, icon: <FaAngular className="text-3xl text-red-400" /> },
      { name: "HTML5", level: 95, icon: <FaHtml5 className="text-3xl text-orange-400" /> },
      { name: "CSS3", level: 90, icon: <FaCss3Alt className="text-3xl text-blue-400" /> },
      { name: "JavaScript", level: 95, icon: <FaJsSquare className="text-3xl text-yellow-400" /> },
      { name: "TypeScript", level: 85, icon: <SiTypescript className="text-3xl text-blue-500" /> },
    ],
  },
  {
    category: "Backend",
    icon: <Server className="w-5 h-5" />,
    items: [
      { name: "Node.js", level: 90, icon: <FaNodeJs className="text-3xl text-green-400" /> },
      { name: "Go", level: 80, icon: <SiGo className="text-3xl text-cyan-400" /> },
      { name: "Rust", level: 75, icon: <SiRust className="text-3xl text-orange-400" /> },
      { name: "Python", level: 85, icon: <FaPython className="text-3xl text-blue-400" /> },
    ],
  },
  {
    category: "Database",
    icon: <Database className="w-5 h-5" />,
    items: [
      { name: "MongoDB", level: 85, icon: <SiMongodb className="text-3xl text-green-500" /> },
      { name: "PostgreSQL", level: 80, icon: <SiPostgresql className="text-3xl text-blue-500" /> },
      { name: "Redis", level: 75, icon: <SiRedis className="text-3xl text-red-500" /> },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: <Cloud className="w-5 h-5" />,
    items: [
      { name: "AWS", level: 85, icon: <FaAws className="text-3xl text-orange-400" /> },
      { name: "Docker", level: 90, icon: <FaDocker className="text-3xl text-sky-400" /> },
      { name: "Kubernetes", level: 80, icon: <SiKubernetes className="text-3xl text-blue-400" /> },
      { name: "Terraform", level: 75, icon: <SiTerraform className="text-3xl text-purple-400" /> },
      { name: "Jenkins", level: 70, icon: <SiJenkins className="text-3xl text-red-400" /> },
      { name: "Nginx", level: 80, icon: <SiNginx className="text-3xl text-green-400" /> },
    ],
  },
  {
    category: "Tools & Others",
    icon: <Cpu className="w-5 h-5" />,
    items: [
      { name: "GraphQL", level: 75, icon: <SiGraphql className="text-3xl text-pink-400" /> },
      { name: "Git", level: 95, icon: <FaGitAlt className="text-3xl text-orange-500" /> },
      { name: "GitHub", level: 90, icon: <FaGithub className="text-3xl text-white" /> },
    ],
  },
];

const SkillCard = ({ skill, index }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = skill.level;
    const duration = 2000;
    const increment = end / (duration / 16);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setProgress(end);
        clearInterval(interval);
      } else {
        setProgress(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [skill.level]);

  return (
    <motion.div
      className="relative bg-black/30 backdrop-blur-sm rounded-xl border border-blue-500/10 p-6 hover:border-blue-400/30 transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* Icon */}
      <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">
        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-400/20">
          {skill.icon}
        </div>
      </div>

      {/* Skill Name */}
      <div className="text-center mb-2">
        <span className="text-white font-medium text-sm">{skill.name}</span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Percentage */}
      <div className="text-center mt-2">
        <span className="text-xs font-mono text-gray-400">{progress}%</span>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="py-20 px-6 bg-gradient-to-b from-[#0a0e1a] via-[#0d1b2a] to-[#1a2a3a]">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-400/20 font-mono text-sm text-blue-400 mb-4">
            <Terminal className="w-4 h-4" />
            <span>$ skills --list</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            <span className="text-blue-400">*/ </span>
            Technologies and tools I work with
            <span className="text-blue-400"> */</span>
          </p>
        </motion.div>

        {/* Category Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {skillsData.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 font-mono ${
                activeCategory === index
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                  : "bg-black/30 border border-blue-500/10 text-gray-400 hover:border-blue-400/30 hover:text-white"
              }`}
            >
              {category.icon}
              {category.category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4"
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {skillsData[activeCategory].items.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </motion.div>

        {/* Category Stats */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/5 border border-blue-400/10">
            <span className="text-gray-400 text-sm font-mono">
              $ echo "Skills: {skillsData[activeCategory].items.length} technologies"
            </span>
            <span className="text-blue-400 text-sm font-mono">
              {/* This would show dynamic count if we had it */}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;