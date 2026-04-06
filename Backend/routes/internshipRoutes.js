import express from "express";
import Internship from "../models/Internship.js";

const router = express.Router();

// Create Internship
router.post("/", async (req, res) => {
  try {
    const newInternship = new Internship(req.body);
    await newInternship.save();
    res.status(201).json({ message: "Internship form submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Internship
router.get("/", async (req, res) => {
  try {
    const data = await Internship.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;