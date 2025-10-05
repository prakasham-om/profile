// src/components/sections/Projects.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Eye, Filter } from "lucide-react";
import { projectsData, projectCategories } from "../../data/projects";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

const cardStyles = [
  "bg-gradient-to-tr from-purple-800/40 to-pink-800/30 border-purple-400/20",
  "bg-gradient-to-br from-blue-900/30 to-indigo-900/20 border-blue-400/20",
  "bg-gradient-to-tl from-green-900/30 to-teal-900/20 border-green-400/20",
];

const textAligns = ["text-left", "text-center", "text-right"];
const techColors = ["bg-purple-500/20", "bg-pink-500/20", "bg-blue-500/20"];

const ProjectCard = ({ project, index, onViewDetails }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardStyle = cardStyles[index % cardStyles.length];
  const textAlign = textAligns[index % textAligns.length];
  const techColor = techColors[index % techColors.length];

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateX: -3, rotateY: 3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative overflow-hidden rounded-2xl backdrop-blur-sm border ${cardStyle} p-0`}
    >
      {/* Project Image with Parallax */}
      <Parallax speed={15}>
        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          <div
            className={`absolute inset-0 bg-gray-800 transition-opacity duration-300 ${
              imageLoaded ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="animate-pulse bg-gray-700 w-full h-full"></div>
          </div>
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>
      </Parallax>

      {/* Project Info */}
      <div className={`p-6 ${textAlign}`}>
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-300 text-sm mb-3">{project.shortDescription}</p>

        {/* Technologies */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className={`text-xs px-2 py-1 ${techColor} text-white rounded-full`}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span
              className={`text-xs px-2 py-1 ${techColor} text-white rounded-full`}
            >
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div
          className={`flex ${
            textAlign === "text-left"
              ? "justify-start"
              : textAlign === "text-right"
              ? "justify-end"
              : "justify-center"
          } gap-3`}
        >
          <Button
            onClick={() => window.open(project.githubUrl, "_blank")}
            variant="ghost"
            size="sm"
            icon={<Github className="w-4 h-4" />}
          >
            Code
          </Button>
          <Button
            onClick={() => window.open(project.liveUrl, "_blank")}
            variant="ghost"
            size="sm"
            icon={<ExternalLink className="w-4 h-4" />}
          >
            Live
          </Button>
          <Button
            onClick={() => onViewDetails(project)}
            variant="primary"
            size="sm"
            icon={<Eye className="w-4 h-4" />}
          >
            Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="max-h-[80vh] overflow-y-auto">
        <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-gray-400 mb-4">{project.fullDescription}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <div>
              <strong>Duration:</strong> {project.duration}
            </div>
            <div>
              <strong>Role:</strong> {project.role}
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {project.features.map((feature, index) => (
              <li key={index} className="text-gray-300 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges & Learnings */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Challenges</h3>
            <ul className="space-y-2">
              {project.challenges.map((challenge, index) => (
                <li
                  key={index}
                  className="text-gray-300 text-sm flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0 mt-2"></div>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Key Learnings</h3>
            <ul className="space-y-2">
              {project.learnings.map((learning, index) => (
                <li
                  key={index}
                  className="text-gray-300 text-sm flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0 mt-2"></div>
                  {learning}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
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
    <ParallaxProvider>
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A showcase of my recent work and the projects I'm most proud of
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"
                }`}
              >
                <Filter className="w-4 h-4" />
                {category}
                {category !== "All" && (
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
                    {projectsData.filter((p) => p.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
              <p className="text-gray-400 text-lg">
                No projects found in this category.
              </p>
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
    </ParallaxProvider>
  );
};

export default Projects;
