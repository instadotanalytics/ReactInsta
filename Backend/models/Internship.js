import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  city: { type: String, required: true },
  college: { type: String, required: true },
  course: { type: String, required: true },
  branch: { type: String, required: true },
  currentYear: { type: String, required: true },
  skills: { type: String, required: true },
  duration: { type: String, required: true },
  mode: { type: String, required: true },
  internshipType: {
    type: String,
    enum: ["paid", "unpaid", "stipend"],
    required: true
  },
  expectedStipend: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("Internship", internshipSchema);