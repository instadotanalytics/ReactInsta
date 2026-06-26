import React from "react";
import styles from "./AboutMicrosoft.module.css";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaFlask,
  FaAward,
  FaBriefcase,
  FaGraduationCap,
  FaTrophy,
  FaUsers,
  FaHeadset,
} from "react-icons/fa";

import HeroImage from "../../../assets/leftimage.png";

import { TbChartHistogram } from "react-icons/tb";
import { PiBrainBold } from "react-icons/pi";
import { BsShieldCheck } from "react-icons/bs";
import { FaA } from "react-icons/fa6";

const AboutMicrosoft = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>

        {/* ================= HERO ================= */}
        <div className={styles.heroSection}>

          {/* LEFT */}
          <div className={styles.leftContent}>
            <h1>
              Become a
              <br />
              <span>Microsoft Certified <br />Professional</span>
            </h1>

            <p>
              Master Azure, AI, Security &amp; Power Platform
              with Real Projects and Expert Mentors.
            </p>

            <div className={styles.buttonGroup}>
              <button className={styles.primaryBtn}>
                Explore Courses
                <FaArrowRight />
              </button>

              <button className={styles.secondaryBtn}>
                <FaCalendarAlt />
                Free Demo
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.rightContent}>
            <img
              src={HeroImage}
              alt="Microsoft Azure"
              className={styles.heroImage}
            />
          </div>

        </div>

        {/* ================= TECHNOLOGIES ================= */}
        <div className={styles.techSection}>

          <div className={styles.techCard}>
            {/* Azure "A" logo style */}
            <div className={styles.azureIcon}>
              <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width="58" height="58">
                <defs>
                  <linearGradient id="azureGrad1" x1="0.783" y1="30.128" x2="39.34" y2="-5.341" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#114a8b"/>
                    <stop offset="1" stopColor="#0669bc"/>
                  </linearGradient>
                  <linearGradient id="azureGrad2" x1="41.374" y1="42.138" x2="32.888" y2="39.425" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopOpacity=".3"/>
                    <stop offset=".071" stopOpacity=".2"/>
                    <stop offset=".321" stopOpacity=".1"/>
                    <stop offset=".623" stopOpacity=".05"/>
                    <stop offset="1" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="azureGrad3" x1="30.528" y1="17.5" x2="56.077" y2="78.331" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#3ccbf4"/>
                    <stop offset="1" stopColor="#2892df"/>
                  </linearGradient>
                </defs>
                <path d="M33.338 6.544h26.038L33.643 80.503a4.152 4.152 0 0 1-3.933 2.803H8.896a4.15 4.15 0 0 1-3.925-5.506l24.morph-67.625a4.152 4.152 0 0 1 3.925-2.806z" fill="url(#azureGrad1)"/>
                <path d="M33.338 6.544h26.038L33.643 80.503a4.152 4.152 0 0 1-3.933 2.803H8.896a4.15 4.15 0 0 1-3.925-5.506l24.447-67.625a4.152 4.152 0 0 1 3.92-2.631z" fill="url(#azureGrad1)"/>
                <path d="M55.469 60.462H32.357a1.908 1.908 0 0 0-1.302 3.302l14.995 13.988a4.167 4.167 0 0 0 2.839 1.111h13.24z" fill="url(#azureGrad2)"/>
                <path d="M33.338 6.544a4.12 4.12 0 0 0-3.93 2.853L4.988 75.783a4.145 4.145 0 0 0 3.908 5.523h21.275a4.443 4.443 0 0 0 3.41-2.9l5.938-17.21 21.254 19.478a4.237 4.237 0 0 0 2.671.963h23.367l-10.249-29.248-29.807.007L59.776 6.544z" fill="url(#azureGrad3)"/>
                <path d="M71.175 9.349a4.15 4.15 0 0 0-3.922-2.805H33.648a4.15 4.15 0 0 1 3.921 2.805l24.441 67.627a4.15 4.15 0 0 1-3.921 5.507h33.605a4.15 4.15 0 0 0 3.921-5.507z" fill="url(#azureGrad3)"/>
              </svg>
            </div>
            <h3>Azure</h3>
          </div>

          <div className={styles.techCard}>
            <PiBrainBold className={`${styles.techIcon} ${styles.aiIcon}`} />
            <h3>AI</h3>
          </div>

          <div className={styles.techCard}>
            {/* Power BI bars icon */}
            <div className={styles.powerBiIcon}>
              <svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg" width="58" height="58">
                <rect x="6" y="28" width="12" height="24" rx="2" fill="#F2C811"/>
                <rect x="23" y="16" width="12" height="36" rx="2" fill="#F2C811"/>
                <rect x="40" y="6" width="12" height="46" rx="2" fill="#F2C811"/>
              </svg>
            </div>
            <h3>Power BI</h3>
          </div>

          <div className={styles.techCard}>
            {/* Security shield icon */}
            <div className={styles.securityIcon}>
              <BsShieldCheck className={styles.shieldIcon} />
            </div>
            <h3>Security</h3>
          </div>

        </div>

        {/* ================= FEATURES ================= */}
        <div className={styles.featureSection}>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrap}>
              <FaChalkboardTeacher className={styles.featureIcon} />
            </div>
            <div>
              <h4>Live Training</h4>
              <p>Learn from industry experts</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrap}>
              <FaFlask className={styles.featureIcon} />
            </div>
            <div>
              <h4>Hands-on Labs</h4>
              <p>Practice with real-time scenarios</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrap}>
              <FaAward className={styles.featureIcon} />
            </div>
            <div>
              <h4>Certification</h4>
              <p>Get certified &amp; boost your career</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrap}>
              <FaBriefcase className={styles.featureIcon} />
            </div>
            <div>
              <h4>Placement</h4>
              <p>Get career support &amp; job assistance</p>
            </div>
          </div>

        </div>

        {/* ================= STATS ================= */}
        <div className={styles.statsSection}>

          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <FaGraduationCap className={styles.statIcon} />
            </div>
            <div>
              <h2>1000+</h2>
              <p>Students Trained</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <FaTrophy className={`${styles.statIcon} ${styles.trophyIcon}`} />
            </div>
            <div>
              <h2>98%</h2>
              <p>Certification Success</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <FaUsers className={styles.statIcon} />
            </div>
            <div>
              <h2>50+</h2>
              <p>Hiring Partners</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <FaHeadset className={styles.statIcon} />
            </div>
            <div>
              <h2>24×7</h2>
              <p>Learning Support</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutMicrosoft;