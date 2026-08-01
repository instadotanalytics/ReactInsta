import Blog from "../models/Blog.js";
import { v2 as cloudinary } from "cloudinary";

// ============================================
// HELPER FUNCTION - Generate Slug
// ============================================
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")  // Remove special characters
    .replace(/\s+/g, "-")           // Replace spaces with hyphens
    .trim();
};

// ============================================
// CREATE BLOG
// ============================================
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      author,
      category,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      isPublished,
      isFeatured,
    } = req.body;

    // ✅ Validate required fields
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!excerpt) {
      return res.status(400).json({
        success: false,
        message: "Excerpt is required",
      });
    }

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }

    // ✅ Generate slug
    const slug = generateSlug(title);

    // ✅ Check if blog with same slug exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: "A blog with this title already exists",
      });
    }

    // ✅ Get featured image from Cloudinary
    let featuredImage = "";
    if (req.files && req.files.featuredImage) {
      featuredImage = req.files.featuredImage[0].path;
    } else {
      return res.status(400).json({
        success: false,
        message: "Featured image is required",
      });
    }

    // ✅ Calculate reading time
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    // ✅ Parse tags
    const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()).filter(tag => tag) : [];

    // ✅ Create blog
    const blog = new Blog({
      title: title.trim(),
      slug,
      excerpt: excerpt.trim(),
      content: content.trim(),
      featuredImage,
      author: author?.trim() || "InstaDot Analytics",
      category: category || "Technology",
      tags: tagsArray,
      readingTime: readingTime || 5,
      metaTitle: metaTitle?.trim() || title.trim(),
      metaDescription: metaDescription?.trim() || excerpt.substring(0, 160),
      metaKeywords: metaKeywords
        ? metaKeywords.split(",").map((k) => k.trim()).filter(k => k)
        : tagsArray,
      isPublished: isPublished === "true" || isPublished === true,
      isFeatured: isFeatured === "true" || isFeatured === true,
    });

    // ✅ Save blog
    await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("❌ Create blog error:", error);
    
    // ✅ Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: errors.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create blog",
    });
  }
};

// ============================================
// GET ALL BLOGS (Admin)
// ============================================
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: blogs,
      count: blogs.length,
    });
  } catch (error) {
    console.error("❌ Get all blogs error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch blogs",
    });
  }
};

// ============================================
// GET PUBLISHED BLOGS (Frontend)
// ============================================
export const getPublishedBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 9, category } = req.query;

    const query = { isPublished: true };
    if (category) {
      query.category = category;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select("-content")
        .lean(),
      Blog.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("❌ Get published blogs error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch blogs",
    });
  }
};

// ============================================
// GET BLOG BY SLUG
// ============================================
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug, isPublished: true });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // ✅ Increment views
    blog.views += 1;
    await blog.save();

    // ✅ Get related blogs
    const relatedBlogs = await Blog.find({
      _id: { $ne: blog._id },
      category: blog.category,
      isPublished: true,
    })
      .limit(3)
      .select("title slug featuredImage excerpt publishedAt views")
      .lean();

    res.json({
      success: true,
      data: blog,
      related: relatedBlogs,
    });
  } catch (error) {
    console.error("❌ Get blog by slug error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch blog",
    });
  }
};

