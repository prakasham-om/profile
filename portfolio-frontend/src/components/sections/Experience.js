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
} from "lucide-react";
import { ANIMATION_VARIANTS } from "../../utils/constants";

const Experience = () => {
  // Experience data
  const experienceData = [
    {
      id: 1,
      title: "Senior Associate",
      company: "INFO SOFTWARE DEVELOPMENT PVT LTD",
      location: "Bangalore, Karnataka",
      period: "Jul 2021 – Present",
      type: "Full-time",
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
        "Angular (Warehouse Project)",
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
    totalExperience: "4+ Years",
    projectsCompleted: "5+",
    companiesWorked: 1,
    technologiesMastered: 10,
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
      <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-purple-400 to-transparent"></div>

      {/* Timeline dot */}
      <div className="absolute left-4 top-8 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-4 border-gray-900"></div>

      {/* Content card */}
      <div className="ml-16 mb-12">
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {experience.title}
              </h3>
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Briefcase className="w-4 h-4" />
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-300 transition-colors flex items-center gap-1"
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
              <span className="mt-1 px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                {experience.type}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-4">{experience.description}</p>

          {/* Key Projects */}
          {experience.projects && (
            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">Key Projects:</h4>
              <div className="space-y-2">
                {experience.projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 rounded-lg p-3 border border-white/10"
                  >
                    <div className="font-medium text-purple-300 mb-1">
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
                      <div className="mt-1 flex flex-wrap gap-1">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                          >
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
            <h4 className="text-white font-medium mb-2">Key Achievements:</h4>
            <ul className="space-y-1">
              {experience.achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  className="text-gray-300 text-sm flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0 mt-2"></div>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-white font-medium mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                >
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
      className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 mb-6"
      variants={ANIMATION_VARIANTS.fadeInUp}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-white">
              {education.degree}
            </h4>
            <p className="text-purple-400">{education.institution}</p>
            <p className="text-gray-400 text-sm">{education.location}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-sm text-gray-400 mb-1">
            <Calendar className="w-4 h-4" />
            <span>{education.period}</span>
          </div>
          <div className="text-green-400 font-medium">
            {education.percentage}
          </div>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{education.description}</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h5 className="text-white font-medium mb-2">Achievements:</h5>
          <ul className="space-y-1">
            {education.achievements.map((achievement, idx) => (
              <li
                key={idx}
                className="text-gray-300 text-sm flex items-start gap-2"
              >
                <Award className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-1" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-white font-medium mb-2">Relevant Courses:</h5>
          <div className="flex flex-wrap gap-1">
            {education.relevantCourses.map((course, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
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
    <section id="experience" className="py-20 px-6 bg-black/20">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={ANIMATION_VARIANTS.fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey in Health and Warehouse domain projects
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
          <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {professionalStats.totalExperience}
            </div>
            <p className="text-gray-400">Professional Experience</p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold text-pink-400 mb-2">
              {professionalStats.projectsCompleted}
            </div>
            <p className="text-gray-400">Projects Completed</p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {professionalStats.companiesWorked}
            </div>
            <p className="text-gray-400">Companies Worked</p>
          </div>
        </motion.div>

        {/* Performance Improvements */}
        <motion.div
          className="mb-16"
          variants={ANIMATION_VARIANTS.fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Key Performance Improvements
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {professionalStats.performanceImprovements.map(
              (improvement, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-400/20"
                >
                  <div className="text-2xl font-bold text-white mb-2">
                    {improvement.improvement}
                  </div>
                  <div className="text-purple-400 font-medium mb-2">
                    {improvement.metric}
                  </div>
                  <p className="text-gray-300 text-sm">
                    {improvement.description}
                    {improvement.from && improvement.to && (
                      <span className="block mt-1 text-xs">
                        From {improvement.from} to {improvement.to}
                      </span>
                    )}
                  </p>
                </div>
              )
            )}
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold text-white mb-8 text-center"
            variants={ANIMATION_VARIANTS.fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Professional Experience
          </motion.h3>

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
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Education
          </h3>

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
