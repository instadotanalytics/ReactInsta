import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

/* =========================
   POST - Save Contact Message
========================= */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* =========================
   GET - Fetch All Messages
========================= */
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;