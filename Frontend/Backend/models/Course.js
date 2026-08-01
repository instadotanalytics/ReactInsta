// models/Course.js
import mongoose from "mongoose";

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

// ─── HELPER: Find unique slug ──────────────────────────────────────
async function findUniqueSlug(model, baseSlug, excludeId = null) {
  let finalSlug = baseSlug;
  let counter = 1;

  while (true) {
    const query = { slug: finalSlug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    const existing = await model.findOne(query);
    if (!existing) break;
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return finalSlug;
}

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
    const baseSlug = generateSlug(sourceText) || 'course';
    this.slug = await findUniqueSlug(this.constructor, baseSlug, this._id);
    console.log(`🔗 Slug set: "${this.title}" → "${this.slug}"`);
  }
});

// ─── PRE-FINDONEANDUPDATE HOOK ────────────────────────────────────
// When admin updates course title, slug updates too
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
  }
});

// ─── STATIC METHOD: Find by slug with fallback to ID ──────────────
CourseSchema.statics.findBySlugOrId = async function(identifier) {
  // Try to find by slug first
  let course = await this.findOne({ slug: identifier });
  
  // If not found and identifier looks like MongoDB ObjectId, try by ID
  if (!course && /^[0-9a-fA-F]{24}$/.test(identifier)) {
    course = await this.findById(identifier);
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

// Ensure virtuals are included in JSON output
CourseSchema.set('toJSON', { virtuals: true });
CourseSchema.set('toObject', { virtuals: true });

const Course = mongoose.model("Course", CourseSchema);

export default Course;