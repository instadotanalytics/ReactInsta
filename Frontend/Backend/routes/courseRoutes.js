// routes/courseRoutes.js
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
  generateSlugsForAllCourses,
  getCourseMeta
} from "../controller/courseController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";
import Course from "../models/Course.js";

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

// ✅ 1. GENERATE SLUGS FOR ALL COURSES
router.post("/generate-slugs", verifyAdmin, generateSlugsForAllCourses);

// ✅ 2. GET COURSE META DATA
router.get("/meta/:slug", getCourseMeta);

// ✅ 3. CLEAR ALL SLUGS
router.post("/clear-slugs", verifyAdmin, async (req, res) => {
  try {
    await Course.updateMany({}, { $unset: { slug: "" } });
    res.json({ 
      success: true, 
      message: "All slugs cleared successfully" 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
});

// ✅ 4. RESET ALL SLUGS
router.post("/reset-all-slugs", verifyAdmin, async (req, res) => {
  try {
    await Course.updateMany({}, { $unset: { slug: "" } });
    console.log('✅ All slugs cleared');

    const courses = await Course.find({});
    const results = [];

    const generateSlug = (text) => {
      if (!text) return 'course';
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
    };

    for (const course of courses) {
      const sourceText = course.metaTitle || course.title;
      let baseSlug = generateSlug(sourceText);
      if (!baseSlug) baseSlug = 'course';

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

      const updateData = { slug: finalSlug };
      if (!course.metaTitle) {
        updateData.metaTitle = course.title;
      }
      if (!course.metaDescription) {
        updateData.metaDescription = course.shortDescription || '';
      }

      await Course.updateOne(
        { _id: course._id },
        { $set: updateData }
      );

      results.push({ 
        title: course.title, 
        metaTitle: updateData.metaTitle || course.metaTitle,
        slug: finalSlug 
      });
      console.log(`✅ ${course.title} → ${finalSlug}`);
    }

    res.json({
      success: true,
      message: `${results.length} courses ke slugs reset ho gaye`,
      data: results
    });

  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
});

// ✅ 5. GET COURSE BY SLUG
router.get("/slug/:slug", getCourseBySlug);

// ✅ 6. CREATE COURSE
router.post(
  "/", 
  verifyAdmin, 
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'instructorImage', maxCount: 1 }
  ]),
  createCourse
);

// ✅ 7. GET ALL COURSES
router.get("/", getCourses);

// ✅ 8. GET COURSE BY ID
router.get("/:id", getCourseById);

// ✅ 9. UPDATE COURSE
router.put(
  "/:id", 
  verifyAdmin, 
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'instructorImage', maxCount: 1 }
  ]),
  updateCourse
);

// ✅ 10. DELETE COURSE
router.delete("/:id", verifyAdmin, deleteCourse);

export default router;