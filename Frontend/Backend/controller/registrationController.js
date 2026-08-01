import Registration from "../models/Registration.js";
import Course from "../models/Course.js";

export const createRegistration = async (req, res) => {
  try {
    const { fullName, email, phone, course, source } = req.body;

    if (!fullName || !email || !phone || !course) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const courseExists = await Course.findById(course);
    if (!courseExists) {
      return res.status(404).json({
        success: false,
        message: "Selected course not found",
      });
    }

    const alreadyRegistered = await Registration.findOne({
      email,
      course,
    });

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: "You have already registered for this course",
      });
    }

    const newRegistration = await Registration.create({
      fullName,
      email,
      phone,
      course,
      source,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: newRegistration,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("course", "title name") // course title show hoga
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
    });
  }
};