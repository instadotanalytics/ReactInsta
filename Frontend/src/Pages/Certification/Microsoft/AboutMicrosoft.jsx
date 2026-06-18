import React from "react";
import styles from "./AboutMicrosoft.module.css";
 import Microsoft from "../../../assets/Microsoftleft.png"

 import { FaGlobe, FaChalkboardTeacher, FaLaptopCode, FaRocket } from "react-icons/fa";

const AboutMicrosoft = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        
        {/* Left Side Image */}
        <div className={styles.imageWrapper}>
          <img 
            src={Microsoft} 
            alt="Microsoft Certification" 
            className={styles.image}
          />
        </div>

        {/* Right Side Content */}
        <div className={styles.content}>
          <h2>Why Choose Microsoft Certification?</h2>
          <p>
            We provide professional training programs aligned with global standards 
            set by Microsoft. Our courses prepare you for industry-recognized 
            certifications in Cloud, Security, AI, and Data technologies.
          </p>

          <ul className={styles.benefits}>
  <li>
    <FaGlobe className={styles.icon} /> 
    Globally Recognized Certifications
  </li>

  <li>
    <FaChalkboardTeacher className={styles.icon} />
    Industry Expert Trainers
  </li>

  <li>
    <FaLaptopCode className={styles.icon} />
    Hands-on Practical Learning
  </li>

  <li>
    <FaRocket className={styles.icon} />
    Career Growth Opportunities
  </li>
</ul>

         
        </div>

      </div>
    </section>
  );
};

export default AboutMicrosoft;