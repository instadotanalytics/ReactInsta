import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
});

// Placement Storage
const placementStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'placements',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    public_id: (req, file) => {
      return `placement-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    }
  }
});

export const uploadPlacement = multer({
  storage: placementStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).fields([
  { name: "profileImage", maxCount: 1 },
  { name: "companyLogo", maxCount: 1 }
]);