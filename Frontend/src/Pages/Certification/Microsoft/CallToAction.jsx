import React from "react";
import styles from "./CallToAction.module.css";

import {
  FaBook,
  FaChalkboardTeacher,
  FaCloud,
  FaClipboardList,
  FaShieldAlt,
  FaCertificate,
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
  FaBuilding,
  FaStar,
} from "react-icons/fa";

const steps = [
  {
    num: "01",
    icon: <FaBook />,
    title: "Choose Course",
    desc: "Select the right course that aligns with your career goals.",
  },
  {
    num: "02",
    icon: <FaChalkboardTeacher />,
    title: "Live Training",
    desc: "Learn from Microsoft certified experts through live interactive sessions.",
  },
  {
    num: "03",
    icon: <FaCloud />,
    title: "Hands-on Labs",
    desc: "Gain practical experience with real-time labs and industry scenarios.",
  },
  {
    num: "04",
    icon: <FaClipboardList />,
    title: "Mock Tests",
    desc: "Evaluate your knowledge with mock tests and performance analysis.",
  },
  {
    num: "05",
    icon: <FaShieldAlt />,
    title: "Microsoft Exam",
    desc: "Appear for the Microsoft certification exam with confidence.",
  },
  {
    num: "06",
    icon: <FaCertificate />,
    title: "Get Certified",
    desc: "Earn your Microsoft certification and validate your expertise.",
  },
  {
    num: "07",
    icon: <FaBriefcase />,
    title: "Placement Support",
    desc: "Get career guidance and placement assistance to land your dream job.",
  },
];


const stats = [
  { icon: <FaUsers />, value: "5000+", label: "Students Trained" },
  { icon: <FaCheckCircle />, value: "98%", label: "Certification Success" },
  { icon: <FaBuilding />, value: "150+", label: "Hiring Partners" },
  { icon: <FaStar />, value: "4.9/5", label: "Student Rating" },
];

const CallToAction = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <FaBook className={styles.eyebrowIcon} />
            <span>Your Path to Success</span>
          </div>
          <h2 className={styles.heading}>Your Learning Journey</h2>
          <p className={styles.subheading}>
            From Beginner to Microsoft Certified Professional
          </p>
          <div className={styles.headingUnderline} />
        </div>

        {/* ── Timeline Icons Row ── */}
        <div className={styles.timelineRow}>
          {steps.map((step, i) => (
            <React.Fragment key={step.num}>
              <div className={styles.iconWrapper}>
                <div className={styles.iconOuter}>
                  <div className={styles.iconInner}>{step.icon}</div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className={styles.connector}>
                  <div className={styles.connectorDot} />
                  <div className={styles.connectorLine} />
                  <div className={styles.connectorDot} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Cards Row ── */}
        <div className={styles.cardsRow}>
          {steps.map((step) => (
            <div key={step.num} className={styles.card}>
              <span className={styles.cardNum}>{step.num}</span>
              <h4 className={styles.cardTitle}>{step.title}</h4>
              <div className={styles.cardDivider} />
              <p className={styles.cardDesc}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Stats Grid ── */}
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statIcon}>{s.icon}</span>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
