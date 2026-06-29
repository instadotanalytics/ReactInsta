import React, { useState, useEffect, useRef } from "react";
import styles from "./MicrosoftHeroSection.module.css";
import {
  FaStar,
  FaUsers,
  FaChalkboardTeacher,
  FaCertificate,
  FaCode,
  FaChartLine,
  FaBullhorn,
} from "react-icons/fa";
import { MdLiveTv, MdSupportAgent, MdVerified, MdSchool } from "react-icons/md";
import { BsLightningFill, BsTrophy } from "react-icons/bs";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import AboutMicrosoft from "./AboutMicrosoft";
import CertificationApplyForm from "../../CertificationApplyForm";
import CallToAction from "./CallToAction";
import Companypartners from "../../Courses/Companypartners";

// ─── Static data (easy to swap for API calls) ─────────────────────────────────

const STATS = [
  { icon: <FaCode />, number: "25+", label: "Professional Courses" },
  { icon: <FaUsers />, number: "5000+", label: "Students Enrolled" },
  { icon: <MdSchool />, number: "150+", label: "Batches Completed" },
  { icon: <BsTrophy />, number: "4.9", label: "Student Rating" },
];

const FEATURES = [
  {
    icon: <MdLiveTv />,
    title: "Live Interactive Classes",
    desc: "Real-time learning with industry experts",
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "1:1 Mentorship",
    desc: "Personalized guidance for career growth",
  },
  {
    icon: <MdSupportAgent />,
    title: "Placement Support",
    desc: "100% assistance with job placement",
  },
  {
    icon: <MdVerified />,
    title: "Industry Certification",
    desc: "Globally recognized certifications",
  },
];

const COURSES = [
  { icon: <FaCode />, label: "Full Stack Development" },
  { icon: <FaChartLine />, label: "Data Science" },
  { icon: <FaBullhorn />, label: "Digital Marketing" },
  { icon: <FaCode />, label: "Cloud Computing" },
  { icon: <FaChartLine />, label: "AI & Machine Learning" },
];

// ─── Animated counter hook ────────────────────────────────────────────────────

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    if (isNaN(numeric)) {
      setCount(target);
      return;
    }
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current =
        numeric % 1 === 0
          ? Math.floor(eased * numeric)
          : parseFloat((eased * numeric).toFixed(1));
      setCount(current + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── Stat Card with animated number ──────────────────────────────────────────

function StatCard({ icon, number, label, animate }) {
  const animated = useCountUp(number, 1800, animate);
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statNumber}>{animate ? animated : number}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const MicrosoftHeroSection = () => {
  const [animateStats, setAnimateStats] = useState(false);
  const statsRef = useRef(null);

  // Trigger counter animation when stats section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimateStats(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />

      <section className={styles.heroSection}>
        <div className={styles.container}>
          {/* ── Heading ── */}
          <div className={styles.headingBlock}>
            <h1 className={styles.mainHeading}>
              Upskill Yourself with{" "}
              <span className={styles.highlight}>Industry-Ready</span> Courses
            </h1>
            <p className={styles.description}>
              Choose from 25+ professional courses designed by industry experts.
              Get certified and boost your career with 100% placement
              assistance.
            </p>
          </div>

          {/* ── Stats ── */}
          <div className={styles.statsGrid} ref={statsRef}>
            {STATS.map((s, i) => (
              <StatCard key={i} {...s} animate={animateStats} />
            ))}
          </div>

          {/* ── Why Choose Us ── */}
          <div className={styles.featuresBlock}>
            <h2 className={styles.sectionTitle}>Why Choose Us</h2>
            <div className={styles.featuresGrid}>
              {FEATURES.map((f, i) => (
                <div className={styles.featureItem} key={i}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Popular Courses ── */}
          <div className={styles.coursesBlock}>
            <h2 className={styles.sectionTitle}>Popular Courses</h2>
            <div className={styles.coursesGrid}>
              {COURSES.map((c, i) => (
                <div className={styles.courseTag} key={i}>
                  <span className={styles.tagIcon}>{c.icon}</span>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AboutMicrosoft />
      <Companypartners />
      <CertificationApplyForm />
      <CallToAction />
      <Footer />
    </>
  );
};

export default MicrosoftHeroSection;
