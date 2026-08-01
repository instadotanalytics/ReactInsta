import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

/* =========================
   POST — Save Contact Message
========================= */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (name, email, phone, message).",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: {
        id: newContact._id,
        name: newContact.name,
        createdAt: newContact.createdAt,
      },
    });
  } catch (error) {
    console.error("Contact POST error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
});

/* =========================
   GET — Fetch All Messages
========================= */
router.get("/", async (req, res) => {
  try {
    const { search, filter, sort } = req.query;

    let query = {};

    // Optional server-side search
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { message: { $regex: search, $options: "i" } },
        ],
      };
    }

    // Date filter
    if (filter === "recent") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      query.createdAt = { $gte: sevenDaysAgo };
    } else if (filter === "hasPhone") {
      query.phone = { $exists: true, $ne: "" };
    }

    const sortOrder = sort === "asc" ? 1 : -1;
    const messages = await Contact.find(query).sort({ createdAt: sortOrder });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Contact GET error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
});

/* =========================
   GET — Single Message by ID
========================= */
router.get("/:id", async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error("Contact GET by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
});

/* =========================
   DELETE — Remove Message
========================= */
router.delete("/:id", async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found or already deleted.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
      deletedId: req.params.id,
    });
  } catch (error) {
    console.error("Contact DELETE error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
});

export default router;
