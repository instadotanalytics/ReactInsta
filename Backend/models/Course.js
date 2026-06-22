// models/Course.js
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    metaTitle: {
      type: String,
      trim: true,
      // If not provided, will use title
    },

    metaDescription: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: String,
    fullDescription: String,

    whatYouWillLearn: {
      type: [String],
      default: [],
    },

    duration: String,
    totalModules: Number,
    totalLectures: Number,

    level: {
      type: String,
      default: "Beginner",
    },

    language: String,

    originalPrice: Number,
    discountedPrice: Number,
    offerPercentage: Number,

    paymentType: String,

    instructor: {
      name: String,
      experience: String,
      bio: String,
      image: String,
    },

    certificateAvailable: {
      type: Boolean,
      default: false,
    },

    liveOrRecorded: {
      type: String,
      default: "Recorded",
    },

    internshipIncluded: {
      type: Boolean,
      default: false,
    },

    placementAssistance: {
      type: Boolean,
      default: false,
    },

    downloadableResources: {
      type: Boolean,
      default: false,
    },

    thumbnail: String,

    popular: {
      type: Boolean,
      default: false,
    },

    studentsEnrolled: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ─── PRE-SAVE MIDDLEWARE: Generate slug from metaTitle or title ───
CourseSchema.pre('save', async function () {
  if (this.isNew || this.isModified('title') || this.isModified('metaTitle')) {
    const sourceText = this.metaTitle || this.title;
    const baseSlug = generateSlug(sourceText);

    let finalSlug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await this.constructor.findOne({
        slug: finalSlug,
        _id: { $ne: this._id }
      });

      if (!existing) break;

<<<<<<< HEAD
    finalSlug = `${baseSlug}-${counter}`; // qa-engineer-2, qa-engineer-3...
    counter++;
  }

  return finalSlug;
};

// ─── PRE-SAVE HOOK ────────────────────────────────────────────────
CourseSchema.pre("save", async function () {
  if (this.title && (!this.slug || this.isModified("title"))) {
    const baseSlug = generateSlug(this.title) || "course";
    this.slug = await findUniqueSlug(this.constructor, baseSlug, this._id);

    console.log(`🔗 Slug set: "${this.title}" → "${this.slug}"`);
=======
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = finalSlug;
>>>>>>> caf238d867a4b0829f14f08208ca71028b6d9f35
  }
});
// ─── HELPER: Generate slug from text ────────────────────────────────
function generateSlug(text) {
  if (!text) return 'course';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')       // Replace spaces with hyphens
    .replace(/-+/g, '-')        // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '');   // Remove leading/trailing hyphens
}

<<<<<<< HEAD
// ─── PRE-FINDONEANDUPDATE HOOK ────────────────────────────────────
// Jab admin course title update kare tab bhi slug update ho
CourseSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();
  const newTitle = update?.title || update?.$set?.title;

  if (newTitle) {
    const baseSlug = generateSlug(newTitle) || "course";
    const doc = await this.model.findOne(this.getQuery());

    const uniqueSlug = await findUniqueSlug(
      this.model,
      baseSlug,
      doc?._id
    );

    if (update.$set) {
      update.$set.slug = uniqueSlug;
    } else {
      update.slug = uniqueSlug;
    }

    console.log(`🔗 Slug updated: "${newTitle}" → "${uniqueSlug}"`);
=======
// ─── STATIC METHOD: Find by slug with fallback to ID ──────────────
CourseSchema.statics.findBySlugOrId = async function(identifier) {
  // Try to find by slug first
  let course = await this.findOne({ slug: identifier });
  
  // If not found and identifier looks like MongoDB ObjectId, try by ID
  if (!course && /^[0-9a-fA-F]{24}$/.test(identifier)) {
    course = await this.findById(identifier);
>>>>>>> caf238d867a4b0829f14f08208ca71028b6d9f35
  }
  
  return course;
};

// ─── VIRTUAL: Get meta title (fallback to title) ──────────────────
CourseSchema.virtual('effectiveMetaTitle').get(function() {
  return this.metaTitle || this.title;
});

// ─── VIRTUAL: Get meta description (fallback to short description) ──
CourseSchema.virtual('effectiveMetaDescription').get(function() {
  return this.metaDescription || this.shortDescription || '';
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;