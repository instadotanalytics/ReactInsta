import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    featuredImage: {
      type: String,
      required: [true, "Featured image is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      default: "InstaDot Analytics",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Technology",
        "Data Science",
        "Data Analytics",
        "Web Development",
        "Career",
        "Certification",
        "Placement",
        "Internship",
        "Success Stories",
        "Tips & Tricks",
        "Training Programs",
        "Business Intelligence",
        "Machine Learning",
        "Artificial Intelligence",
        "Python",
        "SQL",
        "Power BI",
        "Tableau",
        "Cloud Computing",
        "Big Data",
        "DevOps",
        "Cyber Security",
        "Digital Marketing",
        "UI/UX Design",
        "React JS",
        "Node JS",
        "MongoDB",
        "Java",
        "C++",
        "JavaScript",
        "Full Stack Development",
        "MERN Stack",
        "MEAN Stack",
      ],
      default: "Technology",
    },
    tags: {
      type: [String],
      default: [],
    },
    readingTime: {
      type: Number,
      default: 5,
    },
    views: {
      type: Number,
      default: 0,
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, "Meta description cannot exceed 160 characters"],
    },
    metaKeywords: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Virtual for formatted date
blogSchema.virtual("formattedDate").get(function() {
  return new Date(this.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// ✅ Include virtuals in JSON
blogSchema.set("toJSON", { virtuals: true });
blogSchema.set("toObject", { virtuals: true });

export default mongoose.model("Blog", blogSchema);