import express from "express";
import multer from "multer";
import path from 'path';
import fs from 'fs';
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter
});

// ---------- ROUTES ---------- //

// CREATE COURSE
router.post(
  "/", 
  verifyAdmin, 
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'instructorImage', maxCount: 1 }
  ]),
  (req, res, next) => {
    try {
      createCourse(req, res);
    } catch (err) {
      next(err);
    }
  }
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
  (req, res, next) => {
    try {
      updateCourse(req, res);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE COURSE
router.delete("/:id", verifyAdmin, deleteCourse);

// ---------- GLOBAL ERROR HANDLER ---------- //
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
});

export default router;