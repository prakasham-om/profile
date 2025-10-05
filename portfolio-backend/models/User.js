// models/User.js - User model schema
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    title: {
      type: String,
      default: "Full Stack Developer",
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },

    avatar: {
      type: String,
      default: "",
    },

    socialLinks: {
      linkedin: {
        type: String,
        default: "",
        match: [
          /^$|^https?:\/\/(www\.)?linkedin\.com\/.*/,
          "Invalid LinkedIn URL",
        ],
      },
      github: {
        type: String,
        default: "",
        match: [/^$|^https?:\/\/(www\.)?github\.com\/.*/, "Invalid GitHub URL"],
      },
      twitter: {
        type: String,
        default: "",
        match: [
          /^$|^https?:\/\/(www\.)?twitter\.com\/.*/,
          "Invalid Twitter URL",
        ],
      },
      portfolio: {
        type: String,
        default: "",
        match: [/^$|^https?:\/\/.*/, "Invalid portfolio URL"],
      },
    },

    skills: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        level: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
          default: "Intermediate",
        },
      },
    ],

    resume: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Instance method to get public profile
userSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

// Static method to find user by email with password
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email }).select("+password");
};

// Virtual for profile completeness percentage
userSchema.virtual("profileCompleteness").get(function () {
  let completeness = 0;
  const fields = ["name", "email", "title", "bio", "avatar"];
  const totalFields = fields.length + Object.keys(this.socialLinks).length + 1;

  fields.forEach((field) => {
    if (this[field] && this[field].trim() !== "") completeness++;
  });

  Object.values(this.socialLinks).forEach((link) => {
    if (link && link.trim() !== "") completeness++;
  });

  if (this.skills && this.skills.length > 0) completeness++;

  return Math.round((completeness / totalFields) * 100);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
