import React from "react";
import styles from "./PlacementRoute.module.css";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Companypartners from "../../Courses/Companypartners";
import ReviewSection from "../../ReviewSection";
import WhyJoinUS from "../../WhyJoinUS";
import OurImpact from "../../OurImpact";
import FAQSection from "../../FAQSection";
import PlacementList from "../../PlacementList";



const PlacementSection = () => {
  return (
    <>
    <Header/>
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* LEFT CONTENT */}
        <div className={styles.leftContent}>
          <h1 className={styles.title}>
            Upskill Yourself with <span className={styles.highlight}>Industry-Ready Courses</span>
          </h1>
          
          <p className={styles.description}>
            Choose from 25+ professional courses designed by industry experts. 
            Get certified and boost your career with 100% placement assistance.
          </p>

          {/* STATS */}
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>25+</span>
              <span className={styles.statLabel}>Courses</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5000+</span>
              <span className={styles.statLabel}>Students</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>150+</span>
              <span className={styles.statLabel}>Batches</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4.9</span>
              <span className={styles.statLabel}>Rating</span>
            </div>
          </div>

          {/* FEATURES */}
          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>📹</span>
              <span>Live Classes</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>👥</span>
              <span>1:1 Mentorship</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>💼</span>
              <span>Placement Support</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>📜</span>
              <span>Certification</span>
            </div>
          </div>

          {/* POPULAR COURSES */}
          <div className={styles.popularCourses}>
            <h3 className={styles.popularTitle}>Popular Courses:</h3>
            <div className={styles.courseTags}>
              <span className={styles.courseTag}>Full Stack Development</span>
              <span className={styles.courseTag}>Data Science</span>
              <span className={styles.courseTag}>Digital Marketing</span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className={styles.rightContent}>
          <div className={styles.imageWrapper}>
            <img 
              src="https://i.pinimg.com/1200x/56/c0/98/56c098ab543f35f23ba003d9ef87e3ae.jpg" 
              alt="Students learning"
              className={styles.image}
            />
            
            {/* FLOATING BADGES */}
            <div className={`${styles.floatingBadge} ${styles.badge1}`}>
              <span className={styles.badgeIcon}>🎓</span>
              <div>
                <strong>100%</strong>
                <span>Placement</span>
              </div>
            </div>
            
            <div className={`${styles.floatingBadge} ${styles.badge2}`}>
              <span className={styles.badgeIcon}>⏰</span>
              <div>
                <strong>Flexible</strong>
                <span>Timings</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    <Companypartners/>
    <PlacementList/>
     <ReviewSection/>
      <WhyJoinUS/>
      <OurImpact/>
      <FAQSection/>
    <Footer/>
    </>
  );
};

export default PlacementSection;