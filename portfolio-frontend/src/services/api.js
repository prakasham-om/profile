// // src/services/api.js
// import axios from "axios";


//  console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);
// // Create axios instance with base configuration
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
//   timeout: 600000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Add auth token if available
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     const errorMessage =
//       error.response?.data?.message || error.message || "Something went wrong";
//     console.error("API Error:", errorMessage);
//     return Promise.reject({
//       message: errorMessage,
//       status: error.response?.status,
//       data: error.response?.data,
//     });
//   }
// );

// // Contact API functions
// export const contactAPI = {


  
//   sendOtp: async ({ email, name }) => {
//     try {
//       const response = await api.post("/api/contact/otp", { email, name });
//       return { success: true, data: response };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to send OTP",
//         error,
//       };
//     }
//   },

//   verifyOtp: async ({ email, otp }) => {
//     try {
//       const response = await api.post("/api/contact/send", { email, otp });
//       return { success: true, data: response };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || "OTP verification failed",
//         error,
//       };
//     }
//   },
//   // Send contact form message
//   sendMessage: async (contactData) => {
//     try {
//       console.log("Sending message to API:", contactData);
//       console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

//       // Ensure all required fields are present and properly formatted
//       const payload = {
//         name: contactData.name?.trim() || "",
//         email: contactData.email?.trim() || "",
//         subject: contactData.subject?.trim() || "",
//         message: contactData.message?.trim() || "",
//         phone: contactData.phone?.trim() || "", // Optional field if backend requires it
//         timestamp: contactData.timestamp || new Date().toISOString(),
//       };

//       console.log("Formatted payload:", payload);

//       // Use the correct endpoint that matches your backend
//       const response = await api.post("/api/contact", payload);

//       console.log("API Response received:", response);

//       return {
//         success: true,
//         data: response,
//         message: "Message sent successfully!",
//       };
//     } catch (error) {
//       console.error("Contact API Error:", error);
//       console.error("Error response:", error.response?.data);
//       console.error("Error status:", error.response?.status);
//       console.error("Error message:", error.message);

//       // Extract validation errors if present
//       let errorMessage = "Failed to send message. Please try again.";

//       if (
//         error.response?.data?.errors &&
//         Array.isArray(error.response.data.errors)
//       ) {
//         // Format validation errors
//         errorMessage = error.response.data.errors
//           .map((err) => err.msg)
//           .join(", ");
//       } else if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }

//       return {
//         success: false,
//         message: errorMessage,
//         errors: error.response?.data?.errors,
//         error: error,
//       };
//     }
//   },

//   // Get all contact messages (admin only)
//   getAllMessages: async () => {
//     try {
//       const response = await api.get("/api/contact");
//       return {
//         success: true,
//         data: response,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },

//   // Delete contact message (admin only)
//   deleteMessage: async (messageId) => {
//     try {
//       const response = await api.delete(`/api/contact/${messageId}`);
//       return {
//         success: true,
//         data: response,
//         message: "Message deleted successfully!",
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },
// };

// // Projects API functions
// export const projectsAPI = {
//   // Get all projects
//   getAllProjects: async () => {
//     try {
//       const response = await api.get("/api/projects");
//       return {
//         success: true,
//         data: response,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },

//   // Get single project
//   getProject: async (projectId) => {
//     try {
//       const response = await api.get(`/api/projects/${projectId}`);
//       return {
//         success: true,
//         data: response,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },

//   // Create new project (admin only)
//   createProject: async (projectData) => {
//     try {
//       const response = await api.post("/api/projects", projectData);
//       return {
//         success: true,
//         data: response,
//         message: "Project created successfully!",
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },

//   // Update project (admin only)
//   updateProject: async (projectId, projectData) => {
//     try {
//       const response = await api.put(`/api/projects/${projectId}`, projectData);
//       return {
//         success: true,
//         data: response,
//         message: "Project updated successfully!",
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },

//   // Delete project (admin only)
//   deleteProject: async (projectId) => {
//     try {
//       const response = await api.delete(`/api/projects/${projectId}`);
//       return {
//         success: true,
//         data: response,
//         message: "Project deleted successfully!",
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },
// };

// // Experience API functions
// export const experienceAPI = {
//   // Get all experience entries
//   getAllExperience: async () => {
//     try {
//       const response = await api.get("/api/experience");
//       return {
//         success: true,
//         data: response,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },

//   // Create new experience (admin only)
//   createExperience: async (experienceData) => {
//     try {
//       const response = await api.post("/api/experience", experienceData);
//       return {
//         success: true,
//         data: response,
//         message: "Experience added successfully!",
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },

//   // Update experience (admin only)
//   updateExperience: async (experienceId, experienceData) => {
//     try {
//       const response = await api.put(
//         `/api/experience/${experienceId}`,
//         experienceData
//       );
//       return {
//         success: true,
//         data: response,
//         message: "Experience updated successfully!",
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },

//   // Delete experience (admin only)
//   deleteExperience: async (experienceId) => {
//     try {
//       const response = await api.delete(`/api/experience/${experienceId}`);
//       return {
//         success: true,
//         data: response,
//         message: "Experience deleted successfully!",
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },
// };

// // Skills API functions
// export const skillsAPI = {
//   // Get all skills
//   getAllSkills: async () => {
//     try {
//       const response = await api.get("/api/skills");
//       return {
//         success: true,
//         data: response,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },

//   // Update skills (admin only)
//   updateSkills: async (skillsData) => {
//     try {
//       const response = await api.put("/api/skills", skillsData);
//       return {
//         success: true,
//         data: response,
//         message: "Skills updated successfully!",
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },
// };

