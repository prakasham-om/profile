// src/components/sections/Skills.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaAngular,
  FaNodeJs,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import { SiRust,SiTypescript, SiMongodb } from "react-icons/si";

const skillsData = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 90, icon: <FaReact color="#61dafb" /> },
      { name: "Angular", level: 85, icon: <FaAngular color="#dd0031" /> },
      { name: "HTML", level: 95, icon: <FaHtml5 color="#f06529" /> },
      { name: "CSS", level: 90, icon: <FaCss3Alt color="#2965f1" /> },
      { name: "JavaScript", level: 95, icon: <FaJsSquare color="#f7df1e" /> },
      { name: "TypeScript", level: 75, icon: <SiTypescript color="#3178c6" /> },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 90, icon: <FaNodeJs color="#68a063" /> },
      { name: "Rust", level: 80, icon: <SiRust color="#dea584" /> },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", level: 80, icon: <SiMongodb color="#47A248" /> },
    ],
  },
];

const WaveSkillCard = ({ skill }) => {
  const [progress, setProgress] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = skill.level;
    const duration = 5000; // slow fill
    const increment = end / (duration / 20);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setProgress(end);
        clearInterval(interval);
      } else {
        setProgress(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [skill.level]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffset((prev) => (prev + 2) % 200);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const radius = 60;
  const waveHeight = 8;
  const waterLevel = radius * 2 * (1 - progress / 100);

  const wavePath = `
    M0 ${radius * 2}
    L0 ${waterLevel}
    Q ${radius / 2 + waveOffset} ${waterLevel - waveHeight} ${radius} ${waterLevel}
    T ${radius * 2} ${waterLevel}
    L${radius * 2} ${radius * 2}
    Z
  `;

  return (
    <motion.div
      className="relative w-32 h-32 cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      <svg width={radius * 2} height={radius * 2}>
        {/* Define circular clip */}
        <defs>
          <clipPath id={`clip-${skill.name}`}>
            <circle cx={radius} cy={radius} r={radius} />
          </clipPath>
        </defs>

        {/* Outer Circle */}
        <circle
          cx={radius}
          cy={radius}
          r={radius}
          fill="transparent"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="4"
        />

        {/* Water Wave */}
        <g clipPath={`url(#clip-${skill.name})`}>
          <path d={wavePath} fill="rgba(0, 123, 255, 0.6)">
            <animate
              attributeName="d"
              dur="2s"
              repeatCount="indefinite"
              values={`
                M0 ${radius * 2} L0 ${waterLevel} Q ${radius / 2 + waveOffset} ${
                waterLevel - waveHeight
              } ${radius} ${waterLevel} T ${radius * 2} ${waterLevel} L${
                radius * 2
              } ${radius * 2} Z;
                M0 ${radius * 2} L0 ${waterLevel} Q ${
                radius / 2 + waveOffset + 10
              } ${waterLevel - waveHeight} ${radius} ${waterLevel} T ${
                radius * 2
              } ${waterLevel} L${radius * 2} ${radius * 2} Z;
                M0 ${radius * 2} L0 ${waterLevel} Q ${radius / 2 + waveOffset} ${
                waterLevel - waveHeight
              } ${radius} ${waterLevel} T ${radius * 2} ${waterLevel} L${
                radius * 2
              } ${radius * 2} Z
              `}
            />
          </path>
        </g>

        {/* Center Icon */}
        <foreignObject
          x={radius - 20}
          y={radius - 20}
          width="40"
          height="40"
          className="flex justify-center items-center"
        >
          <div className="text-3xl text-white flex justify-center items-center">
            {skill.icon}
          </div>
        </foreignObject>
      </svg>

      {/* Progress Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-white font-bold">{progress}%</span>
        <span className="text-xs text-gray-300 mt-1">{skill.name}</span>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="py-20 px-6 bg-black/20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Skills with realistic water wave animation
          </p>
        </motion.div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillsData.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === index
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 justify-items-center">
          {skillsData[activeCategory].items.map((skill, index) => (
            <WaveSkillCard key={index} skill={skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
