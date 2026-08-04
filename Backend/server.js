import dns from "node:dns"; 
dns.setServers(["8.8.8.8", "8.8.4.4",]); 
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import adminRoutes from "./routes/admin.js";
import { errorHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import courseRoutes from "./routes/courseRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import placementRoutes from "./routes/placementRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import fullTimeJobRoutes from "./routes/fullTimeJobRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import hrCounslerRoutes from "./routes/hrCounslerRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);

// ✅ __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ INIT
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ uploads folder
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ✅ cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ MongoDB Connection - New Version
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // New MongoDB driver options
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    });
    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Host: ${conn.connection.host}`);
    console.log(`📁 Collection Count: ${conn.connection.collections ? Object.keys(conn.connection.collections).length : 0}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    console.error("💡 Please check your MONGO_URI in .env file");
    // Don't exit process, let it retry
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// ✅ MongoDB Connection Events - For better debugging
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('🔴 Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose disconnected from MongoDB');
});

// Handle application termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🟡 MongoDB connection closed due to app termination');
  process.exit(0);
});

// ✅ middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ rate limit
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
});
app.use("/api/admin/login", loginLimiter);

// ✅ Health check route for Render
app.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: {
      state: dbStatus[dbState] || 'unknown',
      readyState: dbState
    }
  });
});

// ✅ routes
app.use("/api/admin", adminRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/placements", placementRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/fulltimejob", fullTimeJobRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/hr", hrCounslerRoutes);
app.use("/api/blogs", blogRoutes);

// ✅ test
app.get("/api/test", (req, res) => {
  const dbState = mongoose.connection.readyState;
  res.json({
    success: true,
    message: "API is working",
    database: {
      connected: dbState === 1,
      state: dbState
    }
  });
});

app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

// ✅ error handler
app.use(errorHandler);

// ✅ start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}/api/test`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});