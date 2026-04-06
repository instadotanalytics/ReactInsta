import React from "react";
import styles from "./CallToAction.module.css";

const CallToAction = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>

        {/* LEFT SIDE CONTENT */}
        <div className={styles.left}>
          <h2>Take the Next Step in Your IT Career</h2>

          <p>
            Microsoft certifications validate your technical expertise and 
            make you stand out in the competitive IT industry. Whether you 
            are starting your career or upgrading your skills, certification 
            helps you unlock better job roles and higher salary opportunities.
          </p>

          <div className={styles.stats}>
            <div>
              <h3>90%</h3>
              <p>Professionals Report Career Growth</p>
            </div>

            <div>
              <h3>Global</h3>
              <p>Recognition & Industry Value</p>
            </div>

            <div>
              <h3>High</h3>
              <p>Demand in Cloud & AI Roles</p>
            </div>
          </div>

          <div className={styles.noteBox}>
            Start preparing today and move confidently towards becoming a 
            certified IT professional.
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className={styles.right}>
          <img
            src="https://i.pinimg.com/736x/23/23/0e/23230e09da346c1e56fc4d522de9e2f7.jpg"
            alt="Microsoft Career Growth"
          />
        </div>

      </div>
    </section>
  );
};

export default CallToAction;