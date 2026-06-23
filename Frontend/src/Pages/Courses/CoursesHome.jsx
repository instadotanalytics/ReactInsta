// CoursesHome.jsx
import React, { useEffect } from "react";
import styles from "./CoursesHome.module.css";
import {
  FaCheckCircle,
  FaCode,
  FaDatabase,
  FaBullhorn,
  FaArrowRight,
} from "react-icons/fa";

const CoursesHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = ["Live Classes", "1:1 Mentorship", "Placement Support", "Certification"];

  const popularCourses = [
    { name: "Full Stack Development", icon: <FaCode />,     color: "#4361ee" },
    { name: "Data Science",           icon: <FaDatabase />, color: "#f72585" },
    { name: "Digital Marketing",      icon: <FaBullhorn />, color: "#06d6a0" },
  ];

  // Matching the exact vibe of Focusway screenshot images
  const cardImages = [
    {
      src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&q=85",
      alt: "Student studying with headphones",
    },
    {
      src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=85",
      alt: "Writing notes in notebook",
    },
    {
      src: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=825&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Person sitting by mountain lake",
    },
    {
      src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Cyclist on open road",
    },
  ];

  return (
    <div className={styles.coursesHome}>
      <section className={styles.heroSection}>

        {/* Thin vertical lines */}
        <div className={styles.linesBg} aria-hidden="true">
          {Array.from({ length: 22 }).map((_, i) => (
            <div key={i} className={styles.line} />
          ))}
        </div>

        {/* Blue gradient wash */}
        <div className={styles.blueWash} aria-hidden="true" />

        {/* Soft top glow */}
        <div className={styles.topGlow} aria-hidden="true" />

        {/* ── Text content ── */}
        <div className={styles.heroInner}>
          {/* <div className={styles.statsRow}>
            {[["25+","Courses"],["5,000+","Students"],["150+","Batches"],["4.9★","Rating"]].map(
              ([val, label]) => (
                <span key={label} className={styles.statChip}>
                  <b>{val}</b> {label}
                </span>
              )
            )}
          </div> */}

          <h1 className={styles.heroTitle}>
            Upskill Yourself
            <br />
            <span className={styles.gradientText}>with Industry-Ready Courses</span>
          </h1>

          <p className={styles.heroDesc}>
            Learn in-demand skills with expert mentors, industry-recognized
            certifications, and career-focused training programs.
          </p>

          <div className={styles.featureRow}>
            {features.map((f, i) => (
              <span key={i} className={styles.featureBadge}>
                <FaCheckCircle className={styles.checkIcon} />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* ── Up/Down wave image cards ── */}
        <div className={styles.cardsStage}>
          {cardImages.map((img, i) => (
            <div key={i} className={`${styles.floatingCard} ${styles[`card${i}`]}`}>
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>

        {/* ── Course pills ── */}
        <div className={styles.coursePills}>
          {popularCourses.map((c, i) => (
            <div key={i} className={styles.coursePill}>
              <span className={styles.pillIcon} style={{ color: c.color }}>{c.icon}</span>
              <span>{c.name}</span>
              {/* <FaArrowRight className={styles.pillArrow} /> */}
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

export default CoursesHome;