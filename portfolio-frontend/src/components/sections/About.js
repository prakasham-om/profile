// src/components/sections/About.js
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Code, Calendar, Award } from "lucide-react";
import { PERSONAL_INFO, ANIMATION_VARIANTS } from "../../utils/constants";


const About = () => {
  const stats = [
    {
      icon: <Code className="w-6 h-6 text-purple-400" />,
      label: "Years Experience",
      value: PERSONAL_INFO.experience,
    },
    {
      icon: <Award className="w-6 h-6 text-pink-400" />,
      label: "Projects Completed",
      value: PERSONAL_INFO.projectsCompleted,
    },
    {
      icon: <Calendar className="w-6 h-6 text-blue-400" />,
      label: "Happy Clients",
      value: PERSONAL_INFO.clientsSatisfied,
    },
  ];

  const personalDetails = [
    {
      icon: <MapPin className="w-4 h-4 text-purple-400" />,
      label: "Location",
      value: PERSONAL_INFO.location,
    },
    {
      icon: <Mail className="w-4 h-4 text-pink-400" />,
      label: "Email",
      value: PERSONAL_INFO.email,
      overflow: true,
    },
    {
      icon: <Phone className="w-4 h-4 text-blue-400" />,
      label: "Phone",
      value: PERSONAL_INFO.phone,
    },
    {
      icon: <Code className="w-4 h-4 text-green-400" />,
      label: "Experience",
      value: PERSONAL_INFO.experience,
    },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={ANIMATION_VARIANTS.fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Full Stack Developer passionate about building scalable, secure, and user-friendly applications. Experienced in dashboards, automation tools, and enterprise solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image with 3D Effect */}
          <motion.div
            className="relative perspective-1000"
            variants={ANIMATION_VARIANTS.fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative transform-gpu hover:rotate-y-3 hover:rotate-x-3 transition-transform duration-500">
              <img
                src={PERSONAL_INFO.aboutImage}
                alt="About me"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-pink-600/20 rounded-3xl"></div>
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-60 animate-float"></div>
              <div
                className="absolute -bottom-6 -left-6 w-36 h-36 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl opacity-40 animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            className="space-y-8"
            variants={ANIMATION_VARIANTS.fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Hi, I'm Prakash 👋
              </h3>

              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Full Stack Developer with 4+ years of experience delivering dashboards, automation tools, and secure applications.
                </p>
                <p>
                  Currently at Iglobal consulting pvt ltd, Bangalore, I specialize in building scalable, user-focused solutions that reduce manual effort and enhance business performance.
                </p>
                <p>
                  Proficient in JavaScript, React, Angular, Node.js, and database management. Passionate about learning new technologies and improving my skills.
                </p>
              </div>
            </div>

            {/* Personal Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-3 p-4 bg-gray-800 rounded-xl border border-gray-700 shadow-inner transform-gpu hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-300 ${
                    detail.overflow ? "overflow-x-auto" : ""
                  }`}
                  variants={ANIMATION_VARIANTS.fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  {detail.icon}
                  <div className="min-w-0">
                    <p className="text-gray-400 text-sm">{detail.label}</p>
                    <p className="text-white font-medium whitespace-nowrap">{detail.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow-inner transform-gpu hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                  variants={ANIMATION_VARIANTS.fadeInUp}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="text-2xl flex justify-center mb-3">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Get In Touch
              </motion.button>
              <motion.button
                className="border border-purple-400 text-white font-medium px-8 py-3 rounded-xl shadow-inner hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("/pc_react_node_4years.pdf", "_blank")}
              >
                Download CV
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
