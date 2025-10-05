// routes/projects.js - Project routes
const express = require("express");
const router = express.Router();

// Import controllers
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getFeaturedProjects,
  getProjectsByCategory,
  searchProjects,
  incrementProjectViews,
} = require("../controllers/projectController");

// Import middleware
const { authenticate, optionalAuthenticate } = require("../middleware/auth");
const {
  validateProject,
  validateObjectId,
  validatePagination,
  sanitizeInput,
} = require("../middleware/validation");

// GET /api/projects - Get all public projects
router.get("/", [validatePagination, optionalAuthenticate, getAllProjects]);

// GET /api/projects/featured - Get featured projects
router.get("/featured", [optionalAuthenticate, getFeaturedProjects]);

// GET /api/projects/category/:category - Get projects by category
router.get("/category/:category", [
  validatePagination,
  optionalAuthenticate,
  getProjectsByCategory,
]);

// GET /api/projects/search - Search projects
router.get("/search", [
  validatePagination,
  optionalAuthenticate,
  searchProjects,
]);

// GET /api/projects/:id - Get single project
router.get("/:id", [validateObjectId, optionalAuthenticate, getProjectById]);

// POST /api/projects/:id/view - Increment project views
router.post("/:id/view", [validateObjectId, incrementProjectViews]);

// POST /api/projects - Create new project
router.post("/", [authenticate, sanitizeInput, validateProject, createProject]);

// PUT /api/projects/:id - Update project
router.put("/:id", [
  validateObjectId,
  authenticate,
  async (req, res, next) => {
    try {
      const Project = require("../models/Project");
      const project = await Project.findById(req.params.id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      if (
        project.owner.toString() !== req.user.userId &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied. You can only update your own projects.",
        });
      }

      req.project = project;
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error checking project ownership",
      });
    }
  },
  sanitizeInput,
  validateProject,
  updateProject,
]);

// DELETE /api/projects/:id - Delete project
router.delete("/:id", [
  validateObjectId,
  authenticate,
  async (req, res, next) => {
    try {
      const Project = require("../models/Project");
      const project = await Project.findById(req.params.id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      if (
        project.owner.toString() !== req.user.userId &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied. You can only delete your own projects.",
        });
      }

      req.project = project;
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error checking project ownership",
      });
    }
  },
  deleteProject,
]);

module.exports = router;
