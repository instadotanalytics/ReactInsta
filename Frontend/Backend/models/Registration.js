import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    source: {
      type: String,
      default: "website",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Registration", registrationSchema);