import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true, index: true },
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
    popular: { type: Boolean, default: false },
    studentsEnrolled: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ─── Slug Generator Helper ────────────────────────────────────────
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// ─── Unique Slug Finder ───────────────────────────────────────────
// Agar "qa-engineer" exist karta hai to "qa-engineer-2" try karega
// Date.now() KABHI USE NAHI HOGA
const findUniqueSlug = async (Model, baseSlug, excludeId = null) => {
  let finalSlug = baseSlug;
  let counter = 2;

  while (true) {
    const query = { slug: finalSlug };
    if (excludeId) query._id = { $ne: excludeId };

    const existing = await Model.findOne(query);
    if (!existing) break; // unique mil gaya

    finalSlug = `${baseSlug}-${counter}`; // qa-engineer-2, qa-engineer-3...
    counter++;
  }

  return finalSlug;
};

// ─── PRE-SAVE HOOK ────────────────────────────────────────────────
CourseSchema.pre("save", async function (next) {
  try {
    // Sirf tab chalo jab title ho aur slug nahi ya title change hua
    if (this.title && (!this.slug || this.isModified("title"))) {
      const baseSlug = generateSlug(this.title) || "course";
      this.slug = await findUniqueSlug(this.constructor, baseSlug, this._id);
      console.log(`🔗 Slug set: "${this.title}" → "${this.slug}"`);
    }
    next();
  } catch (err) {
    console.error("❌ Slug generation error:", err);
    next(err);
  }
});

// ─── PRE-FINDONEANDUPDATE HOOK ────────────────────────────────────
// Jab admin course title update kare tab bhi slug update ho
CourseSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    const newTitle = update?.title || update?.$set?.title;

    if (newTitle) {
      const baseSlug = generateSlug(newTitle) || "course";
      const doc = await this.model.findOne(this.getQuery());
      const uniqueSlug = await findUniqueSlug(this.model, baseSlug, doc?._id);

      if (update.$set) {
        update.$set.slug = uniqueSlug;
      } else {
        update.slug = uniqueSlug;
      }

      console.log(`🔗 Slug updated: "${newTitle}" → "${uniqueSlug}"`);
    }
    next();
  } catch (err) {
    console.error("❌ Slug update error:", err);
    next(err);
  }
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
