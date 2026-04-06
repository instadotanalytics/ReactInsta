// Banner.jsx
import React, { useEffect, useState, useRef } from "react";
import { API_BASE_URL, SERVER_BASE_URL } from "../../config/api";
import styles from "./Banner.module.css";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const fetchBanners = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/banners?limit=5`); // Only fetch 5 banners
      const data = await res.json();
      setBanners(data?.banners?.slice(0, 5) || []); // Ensure only 5 banners
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Auto slide functionality
  useEffect(() => {
    if (banners.length > 0) {
      startAutoSlide();
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [banners.length, currentIndex]);

  const startAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      goToNext();
    }, 3000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
    // Reset timer when manually navigating
    startAutoSlide();
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    startAutoSlide();
  };

  if (loading) {
    return <div className={styles.loading}>Loading banners...</div>;
  }

  if (banners.length === 0) {
    return <div className={styles.noBanners}>No banners available</div>;
  }

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper}>
        {/* Slide Images */}
        <div 
          className={styles.sliderTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner._id} className={styles.slide}>
              <img
                src={`${SERVER_BASE_URL}/uploads/${banner.image}`}
                alt={banner.title || "Banner"}
                className={styles.bannerImage}
              />
              {banner.link && (
                <a
                  href={banner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.bannerLink}
                >
                  Visit →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={goToNext}
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Dots Navigation */}
        <div className={styles.dotsContainer}>
          {banners.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;