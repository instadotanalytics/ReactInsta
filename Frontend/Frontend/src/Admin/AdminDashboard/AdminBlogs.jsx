import React, { useState, useEffect, useCallback } from "react";
import styles from "./AdminBlogs.module.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaTimes,
  FaImage,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";
import { blogService } from "../../services/blogService";

// ============================================
// CONSTANTS
// ============================================
const CATEGORIES = [
  "Technology",
  "Data Science",
  "Data Analytics",
  "Web Development",
  "Career",
  "Certification",
  "Placement",
  "Internship",
  "Success Stories",
  "Tips & Tricks",
];

const INITIAL_FORM_STATE = {
  title: "",
  excerpt: "",
  content: "",
  category: "Technology",
  author: "",
  tags: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  isPublished: true,
  isFeatured: false,
};

// ============================================
// MAIN COMPONENT
// ============================================
const AdminBlogs = () => {
  // State
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  
  // Form state
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState("");

  // ============================================
  // FETCH BLOGS
  // ============================================
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await blogService.getAllBlogs();
      if (data.success) {
        setBlogs(data.data || []);
      } else {
        setError(data.message || "Failed to fetch blogs");
      }
    } catch (err) {
      console.error("Fetch blogs error:", err);
      setError(err.message || "Unable to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // ============================================
  // HANDLERS
  // ============================================
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onload = () => setFeaturedImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        category: blog.category || "Technology",
        author: blog.author || "",
        tags: blog.tags?.join(", ") || "",
        metaTitle: blog.metaTitle || "",
        metaDescription: blog.metaDescription || "",
        metaKeywords: blog.metaKeywords?.join(", ") || "",
        isPublished: blog.isPublished !== false,
        isFeatured: blog.isFeatured || false,
      });
      setFeaturedImagePreview(blog.featuredImage || "");
      setFeaturedImage(null);
    } else {
      setEditingBlog(null);
      setFormData(INITIAL_FORM_STATE);
      setFeaturedImagePreview("");
      setFeaturedImage(null);
    }
    setError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBlog(null);
    setFormData(INITIAL_FORM_STATE);
    setFeaturedImage(null);
    setFeaturedImagePreview("");
    setError(null);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== undefined && formData[key] !== null) {
          formDataToSend.append(key, String(formData[key]));
        }
      });

      if (featuredImage) {
        formDataToSend.append("featuredImage", featuredImage);
      }

      let response;
      if (editingBlog) {
        response = await blogService.updateBlog(editingBlog._id, formDataToSend);
      } else {
        response = await blogService.createBlog(formDataToSend);
      }

      if (response.success) {
        await fetchBlogs();
        handleCloseModal();
        alert(`Blog ${editingBlog ? "updated" : "created"} successfully!`);
      } else {
        setError(response.message || "Failed to save blog");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await blogService.deleteBlog(id);
      if (response.success) {
        await fetchBlogs();
        alert("Blog deleted successfully!");
      } else {
        alert(response.message || "Failed to delete blog");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete blog. Please try again.");
    }
  };

  // ============================================
  // FILTERING
  // ============================================
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory ? blog.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className={styles.adminBlogs}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Blog Management</h1>
          <p>Create and manage your blog posts</p>
        </div>
        <button className={styles.createBtn} onClick={() => handleOpenModal()}>
          <FaPlus /> Create New Blog
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button onClick={fetchBlogs} className={styles.refreshBtn}>
          <FaSpinner className={loading ? styles.spinning : ""} /> Refresh
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className={styles.errorBox}>
          <FaExclamationTriangle className={styles.errorIcon} />
          <span>{error}</span>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {/* Loading / Empty / Table */}
      {loading ? (
        <div className={styles.loader}>
          <FaSpinner className={styles.spinning} /> Loading blogs...
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No blogs found</p>
          <button className={styles.createBtn} onClick={() => handleOpenModal()}>
            Create your first blog
          </button>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Views</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    {blog.featuredImage ? (
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className={styles.tableImage}
                      />
                    ) : (
                      <div className={styles.noImage}>No Image</div>
                    )}
                  </td>
                  <td>
                    <div className={styles.titleCell}>
                      <span>{blog.title}</span>
                      {blog.isFeatured && (
                        <span className={styles.featuredBadge}>Featured</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={styles.categoryBadge}>{blog.category}</span>
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        blog.isPublished ? styles.published : styles.draft
                      }`}
                    >
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{blog.views || 0}</td>
                  <td>{formatDate(blog.publishedAt)}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleOpenModal(blog)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() => handleDelete(blog._id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.actionBtn} ${styles.viewBtn}`}
                        title="View"
                      >
                        <FaEye />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ============================================
          MODAL
      ============================================ */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingBlog ? "Edit Blog" : "Create New Blog"}</h2>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>

            {error && (
              <div className={styles.errorBox}>
                <FaExclamationTriangle className={styles.errorIcon} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                {/* Title */}
                <div className={styles.formGroup}>
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter blog title"
                  />
                </div>

                {/* Category */}
                <div className={styles.formGroup}>
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div className={styles.formGroup}>
                  <label>Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Author name"
                  />
                </div>

                {/* Tags */}
                <div className={styles.formGroup}>
                  <label>Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="e.g. React, JavaScript, Web Development"
                  />
                </div>

                {/* Excerpt */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Excerpt *</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    required
                    rows="2"
                    placeholder="Brief description of the blog"
                  />
                </div>

                {/* Content */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Content *</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="10"
                    placeholder="Write your blog content here..."
                  />
                </div>

                {/* Featured Image */}
                <div className={styles.formGroup}>
                  <label>Featured Image</label>
                  <div className={styles.imageUpload}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={styles.fileInput}
                    />
                    {featuredImagePreview ? (
                      <img
                        src={featuredImagePreview}
                        alt="Preview"
                        className={styles.imagePreview}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <FaImage />
                        <span>Click to upload image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* SEO Meta Title */}
                <div className={styles.formGroup}>
                  <label>SEO Meta Title</label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    placeholder="Meta title for SEO"
                  />
                </div>

                {/* SEO Meta Description */}
                <div className={styles.formGroup}>
                  <label>SEO Meta Description</label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Meta description for SEO"
                  />
                </div>

                {/* SEO Meta Keywords */}
                <div className={styles.formGroup}>
                  <label>SEO Meta Keywords</label>
                  <input
                    type="text"
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleInputChange}
                    placeholder="Comma separated keywords"
                  />
                </div>

                {/* Checkboxes */}
                <div className={styles.formGroup}>
                  <div className={styles.checkboxGroup}>
                    <label>
                      <input
                        type="checkbox"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={handleInputChange}
                      />
                      Publish immediately
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleInputChange}
                      />
                      Feature this blog
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className={styles.spinning} /> Uploading...
                    </>
                  ) : editingBlog ? (
                    "Update Blog"
                  ) : (
                    "Create Blog"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;