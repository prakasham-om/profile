// middleware/auth.js - JWT authentication middleware
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify JWT token and authenticate user
const authenticate = async (req, res, next) => {
  try {
    let token;

    // Check for token in different places
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
        code: "NO_TOKEN",
      });
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      if (jwtError.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token has expired. Please login again.",
          code: "TOKEN_EXPIRED",
        });
      } else if (jwtError.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid token. Please login again.",
          code: "INVALID_TOKEN",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Token verification failed.",
          code: "TOKEN_VERIFICATION_FAILED",
        });
      }
    }

    // Find user by ID from token payload
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Token may be invalid.",
        code: "USER_NOT_FOUND",
      });
    }

    // Add user information to request object
    req.user = {
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    req.userDoc = user;
    next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during authentication",
      code: "AUTH_SERVER_ERROR",
    });
  }
};

// Optional authentication middleware
const optionalAuthenticate = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (user) {
        req.user = {
          userId: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
        req.userDoc = user;
      }
    } catch (jwtError) {
      console.log("Optional auth - invalid token:", jwtError.message);
    }

    next();
  } catch (error) {
    console.error("Optional authentication error:", error);
    next();
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
        code: "AUTH_REQUIRED",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions.",
        code: "INSUFFICIENT_PERMISSIONS",
      });
    }

    next();
  };
};

// Check ownership middleware
const checkOwnership = (ownerField = "owner") => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
          code: "AUTH_REQUIRED",
        });
      }

      if (req.user.role === "admin") {
        return next();
      }

      if (req.params.id && req.resource) {
        const resourceOwnerId = req.resource[ownerField]?.toString();
        const userId = req.user.userId.toString();

        if (resourceOwnerId !== userId) {
          return res.status(403).json({
            success: false,
            message: "Access denied. You can only access your own resources.",
            code: "OWNERSHIP_REQUIRED",
          });
        }
      }

      next();
    } catch (error) {
      console.error("Ownership check error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during authorization",
        code: "AUTH_SERVER_ERROR",
      });
    }
  };
};

module.exports = {
  authenticate,
  optionalAuthenticate,
  authorize,
  checkOwnership,
};
