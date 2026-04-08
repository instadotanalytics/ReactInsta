// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
// import adminRoutes from './routes/admin.js';
// import { errorHandler } from './middleware/errorHandler.js';
// import dotenv from 'dotenv';
// import mongoose from "mongoose";
// import bannerRoutes from "./routes/banner.js";
// import courseRoutes from './routes/courseRoutes.js';
// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import placementRoutes from "./routes/placementRoutes.js";
// import registrationRoutes from "./routes/registrationRoutes.js";
// import internshipRoutes from "./routes/internshipRoutes.js";
// import fullTimeJobRoutes from "./routes/fullTimeJobRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import applicationRoutes from "./routes/applicationRoutes.js";
// import hrCounslerRoutes from "./routes/hrCounslerRoutes.js"


// // 4️⃣ React static build
// app.use(express.static(path.join(__dirname, "client/build")));

// // 5️⃣ React fallback (LAST 🔥)
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });



// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);




// // Create uploads directory
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
//   console.log('✓ Uploads directory created');
// }


// app.get('/api/test', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Backend working perfectly 🚀"
//   })
// })

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✓ MongoDB Connected"))
//   .catch(err => console.log("✗ MongoDB Connection Error:", err));

// // Middleware
// app.use(cors({ 
//   origin: 'https://instadotanalytics-58sj.onrender.com',
//   credentials: true 
// }));

// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" }
// }));

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// // Rate limiting
// const loginLimiter = rateLimit({
//   windowMs: 5 * 60 * 1000,
//   max: 5,
//   message: { success: false, message: "Too many login attempts. Try again later." }
// });
// app.use('/api/admin/login', loginLimiter);

// // Routes
// app.use('/api/admin', adminRoutes);
// app.use("/api/banners", bannerRoutes);
// app.use('/api/courses', courseRoutes);
// app.use("/api/placements", placementRoutes);
// app.use("/api/registrations", registrationRoutes);
// app.use("/api/internships", internshipRoutes);
// app.use("/api/fulltimejob", fullTimeJobRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/applications", applicationRoutes);
// app.use("/api/hr",hrCounslerRoutes)



// // Health check
// app.get('/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     timestamp: new Date(),
//     cloudinary: !!cloudinary.config().cloud_name,
//     uploadsDir: fs.existsSync(uploadsDir)
//   });
// });

// // Error handler (your existing one)
// app.use(errorHandler);

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: 'Route not found' });
// });

// app.listen(PORT, () => {
//   console.log(`\n✓ Server running on https://instadotanalytics-58sj.onrender.com:${PORT}`);
//   console.log(`✓ Cloudinary: ${cloudinary.config().cloud_name ? 'Connected' : 'Not Connected'}\n`);
// });


import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import adminRoutes from './routes/admin.js';
import { errorHandler } from './middleware/errorHandler.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import bannerRoutes from "./routes/banner.js";
import courseRoutes from './routes/courseRoutes.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import placementRoutes from "./routes/placementRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import fullTimeJobRoutes from "./routes/fullTimeJobRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import hrCounslerRoutes from "./routes/hrCounslerRoutes.js";

dotenv.config();

// ✅ __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ INIT
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ uploads folder
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ✅ cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✓ MongoDB Connected"))
  .catch(err => console.log("✗ MongoDB Error:", err));

// ✅ middleware
app.use(cors({ 
  origin: '*',
  credentials: true 
}));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// ✅ rate limit
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5
});
app.use('/api/admin/login', loginLimiter);

// ✅ routes
app.use('/api/admin', adminRoutes);
app.use("/api/banners", bannerRoutes);
app.use('/api/courses', courseRoutes);
app.use("/api/placements", placementRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/fulltimejob", fullTimeJobRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/hr", hrCounslerRoutes);

// ✅ test
app.get('/api/test', (req, res) => {
  res.json({ success: true });
});

// 👇 ye line add karo
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// 👇 ye fallback add karo (VERY IMPORTANT)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});


// ✅ error handler
app.use(errorHandler);

// ✅ start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
