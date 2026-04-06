import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    package: {
      type: String,
      required: true
    },
    profileImage: {
      type: String,
      required: true
    },
    companyLogo: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Placement", placementSchema);