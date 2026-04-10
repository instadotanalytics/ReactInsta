import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    package: { type: String, required: true },
    location: { type: String, trim: true },
    batch: { type: String, trim: true },
    placementDate: { type: Date },
    profileImage: { type: String, required: true },
    companyLogo: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Placement", placementSchema);