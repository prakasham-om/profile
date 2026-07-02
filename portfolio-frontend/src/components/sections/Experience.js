// src/components/sections/Experience.js
import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  GraduationCap,
  Award,
  TrendingUp,
  Terminal,
  Code,
  Server,
  Database,
  Cloud,
  Layers,
  Cpu,
  Zap,
  GitBranch,
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
  SiExpress,
} from "react-icons/si";
import { ANIMATION_VARIANTS } from "../../utils/constants";

// Map technology names to icons
const getTechIcon = (tech) => {
  const iconMap = {
    "ReactJs": <FaReact className="text-cyan-400" />,
    "React": <FaReact className="text-cyan-400" />,
    "Angular": <FaAngular className="text-red-400" />,
    "Node.js": <FaNodeJs className="text-green-400" />,
    "JavaScript": <FaJsSquare className="text-yellow-400" />,
    "TypeScript": <SiTypescript className="text-blue-500" />,
    "HTML": <FaHtml5 className="text-orange-400" />,
    "CSS": <FaCss3Alt className="text-blue-400" />,
    "HTML/CSS": <FaCss3Alt className="text-blue-400" />,
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
    "Express.js": <SiExpress className="text-gray-400" />,
    "REST APIs": <Server className="text-blue-400" />,
    "Excel Automation": <Database className="text-green-400" />,
  };
  return iconMap[tech] || <Code className="text-gray-400 w-4 h-4" />;
};