// ============================================
// UPDATE BLOG
// ============================================
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      excerpt,
      content,
      author,
      category,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      isPublished,
      isFeatured,
    } = req.body;

    // ✅ Find existing blog
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // ✅ Update featured image if new one uploaded
    let featuredImage = blog.featuredImage;
    if (req.files && req.files.featuredImage) {
      // Delete old image from Cloudinary
      if (blog.featuredImage) {
        try {
          const publicId = blog.featuredImage.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`blogs/${publicId}`);
        } catch (err) {
          console.error("Error deleting old image:", err);
        }
      }
      featuredImage = req.files.featuredImage[0].path;
    }

    // ✅ Parse tags
    const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()).filter(tag => tag) : [];

    // ✅ Update slug if title changed
    let slug = blog.slug;
    if (title && title.trim() !== blog.title) {
      slug = generateSlug(title);

      // Check if new slug already exists
      const existingBlog = await Blog.findOne({ slug, _id: { $ne: id } });
      if (existingBlog) {
        return res.status(400).json({
          success: false,
          message: "A blog with this title already exists",
        });
      }
    }

    // ✅ Calculate reading time
    const wordsPerMinute = 200;
    const wordCount = (content || blog.content).split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    // ✅ Update blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: title?.trim() || blog.title,
        slug,
        excerpt: excerpt?.trim() || blog.excerpt,
        content: content?.trim() || blog.content,
        featuredImage,
        author: author?.trim() || blog.author,
        category: category || blog.category,
        tags: tagsArray.length > 0 ? tagsArray : blog.tags,
        readingTime: readingTime || 5,
        metaTitle: metaTitle?.trim() || blog.metaTitle,
        metaDescription: metaDescription?.trim() || blog.metaDescription,
        metaKeywords: metaKeywords
          ? metaKeywords.split(",").map((k) => k.trim()).filter(k => k)
          : blog.metaKeywords,
        isPublished: isPublished !== undefined ? isPublished : blog.isPublished,
        isFeatured: isFeatured !== undefined ? isFeatured : blog.isFeatured,
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("❌ Update blog error:", error);
    
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: errors.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to update blog",
    });
  }
};

// ============================================
// DELETE BLOG
// ============================================
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // ✅ Delete featured image from Cloudinary
    if (blog.featuredImage) {
      try {
        const publicId = blog.featuredImage.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`blogs/${publicId}`);
      } catch (err) {
        console.error("Error deleting image from Cloudinary:", err);
      }
    }

    // ✅ Delete blog
    await blog.deleteOne();

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete blog error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete blog",
    });
  }
};

// ============================================
// GET BLOGS BY CATEGORY
// ============================================
export const getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 6 } = req.query;

    const blogs = await Blog.find({
      category,
      isPublished: true,
    })
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
      .select("title slug featuredImage excerpt publishedAt views")
      .lean();

    res.json({
      success: true,
      data: blogs,
      count: blogs.length,
    });
  } catch (error) {
    console.error("❌ Get blogs by category error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch blogs",
    });
  }
};

// ============================================
// GET FEATURED BLOGS
// ============================================
export const getFeaturedBlogs = async (req, res) => {
  try {
    const { limit = 3 } = req.query;

    const blogs = await Blog.find({
      isFeatured: true,
      isPublished: true,
    })
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
      .select("title slug featuredImage excerpt publishedAt views")
      .lean();

    res.json({
      success: true,
      data: blogs,
      count: blogs.length,
    });
  } catch (error) {
    console.error("❌ Get featured blogs error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch featured blogs",
    });
  }
};

// ============================================
// INCREMENT BLOG VIEWS
// ============================================
export const incrementBlogViews = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      views: blog.views,
    });
  } catch (error) {
    console.error("❌ Increment views error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to increment views",
    });
  }
};

// ============================================
// SEARCH BLOGS
// ============================================
export const searchBlogs = async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters",
      });
    }

    const searchRegex = new RegExp(q.trim(), "i");

    const blogs = await Blog.find({
      $or: [
        { title: { $regex: searchRegex } },
        { excerpt: { $regex: searchRegex } },
        { content: { $regex: searchRegex } },
        { author: { $regex: searchRegex } },
        { tags: { $in: [q.trim()] } },
        { category: { $regex: searchRegex } },
      ],
      isPublished: true,
    })
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
      .select("title slug featuredImage excerpt publishedAt views")
      .lean();

    res.json({
      success: true,
      data: blogs,
      count: blogs.length,
    });
  } catch (error) {
    console.error("❌ Search blogs error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to search blogs",
    });
  }
};