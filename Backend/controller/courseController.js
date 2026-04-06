import Course from "../models/Course.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper to upload file to Cloudinary and delete local file
const uploadToCloudinary = async (filePath, folder) => {
  const result = await cloudinary.uploader.upload(filePath, { folder });
  fs.unlinkSync(filePath); // Delete local temp file
  return result.secure_url;
};

// ---------- CREATE COURSE ----------
export const createCourse = async (req, res) => {
  try {
    if (!req.files || !req.files.thumbnail || !req.files.instructorImage) {
      return res.status(400).json({ success: false, message: "Both thumbnail and instructor image are required" });
    }

    let courseData;
    try {
      courseData = JSON.parse(req.body.courseData);
    } catch {
      return res.status(400).json({ success: false, message: "Invalid course data format" });
    }

    if (!courseData.instructor) courseData.instructor = {};

    // Upload images to Cloudinary
    courseData.thumbnail = await uploadToCloudinary(req.files.thumbnail[0].path, 'courses/thumbnails');
    courseData.instructor.image = await uploadToCloudinary(req.files.instructorImage[0].path, 'courses/instructors');

    // Calculate offer percentage
    if (courseData.originalPrice && courseData.discountedPrice) {
      const original = parseFloat(courseData.originalPrice);
      const discounted = parseFloat(courseData.discountedPrice);
      if (original > 0 && discounted > 0 && discounted < original) {
        courseData.offerPercentage = Math.round(((original - discounted) / original) * 100);
      }
    }

    const course = new Course(courseData);
    await course.save();

    res.status(201).json({ success: true, data: course, message: "Course created successfully" });

  } catch (err) {
    console.error("✗ Error creating course:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------- GET ALL COURSES ----------
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    console.error("✗ Error fetching courses:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------- GET COURSE BY ID ----------
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    console.error("✗ Error fetching course:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------- UPDATE COURSE ----------
export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    let courseData;
    try {
      courseData = JSON.parse(req.body.courseData);
    } catch {
      return res.status(400).json({ success: false, message: "Invalid course data format" });
    }

    const oldCourse = await Course.findById(courseId);
    if (!oldCourse) return res.status(404).json({ success: false, message: "Course not found" });

    // Handle new thumbnail upload
    if (req.files && req.files.thumbnail) {
      courseData.thumbnail = await uploadToCloudinary(req.files.thumbnail[0].path, 'courses/thumbnails');
      if (oldCourse.thumbnail) {
        const publicId = oldCourse.thumbnail.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`courses/thumbnails/${publicId}`);
      }
    }

    // Handle new instructor image upload
    if (req.files && req.files.instructorImage) {
      if (!courseData.instructor) courseData.instructor = {};
      courseData.instructor.image = await uploadToCloudinary(req.files.instructorImage[0].path, 'courses/instructors');
      if (oldCourse.instructor && oldCourse.instructor.image) {
        const publicId = oldCourse.instructor.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`courses/instructors/${publicId}`);
      }
    }

    // Calculate offer percentage
    if (courseData.originalPrice && courseData.discountedPrice) {
      const original = parseFloat(courseData.originalPrice);
      const discounted = parseFloat(courseData.discountedPrice);
      if (original > 0 && discounted > 0 && discounted < original) {
        courseData.offerPercentage = Math.round(((original - discounted) / original) * 100);
      }
    }

    const course = await Course.findByIdAndUpdate(courseId, courseData, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: course, message: "Course updated successfully" });

  } catch (err) {
    console.error("✗ Error updating course:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------- DELETE COURSE ----------
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    // Delete images from Cloudinary
    if (course.thumbnail) {
      const publicId = course.thumbnail.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`courses/thumbnails/${publicId}`);
    }

    if (course.instructor && course.instructor.image) {
      const publicId = course.instructor.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`courses/instructors/${publicId}`);
    }

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Course deleted successfully" });

  } catch (err) {
    console.error("✗ Error deleting course:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};