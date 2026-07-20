import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  getPublishedBlogs,
  getBlogsByCategory,
  getFeaturedBlogs,
  incrementBlogViews,
  searchBlogs,
} from "../controller/blogController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";
import { uploadBlogImage } from "../config/cloudinary.js";

const router = express.Router();

// =============================================
// PUBLIC ROUTES (No authentication required)
// =============================================

// Get all published blogs (for frontend)
router.get("/published", getPublishedBlogs);

// Get featured blogs
router.get("/featured", getFeaturedBlogs);

// Search blogs
router.get("/search", searchBlogs);

// Get blogs by category
router.get("/category/:category", getBlogsByCategory);

// Get single blog by slug
router.get("/:slug", getBlogBySlug);

// Increment blog views
router.post("/:id/view", incrementBlogViews);

// =============================================
// ADMIN ROUTES (Authentication required)
// =============================================

// Get all blogs (admin)
router.get("/", verifyAdmin, getAllBlogs);

// Create blog
router.post(
  "/",
  verifyAdmin,
  uploadBlogImage.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 10 },
  ]),
  createBlog
);

// Update blog
router.put(
  "/:id",
  verifyAdmin,
  uploadBlogImage.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 10 },
  ]),
  updateBlog
);

// Delete blog
router.delete("/:id", verifyAdmin, deleteBlog);

export default router;