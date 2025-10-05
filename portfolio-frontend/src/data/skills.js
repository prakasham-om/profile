// src/data/skills.js
import {
  Code,
  Database,
  Server,
  Smartphone,
  Globe,
  Palette,
  Shield,
  Zap,
} from "lucide-react";

export const skillsData = [
  {
    category: "Frontend",
    icon: <Code className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    items: [
      { name: "React", level: 90 },
      { name: "Angular", level: 85 },
      { name: "JavaScript", level: 88 },
      { name: "HTML5", level: 92 },
      { name: "CSS3", level: 90 },
      { name: "jQuery", level: 80 },
    ],
  },
  {
    category: "Backend",
    icon: <Server className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    items: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "Python", level: 75 },
      { name: "Microservices", level: 70 },
      { name: "API Integration", level: 85 },
    ],
  },
  {
    category: "Database",
    icon: <Database className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    items: [
      { name: "MongoDB", level: 88 },
      { name: "SQL", level: 82 },
      { name: "Firebase", level: 85 },
      { name: "Database Design", level: 80 },
      { name: "Data Migration", level: 75 },
      { name: "Query Optimization", level: 78 },
    ],
  },
  {
    category: "Tools & Technologies",
    icon: <Smartphone className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    items: [
      { name: "Git/GitHub", level: 92 },
      { name: "Firebase", level: 85 },
      { name: "REST APIs", level: 88 },
      { name: "Version Control", level: 90 },
      { name: "CI/CD", level: 75 },
      { name: "Agile/Scrum", level: 80 },
    ],
  },
  {
    category: "Specializations",
    icon: <Globe className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-500",
    items: [
      { name: "Dashboard Development", level: 92 },
      { name: "Automation Tools", level: 88 },
      { name: "Reporting Platforms", level: 90 },
      { name: "Performance Optimization", level: 85 },
      { name: "Workflow Enhancement", level: 87 },
      { name: "KPI Tracking", level: 82 },
    ],
  },
  {
    category: "Security & Compliance",
    icon: <Shield className="w-6 h-6" />,
    color: "from-teal-500 to-cyan-500",
    items: [
      { name: "Security Compliance", level: 85 },
      { name: "Vulnerability Assessment", level: 80 },
      { name: "AppSec Best Practices", level: 78 },
      { name: "Data Protection", level: 82 },
      { name: "Secure Coding", level: 80 },
      { name: "OWASP Guidelines", level: 75 },
    ],
  },
  {
    category: "Business Intelligence",
    icon: <Palette className="w-6 h-6" />,
    color: "from-pink-500 to-rose-500",
    items: [
      { name: "Report Generation", level: 90 },
      { name: "Data Visualization", level: 85 },
      { name: "Excel Automation", level: 88 },
      { name: "JSON Processing", level: 85 },
      { name: "Business Analytics", level: 80 },
      { name: "Process Automation", level: 87 },
    ],
  },
  {
    category: "Performance & Optimization",
    icon: <Zap className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
    items: [
      { name: "Load Time Optimization", level: 88 },
      { name: "Code Performance", level: 85 },
      { name: "User Experience", level: 87 },
      { name: "System Efficiency", level: 82 },
      { name: "Workflow Optimization", level: 90 },
      { name: "Resource Management", level: 78 },
    ],
  },
];

export const totalExperience = "4+ Years";
export const projectsCompleted = "5+";
export const technologiesUsed = "15+";
