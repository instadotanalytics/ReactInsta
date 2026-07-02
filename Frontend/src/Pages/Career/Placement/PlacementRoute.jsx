import React from "react";
import styles from "./PlacementRoute.module.css";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
// import Companypartners from "../../Courses/Companypartners";
import ReviewSection from "../../ReviewSection";
import WhyJoinUS from "../../WhyJoinUS";
import OurImpact from "../../OurImpact";
import FAQSection from "../../FAQSection";
// import PlacementList from "../../PlacementList";
import PlacementMetrics from "./PlacementMetrics";
import PlacementProcess from "./PlacementProcess";

const PlacementSection = () => {
  return (
    <>
      <Header />
      <section className={styles.section}>
        {/* soft silky background layers */}
        <div className={styles.bgBase} aria-hidden="true" />
        <div className={styles.bgRibbon1} aria-hidden="true" />
        <div className={styles.bgRibbon2} aria-hidden="true" />
        <div className={styles.bgRibbon3} aria-hidden="true" />
        <div className={styles.bgSheen} aria-hidden="true" />

        <div className={styles.container}>
          {/* CONTENT */}
          <div className={styles.leftContent}>
            

            {/* TITLE */}
            <h1 className={styles.title}>
              Upskill Yourself with{" "}
              <span className={styles.highlight}>Industry-Ready Courses</span>
            </h1>

            {/* DESCRIPTION */}
            <p className={styles.description}>
              Choose from 25+ professional courses designed by industry experts.
              Get certified, build real-world projects, and boost your career
              with placement support.
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
                <span className={styles.statNumber}>4.9★</span>
                <span className={styles.statLabel}>Rating</span>
              </div>
            </div>

            {/* POPULAR COURSES */}
            <div className={styles.popularCourses}>
              <h3>Popular Courses</h3>

              <div className={styles.courseTags}>
                <span className={styles.courseTag}>Full Stack</span>
                <span className={styles.courseTag}>Data Science</span>
                <span className={styles.courseTag}>Digital Marketing</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Companypartners /> */}
      <PlacementMetrics/>
      {/* <PlacementList /> */}
      <PlacementProcess/>
      <ReviewSection />
      <WhyJoinUS />
      <OurImpact />
      <FAQSection />
      <Footer />
    </>
  );
};

export default PlacementSection;
