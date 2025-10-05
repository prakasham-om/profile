// models/Project.js - Project model schema
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    longDescription: {
      type: String,
      maxlength: [2000, "Long description cannot exceed 2000 characters"],
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        caption: {
          type: String,
          default: "",
        },
        isMain: {
          type: Boolean,
          default: false,
        },
      },
    ],

    technologies: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    category: {
      type: String,
      required: [true, "Project category is required"],
      enum: [
        "Web Development",
        "Mobile App",
        "Desktop Application",
        "Machine Learning",
        "Data Science",
        "API Development",
        "E-commerce",
        "Other",
      ],
    },

    links: {
      live: {
        type: String,
        match: [/^$|^https?:\/\/.*/, "Invalid live URL"],
        default: "",
      },
      github: {
        type: String,
        match: [/^$|^https?:\/\/(www\.)?github\.com\/.*/, "Invalid GitHub URL"],
        default: "",
      },
      demo: {
        type: String,
        match: [/^$|^https?:\/\/.*/, "Invalid demo URL"],
        default: "",
      },
    },

    features: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Feature description cannot exceed 200 characters"],
      },
    ],

    status: {
      type: String,
      enum: ["Planning", "In Progress", "Completed", "On Hold"],
      default: "Completed",
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
    },

    isPublic: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },

    teamSize: {
      type: Number,
      min: 1,
      default: 1,
    },

    role: {
      type: String,
      default: "Full Stack Developer",
      maxlength: [100, "Role cannot exceed 100 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
projectSchema.index({ owner: 1, createdAt: -1 });
projectSchema.index({ category: 1, isPublic: 1 });
projectSchema.index({ isFeatured: -1, createdAt: -1 });
projectSchema.index({ technologies: 1 });
projectSchema.index({
  title: "text",
  description: "text",
  technologies: "text",
});

// Virtual for project duration
projectSchema.virtual("duration").get(function () {
  if (!this.endDate) {
    const now = new Date();
    const diffTime = Math.abs(now - this.startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} days`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? "s" : ""}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? "s" : ""}`;
    }
  }

  const diffTime = Math.abs(this.endDate - this.startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""}`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? "s" : ""}`;
  }
});

// Virtual for main image
projectSchema.virtual("mainImage").get(function () {
  const mainImg = this.images.find((img) => img.isMain);
  return mainImg
    ? mainImg.url
    : this.images.length > 0
    ? this.images[0].url
    : "";
});

// Pre-save middleware
projectSchema.pre("save", function (next) {
  const mainImages = this.images.filter((img) => img.isMain);
  if (mainImages.length > 1) {
    this.images.forEach((img, index) => {
      img.isMain = index === 0;
    });
  } else if (mainImages.length === 0 && this.images.length > 0) {
    this.images[0].isMain = true;
  }

  next();
});

// Static method to get featured projects
projectSchema.statics.getFeaturedProjects = function () {
  return this.find({
    isFeatured: true,
    isPublic: true,
  })
    .sort({ createdAt: -1 })
    .limit(6);
};

// Static method to get projects by category
projectSchema.statics.getByCategory = function (category) {
  return this.find({
    category,
    isPublic: true,
  }).sort({ createdAt: -1 });
};

// Static method to get projects by technology
projectSchema.statics.getByTechnology = function (technology) {
  return this.find({
    technologies: { $in: [technology] },
    isPublic: true,
  }).sort({ createdAt: -1 });
};

// Instance method to increment views
projectSchema.methods.incrementViews = async function () {
  this.views += 1;
  return await this.save();
};

// Instance method to get public project data
projectSchema.methods.getPublicData = function () {
  const projectObject = this.toObject();
  delete projectObject.__v;
  return projectObject;
};

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
