import React from "react";
import { FiTrendingUp, FiMapPin, FiDollarSign } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import styles from "./FullTimeJob.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import WhyJoinUS from "../../WhyJoinUS";
import ReviewSection from "../../ReviewSection";
import FAQSection from "../../FAQSection";
import FullTimeJobForm from "./FullTimeJobForm";
import Companypartners from "../../Courses/Companypartners";
import OurImpact from "../../OurImpact";

const FullTimeJob = () => {
  return (
    <>
      <Header />
      <section className={styles.banner}>
        <div className={styles.bannerContainer}>
          {/* Left Content */}
          <div className={styles.left}>
            <span className={styles.badge}>🚀 1000+ Jobs Available</span>

            <h1>
              Find Your Dream <br />
              <span>Full-Time Job</span>
            </h1>

            <p>
              Discover high-paying roles tailored to your skills and experience.
              Get personalized job recommendations, real-time updates, and
              direct apply opportunities with leading startups, MNCs, and
              growing enterprises. Build your career with trusted employers
              across IT, Finance, Marketing, Healthcare, Engineering, and more.
              Track applications, connect with recruiters, and find
              opportunities that match your career goals — all in one place.
            </p>

            <div className={styles.features}>
              <div>
                <FiMapPin /> Pan India Locations
              </div>
              <div>
                <FiDollarSign /> Competitive Salary
              </div>
              <div>
                <FaBuilding /> Top MNC Companies
              </div>
            </div>

            <div className={styles.buttons}>
              <button className={styles.primaryBtn}>
                <FiTrendingUp /> Search Jobs
              </button>

              <button className={styles.secondaryBtn}>Post a Job</button>
            </div>
          </div>

          {/* Right Image */}
          <div className={styles.right}>
            <img
              src="https://i.pinimg.com/736x/19/e9/d3/19e9d3e98344da1a644332d55e8fa861.jpg"
              alt="Full Time Job"
            />
          </div>
        </div>
      </section>
      <Companypartners />
      <FullTimeJobForm />
      <WhyJoinUS />
      <ReviewSection />
      <OurImpact />
      <FAQSection />
      <Footer />
    </>
  );
};

export default FullTimeJob;
