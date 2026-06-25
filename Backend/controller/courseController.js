// controllers/courseController.js
import Course from "../models/Course.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Helper: Upload to Cloudinary ──────────────────────────────────
const uploadToCloudinary = async (filePath, folder, transformation = {}) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'image',
      ...transformation
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

// ─── Helper: Get Cloudinary Public ID ─────────────────────────────
const getCloudinaryPublicId = (url) => {
  if (!url) return null;
  try {
    const urlParts = url.split("/");
    const filename = urlParts[urlParts.length - 1];
    const publicIdWithExtension = filename.split(".")[0];
    const uploadIndex = urlParts.indexOf("upload");
    if (uploadIndex === -1) return null;
    const folder = urlParts.slice(uploadIndex + 2, -1).join("/");
    return `${folder}/${publicIdWithExtension}`;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};

// ─── Helper: Delete from Cloudinary ──────────────────────────────
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log(`🗑️ Deleted from Cloudinary: ${publicId}`);
  } catch (error) {
    console.error(`Error deleting from Cloudinary (${publicId}):`, error);
  }
};

// ─── CREATE COURSE ────────────────────────────────────────────────
export const createCourse = async (req, res) => {
  try {
    console.log("📝 Creating course...");
    console.log("📁 Files:", req.files ? Object.keys(req.files) : 'No files');

    // Check if files exist
    if (!req.files || !req.files.thumbnail || !req.files.instructorImage) {
      return res.status(400).json({
        success: false,
        message: "Both thumbnail and instructor image are required",
      });
    }

    // Parse course data
    let courseData;
    try {
      courseData = JSON.parse(req.body.courseData);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid course data format",
      });
    }

    // Set instructor data
    if (!courseData.instructor) {
      courseData.instructor = {};
    }

    // Upload images to Cloudinary
    try {
      const thumbnailPath = req.files.thumbnail[0].path;
      const instructorPath = req.files.instructorImage[0].path;

      console.log("📸 Uploading thumbnail...");
      const thumbnailUrl = await uploadToCloudinary(thumbnailPath, 'courses/thumbnails', {
        transformation: [{ width: 800, height: 450, crop: 'limit' }]
      });
      
      console.log("👤 Uploading instructor image...");
      const instructorUrl = await uploadToCloudinary(instructorPath, 'courses/instructors', {
        transformation: [{ width: 400, height: 400, crop: 'limit' }]
      });

      // Clean up temp files
      try {
        fs.unlinkSync(thumbnailPath);
        fs.unlinkSync(instructorPath);
      } catch (e) {}

      courseData.thumbnail = thumbnailUrl;
      courseData.instructor.image = instructorUrl;

      console.log("✅ Images uploaded successfully");
    } catch (uploadError) {
      console.error("❌ Upload error:", uploadError);
      return res.status(500).json({
        success: false,
        message: "Failed to upload images: " + uploadError.message,
      });
    }

    // Set meta fields
    if (!courseData.metaTitle) {
      courseData.metaTitle = courseData.title;
    }
    if (!courseData.metaDescription) {
      courseData.metaDescription = courseData.shortDescription || '';
    }

    // Calculate offer percentage
    if (courseData.originalPrice && courseData.discountedPrice) {
      const original = parseFloat(courseData.originalPrice);
      const discounted = parseFloat(courseData.discountedPrice);
      if (original > 0 && discounted > 0 && discounted < original) {
        courseData.offerPercentage = Math.round(((original - discounted) / original) * 100);
      }
    }

    // Create course
    const course = new Course(courseData);
    await course.save();

    console.log("✅ Course created:", course.title, "→ slug:", course.slug);

    res.status(201).json({
      success: true,
      data: course,
      message: "Course created successfully",
    });
  } catch (err) {
    console.error("✗ FULL ERROR:", err);
    console.error("✗ STACK:", err.stack);

    res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack
    });
  }
};

// ─── GET ALL COURSES ──────────────────────────────────────────────
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (err) {
    console.error("✗ Error fetching courses:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Error fetching courses",
    });
  }
};

// ─── GET COURSE BY ID ─────────────────────────────────────────────
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    console.error("✗ Error fetching course:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Error fetching course",
    });
  }
};

// ─── GET COURSE BY SLUG ───────────────────────────────────────────
export const getCourseBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let course = await Course.findOne({ slug });

    if (!course && /^[0-9a-fA-F]{24}$/.test(slug)) {
      course = await Course.findById(slug);
    }

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    console.error("✗ Error fetching course by slug:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Error fetching course",
    });
  }
};

