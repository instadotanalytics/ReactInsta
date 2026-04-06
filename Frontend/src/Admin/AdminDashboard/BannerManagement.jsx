// BannerManagement.jsx
import React, { useEffect, useState } from "react";
import styles from "./BannerManagement.module.css";
import {
  API_BASE_URL,
  SERVER_BASE_URL,
} from "../../config/api";

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const token = localStorage.getItem("adminToken");

  // Fetch banners
  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/banners`);
      const data = await res.json();
      setBanners(data?.banners || []);
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Add banner
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("image", image);

    try {
      const res = await fetch(`${API_BASE_URL}/banners`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        setTitle("");
        setLink("");
        setImage(null);
        e.target.reset();
        fetchBanners();
        alert("Banner added successfully!");
      } else {
        alert("Failed to add banner");
      }
    } catch (error) {
      console.error("Error adding banner:", error);
      alert("Error adding banner");
    } finally {
      setUploading(false);
    }
  };

  // Delete banner
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) {
      return;
    }

    setDeletingId(id);

    try {
      const res = await fetch(`${API_BASE_URL}/banners/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        // Remove banner from state immediately for better UX
        setBanners(prevBanners => prevBanners.filter(banner => banner._id !== id));
        alert("Banner deleted successfully!");
      } else {
        alert("Failed to delete banner");
        // Refresh banners if delete failed
        fetchBanners();
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      alert("Error deleting banner");
      fetchBanners(); // Refresh on error
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Banner Management</h2>

      {/* Add Banner Form */}
      <div className={styles.formContainer}>
        <h3 className={styles.formTitle}>Add New Banner</h3>

        <form onSubmit={handleSubmit} className={styles.bannerForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter banner title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.formInput}
              required
              disabled={uploading}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="url"
              placeholder="Enter redirect link (optional)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className={styles.formInput}
              disabled={uploading}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className={styles.fileInput}
              required
              disabled={uploading}
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={uploading || !image}
          >
            {uploading ? "Adding..." : "➕ Add Banner"}
          </button>
        </form>
      </div>

      {/* Banner List */}
      <div className={styles.listContainer}>
        <h3 className={styles.listTitle}>All Banners</h3>
        
        {loading ? (
          <div className={styles.loading}>Loading banners...</div>
        ) : (
          <div className={styles.bannersList}>
            {banners.length > 0 ? (
              banners.map((banner) => (
                <div
                  key={banner._id}
                  className={`${styles.bannerItem} ${
                    deletingId === banner._id ? styles.deleting : ""
                  }`}
                >
                  <div className={styles.bannerInfo}>
                    <img
                      src={`${SERVER_BASE_URL}/uploads/${banner.image}`}
                      alt={banner.title}
                      className={styles.bannerThumbnail}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/100x50?text=Error";
                      }}
                    />
                    <div className={styles.bannerDetails}>
                      <h4 className={styles.bannerTitle}>{banner.title}</h4>
                      {banner.link && (
                        <a
                          href={banner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.bannerLink}
                        >
                          {banner.link}
                        </a>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(banner._id)}
                    className={styles.deleteButton}
                    disabled={deletingId === banner._id}
                  >
                    {deletingId === banner._id ? "Deleting..." : "🗑️ Delete"}
                  </button>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                No banners found. Add your first banner above!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerManagement;