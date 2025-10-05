// routes/auth.js - Authentication routes
const express = require("express");
const router = express.Router();

// Import controllers
const {
  register,
  login,
  logout,
  getMe,
  refreshToken,
  changePassword,
} = require("../controllers/authController");

// Import middleware
const { authenticate } = require("../middleware/auth");
const {
  validateRegistration,
  validateLogin,
  validatePasswordChange,
  sanitizeInput,
} = require("../middleware/validation");

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", [sanitizeInput, validateRegistration, register]);

// @route   POST /api/auth/login
// @desc    Login user and return JWT token
// @access  Public
router.post("/login", [sanitizeInput, validateLogin, login]);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post("/logout", [authenticate, logout]);

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get("/me", [authenticate, getMe]);

// @route   POST /api/auth/refresh
// @desc    Refresh JWT token
// @access  Private
router.post("/refresh", [authenticate, refreshToken]);

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put("/change-password", [
  authenticate,
  sanitizeInput,
  validatePasswordChange,
  changePassword,
]);

module.exports = router;
