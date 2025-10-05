// src/data/experience.js
export const experienceData = [
    {
      id: 1,
      title: "Senior Associate",
      company: "Iglobal Consulting Private Limited",
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

export const educationData = [
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



// Professional Statistics
export  const professionalStats = {
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

