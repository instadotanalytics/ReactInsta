import express from "express";
import Application from "../models/Application.js";

const router = express.Router();


// ✅ POST - Submit Application
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, certification } = req.body;

    if (!fullName || !email || !phone || !certification) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newApplication = new Application({
      fullName,
      email,
      phone,
      certification,
    });

    await newApplication.save();

    res.status(201).json({
      message: "Application submitted successfully",
      data: newApplication,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});


// ✅ GET - Fetch All Applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: applications.length,
      data: applications,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
});

export default router;