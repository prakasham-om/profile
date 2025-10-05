// middleware/upload.js - File upload middleware using Multer
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure storage for uploaded files
const storage = multer.diskStorage({
  // Set destination directory
  destination: (req, file, cb) => {
    let uploadPath = "uploads/";

    // Create subdirectories based on file type
    if (file.fieldname === "avatar") {
      uploadPath += "avatars/";
    } else if (file.fieldname === "resume") {
      uploadPath += "resumes/";
    } else if (file.fieldname === "projectImages") {
      uploadPath += "projects/";
    } else {
      uploadPath += "misc/";
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  // Generate unique filename
  filename: (req, file, cb) => {
    // Get file extension
    const ext = path.extname(file.originalname);

    // Create unique filename: timestamp-random-original-name
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

    cb(null, uniqueName);
  },
});

// File filter function to validate file types
const fileFilter = (req, file, cb) => {
  // Define allowed file types for different fields
  const allowedTypes = {
    avatar: ["image/jpeg", "image/png", "image/webp"],
    resume: ["application/pdf"],
    projectImages: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  };

  const fieldAllowedTypes = allowedTypes[file.fieldname] || [];

  if (fieldAllowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    const error = new Error(
      `Invalid file type for ${
        file.fieldname
      }. Allowed types: ${fieldAllowedTypes.join(", ")}`
    );
    error.code = "INVALID_FILE_TYPE";
    cb(error, false); // Reject the file
  }
};

// Configure multer with storage, limits, and file filter
const upload = multer({
  storage: storage,

  // Set file size limits
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
    files: 5, // Maximum 5 files per request
    fields: 10, // Maximum 10 non-file fields
    fieldNameSize: 50, // Maximum field name size
    fieldSize: 1024 * 1024, // Maximum field value size (1MB)
  },

  fileFilter: fileFilter,
});

// Error handling middleware for multer errors
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    let message = "File upload error";

    switch (error.code) {
      case "LIMIT_FILE_SIZE":
        message = "File too large. Maximum size is 10MB.";
        break;
      case "LIMIT_FILE_COUNT":
        message = "Too many files. Maximum 5 files allowed.";
        break;
      case "LIMIT_FIELD_COUNT":
        message = "Too many fields in the request.";
        break;
      case "LIMIT_UNEXPECTED_FILE":
        message = "Unexpected field name in file upload.";
        break;
      default:
        message = error.message;
    }

    return res.status(400).json({
      success: false,
      message,
      code: error.code,
    });
  }

  if (error.code === "INVALID_FILE_TYPE") {
    return res.status(400).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }

  // Pass other errors to the global error handler
  next(error);
};

// Utility function to delete a file
const deleteFile = (filePath) => {
  return new Promise((resolve) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", filePath, err);
        resolve(false);
      } else {
        console.log("File deleted successfully:", filePath);
        resolve(true);
      }
    });
  });
};

// Utility function to get file URL from file path
const getFileUrl = (filePath) => {
  if (!filePath) return "";

  // Convert local path to public URL
  const publicUrl = filePath.replace(/\\/g, "/"); // Convert Windows paths
  return `/${publicUrl}`;
};

// Middleware to validate file upload based on field
const validateFileUpload = (
  fieldName,
  allowedTypes = [],
  maxSize = 10 * 1024 * 1024
) => {
  return (req, res, next) => {
    if (!req.file && !req.files) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const file = req.file || req.files[fieldName];

    if (!file) {
      return res.status(400).json({
        success: false,
        message: `No file found for field: ${fieldName}`,
      });
    }

    // Check file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.mimetype)) {
      // Delete the uploaded file
      fs.unlink(file.path, () => {});

      return res.status(400).json({
        success: false,
        message: `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`,
      });
    }

    // Check file size
    if (file.size > maxSize) {
      // Delete the uploaded file
      fs.unlink(file.path, () => {});

      return res.status(400).json({
        success: false,
        message: `File too large. Maximum size: ${Math.round(
          maxSize / 1024 / 1024
        )}MB`,
      });
    }

    next();
  };
};

module.exports = upload;

// Also export utility functions
module.exports.handleUploadError = handleUploadError;
module.exports.deleteFile = deleteFile;
module.exports.getFileUrl = getFileUrl;
module.exports.validateFileUpload = validateFileUpload;
