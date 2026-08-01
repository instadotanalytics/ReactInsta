import Placement from "../models/Placement.js";

export const addPlacement = async (req, res) => {
  try {
    const { fullName, package: pkg, designation, description, location, batch, placementDate } = req.body;

    const profileImageUrl = req.files?.profileImage?.[0]?.path;
    const companyLogoUrl = req.files?.companyLogo?.[0]?.path;

    if (!profileImageUrl || !companyLogoUrl) {
      return res.status(400).json({ success: false, message: "Both images are required" });
    }

    const newPlacement = new Placement({
      fullName, designation, description,
      package: pkg, location, batch, placementDate,
      profileImage: profileImageUrl,
      companyLogo: companyLogoUrl,
    });

    await newPlacement.save();
    res.status(201).json({ success: true, message: "Placement Added Successfully", data: newPlacement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });
    res.json({ success: true, data: placements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePlacement = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);
    if (!placement) return res.status(404).json({ success: false, message: "Placement not found" });

    await Placement.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Placement Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePlacement = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, package: pkg, designation, description, location, batch, placementDate } = req.body;

    const existingPlacement = await Placement.findById(id);
    if (!existingPlacement) return res.status(404).json({ success: false, message: "Placement not found" });

    const updateData = { fullName, designation, description, package: pkg, location, batch, placementDate };

    if (req.files?.profileImage) updateData.profileImage = req.files.profileImage[0].path;
    if (req.files?.companyLogo) updateData.companyLogo = req.files.companyLogo[0].path;

    const updated = await Placement.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    res.status(200).json({ success: true, message: "Placement Updated Successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};