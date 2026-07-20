import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./BlogList.module.css";
import { blogService } from "../../services/blogService";
import { 
  FaCalendar, 
  FaUser, 
  FaClock, 
  FaTag, 
  FaSearch,
  FaSpinner 
} from "react-icons/fa";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";


const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 9,
    pages: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  const categories = [
    "All",
    "Technology",
    "Data Science",
    "Web Development",
    "Career",
    "Certification",
    "Placement",
    "Internship",
    "Success Stories",
    "Tips & Tricks",
  ];

  useEffect(() => {
    fetchBlogs();
    fetchFeaturedBlogs();
  }, [pagination.page, selectedCategory]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await blogService.getPublishedBlogs(
        pagination.page,
        pagination.limit,
        selectedCategory
      );
      if (response.success) {
        setBlogs(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await blogService.getFeaturedBlogs();
      if (response.success) {
        setFeaturedBlogs(response.data);
      }
    } catch (error) {
      console.error("Error fetching featured blogs:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim().length < 2) return;

    setLoading(true);
    try {
      const response = await blogService.searchBlogs(searchQuery);
      if (response.success) {
        setBlogs(response.data);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === "All" ? "" : category);
    setPagination({ ...pagination, page: 1 });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Header/> {/* ✅ Now Header is defined */}
      
      <div className={styles.blogPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>InstaDot Analytics Blog</h1>
            <p className={styles.heroDesc}>
              Stay updated with the latest in technology, career guidance, and success stories
            </p>
          </div>
        </section>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchBtn}>
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Featured Blogs */}
        {featuredBlogs.length > 0 && (
          <section className={styles.featuredSection}>
            <h2 className={styles.sectionTitle}>Featured Articles</h2>
            <div className={styles.featuredGrid}>
              {featuredBlogs.map((blog) => (
                <Link
                  to={`/blog/${blog.slug}`}
                  key={blog._id}
                  className={styles.featuredCard}
                >
                  <div className={styles.featuredImageWrapper}>
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className={styles.featuredImage}
                    />
                    <div className={styles.featuredBadge}>Featured</div>
                  </div>
                  <div className={styles.featuredContent}>
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt}</p>
                    <div className={styles.featuredMeta}>
                      <span>
                        <FaCalendar /> {formatDate(blog.publishedAt)}
                      </span>
                      <span>
                        <FaUser /> {blog.author || "Admin"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Category Filter */}
        <div className={styles.categoryFilter}>
          <div className={styles.categoryScroll}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${
                  (selectedCategory === "" && category === "All") ||
                  selectedCategory === category
                    ? styles.active
                    : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <section className={styles.blogGridSection}>
          {loading ? (
            <div className={styles.loader}>
              <FaSpinner className={styles.spinner} /> Loading...
            </div>
          ) : blogs.length === 0 ? (
            <div className={styles.noBlogs}>
              <h3>No blogs found</h3>
              <p>Try adjusting your search or filter</p>
            </div>
          ) : (
            <>
              <div className={styles.blogGrid}>
                {blogs.map((blog) => (
                  <article key={blog._id} className={styles.blogCard}>
                    <Link to={`/blog/${blog.slug}`} className={styles.cardLink}>
                      <div className={styles.cardImage}>
                        <img src={blog.featuredImage} alt={blog.title} />
                        <span className={styles.cardCategory}>{blog.category}</span>
                      </div>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{blog.title}</h3>
                        <p className={styles.cardExcerpt}>{blog.excerpt}</p>
                        <div className={styles.cardMeta}>
                          <span className={styles.cardDate}>
                            <FaCalendar /> {formatDate(blog.publishedAt)}
                          </span>
                          <span className={styles.cardViews}>
                            👁️ {blog.views || 0} views
                          </span>
                        </div>
                        <div className={styles.cardFooter}>
                          <span className={styles.cardAuthor}>
                            <FaUser /> {blog.author || "Admin"}
                          </span>
                          <span className={styles.cardReadTime}>
                            <FaClock /> {blog.readingTime || 5} min read
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className={styles.pagination}>
                  <button
                    className={styles.pageBtn}
                    onClick={() =>
                      setPagination({ ...pagination, page: pagination.page - 1 })
                    }
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </button>
                  <span className={styles.pageInfo}>
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <button
                    className={styles.pageBtn}
                    onClick={() =>
                      setPagination({ ...pagination, page: pagination.page + 1 })
                    }
                    disabled={pagination.page === pagination.pages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default BlogList;