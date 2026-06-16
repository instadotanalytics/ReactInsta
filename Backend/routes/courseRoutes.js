import express from "express";
import multer from "multer";
import path from 'path';
import fs from 'fs';
import {
  createCourse,
  getCourses,
  getCourseById,
  getCourseBySlug,
  updateCourse,
  deleteCourse,
  generateSlugsForAllCourses // ✅ New import
} from "../controller/courseController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

// Create multer instance
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
});

// ---------- ROUTES ---------- //

// ✅ NEW: Generate slugs for all existing courses (Admin only)
router.post("/generate-slugs", verifyAdmin, generateSlugsForAllCourses);

// ✅ IMPORTANT: Slug route MUST come BEFORE :id route
router.get("/slug/:slug", getCourseBySlug);

// CREATE COURSE
router.post(
  "/", 
  verifyAdmin, 
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'instructorImage', maxCount: 1 }
  ]),
  createCourse
);

// GET ALL COURSES
router.get("/", getCourses);

// GET COURSE BY ID
router.get("/:id", getCourseById);

// UPDATE COURSE
router.put(
  "/:id", 
  verifyAdmin, 
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'instructorImage', maxCount: 1 }
  ]),
  updateCourse
);

// DELETE COURSE
router.delete("/:id", verifyAdmin, deleteCourse);
// TEMPORARY — ek baar use karo phir hata do
router.post("/clear-slugs", verifyAdmin, async (req, res) => {
  try {
    await Course.updateMany({}, { $unset: { slug: "" } });
    res.json({ success: true, message: "All slugs cleared" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// TEMPORARY — saare slugs reset karne ke liye
router.post("/reset-all-slugs", verifyAdmin, async (req, res) => {
  try {
    // Pehle saare slugs clear karo
    await Course.updateMany({}, { $unset: { slug: "" } });
    console.log('✅ All slugs cleared');

    // Ab saare courses fetch karo
    const courses = await Course.find({});
    const results = [];

    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
    };

    for (const course of courses) {
      let baseSlug = generateSlug(course.title);
      if (!baseSlug) baseSlug = 'course';

      // Unique check — counter se, timestamp nahi
      let finalSlug = baseSlug;
      let counter = 1;
      while (true) {
        const existing = await Course.findOne({
          slug: finalSlug,
          _id: { $ne: course._id }
        });
        if (!existing) break;
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      // Direct update — pre-save hook bypass
      await Course.updateOne(
        { _id: course._id },
        { $set: { slug: finalSlug } }
      );

      results.push({ title: course.title, slug: finalSlug });
      console.log(`✅ ${course.title} → ${finalSlug}`);
    }

    res.json({
      success: true,
      message: `${results.length} courses ke slugs reset ho gaye`,
      data: results
    });

  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ---------- GLOBAL ERROR HANDLER ---------- //
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        success: false, 
        message: 'File too large. Maximum size is 5MB.' 
      });
    }
    return res.status(400).json({ 
      success: false, 
      message: err.message 
    });
  } else if (err) {
    return res.status(400).json({ 
      success: false, 
      message: err.message 
    });
  }
  next();
});

export default router;