import mongoose from "mongoose";

const fullTimeJobSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true, // 🔥 New Field
      trim: true,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      required: true,
    },

    skills: {
      type: String,
      required: true,
      trim: true,
    },

    expectedSalary: {
      type: String,
      trim: true,
    },

    preferredLocation: {
      type: String,
      trim: true,
    },

    additionalInfo: {
      type: String, // 🔥 New Field (About / Extra Info)
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("FullTimeJob", fullTimeJobSchema);