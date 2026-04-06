import React from "react";
import styles from "./AboutMicrosoft.module.css";

const AboutMicrosoft = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        
        {/* Left Side Image */}
        <div className={styles.imageWrapper}>
          <img 
            src="https://i.pinimg.com/1200x/af/96/00/af9600692f8f0e901b466f5f4f8ac7c3.jpg" 
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

          <ul>
            <li>✔ Globally Recognized Certifications</li>
            <li>✔ Industry Expert Trainers</li>
            <li>✔ Hands-on Practical Learning</li>
            <li>✔ Career Growth Opportunities</li>
          </ul>

          <button className={styles.btn}>
            Explore Certifications
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutMicrosoft;