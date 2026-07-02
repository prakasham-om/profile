// src/components/sections/Projects.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Github, ExternalLink, Eye, Filter, Terminal, 
  Code, Server, Database, Cloud, Layers, Cpu, Zap 
} from "lucide-react";
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
import { projectsData, projectCategories } from "../../data/projects";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

// Map technology names to icons
const getTechIcon = (tech) => {
  const iconMap = {
    "React": <FaReact className="text-cyan-400" />,
    "Angular": <FaAngular className="text-red-400" />,
    "Node.js": <FaNodeJs className="text-green-400" />,
    "JavaScript": <FaJsSquare className="text-yellow-400" />,
    "TypeScript": <SiTypescript className="text-blue-500" />,
    "HTML": <FaHtml5 className="text-orange-400" />,
    "CSS": <FaCss3Alt className="text-blue-400" />,
    "Python": <FaPython className="text-blue-400" />,
    "Go": <SiGo className="text-cyan-400" />,
    "Rust": <SiRust className="text-orange-400" />,
    "MongoDB": <SiMongodb className="text-green-500" />,
    "PostgreSQL": <SiPostgresql className="text-blue-500" />,
    "Redis": <SiRedis className="text-red-500" />,
    "GraphQL": <SiGraphql className="text-pink-400" />,
    "AWS": <FaAws className="text-orange-400" />,
    "Docker": <FaDocker className="text-sky-400" />,
    "Kubernetes": <SiKubernetes className="text-blue-400" />,
    "Terraform": <SiTerraform className="text-purple-400" />,
    "Jenkins": <SiJenkins className="text-red-400" />,
    "Nginx": <SiNginx className="text-green-400" />,
    "Git": <FaGitAlt className="text-orange-500" />,
  };
  return iconMap[tech] || <Code className="text-gray-400" />;
};

const ProjectCard = ({ project, index, onViewDetails }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const colors = [
    "from-blue-500/20 to-cyan-500/10 border-blue-400/20",
    "from-purple-500/20 to-pink-500/10 border-purple-400/20",
    "from-green-500/20 to-emerald-500/10 border-green-400/20",
  ];

  const gradient = colors[index % colors.length];

  return (
    <motion.div
      className={`relative bg-black/40 backdrop-blur-sm rounded-2xl border ${gradient} overflow-hidden group`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gray-800 transition-opacity duration-300 ${
            imageLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="animate-pulse bg-gradient-to-r from-gray-700 to-gray-800 w-full h-full"></div>
        </div>
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } ${isHovered ? "scale-110" : "scale-100"}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-sm border border-blue-400/20 text-xs text-blue-400 font-mono">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Technologies with Icons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-400/10 text-xs text-gray-300"
              title={tech}
            >
              <span className="w-4 h-4">{getTechIcon(tech)}</span>
              <span className="font-mono text-[10px]">{tech}</span>
            </div>
          ))}
          {project.technologies.length > 4 && (
            <div className="px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-400/10 text-xs text-gray-400 font-mono">
              +{project.technologies.length - 4}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => window.open(project.githubUrl, "_blank")}
            variant="ghost"
            size="sm"
            icon={<Github className="w-4 h-4" />}
            className="text-gray-400 hover:text-white"
          >
            Code
          </Button>
          <Button
            onClick={() => window.open(project.liveUrl, "_blank")}
            variant="ghost"
            size="sm"
            icon={<ExternalLink className="w-4 h-4" />}
            className="text-gray-400 hover:text-blue-400"
          >
            Live
          </Button>
          <Button
            onClick={() => onViewDetails(project)}
            variant="primary"
            size="sm"
            icon={<Eye className="w-4 h-4" />}
            className="ml-auto"
          >
            Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Project Modal
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
        {/* Header Image */}
        <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-sm border border-blue-400/20 text-xs text-blue-400 font-mono">
            {project.category}
          </div>
        </div>

        <div className="space-y-6">
          {/* Title & Description */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-gray-400 leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Project Meta */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-gray-500">Duration:</span>
              <span className="text-gray-300 ml-2">{project.duration}</span>
            </div>
            <div>
              <span className="text-gray-500">Role:</span>
              <span className="text-gray-300 ml-2">{project.role}</span>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-400" />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-400/20 rounded-lg text-sm text-gray-300"
                >
                  <span className="w-5 h-5">{getTechIcon(tech)}</span>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Key Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features.map((feature, index) => (
                <li key={index} className="text-gray-300 flex items-start gap-2">
                  <span className="text-blue-400 mt-1">▸</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges & Learnings */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-red-400" />
                Challenges
              </h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="text-gray-400 text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Server className="w-5 h-5 text-green-400" />
                Key Learnings
              </h3>
              <ul className="space-y-2">
                {project.learnings.map((learning, index) => (
                  <li key={index} className="text-gray-400 text-sm flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    {learning}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-gray-700/50">
            <Button
              onClick={() => window.open(project.githubUrl, "_blank")}
              variant="outline"
              icon={<Github className="w-4 h-4" />}
            >
              View Code
            </Button>
            <Button
              onClick={() => window.open(project.liveUrl, "_blank")}
              variant="primary"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              Live Demo
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Main Projects Section
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === activeCategory);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 px-6 bg-gradient-to-b from-[#0a0e1a] via-[#0d1b2a] to-[#1a2a3a]">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-400/20 font-mono text-sm text-blue-400 mb-4">
            <Terminal className="w-4 h-4" />
            <span>$ projects --list</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            <span className="text-blue-400">/* </span>
            A showcase of my recent work and the projects I'm most proud of
            <span className="text-blue-400"> */</span>
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {projectCategories.map((category) => {
            const count = projectsData.filter((p) => p.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 font-mono ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                    : "bg-black/30 border border-blue-500/10 text-gray-400 hover:border-blue-400/30 hover:text-white"
                }`}
              >
                <Filter className="w-4 h-4" />
                {category}
                {category !== "All" && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeCategory === category 
                      ? "bg-white/20" 
                      : "bg-blue-500/10"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onViewDetails={handleViewDetails}
            />
          ))}
        </motion.div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-400/20 text-gray-400 font-mono">
              <Terminal className="w-4 h-4" />
              <span>$ echo "No projects found in this category"</span>
            </div>
          </motion.div>
        )}

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
};

export default Projects;