import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for course thumbnails
const thumbnailStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'courses/thumbnails',
    format: async (req, file) => {
      const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) ? ext : 'jpg';
    },
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      return `thumbnail-${uniqueSuffix}`;
    },
    transformation: [{ width: 800, height: 450, crop: 'limit' }]
  }
});

// Configure storage for instructor images
const instructorImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'courses/instructors',
    format: async (req, file) => {
      const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) ? ext : 'jpg';
    },
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      return `instructor-${uniqueSuffix}`;
    },
    transformation: [{ width: 400, height: 400, crop: 'limit' }]
  }
});

// Create multer upload instances
export const uploadThumbnail = multer({ 
  storage: thumbnailStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export const uploadInstructorImage = multer({ 
  storage: instructorImageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// For multiple file uploads (both thumbnail and instructor image)
export const uploadCourseFiles = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
}).fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'instructorImage', maxCount: 1 }
]);




// Configure storage for placement images
export const placementStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'placements',
    format: async (req, file) => {
      const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) ? ext : 'jpg';
    },
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      return `placement-${uniqueSuffix}`;
    }
  }
});
export const uploadPlacement = multer({
  storage: placementStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'companyLogo', maxCount: 1 }
]);

export default cloudinary;