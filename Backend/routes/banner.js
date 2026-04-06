import express from "express";
import Banner from "../models/Banner.js";
import { verifyAdmin } from "../middleware/adminAuth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();


// 🔹 Add Banner (Admin Only)
router.post("/", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const { title, link } = req.body;

    const banner = new Banner({
      title,
      link,
      image: req.file.filename,
    });

    await banner.save();

    res.status(201).json({ success: true, message: "Banner added successfully", banner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// 🔹 Get All Banners (Public)
router.get("/", async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// 🔹 Update Banner (Admin Only)
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updated = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, message: "Banner updated", updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// 🔹 Delete Banner (Admin Only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;