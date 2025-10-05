// src/utils/constants.js
// src/utils/constants.js
export const PERSONAL_INFO = {
  name: "Prakash Chandra Sahoo",
  title: "Full Stack Developer",
  description: "Passionate about crafting scalable web applications and engaging user experiences",
  email:'prakashchandrasahoo8991@gmail.com',
  phone: "+91-*******143",
  location: "Bangalore, Karnataka, India",
  profileImage: "/Profile.jpg",
  aboutImage: "http://getwallpapers.com/wallpaper/full/7/c/2/1173099-best-developer-wallpaper-hd-1920x1280-htc.jpg",
  experience: "4+",
  projectsCompleted: "5+",
  clientsSatisfied: "3+",
  degree: "Bachelor of Science in Computer Science",
  university: "Khallikote Autonomous College, Berhampur,Odisha",
};

export const SOCIAL_LINKS = {
  github: "https://github.com/prakasham-om",
  linkedin: "https://www.linkedin.com/in/prakash-chandra-sahoo-ba3b942a1/",
  //portfolio: "https://prashant-portfolio.com",
};

export const CONTACT_INFO = {
  address: {
    street: "Marathahalli",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    pincode: "560037 ",
  },
  availability: "Available for freelance work",
  responseTime: "Usually responds within 24 hours",
};

export const NAVIGATION_ITEMS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const TECH_STACK = {
  frontend: [
    "React.js",
    "JavaScript",
    "TypeScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Bootstrap",
    "Material-UI",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "Python",
    "Java",
    "RESTful APIs",
    "GraphQL",
  ],
  database: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Redis"],
  tools: [
    "Git",
    "GitHub",
    "VS Code",
    "Postman",
    "Docker",
    "AWS",
    "Vercel",
    "Netlify",
  ],
  design: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
};

export const SERVICES = [
  {
    title: "Frontend Development",
    description:
      "Creating responsive and interactive user interfaces using modern frameworks and libraries.",
    technologies: ["React", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend Development",
    description:
      "Building robust server-side applications and APIs with scalable architecture.",
    technologies: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Redis"],
  },
  {
    title: "Full Stack Development",
    description:
      "End-to-end web application development from concept to deployment.",
    technologies: ["MERN Stack", "MEAN Stack", "JAMstack", "Serverless"],
  },
  {
    title: "UI/UX Design",
    description:
      "Designing user-centered interfaces with focus on usability and aesthetics.",
    technologies: ["Figma", "Adobe XD", "Prototyping", "User Research"],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp Inc.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    text: "John delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise are outstanding.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "StartupHub",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    text: "Working with John was a pleasure. He understood our requirements perfectly and delivered a scalable solution on time.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Digital Solutions",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    text: "The website John created for us significantly improved our user engagement and conversion rates. Highly recommended!",
    rating: 5,
  },
];

export const COMPANY_LOGOS = [
  {
    name: "TechCorp",
    logo: "/logos/techcorp-logo.svg",
    url: "https://techcorp.com",
  },
  {
    name: "StartupHub",
    logo: "/logos/startuphub-logo.svg",
    url: "https://startuphub.com",
  },
  {
    name: "Digital Solutions",
    logo: "/logos/digital-solutions-logo.svg",
    url: "https://digitalsolutions.com",
  },
  {
    name: "InnovateLab",
    logo: "/logos/innovatelab-logo.svg",
    url: "https://innovatelab.com",
  },
];

export const API_ENDPOINTS = {
  contact: "/api/contact",
  projects: "/api/projects",
  testimonials: "/api/testimonials",
  experience: "/api/experience",
};

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  },
};