// ─── UPDATE COURSE ─────────────────────────────────────────────────
export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    console.log("📝 Updating course ID:", courseId);

    let courseData;
    try {
      courseData = JSON.parse(req.body.courseData);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid course data format",
      });
    }

    const oldCourse = await Course.findById(courseId);
    if (!oldCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Handle thumbnail update
    if (req.files && req.files.thumbnail) {
      console.log("📸 Uploading new thumbnail...");
      try {
        const thumbnailPath = req.files.thumbnail[0].path;
        
        if (oldCourse.thumbnail) {
          const publicId = getCloudinaryPublicId(oldCourse.thumbnail);
          if (publicId) await deleteFromCloudinary(publicId);
        }
        
        const thumbnailUrl = await uploadToCloudinary(thumbnailPath, 'courses/thumbnails', {
          transformation: [{ width: 800, height: 450, crop: 'limit' }]
        });
        fs.unlinkSync(thumbnailPath);
        courseData.thumbnail = thumbnailUrl;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload thumbnail: " + uploadError.message,
        });
      }
    }

    // Handle instructor image update
    if (req.files && req.files.instructorImage) {
      console.log("👤 Uploading new instructor image...");
      try {
        const instructorPath = req.files.instructorImage[0].path;
        
        if (!courseData.instructor) {
          courseData.instructor = {};
        }
        
        if (oldCourse.instructor && oldCourse.instructor.image) {
          const publicId = getCloudinaryPublicId(oldCourse.instructor.image);
          if (publicId) await deleteFromCloudinary(publicId);
        }
        
        const instructorUrl = await uploadToCloudinary(instructorPath, 'courses/instructors', {
          transformation: [{ width: 400, height: 400, crop: 'limit' }]
        });
        fs.unlinkSync(instructorPath);
        courseData.instructor.image = instructorUrl;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload instructor image: " + uploadError.message,
        });
      }
    }

    // Set meta fields
    if (!courseData.metaTitle) {
      courseData.metaTitle = courseData.title || oldCourse.title;
    }
    if (!courseData.metaDescription) {
      courseData.metaDescription = courseData.shortDescription || oldCourse.shortDescription || '';
    }

    // Calculate offer percentage
    if (courseData.originalPrice && courseData.discountedPrice) {
      const original = parseFloat(courseData.originalPrice);
      const discounted = parseFloat(courseData.discountedPrice);
      if (original > 0 && discounted > 0 && discounted < original) {
        courseData.offerPercentage = Math.round(((original - discounted) / original) * 100);
      }
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: courseData },
      { new: true, runValidators: true }
    );

    console.log("✅ Course updated successfully:", updatedCourse.title);

    res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Course updated successfully",
    });
  } catch (err) {
    console.error("✗ Error updating course:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Error updating course",
    });
  }
};

// ─── DELETE COURSE ─────────────────────────────────────────────────
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.thumbnail) {
      const publicId = getCloudinaryPublicId(course.thumbnail);
      if (publicId) await deleteFromCloudinary(publicId);
    }

    if (course.instructor && course.instructor.image) {
      const publicId = getCloudinaryPublicId(course.instructor.image);
      if (publicId) await deleteFromCloudinary(publicId);
    }

    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (err) {
    console.error("✗ Error deleting course:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Error deleting course",
    });
  }
};

// ─── GENERATE SLUGS ───────────────────────────────────────────────
export const generateSlugsForAllCourses = async (req, res) => {
  try {
    console.log("🔄 Generating slugs for all courses...");
    const courses = await Course.find({});
    let updatedCount = 0;
    const results = [];

    const generateSlug = (text) => {
      if (!text) return "course";
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
    };

    for (const course of courses) {
      const sourceText = course.metaTitle || course.title;
      const baseSlug = generateSlug(sourceText) || "course";

      let finalSlug = baseSlug;
      let counter = 1;
      while (true) {
        const existing = await Course.findOne({
          slug: finalSlug,
          _id: { $ne: course._id },
        });
        if (!existing) break;
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      const updateData = { slug: finalSlug };
      if (!course.metaTitle) updateData.metaTitle = course.title;
      if (!course.metaDescription) updateData.metaDescription = course.shortDescription || '';

      await Course.updateOne({ _id: course._id }, { $set: updateData });
      updatedCount++;
      results.push({ title: course.title, slug: finalSlug, id: course._id });
      console.log(`✅ ${course.title} → ${finalSlug}`);
    }

    res.status(200).json({
      success: true,
      message: `Slugs generated for ${updatedCount} courses`,
      data: { total: courses.length, updated: updatedCount, details: results },
    });
  } catch (error) {
    console.error("❌ Error generating slugs:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error generating slugs",
    });
  }
};

// ─── GET COURSE META ──────────────────────────────────────────────
export const getCourseMeta = async (req, res) => {
  try {
    const { slug } = req.params;
    const course = await Course.findOne({ slug });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }
    res.json({
      success: true,
      meta: {
        title: course.metaTitle || course.title,
        description: course.metaDescription || course.shortDescription || '',
        slug: course.slug,
        image: course.thumbnail,
        category: course.category,
        level: course.level
      }
    });
  } catch (err) {
    console.error("Error fetching course meta:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};