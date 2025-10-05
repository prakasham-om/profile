// controllers/userController.js - User controller
const { validationResult } = require("express-validator");
const User = require("../models/User");
const { deleteFile, getFileUrl } = require("../middleware/upload");

// @desc    Get current user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: {
        user: user.getPublicProfile(),
      },
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching user profile",
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = async (req, res) => {
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

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user fields
    const allowedFields = ["name", "title", "bio", "socialLinks", "skills"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: user.getPublicProfile(),
      },
    });
  } catch (error) {
    console.error("Update user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating profile",
    });
  }
};

// @desc    Upload user avatar
// @route   POST /api/user/avatar
// @access  Private
const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No avatar file provided",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete old avatar if exists
    if (user.avatar) {
      const oldAvatarPath = user.avatar.replace("/", "");
      await deleteFile(oldAvatarPath);
    }

    // Update user avatar
    user.avatar = getFileUrl(req.file.path);
    await user.save();

    res.json({
      success: true,
      message: "Avatar uploaded successfully",
      data: {
        avatar: user.avatar,
        user: user.getPublicProfile(),
      },
    });
  } catch (error) {
    console.error("Upload avatar error:", error);

    // Clean up uploaded file on error
    if (req.file) {
      await deleteFile(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: "Server error uploading avatar",
    });
  }
};

// @desc    Delete user avatar
// @route   DELETE /api/user/avatar
// @access  Private
const deleteAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.avatar) {
      return res.status(400).json({
        success: false,
        message: "No avatar to delete",
      });
    }

    // Delete avatar file
    const avatarPath = user.avatar.replace("/", "");
    await deleteFile(avatarPath);

    // Update user
    user.avatar = "";
    await user.save();

    res.json({
      success: true,
      message: "Avatar deleted successfully",
      data: {
        user: user.getPublicProfile(),
      },
    });
  } catch (error) {
    console.error("Delete avatar error:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting avatar",
    });
  }
};

// @desc    Upload user resume
// @route   POST /api/user/resume
// @access  Private
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume file provided",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete old resume if exists
    if (user.resume) {
      const oldResumePath = user.resume.replace("/", "");
      await deleteFile(oldResumePath);
    }

    // Update user resume
    user.resume = getFileUrl(req.file.path);
    await user.save();

    res.json({
      success: true,
      message: "Resume uploaded successfully",
      data: {
        resume: user.resume,
        user: user.getPublicProfile(),
      },
    });
  } catch (error) {
    console.error("Upload resume error:", error);

    // Clean up uploaded file on error
    if (req.file) {
      await deleteFile(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: "Server error uploading resume",
    });
  }
};

// @desc    Delete user resume
// @route   DELETE /api/user/resume
// @access  Private
const deleteResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.resume) {
      return res.status(400).json({
        success: false,
        message: "No resume to delete",
      });
    }

    // Delete resume file
    const resumePath = user.resume.replace("/", "");
    await deleteFile(resumePath);

    // Update user
    user.resume = "";
    await user.save();

    res.json({
      success: true,
      message: "Resume deleted successfully",
      data: {
        user: user.getPublicProfile(),
      },
    });
  } catch (error) {
    console.error("Delete resume error:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting resume",
    });
  }
};

// @desc    Update user skills
// @route   PUT /api/user/skills
// @access  Private
const updateSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update skills
    user.skills = skills;
    await user.save();

    res.json({
      success: true,
      message: "Skills updated successfully",
      data: {
        skills: user.skills,
        user: user.getPublicProfile(),
      },
    });
  } catch (error) {
    console.error("Update skills error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating skills",
    });
  }
};

// @desc    Get user statistics
// @route   GET /api/user/stats
// @access  Private
const getUserStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    const Project = require("../models/Project");
    const Contact = require("../models/Contact");

    // Get project statistics
    const totalProjects = await Project.countDocuments({ owner: userId });
    const completedProjects = await Project.countDocuments({
      owner: userId,
      status: "Completed",
    });
    const inProgressProjects = await Project.countDocuments({
      owner: userId,
      status: "In Progress",
    });
    const featuredProjects = await Project.countDocuments({
      owner: userId,
      isFeatured: true,
    });

    // Get total project views
    const projectsWithViews = await Project.find({ owner: userId }).select(
      "views"
    );
    const totalViews = projectsWithViews.reduce(
      (sum, project) => sum + project.views,
      0
    );

    // Get contact stats (if user is admin)
    let contactStats = null;
    const user = await User.findById(userId);
    if (user.role === "admin") {
      const totalMessages = await Contact.countDocuments({ isSpam: false });
      const unreadMessages = await Contact.countDocuments({
        status: "New",
        isSpam: false,
      });
      contactStats = { total: totalMessages, unread: unreadMessages };
    }

    res.json({
      success: true,
      data: {
        projects: {
          total: totalProjects,
          completed: completedProjects,
          inProgress: inProgressProjects,
          featured: featuredProjects,
          totalViews,
        },
        contact: contactStats,
        profileCompleteness: user.profileCompleteness,
        joinDate: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get user stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching user statistics",
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  deleteAvatar,
  uploadResume,
  deleteResume,
  updateSkills,
  getUserStats,
};
