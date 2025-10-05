// controllers/projectController.js - Project controller (MVC Controller layer)
// This handles all project-related business logic

const { validationResult } = require("express-validator");
const Project = require("../models/Project");

/**
 * @desc    Get all projects with pagination, filtering, and search
 * @route   GET /api/projects
 * @access  Public
 */
const getAllProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "-createdAt";
    const { category, technology, search } = req.query;

    // Build query object
    let query = { isPublic: true }; // Only show public projects

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by technology
    if (technology) {
      query.technologies = { $in: [technology] };
    }

    // Search in title, description, and technologies
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { technologies: { $regex: search, $options: "i" } },
      ];
    }

    // Execute query with pagination
    const projects = await Project.find(query)
      .populate("owner", "name title avatar")
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      data: {
        projects: projects.map((project) => project.getPublicData()),
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Get all projects error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching projects",
    });
  }
};

/**
 * @desc    Get single project by ID
 * @route   GET /api/projects/:id
 * @access  Public
 */
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "owner",
      "name title avatar socialLinks"
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check if project is public or user owns it
    if (
      !project.isPublic &&
      (!req.user || req.user.userId !== project.owner._id.toString())
    ) {
      return res.status(403).json({
        success: false,
        message: "This project is private",
      });
    }

    res.json({
      success: true,
      data: {
        project: project.getPublicData(),
      },
    });
  } catch (error) {
    console.error("Get project by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching project",
    });
  }
};

/**
 * @desc    Create new project
 * @route   POST /api/projects
 * @access  Private
 */
const createProject = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const projectData = {
      ...req.body,
      owner: req.user.userId,
    };

    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: {
        project: project.getPublicData(),
      },
    });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error creating project",
    });
  }
};

/**
 * @desc    Update project by ID
 * @route   PUT /api/projects/:id
 * @access  Private
 */
const updateProject = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const project = req.project; // Set by middleware

    // Update project fields
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        project[key] = req.body[key];
      }
    });

    await project.save();

    res.json({
      success: true,
      message: "Project updated successfully",
      data: {
        project: project.getPublicData(),
      },
    });
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating project",
    });
  }
};

/**
 * @desc    Delete project by ID
 * @route   DELETE /api/projects/:id
 * @access  Private
 */
const deleteProject = async (req, res) => {
  try {
    const project = req.project; // Set by middleware

    await Project.findByIdAndDelete(project._id);

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting project",
    });
  }
};

/**
 * @desc    Get featured projects
 * @route   GET /api/projects/featured
 * @access  Public
 */
const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.getFeaturedProjects().populate(
      "owner",
      "name title avatar"
    );

    res.json({
      success: true,
      data: {
        projects: projects.map((project) => project.getPublicData()),
      },
    });
  } catch (error) {
    console.error("Get featured projects error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching featured projects",
    });
  }
};

/**
 * @desc    Get projects by category
 * @route   GET /api/projects/category/:category
 * @access  Public
 */
const getProjectsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const projects = await Project.getByCategory(category)
      .populate("owner", "name title avatar")
      .limit(limit)
      .skip(skip);

    const total = await Project.countDocuments({
      category,
      isPublic: true,
    });

    res.json({
      success: true,
      data: {
        projects: projects.map((project) => project.getPublicData()),
        category,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
        },
      },
    });
  } catch (error) {
    console.error("Get projects by category error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching projects by category",
    });
  }
};

/**
 * @desc    Search projects
 * @route   GET /api/projects/search
 * @access  Public
 */
const searchProjects = async (req, res) => {
  try {
    const { q: searchTerm } = req.query;

    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search term is required",
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "-createdAt";

    const searchQuery = {
      isPublic: true,
      $text: { $search: searchTerm },
    };

    const projects = await Project.find(searchQuery)
      .populate("owner", "name title avatar")
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const total = await Project.countDocuments(searchQuery);

    res.json({
      success: true,
      data: {
        projects: projects.map((project) => project.getPublicData()),
        searchTerm,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
        },
      },
    });
  } catch (error) {
    console.error("Search projects error:", error);
    res.status(500).json({
      success: false,
      message: "Server error searching projects",
    });
  }
};

/**
 * @desc    Increment project views
 * @route   POST /api/projects/:id/view
 * @access  Public
 */
const incrementProjectViews = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.incrementViews();

    res.json({
      success: true,
      message: "View count updated",
      data: {
        views: project.views,
      },
    });
  } catch (error) {
    console.error("Increment project views error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating view count",
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getFeaturedProjects,
  getProjectsByCategory,
  searchProjects,
  incrementProjectViews,
};
