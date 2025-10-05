// server.js - Entry point of our backend application
// This file sets up the Express server, connects to MongoDB, and configures middleware

// Import Required Dependencies
const express = require("express"); // Web Framework for NodeJs
const cors = require("cors"); // Enable cross-origin resource sharing for frontend-backend
const helmet = require("helmet"); // Security middleware that sets various http headers
const rateLimit = require("express-rate-limit"); // Rate limiting middleware to prevent abuse
require("dotenv").config(); // Load environment variables from .env file

// Import our custom module
const connectDB = require("./config/database"); // Database connection function

// Import route handlers (MVC Routes)
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contact");
const userRoutes = require("./routes/user");

// Initialize Express App
const app = express();

// Connect to MongoDB database
connectDB();

// 1. Security Middleware - sets security headers
app.use(helmet());

// 2. CORS configuration - allows frontend to communicate with backend
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 3. Rate Limiting - prevents spam and abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min window
  max: 100, // Limit each IP to 100 requests per windowMS
  message: {
    error: "Too many requests from this IP, Please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the RateLimit headers
  legacyHeaders: false, // Disable the X-RateLimit headers
});
app.use(limiter);

// 4. Body parsing middleware - parses JSON and URL-encoded data
app.use(express.json({ limit: "10mb" })); // Parse JSON Bodies (limit: 10mb for images)
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Parse URL-encoded bodies

// 5. Static file serving - serve uploaded files
app.use("/uploads", express.static("uploads"));

// API ROUTES configuration

// Health check route - useful for monitoring
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Portfolio API is running",
    timestamp: new Date().toISOString(),
  });
});

// Mount route handlers with prefixes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);

// 404 handler - when no route matches
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler - catches all errors
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors,
    });
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Server configuration
const PORT = process.env.PORT || 3000; // Use environment PORT or default to 5000

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio API Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 Access at: http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, Promise) => {
  console.error("Unhandled Promise Rejection:", err.message);
  process.exit(1); // Close server & exit process
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});