const Experience = () => {
  // Experience data
  const experienceData = [
    {
      id: 1,
      title: "Senior Associate",
      company: "Signovate Technologies",
      location: "Bangalore, Karnataka",
      period: "Sep 2021 – Present",
      type: "Full-time",
      companyUrl: "https://www.vsofl.com/",
      description:
        "Developed enterprise-level Health domain applications and Warehouse Management System, improving business processes, reducing manual effort, and enabling real-time KPI tracking.",
      achievements: [
        "Developed Health Adjudication System, reducing claim processing time by 70%",
        "Built Warehouse Management System using Angular, improving inventory accuracy by 80%",
        "Created KYP Health Portal, reducing report generation from 3 days to 3 hours",
        "Implemented Smart Connect 2.0 Dashboard for real-time KPI tracking for 100+ managers",
        "Automated Excel-to-JSON data pipelines, saving significant manual effort",
        "Ensured security compliance and resolved vulnerabilities across projects",
      ],
      technologies: [
        "ReactJs",
        "Node.js",
        "MongoDB",
        "Express.js",
        "JavaScript",
        "HTML/CSS",
        "REST APIs",
        "Excel Automation",
        "Angular",
      ],
      projects: [
        {
          name: "Health Adjudication System",
          description:
            "Claims management system streamlining healthcare claim approvals and validations.",
          impact: "70% reduction in claim processing time",
          technologies: ["ReactJs", "Node.js", "MongoDB", "Express.js"],
        },
        {
          name: "Warehouse Management System",
          description:
            "Inventory and warehouse management platform with Angular frontend.",
          impact: "80% improvement in inventory accuracy",
          technologies: ["Angular", "Node.js", "MongoDB"],
        },
        {
          name: "Know Your Provider (KYP) Health Portal",
          description:
            "Health reporting platform automating report generation and analytics.",
          impact: "Report generation time reduced from 3 days to 3 hours",
          technologies: ["ReactJs", "Node.js", "MongoDB", "Express.js"],
        },
        {
          name: "Smart Connect 2.0 Dashboard",
          description: "Real-time KPI tracking dashboard for management.",
          impact: "Enabled 100+ managers to track performance metrics in real-time",
          technologies: ["ReactJs", "Node.js"],
        },
        {
          name: "Excel-to-JSON Automation Pipeline",
          description: "Automated data processing system for health reports.",
          impact: "80% reduction in manual processing time",
          technologies: ["Node.js", "Excel Automation"],
        },
      ],
    },
  ];

  const educationData = [
    {
      id: 1,
      degree: "Bachelor of Science",
      institution: "Khallikote Autonomous College, Berhampur",
      location: "Berhampur, Odisha",
      period: "2017 – 2020",
      percentage: "71%",
      description:
        "Focused on software development and web technologies with hands-on project experience.",
      achievements: [
        "Completed with 71% aggregate score",
        "Developed multiple projects in React and Node.js",
        "Participated in technical workshops and hackathons",
      ],
      relevantCourses: [
        "Data Structures and Algorithms",
        "Database Management Systems",
        "Web Technologies",
        "Software Engineering",
        "Object-Oriented Programming",
      ],
    },
  ];

  const professionalStats = {
    totalExperience: "4.5+ Years",
    projectsCompleted: "12+",
    companiesWorked: 1,
    technologiesMastered: 12,
    performanceImprovements: [
      {
        metric: "Claim Processing Time",
        improvement: "70% reduction",
        description: "Health Adjudication System",
      },
      {
        metric: "Inventory Accuracy",
        improvement: "80% improvement",
        description: "Warehouse Management System with Angular",
      },
      {
        metric: "Report Generation Time",
        improvement: "90% reduction",
        from: "3 days",
        to: "3 hours",
        description: "KYP Health Portal",
      },
    ],
  };

  const ExperienceCard = ({ experience, index }) => (
    <motion.div
      className="relative"
      variants={ANIMATION_VARIANTS.fadeInUp}
      transition={{ delay: index * 0.2 }}
    >
      {/* Timeline connector */}
      <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-blue-400 to-transparent"></div>

      {/* Timeline dot */}
      <div className="absolute left-4 top-8 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full border-4 border-[#0d1b2a]"></div>

      {/* Content card */}
      <div className="ml-16 mb-12">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10 hover:border-blue-400/30 transition-all duration-300">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {experience.title}
              </h3>
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Briefcase className="w-4 h-4" />
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  {experience.company}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <div className="flex flex-col md:items-end text-sm text-gray-400">
              <div className="flex items-center gap-1 mb-1">
                <Calendar className="w-4 h-4" />
                <span>{experience.period}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
              <span className="mt-1 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-mono">
                {experience.type}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-blue-400/60 font-mono text-xs mb-1">
              <Terminal className="w-3 h-3" />
              <span>// Description</span>
            </div>
            <p className="text-gray-300">{experience.description}</p>
          </div>

          {/* Key Projects */}
          {experience.projects && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-blue-400/60 font-mono text-xs mb-2">
                <GitBranch className="w-3 h-3" />
                <span>// Key Projects</span>
              </div>
              <div className="space-y-2">
                {experience.projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-500/5 rounded-lg p-3 border border-blue-500/10 hover:border-blue-400/30 transition-all"
                  >
                    <div className="font-medium text-cyan-300 mb-1">
                      {project.name}
                    </div>
                    <div className="text-sm text-gray-300 mb-1">
                      {project.description}
                    </div>
                    {project.impact && (
                      <div className="text-xs text-green-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {project.impact}
                      </div>
                    )}
                    {project.technologies && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 rounded-full text-xs text-gray-300"
                          >
                            <span className="w-3 h-3">{getTechIcon(tech)}</span>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-blue-400/60 font-mono text-xs mb-2">
              <Award className="w-3 h-3" />
              <span>// Achievements</span>
            </div>
            <ul className="space-y-1">
              {experience.achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  className="text-gray-300 text-sm flex items-start gap-2"
                >
                  <span className="text-blue-400 mt-1">▸</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <div className="flex items-center gap-2 text-blue-400/60 font-mono text-xs mb-2">
              <Code className="w-3 h-3" />
              <span>// Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-400/20 rounded-full text-xs text-gray-300"
                >
                  <span className="w-4 h-4">{getTechIcon(tech)}</span>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const EducationCard = ({ education, index }) => (
    <motion.div
      className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10 hover:border-blue-400/30 transition-all duration-300 mb-6"
      variants={ANIMATION_VARIANTS.fadeInUp}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-white">
              {education.degree}
            </h4>
            <p className="text-blue-400">{education.institution}</p>
            <p className="text-gray-400 text-sm">{education.location}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-sm text-gray-400 mb-1">
            <Calendar className="w-4 h-4" />
            <span>{education.period}</span>
          </div>
          <div className="text-green-400 font-medium font-mono">
            {education.percentage}
          </div>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{education.description}</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-400/60 font-mono text-xs mb-2">
            <Award className="w-3 h-3" />
            <span>// Achievements</span>
          </div>
          <ul className="space-y-1">
            {education.achievements.map((achievement, idx) => (
              <li
                key={idx}
                className="text-gray-300 text-sm flex items-start gap-2"
              >
                <span className="text-yellow-400 mt-1">•</span>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-2 text-blue-400/60 font-mono text-xs mb-2">
            <Server className="w-3 h-3" />
            <span>// Relevant Courses</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {education.relevantCourses.map((course, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-500/10 border border-blue-400/20 rounded-full text-xs text-gray-300"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-b from-[#0a0e1a] via-[#0d1b2a] to-[#1a2a3a]">
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
            <span>$ experience --list</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            <span className="text-blue-400">/* </span>
            My professional journey in Health and Warehouse domain projects
            <span className="text-blue-400"> */</span>
          </p>
        </motion.div>

        {/* Professional Stats */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-blue-500/10 hover:border-blue-400/30 transition-all group"
            variants={ANIMATION_VARIANTS.fadeInUp}
            whileHover={{ y: -5 }}
          >
            <div className="text-3xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">
              {professionalStats.totalExperience}
            </div>
            <p className="text-gray-400 font-mono text-sm">Professional Experience</p>
          </motion.div>
          <motion.div 
            className="text-center p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-blue-500/10 hover:border-blue-400/30 transition-all group"
            variants={ANIMATION_VARIANTS.fadeInUp}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-3xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
              {professionalStats.projectsCompleted}
            </div>
            <p className="text-gray-400 font-mono text-sm">Projects Completed</p>
          </motion.div>
          <motion.div 
            className="text-center p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-blue-500/10 hover:border-blue-400/30 transition-all group"
            variants={ANIMATION_VARIANTS.fadeInUp}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-3xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform">
              {professionalStats.companiesWorked}
            </div>
            <p className="text-gray-400 font-mono text-sm">Companies Worked</p>
          </motion.div>
        </motion.div>

        {/* Performance Improvements */}
        <motion.div
          className="mb-16"
          variants={ANIMATION_VARIANTS.fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 text-blue-400/60 font-mono text-sm mb-6">
            <Zap className="w-4 h-4" />
            <span>$ performance --metrics</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {professionalStats.performanceImprovements.map(
              (improvement, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all group"
                  whileHover={{ y: -5 }}
                  variants={ANIMATION_VARIANTS.fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-2xl font-bold text-cyan-400 mb-2 group-hover:scale-105 transition-transform">
                    {improvement.improvement}
                  </div>
                  <div className="text-blue-300 font-medium mb-2 font-mono text-sm">
                    {improvement.metric}
                  </div>
                  <p className="text-gray-400 text-sm">
                    {improvement.description}
                    {improvement.from && improvement.to && (
                      <span className="block mt-1 text-xs text-gray-500 font-mono">
                        {improvement.from} → {improvement.to}
                      </span>
                    )}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <div className="mb-16">
          <motion.div
            className="flex items-center justify-center gap-2 text-blue-400/60 font-mono text-sm mb-6"
            variants={ANIMATION_VARIANTS.fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Briefcase className="w-4 h-4" />
            <span>$ experience --timeline</span>
          </motion.div>

          <motion.div
            className="relative"
            variants={ANIMATION_VARIANTS.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {experienceData.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        {/* Education */}
        <motion.div
          variants={ANIMATION_VARIANTS.fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 text-blue-400/60 font-mono text-sm mb-6">
            <GraduationCap className="w-4 h-4" />
            <span>$ education --details</span>
          </div>

          <motion.div
            variants={ANIMATION_VARIANTS.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {educationData.map((education, index) => (
              <EducationCard
                key={education.id}
                education={education}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;