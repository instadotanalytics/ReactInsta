import Placement from "../models/Placement.js";

export const addPlacement = async (req, res) => {
  try {
    const { fullName, package: pkg } = req.body;

    // Cloudinary se URLs lelo
    const profileImageUrl = req.files?.profileImage ? req.files.profileImage[0].path : null;
    const companyLogoUrl = req.files?.companyLogo ? req.files.companyLogo[0].path : null;

    if (!profileImageUrl || !companyLogoUrl) {
      return res.status(400).json({ 
        success: false, 
        message: "Both images are required" 
      });
    }

    const newPlacement = new Placement({
      fullName,
      package: pkg,
      profileImage: profileImageUrl,
      companyLogo: companyLogoUrl
    });

    await newPlacement.save();

    res.status(201).json({ 
      success: true, 
      message: "Placement Added Successfully",
      data: newPlacement 
    });
  } catch (error) {
    console.error("Add placement error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      data: placements 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const deletePlacement = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement not found"
      });
    }

    // Cloudinary se images bhi delete karo (optional)
    // Agar chahte ho to Cloudinary se bhi delete kar sakte ho

    await Placement.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Placement Deleted Successfully"
    });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updatePlacement = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, package: pkg } = req.body;
    
    console.log("Updating placement:", { id, fullName, pkg });
    console.log("Files received:", req.files);

    // Pehle existing placement dhundho
    const existingPlacement = await Placement.findById(id);
    
    if (!existingPlacement) {
      return res.status(404).json({
        success: false,
        message: "Placement not found"
      });
    }

    // Update data prepare karo
    const updateData = {
      fullName,
      package: pkg
    };

    // Agar naye images hain to unhe use karo, nahi to purani images raho
    if (req.files) {
      if (req.files.profileImage) {
        updateData.profileImage = req.files.profileImage[0].path;
        console.log("New profile image:", updateData.profileImage);
      }
      if (req.files.companyLogo) {
        updateData.companyLogo = req.files.companyLogo[0].path;
        console.log("New company logo:", updateData.companyLogo);
      }
    }

    const updatedPlacement = await Placement.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    console.log("Updated placement:", updatedPlacement);

    res.status(200).json({
      success: true,
      message: "Placement Updated Successfully",
      data: updatedPlacement
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};