import Blog from "../models/Blog.js";
import { v2 as cloudinary } from "cloudinary";

// Create Blog
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

    // Check if blog with same title exists
    const existingBlog = await Blog.findOne({
      slug: title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "-"),
    });

    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: "A blog with this title already exists",
      });
    }

    // Get featured image URL from Cloudinary
    let featuredImage = "";
    if (req.files && req.files.featuredImage) {
      featuredImage = req.files.featuredImage[0].path;
    }

    // Calculate reading time
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    // Parse tags
    const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];

    const blog = new Blog({
      title,
      excerpt,
      content,
      featuredImage,
      author: author || "InstaDot Analytics",
      category: category || "Technology",
      tags: tagsArray,
      readingTime: readingTime || 5,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt.substring(0, 160),
      metaKeywords: metaKeywords
        ? metaKeywords.split(",").map((k) => k.trim())
        : tagsArray,
      isPublished: isPublished === "true" || isPublished === true,
      isFeatured: isFeatured === "true" || isFeatured === true,
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create blog",
    });
  }
};

// Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      category,
      tag,
      search,
    } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
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
    console.error("Get all blogs error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch blogs",
    });
  }
};

// Get Published Blogs (for frontend)
export const getPublishedBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 9,
      sortBy = "publishedAt",
      sortOrder = "desc",
      category,
    } = req.query;

    const query = { isPublished: true };

    if (category) {
      query.category = category;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort(sortOptions)
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
    console.error("Get published blogs error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch blogs",
    });
  }
};

// Get Blog by Slug (for frontend)
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

    // Increment views
    blog.views += 1;
    await blog.save();

    // Get related blogs (same category)
    const relatedBlogs = await Blog.find({
      _id: { $ne: blog._id },
      category: blog.category,
      isPublished: true,
    })
      .limit(3)
      .select("title slug featuredImage excerpt publishedAt")
      .lean();

    res.json({
      success: true,
      data: blog,
      related: relatedBlogs,
    });
  } catch (error) {
    console.error("Get blog by slug error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch blog",
    });
  }
};

// Update Blog
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

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Update featured image if new one uploaded
    let featuredImage = blog.featuredImage;
    if (req.files && req.files.featuredImage) {
      // Delete old image from Cloudinary
      if (blog.featuredImage) {
        const publicId = blog.featuredImage.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`blogs/${publicId}`);
      }
      featuredImage = req.files.featuredImage[0].path;
    }

    // Parse tags
    const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];

    // Update slug if title changed
    let slug = blog.slug;
    if (title && title !== blog.title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "-");

      // Check if new slug already exists
      const existingBlog = await Blog.findOne({ slug, _id: { $ne: id } });
      if (existingBlog) {
        return res.status(400).json({
          success: false,
          message: "A blog with this title already exists",
        });
      }
    }

    // Calculate reading time
    const wordsPerMinute = 200;
    const wordCount = (content || blog.content).split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: title || blog.title,
        slug,
        excerpt: excerpt || blog.excerpt,
        content: content || blog.content,
        featuredImage,
        author: author || blog.author,
        category: category || blog.category,
        tags: tagsArray,
        readingTime,
        metaTitle: metaTitle || blog.metaTitle,
        metaDescription: metaDescription || blog.metaDescription,
        metaKeywords: metaKeywords
          ? metaKeywords.split(",").map((k) => k.trim())
          : blog.metaKeywords,
        isPublished: isPublished !== undefined ? isPublished : blog.isPublished,
        isFeatured: isFeatured !== undefined ? isFeatured : blog.isFeatured,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update blog",
    });
  }
};

// Delete Blog
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

    // Delete featured image from Cloudinary
    if (blog.featuredImage) {
      const publicId = blog.featuredImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`blogs/${publicId}`);
    }

    await blog.deleteOne();

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete blog",
    });
  }
};

// Get Blogs by Category
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
    });
  } catch (error) {
    console.error("Get blogs by category error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch blogs",
    });
  }
};

// Get Featured Blogs
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
    });
  } catch (error) {
    console.error("Get featured blogs error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch featured blogs",
    });
  }
};

// Increment Blog Views
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
    console.error("Increment views error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to increment views",
    });
  }
};

// Search Blogs
export const searchBlogs = async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters",
      });
    }

    const blogs = await Blog.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { excerpt: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } },
        { tags: { $in: [q] } },
        { category: { $regex: q, $options: "i" } },
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
    console.error("Search blogs error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to search blogs",
    });
  }
};