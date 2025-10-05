// routes/user.js - User profile routes
const express = require("express");
const router = express.Router();

// Import controllers
const {
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  uploadResume,
  deleteAvatar,
  deleteResume,
  updateSkills,
  getUserStats,
} = require("../controllers/userController");

// Import middleware
const { authenticate } = require("../middleware/auth");
const {
  validateProfileUpdate,
  validateObjectId,
  sanitizeInput,
} = require("../middleware/validation");

// Import file upload middleware
const upload = require("../middleware/upload");

// @route   GET /api/user/profile
// @desc    Get current user profile
// @access  Private
router.get("/profile", [authenticate, getUserProfile]);

// @route   GET /api/user/profile/:userId
// @desc    Get public user profile by ID
// @access  Public
router.get("/profile/:userId", [
  validateObjectId,
  async (req, res, next) => {
    try {
      const User = require("../models/User");
      const user = await User.findById(req.params.userId).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Return public profile data only
      const publicProfile = {
        _id: user._id,
        name: user.name,
        title: user.title,
        bio: user.bio,
        avatar: user.avatar,
        socialLinks: user.socialLinks,
        skills: user.skills,
        createdAt: user.createdAt,
        profileCompleteness: user.profileCompleteness,
      };

      res.json({
        success: true,
        data: { user: publicProfile },
      });
    } catch (error) {
      next(error);
    }
  },
]);

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", [
  authenticate,
  sanitizeInput,
  validateProfileUpdate,
  updateUserProfile,
]);

// @route   POST /api/user/avatar
// @desc    Upload user avatar image
// @access  Private
router.post("/avatar", [
  authenticate,
  upload.single("avatar"),
  // Validate file type and size
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No avatar file provided",
      });
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Only JPEG, PNG, and WebP are allowed.",
      });
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (req.file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 5MB.",
      });
    }

    next();
  },
  uploadAvatar,
]);

// @route   DELETE /api/user/avatar
// @desc    Delete user avatar
// @access  Private
router.delete("/avatar", [authenticate, deleteAvatar]);

// @route   POST /api/user/resume
// @desc    Upload user resume/CV
// @access  Private
router.post("/resume", [
  authenticate,
  upload.single("resume"),
  // Validate file type and size
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume file provided",
      });
    }

    // Check file type (only PDF)
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Only PDF files are allowed for resume.",
      });
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (req.file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 10MB.",
      });
    }

    next();
  },
  uploadResume,
]);

// @route   DELETE /api/user/resume
// @desc    Delete user resume
// @access  Private
router.delete("/resume", [authenticate, deleteResume]);

// @route   PUT /api/user/skills
// @desc    Update user skills
// @access  Private
router.put("/skills", [
  authenticate,
  sanitizeInput,
  // Validate skills array
  (req, res, next) => {
    const { skills } = req.body;

    if (!Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: "Skills must be an array",
      });
    }

    const validLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

    for (let skill of skills) {
      if (
        !skill.name ||
        typeof skill.name !== "string" ||
        skill.name.trim() === ""
      ) {
        return res.status(400).json({
          success: false,
          message: "Each skill must have a valid name",
        });
      }

      if (skill.level && !validLevels.includes(skill.level)) {
        return res.status(400).json({
          success: false,
          message: `Invalid skill level. Must be one of: ${validLevels.join(
            ", "
          )}`,
        });
      }
    }

    next();
  },
  updateSkills,
]);

// @route   GET /api/user/stats
// @desc    Get user statistics
// @access  Private
router.get("/stats", [authenticate, getUserStats]);

module.exports = router;
