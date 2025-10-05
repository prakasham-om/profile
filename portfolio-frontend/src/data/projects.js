// src/data/projects.js
export const projectsData = [
  {
    id: 1,
    title: "Book Library Rating",
    shortDescription:
      "A web app to browse, rate, and manage books in a personal library.",
    fullDescription:
      "A fully functional book library web application where users can browse books, rate them, and maintain a personal library. Built with React for frontend, supports dynamic search and interactive rating system.",
    technologies: ["React", "Tailwind CSS", "Firebase", "JavaScript", "HTML/CSS"],
    category: "Web Application",
    status: "Completed",
    githubUrl: "https://github.com/prakasham-om",
    liveUrl: "https://gravity-six-theta.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=600&h=400&fit=crop",
    features: [
      "Browse books",
      "Rate books",
      "Search functionality",
      "Personal library management",
      "Responsive design",
    ],
    challenges: [
      "Implementing interactive rating system",
      "Managing state for user library",
      "Ensuring responsive UI",
    ],
    learnings: [
      "React state management",
      "Firebase integration",
      "Frontend responsive design",
    ],
    duration: "2 weeks",
    role: "Frontend Developer",
    impact: "Improved UX for book enthusiasts to manage and rate books easily",
  },
  {
    id: 2,
    title: "Case Converter",
    shortDescription: "A web tool to convert text between multiple cases.",
    fullDescription:
      "A lightweight web application that converts input text between uppercase, lowercase, sentence case, camelCase, and more. Useful for developers and writers to quickly transform text formatting.",
    technologies: ["React", "Tailwind CSS", "JavaScript", "HTML/CSS"],
    category: "Utility Tool",
    status: "Completed",
    githubUrl: "https://github.com/prakasham-om",
    liveUrl: "https://case-convrter.vercel.app/",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.o6eNv1u3-m6ra5Me70GPZAHaDo?pid=Api&P=0&h=180",
    features: [
      "Convert text to multiple cases",
      "Copy to clipboard",
      "Clear input",
      "Responsive design",
      "User-friendly interface",
    ],
    challenges: [
      "Implementing multiple case transformations",
      "Managing real-time text updates",
      "Designing intuitive UI",
    ],
    learnings: ["JavaScript string manipulations", "React input handling", "UX design"],
    duration: "1 week",
    role: "Frontend Developer",
    impact: "Saved time for users needing quick text formatting",
  },
  {
    id: 3,
    title: "Excel Sheet Implementation Instead of Database",
    shortDescription:
      "A backend web app using Excel sheets to store and retrieve data, replacing a traditional database.",
    fullDescription:
      "A Node.js and Express-based backend application that reads and writes data directly to Excel sheets instead of using a database. Useful for lightweight projects or prototyping without database setup.",
    technologies: ["Node.js", "Express.js", "Excel.js", "JavaScript", "HTML/CSS"],
    category: "Backend Tool",
    status: "Completed",
    githubUrl: "https://github.com/prakasham-om",
    liveUrl: "https://data-check-1.onrender.com/",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.p7N51nn-9Dx9j0yzoE6i4QHaEd?pid=Api&P=0&h=180",
    features: [
      "Read/write Excel data",
      "Simple REST API",
      "No database required",
      "Data validation",
      "Lightweight backend solution",
    ],
    challenges: [
      "Handling Excel file read/write efficiently",
      "Implementing REST API for Excel data",
      "Error handling for data inconsistencies",
    ],
    learnings: ["Excel file manipulation with Node.js", "Express API development", "Backend workflows"],
    duration: "3 weeks",
    role: "Backend Developer",
    impact: "Enabled lightweight data management without a database setup",
  },
];

export const projectCategories = ["All", "Web Application", "Utility Tool", "Backend Tool"];

export const projectStats = {
  total: projectsData.length,
  completed: projectsData.filter((p) => p.status === "Completed").length,
  inProgress: projectsData.filter((p) => p.status === "In Progress").length,
  technologies: [...new Set(projectsData.flatMap((p) => p.technologies))].length,
  impactMetrics: [
    {
      metric: "Time Saved",
      value: "Varies",
      description: "Depends on project utility",
    },
    {
      metric: "Users Impacted",
      value: "Varies",
      description: "Depends on project usage",
    },
  ],
};
