import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address.",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required."],
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters."],
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for faster queries
contactSchema.index({ createdAt: -1 });
contactSchema.index({ email: 1 });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
