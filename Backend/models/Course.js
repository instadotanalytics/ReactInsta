import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    category: { type: String, required: true },
    shortDescription: { type: String },
    fullDescription: { type: String },
    whatYouWillLearn: [{ type: String }],
    duration: { type: String },
    totalModules: { type: Number },
    totalLectures: { type: Number },
    level: { type: String },
    language: { type: String },
    originalPrice: { type: Number },
    discountedPrice: { type: Number },
    offerPercentage: { type: Number },
    paymentType: { type: String },
    instructor: {
      name: { type: String },
      experience: { type: String },
      bio: { type: String },
      image: { type: String },
    },
    certificateAvailable: { type: Boolean, default: false },
    liveOrRecorded: { type: String },
    internshipIncluded: { type: Boolean, default: false },
    placementAssistance: { type: Boolean, default: false },
    downloadableResources: { type: Boolean, default: false },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

// ---------- PRE-SAVE HOOK ---------- //
// Auto-generate slug before saving
CourseSchema.pre('save', async function() {
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
  }
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;