// // Authentication API functions
// export const authAPI = {
//   // Login
//   login: async (credentials) => {
//     try {
//       const response = await api.post("/api/auth/login", credentials);
//       if (response.token) {
//         localStorage.setItem("authToken", response.token);
//         localStorage.setItem("user", JSON.stringify(response.user));
//       }
//       return {
//         success: true,
//         data: response,
//         message: "Login successful!",
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },

//   // Logout
//   logout: () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user");
//     return {
//       success: true,
//       message: "Logged out successfully!",
//     };
//   },

//   // Get current user
//   getCurrentUser: async () => {
//     try {
//       const response = await api.get("/api/auth/me");
//       return {
//         success: true,
//         data: response,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//     }
//   },
// };

// // Utility function to check if user is authenticated
// export const isAuthenticated = () => {
//   const token = localStorage.getItem("authToken");
//   return !!token;
// };

// // Utility function to get stored user data
// export const getStoredUser = () => {
//   const user = localStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// };

// export default api;




// src/services/api.js
import axios from "axios";

console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
  timeout: 60000, // 60 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor with retry logic
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    // Retry once if Render backend is waking up
    if (!error.config._retry) {
      error.config._retry = true;
      console.warn("⚠️ Render backend cold start — retrying in 5 seconds...");
      await new Promise((res) => setTimeout(res, 5000));
      return api(error.config);
    }

    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";

    console.error("API Error:", errorMessage);
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

//
// ────────────────────────────────────────────────
// CONTACT API
// ────────────────────────────────────────────────
//
export const contactAPI = {
  sendOtp: async ({ email, name }) => {
    try {
      const response = await api.post("/api/contact/otp", { email, name });
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to send OTP",
        error,
      };
    }
  },

  verifyOtp: async ({ email, otp }) => {
    try {
      const response = await api.post("/api/contact/send", { email, otp });
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "OTP verification failed",
        error,
      };
    }
  },

  sendMessage: async (contactData) => {
    try {
      console.log("Sending message to API:", contactData);

      const payload = {
        name: contactData.name?.trim() || "",
        email: contactData.email?.trim() || "",
        subject: contactData.subject?.trim() || "",
        message: contactData.message?.trim() || "",
        phone: contactData.phone?.trim() || "",
        timestamp: contactData.timestamp || new Date().toISOString(),
      };

      const response = await api.post("/api/contact", payload);
      return { success: true, data: response, message: "Message sent successfully!" };
    } catch (error) {
      let errorMessage = "Failed to send message. Please try again.";

      if (error.response?.data?.errors?.length) {
        errorMessage = error.response.data.errors.map((e) => e.msg).join(", ");
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error("Contact API Error:", error);
      return { success: false, message: errorMessage, error };
    }
  },

  getAllMessages: async () => {
    try {
      const response = await api.get("/api/contact");
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },

  deleteMessage: async (messageId) => {
    try {
      const response = await api.delete(`/api/contact/${messageId}`);
      return { success: true, data: response, message: "Message deleted successfully!" };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },
};

//
// ────────────────────────────────────────────────
// PROJECTS API
// ────────────────────────────────────────────────
//
export const projectsAPI = {
  getAllProjects: async () => {
    try {
      const response = await api.get("/api/projects");
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },

  getProject: async (projectId) => {
    try {
      const response = await api.get(`/api/projects/${projectId}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await api.post("/api/projects", projectData);
      return { success: true, data: response, message: "Project created successfully!" };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },

  updateProject: async (projectId, projectData) => {
    try {
      const response = await api.put(`/api/projects/${projectId}`, projectData);
      return { success: true, data: response, message: "Project updated successfully!" };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },

  deleteProject: async (projectId) => {
    try {
      const response = await api.delete(`/api/projects/${projectId}`);
      return { success: true, data: response, message: "Project deleted successfully!" };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },
};

//
// ────────────────────────────────────────────────
// EXPERIENCE API
// ────────────────────────────────────────────────
//
export const experienceAPI = {
  getAllExperience: async () => {
    try {
      const response = await api.get("/api/experience");
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },

  createExperience: async (experienceData) => {
    try {
      const response = await api.post("/api/experience", experienceData);
      return { success: true, data: response, message: "Experience added successfully!" };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },

  updateExperience: async (experienceId, experienceData) => {
    try {
      const response = await api.put(`/api/experience/${experienceId}`, experienceData);
      return { success: true, data: response, message: "Experience updated successfully!" };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },

  deleteExperience: async (experienceId) => {
    try {
      const response = await api.delete(`/api/experience/${experienceId}`);
      return { success: true, data: response, message: "Experience deleted successfully!" };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },
};

//
// ────────────────────────────────────────────────
// SKILLS API
// ────────────────────────────────────────────────
//
export const skillsAPI = {
  getAllSkills: async () => {
    try {
      const response = await api.get("/api/skills");
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },

  updateSkills: async (skillsData) => {
    try {
      const response = await api.put("/api/skills", skillsData);
      return { success: true, data: response, message: "Skills updated successfully!" };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },
};

//
// ────────────────────────────────────────────────
// AUTH API
// ────────────────────────────────────────────────
//
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      if (response.token) {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      return { success: true, data: response, message: "Login successful!" };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    return { success: true, message: "Logged out successfully!" };
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("/api/auth/me");
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message, error };
    }
  },
};

//
// ────────────────────────────────────────────────
// UTILITIES
// ────────────────────────────────────────────────
//
export const isAuthenticated = () => !!localStorage.getItem("authToken");

export const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export default api;

