import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Helper: fileFilter ───────────────────────────────────────────
const imageFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) cb(null, true);
  else cb(new Error('Only image files are allowed'));
};

// ─── Thumbnail Storage ────────────────────────────────────────────
const thumbnailStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'courses/thumbnails',
    format: async (req, file) => {
      const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) ? ext : 'jpg';
    },
    public_id: () => `thumbnail-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
    transformation: [{ width: 800, height: 450, crop: 'limit' }],
  },
});

export const uploadThumbnail = multer({
  storage: thumbnailStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: imageFilter,
});

// ─── Instructor Image Storage ─────────────────────────────────────
const instructorImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'courses/instructors',
    format: async (req, file) => {
      const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) ? ext : 'jpg';
    },
    public_id: () => `instructor-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
    transformation: [{ width: 400, height: 400, crop: 'limit' }],
  },
});

export const uploadInstructorImage = multer({
  storage: instructorImageStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: imageFilter,
});

// ─── Course Files (Thumbnail + Instructor) — ✅ FIXED ─────────────
const courseFilesStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'courses',
    format: async (req, file) => {
      const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) ? ext : 'jpg';
    },
    public_id: (req, file) =>
      `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  },
});

export const uploadCourseFiles = multer({
  storage: courseFilesStorage, // ✅ ab Cloudinary pe jayega
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: imageFilter,
}).fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'instructorImage', maxCount: 1 },
]);

// ─── Placement Storage ────────────────────────────────────────────
const placementStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'placements',
    format: async (req, file) => {
      const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) ? ext : 'jpg';
    },
    public_id: () => `placement-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  },
});

export const uploadPlacement = multer({
  storage: placementStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: imageFilter,
}).fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'companyLogo', maxCount: 1 },
]);

export default cloudinary;