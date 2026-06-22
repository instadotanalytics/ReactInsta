import Course from "../models/Course.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Helper: Upload to Cloudinary & delete local file ────────────
const uploadToCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

// ─── Helper: Cloudinary public_id extract ────────────────────────
const getCloudinaryPublicId = (url, folder) => {
  if (!url) return null;
  const filename = url.split('/').pop().split('.')[0];
  return `${folder}/${filename}`;
};

// ─── CREATE COURSE ────────────────────────────────────────────────
export const createCourse = async (req, res) => {
  try {
    console.log('📝 Creating course...');

    if (!req.files || !req.files.thumbnail || !req.files.instructorImage) {
      return res.status(400).json({
        success: false,
        message: "Both thumbnail and instructor image are required",
      });
    }

    let courseData;
    try {
      courseData = JSON.parse(req.body.courseData);
    } catch {
      return res.status(400).json({ success: false, message: "Invalid course data format" });
    }

    if (!courseData.instructor) courseData.instructor = {};

    // Upload images
    courseData.thumbnail = await uploadToCloudinary(
      req.files.thumbnail[0].path,
      'courses/thumbnails'
    );
    courseData.instructor.image = await uploadToCloudinary(
      req.files.instructorImage[0].path,
      'courses/instructors'
    );

    // Offer percentage calculate
    if (courseData.originalPrice && courseData.discountedPrice) {
      const original = parseFloat(courseData.originalPrice);
      const discounted = parseFloat(courseData.discountedPrice);
      if (original > 0 && discounted > 0 && discounted < original) {
        courseData.offerPercentage = Math.round(((original - discounted) / original) * 100);
      }
    }

    // Slug pre-save hook se auto-generate hoga
    const course = new Course(courseData);
    await course.save();

    console.log('✅ Course created:', course.title, '→ slug:', course.slug);
    res.status(201).json({ success: true, data: course, message: "Course created successfully" });

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
    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET COURSE BY ID ─────────────────────────────────────────────
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET COURSE BY SLUG ───────────────────────────────────────────
export const getCourseBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Pehle slug se dhundho
    let course = await Course.findOne({ slug });

    // Fallback: agar valid ObjectId hai to ID se try karo (purane links ke liye)
    if (!course && /^[0-9a-fA-F]{24}$/.test(slug)) {
      course = await Course.findById(slug);
    }

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GENERATE SLUGS FOR ALL EXISTING COURSES (One-time utility) ──
export const generateSlugsForAllCourses = async (req, res) => {
  try {
    console.log('🔄 Generating slugs for all courses...');
    const courses = await Course.find({});
    let updatedCount = 0;
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

      // Unique slug dhundho — counter se, Date.now() nahi
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

      // Direct update karo — pre-save hook bypass karke
      await Course.updateOne(
        { _id: course._id },
        { $set: { slug: finalSlug } }
      );

      updatedCount++;
      results.push({ title: course.title, slug: finalSlug, id: course._id });
      console.log(`✅ ${course.title} → ${finalSlug}`);
    }

    res.status(200).json({
      success: true,
      message: `Slugs generated for ${updatedCount} courses`,
      data: { total: courses.length, updated: updatedCount, details: results }
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── UPDATE COURSE ────────────────────────────────────────────────
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

    // Thumbnail update
    if (req.files?.thumbnail) {
      courseData.thumbnail = await uploadToCloudinary(
        req.files.thumbnail[0].path,
        'courses/thumbnails'
      );
      if (oldCourse.thumbnail) {
        const publicId = getCloudinaryPublicId(oldCourse.thumbnail, 'courses/thumbnails');
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }
    }

    // Instructor image update
    if (req.files?.instructorImage) {
      if (!courseData.instructor) courseData.instructor = {};
      courseData.instructor.image = await uploadToCloudinary(
        req.files.instructorImage[0].path,
        'courses/instructors'
      );
      if (oldCourse.instructor?.image) {
        const publicId = getCloudinaryPublicId(oldCourse.instructor.image, 'courses/instructors');
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }
    }

    // Offer percentage
    if (courseData.originalPrice && courseData.discountedPrice) {
      const original = parseFloat(courseData.originalPrice);
      const discounted = parseFloat(courseData.discountedPrice);
      if (original > 0 && discounted > 0 && discounted < original) {
        courseData.offerPercentage = Math.round(((original - discounted) / original) * 100);
      }
    }

    // findOneAndUpdate use karo — pre-findOneAndUpdate hook slug update karega
    const course = await Course.findByIdAndUpdate(courseId, courseData, {
      new: true,
      runValidators: true,
    });

    console.log('✅ Course updated:', course.title, '→ slug:', course.slug);
    res.status(200).json({ success: true, data: course, message: "Course updated successfully" });

  } catch (err) {
    console.error("✗ Error updating course:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── DELETE COURSE ────────────────────────────────────────────────
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    if (course.thumbnail) {
      const publicId = getCloudinaryPublicId(course.thumbnail, 'courses/thumbnails');
      await cloudinary.uploader.destroy(publicId).catch(() => {});
    }
    if (course.instructor?.image) {
      const publicId = getCloudinaryPublicId(course.instructor.image, 'courses/instructors');
      await cloudinary.uploader.destroy(publicId).catch(() => {});
    }

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Course deleted successfully" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};