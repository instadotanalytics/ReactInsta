import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./BlogList.module.css";
import { blogService } from "../../services/blogService";
import {
  FaCalendar,
  FaUser,
  FaClock,
  FaSearch,
  FaTimes,
  FaArrowRight,
  FaFire,
  FaStar,
  FaRocket,
  FaSpinner,
  FaTags,
  FaEye,
  FaBookOpen,
  FaNewspaper,
  FaArrowLeft,
  FaRegFileAlt,
  FaChartLine,
} from "react-icons/fa";
import { MdAutoAwesome, MdOutlineStars } from "react-icons/md";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// ============================================
// THROTTLE UTILITY
// ============================================
const throttle = (fn, delay) => {
  let lastCall = 0;
  let timeoutId = null;
  
  return function (...args) {
    const now = Date.now();
    
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastCall = now;
        fn.apply(this, args);
      }, delay - (now - lastCall));
    }
  };
};

// ============================================
// MAIN COMPONENT
// ============================================
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
  const [activeSearch, setActiveSearch] = useState("");
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const categories = [
    "All",
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

  // ============================================
  // FETCH BLOGS WITH THROTTLE
  // ============================================
  const fetchBlogs = useCallback(async () => {
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
        setIsFirstLoad(false);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, selectedCategory]);

  // Throttled version of fetchBlogs
  const throttledFetchBlogs = useCallback(
    throttle(fetchBlogs, 300),
    [fetchBlogs]
  );

  // ============================================
  // FETCH FEATURED BLOGS
  // ============================================
  const fetchFeaturedBlogs = useCallback(async () => {
    try {
      const response = await blogService.getFeaturedBlogs();
      if (response.success) {
        setFeaturedBlogs(response.data);
      }
    } catch (error) {
      console.error("Error fetching featured blogs:", error);
    }
  }, []);

  // ============================================
  // EFFECTS
  // ============================================
  useEffect(() => {
    throttledFetchBlogs();
  }, [pagination.page, selectedCategory, throttledFetchBlogs]);

  useEffect(() => {
    fetchFeaturedBlogs();
  }, [fetchFeaturedBlogs]);

  // ============================================
  // SEARCH WITH DEBOUNCE
  // ============================================
  const handleSearch = useCallback(async (e) => {
    e?.preventDefault?.();
    
    if (searchQuery.trim().length < 2) {
      if (activeSearch) {
        clearSearch();
      }
      return;
    }

    setLoading(true);
    try {
      const response = await blogService.searchBlogs(searchQuery);
      if (response.success) {
        setBlogs(response.data);
        setActiveSearch(searchQuery.trim());
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeSearch]);

  // Throttled search handler
  const throttledSearch = useCallback(
    throttle(handleSearch, 500),
    [handleSearch]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      throttledSearch(e);
    }
  };

  // ============================================
  // CLEAR SEARCH
  // ============================================
  const clearSearch = () => {
    setSearchQuery("");
    setActiveSearch("");
    setPagination({ ...pagination, page: 1 });
    fetchBlogs();
  };

  // ============================================
  // CATEGORY CHANGE
  // ============================================
  const handleCategoryChange = (category) => {
    setSelectedCategory(category === "All" ? "" : category);
    setPagination({ ...pagination, page: 1 });
  };

  // ============================================
  // PAGE CHANGE
  // ============================================
  const handlePageChange = (page) => {
    if (page !== pagination.page) {
      setPagination({ ...pagination, page });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ============================================
  // FORMAT DATE
  // ============================================
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <>
      <Header />

      <div className={styles.blogPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroParticles}>
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className={styles.particle}
                style={{
                  '--delay': `${Math.random() * 3}s`,
                  '--size': `${Math.random() * 6 + 2}px`,
                  '--x': `${Math.random() * 100}%`,
                  '--y': `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
          <div className={styles.heroContent}>
            <span className={`${styles.eyebrow} ${styles.dotTrail}`}>
              <FaNewspaper className={styles.eyebrowIcon} /> The Insta Dot Journal
            </span>
            <h1 className={styles.heroTitle}>
              <span className={styles.gradientText}>InstaDot</span> Analytics Blog
            </h1>
            <p className={styles.heroDesc}>
              Stay updated with the latest in technology, career guidance, and success stories
            </p>
            <div className={styles.heroStats}>
              <span><FaFire className={styles.fireIcon} /> Trending Topics</span>
              <span><FaChartLine /> 500+ Articles</span>
              <span><FaStar className={styles.starIcon} /> Expert Insights</span>
            </div>
          </div>
        </section>

        {/* Search Bar - Fixed */}
        <div className={styles.searchContainer}>
          <form onSubmit={throttledSearch} className={`${styles.searchForm} ${isSearchFocused ? styles.focused : ''}`}>
            <div className={styles.searchIconWrapper}>
              <FaSearch className={styles.searchIcon} />
            </div>
            <input
              type="text"
              placeholder="Search articles, topics, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={styles.searchInput}
              aria-label="Search blog articles"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className={styles.clearInputBtn}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
            <button type="submit" className={styles.searchBtn} aria-label="Search">
              <FaSearch className={styles.searchBtnIcon} />
              <span className={styles.searchBtnText}>Search</span>
            </button>
          </form>

          {activeSearch && (
            <div className={styles.searchActive}>
              <span>
                <FaRocket className={styles.sparkleIcon} />
                Showing results for <strong>&ldquo;{activeSearch}&rdquo;</strong>
              </span>
              <button onClick={clearSearch} className={styles.clearSearchBtn}>
                <FaTimes /> Clear
              </button>
            </div>
          )}
        </div>

        {/* Featured Blogs */}
        {!activeSearch && !isFirstLoad && featuredBlogs.length > 0 && (
          <section className={styles.featuredSection}>
            <div className={styles.sectionHeader}>
              <span className={`${styles.eyebrow} ${styles.dotTrail}`}>
                <FaStar className={styles.eyebrowIcon} /> Handpicked
              </span>
              <h2 className={styles.sectionTitle}>
                Featured Articles
                <span className={styles.sectionLine} />
              </h2>
            </div>
            <div className={styles.featuredGrid}>
              {featuredBlogs.map((blog, index) => (
                <Link
                  to={`/blog/${blog.slug}`}
                  key={blog._id}
                  className={`${styles.featuredCard} ${styles.staggerCard}`}
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className={styles.featuredImageWrapper}>
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className={styles.featuredImage}
                      loading="lazy"
                    />
                    <div className={styles.featuredBadge}>
                      <FaStar /> Featured
                    </div>
                    <div className={styles.imageOverlay} />
                  </div>
                  <div className={styles.featuredContent}>
                    <span className={styles.featuredCategory}>
                      <FaTags className={styles.categoryIcon} /> {blog.category}
                    </span>
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt}</p>
                    <div className={styles.featuredMeta}>
                      <span>
                        <FaCalendar /> {formatDate(blog.publishedAt)}
                      </span>
                      <span>
                        <FaUser /> {blog.author || "Admin"}
                      </span>
                      <span className={styles.readMore}>
                        Read <FaArrowRight />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Category Filter */}
        {!activeSearch && (
          <div className={styles.categoryFilter}>
            <div className={styles.categoryScroll}>
              {categories.map((category) => {
                const isActive =
                  (selectedCategory === "" && category === "All") ||
                  selectedCategory === category;
                return (
                  <button
                    key={category}
                    className={`${styles.categoryBtn} ${isActive ? styles.active : ""}`}
                    onClick={() => handleCategoryChange(category)}
                    aria-pressed={isActive}
                  >
                    {category}
                    {isActive && <span className={styles.activeDot} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <section className={styles.blogGridSection}>
          {!activeSearch && (
            <div className={styles.gridHeader}>
              <span className={`${styles.eyebrow} ${styles.dotTrail}`}>
                {selectedCategory || "All Topics"}
              </span>
              <span className={styles.gridCount}>
                <FaBookOpen className={styles.countIcon} /> {pagination.total} {pagination.total === 1 ? 'article' : 'articles'}
              </span>
            </div>
          )}

          {loading ? (
            <div className={styles.blogGrid} aria-busy="true" aria-label="Loading articles">
              {Array.from({ length: pagination.limit }).map((_, i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage} />
                  <div className={styles.skeletonBody}>
                    <div className={`${styles.skeletonLine} ${styles.w80}`} />
                    <div className={`${styles.skeletonLine} ${styles.w60}`} />
                    <div className={`${styles.skeletonLine} ${styles.w40}`} />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className={styles.noBlogs}>
              <div className={styles.noBlogsIcon}>
                <FaRegFileAlt />
              </div>
              <h3>No articles found</h3>
              <p>
                {activeSearch
                  ? `Nothing matched "${activeSearch}". Try a different search term.`
                  : "Try a different category, or check back soon for new posts."}
              </p>
              {activeSearch && (
                <button onClick={clearSearch} className={styles.pageBtn}>
                  <FaTimes /> Clear search
                </button>
              )}
            </div>
          ) : (
            <>
              <div className={styles.blogGrid}>
                {blogs.map((blog, index) => (
                  <article
                    key={blog._id}
                    className={`${styles.blogCard} ${styles.staggerCard}`}
                    style={{ '--delay': `${(index % 9) * 0.06}s` }}
                  >
                    <Link to={`/blog/${blog.slug}`} className={styles.cardLink}>
                      <div className={styles.cardImage}>
                        <img src={blog.featuredImage} alt={blog.title} loading="lazy" />
                        <span className={styles.cardCategory}>
                          <FaTags className={styles.categoryIcon} /> {blog.category}
                        </span>
                        <div className={styles.cardOverlay} />
                      </div>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{blog.title}</h3>
                        <p className={styles.cardExcerpt}>{blog.excerpt}</p>
                        <div className={styles.cardMeta}>
                          <span className={styles.cardDate}>
                            <FaCalendar /> {formatDate(blog.publishedAt)}
                          </span>
                          <span className={styles.cardViews}>
                            <FaEye /> {blog.views || 0} views
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
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    <FaArrowLeft /> Previous
                  </button>
                  <div className={styles.pageNumbers}>
                    {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                      let pageNum = i + 1;
                      if (pagination.pages > 5 && pagination.page > 3) {
                        pageNum = pagination.page - 2 + i;
                        if (pageNum > pagination.pages) return null;
                      }
                      return (
                        <button
                          key={pageNum}
                          className={`${styles.pageNumBtn} ${pagination.page === pageNum ? styles.activePage : ''}`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    }).filter(Boolean)}
                  </div>
                  <button
                    className={styles.pageBtn}
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                  >
                    Next <FaArrowRight />
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default BlogList;