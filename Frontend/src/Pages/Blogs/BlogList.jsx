import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./BlogDetail.module.css";
import { blogService } from "../../services/blogService";
import {
  FaCalendar,
  FaUser,
  FaClock,
  FaTag,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaCopy,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const response = await blogService.getBlogBySlug(slug);
      if (response.success) {
        setBlog(response.data);
        setRelatedBlogs(response.related || []);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const shareUrl = window.location.href;
  const shareTitle = blog?.title || "";

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${shareTitle} - ${shareUrl}`
    )}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}>Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className={styles.notFound}>
        <h2>Blog not found</h2>
        <Link to="/blogs" className={styles.backBtn}>
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <>
    <Header/>
      <Helmet>
        <title>{blog.metaTitle || blog.title}</title>
        <meta name="description" content={blog.metaDescription || blog.excerpt} />
        <meta name="keywords" content={blog.metaKeywords?.join(", ") || ""} />
        <meta property="og:title" content={blog.metaTitle || blog.title} />
        <meta property="og:description" content={blog.metaDescription || blog.excerpt} />
        <meta property="og:image" content={blog.featuredImage} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.metaTitle || blog.title} />
        <meta name="twitter:description" content={blog.metaDescription || blog.excerpt} />
        <meta name="twitter:image" content={blog.featuredImage} />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            image: blog.featuredImage,
            datePublished: blog.publishedAt,
            dateModified: blog.updatedAt,
            author: {
              "@type": "Person",
              name: blog.author || "InstaDot Analytics",
            },
            publisher: {
              "@type": "Organization",
              name: "InstaDot Analytics",
              logo: {
                "@type": "ImageObject",
                url: "https://instadotanalytics.com/logo.png",
              },
            },
            description: blog.excerpt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": window.location.href,
            },
          })}
        </script>
      </Helmet>

      <article className={styles.blogDetail}>
        {/* Hero — image shown in full inside its own framed block */}
        <div className={styles.heroSection}>
          <div className={styles.heroImageWrapper}>
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay}></div>
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroMeta}>
              <span className={styles.heroCategory}>{blog.category}</span>
              <span className={styles.heroDate}>
                <FaCalendar /> {formatDate(blog.publishedAt)}
              </span>
              <span className={styles.heroReadTime}>
                <FaClock /> {blog.readingTime || 5} min read
              </span>
            </div>
            <h1 className={styles.heroTitle}>{blog.title}</h1>
            <div className={styles.heroAuthor}>
              <div className={styles.authorInfo}>
                <span className={styles.authorAvatar}>
                  <FaUser />
                </span>
                <div>
                  <span className={styles.authorName}>
                    {blog.author || "InstaDot Analytics"}
                  </span>
                  <span className={styles.authorViews}>
                    👁️ {blog.views || 0} views
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.contentWrapper}>
          <div className={styles.contentMain}>
            <div
              className={styles.blogContent}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className={styles.tagsSection}>
                <h4>
                  <FaTag /> Tags
                </h4>
                <div className={styles.tagsList}>
                  {blog.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/blogs?tag=${encodeURIComponent(tag)}`}
                      className={styles.tag}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className={styles.shareSection}>
              <span className={styles.shareLabel}>
                <FaShare /> Share this article
              </span>
              <div className={styles.shareButtons}>
                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.facebook}`}
                  aria-label="Share on Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.twitter}`}
                  aria-label="Share on Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.linkedin}`}
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.whatsapp}`}
                  aria-label="Share on WhatsApp"
                >
                  <FaWhatsapp />
                </a>
                <button
                  className={`${styles.shareBtn} ${styles.copyBtn}`}
                  onClick={copyToClipboard}
                  aria-label="Copy link"
                >
                  {shareCopied ? "Copied!" : <FaCopy />}
                </button>
              </div>
            </div>

            {/* Related Blogs */}
            {relatedBlogs.length > 0 && (
              <section className={styles.relatedSection}>
                <h3 className={styles.relatedTitle}>Related Articles</h3>
                <div className={styles.relatedGrid}>
                  {relatedBlogs.map((related) => (
                    <Link
                      to={`/blog/${related.slug}`}
                      key={related._id}
                      className={styles.relatedCard}
                    >
                      <img
                        src={related.featuredImage}
                        alt={related.title}
                        className={styles.relatedImage}
                      />
                      <div className={styles.relatedContent}>
                        <h4>{related.title}</h4>
                        <p>{related.excerpt}</p>
                        <span className={styles.relatedDate}>
                          <FaCalendar /> {formatDate(related.publishedAt)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Back Button */}
            <Link to="/blogs" className={styles.backBtn}>
              ← Back to all blogs
            </Link>
          </div>
        </div>
      </article>
      <Footer/>
    </>
  );
};

export default BlogDetail;