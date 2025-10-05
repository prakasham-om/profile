// middleware/validation.js - Input validation middleware
const { body, param, query } = require("express-validator");

// User Registration Validation
const validateRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("email")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6, max: 128 })
    .withMessage("Password must be between 6 and 128 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),

  body("title")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),

  body("bio")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Bio cannot exceed 500 characters"),
];

// User Login Validation
const validateLogin = [
  body("email")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

// Password Change Validation
const validatePasswordChange = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .isLength({ min: 6, max: 128 })
    .withMessage("New password must be between 6 and 128 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "New password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Password confirmation does not match new password");
    }
    return true;
  }),
];

// Project Validation
const validateProject = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Project description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  body("longDescription")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Long description cannot exceed 2000 characters"),

  body("category")
    .notEmpty()
    .withMessage("Project category is required")
    .isIn([
      "Web Development",
      "Mobile App",
      "Desktop Application",
      "Machine Learning",
      "Data Science",
      "API Development",
      "E-commerce",
      "Other",
    ])
    .withMessage("Invalid project category"),

  body("technologies")
    .isArray({ min: 1 })
    .withMessage("At least one technology is required")
    .custom((technologies) => {
      if (
        technologies.some(
          (tech) => typeof tech !== "string" || tech.trim() === ""
        )
      ) {
        throw new Error("All technologies must be non-empty strings");
      }
      return true;
    }),

  body("links.live")
    .optional()
    .trim()
    .isURL()
    .withMessage("Live URL must be a valid URL"),

  body("links.github")
    .optional()
    .trim()
    .isURL()
    .withMessage("GitHub URL must be a valid URL"),

  body("links.demo")
    .optional()
    .trim()
    .isURL()
    .withMessage("Demo URL must be a valid URL"),

  body("status")
    .optional()
    .isIn(["Planning", "In Progress", "Completed", "On Hold"])
    .withMessage("Invalid project status"),

  body("difficulty")
    .optional()
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage("Invalid difficulty level"),
];

// Contact Form Validation
const validateContact = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("email")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),

  body("company")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Company name cannot exceed 100 characters"),

  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required")
    .isLength({ min: 5, max: 200 })
    .withMessage("Subject must be between 5 and 200 characters"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Message must be between 10 and 1000 characters"),

  body("category")
    .optional()
    .isIn([
      "General Inquiry",
      "Job Opportunity",
      "Collaboration",
      "Freelance Project",
      "Technical Question",
      "Feedback",
      "Other",
    ])
    .withMessage("Invalid message category"),
];

// User Profile Update Validation
const validateProfileUpdate = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("title")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),

  body("bio")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Bio cannot exceed 500 characters"),
];

// MongoDB ObjectId Validation
const validateObjectId = [
  param("id").isMongoId().withMessage("Invalid ID format"),
];

// Pagination Validation
const validatePagination = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
    .toInt(),
];

// Sanitization middleware
const sanitizeInput = (req, res, next) => {
  const fieldsToSanitize = [
    "name",
    "title",
    "bio",
    "subject",
    "message",
    "company",
  ];

  const sanitize = (str) => {
    if (typeof str !== "string") return str;

    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<[^>]*>/g, "")
      .trim();
  };

  if (req.body) {
    fieldsToSanitize.forEach((field) => {
      if (req.body[field]) {
        req.body[field] = sanitize(req.body[field]);
      }
    });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validatePasswordChange,
  validateProject,
  validateContact,
  validateProfileUpdate,
  validateObjectId,
  validatePagination,
  sanitizeInput,
};
