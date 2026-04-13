import React from "react";
import styles from "./WhyJoinUS.module.css";

const WhyJoinUS = () => {
  const benefits = [
    {
      title: "Industry-Aligned Curriculum",
      desc: "Built with Industry Input"
    },
    {
      title: "Global Recognition",
      desc: "Certificates accepted worldwide"
    },
    {
      title: "Hands-on Projects",
      desc: "Build real-world portfolio projects"
    },
    {
      title: "Expert Mentors",
      desc: "Learn from industry professionals"
    }
  ];

  return (
    <section className={styles.whyJoinUs}>
      <div className={styles.container}>

        {/* LEFT CONTENT */}
        <div className={styles.left}>
          <span className={styles.badge}>WHY JOIN US</span>
          <h2 className={styles.title}>
            Transform Your Career With{" "}
            <span>Expert Training</span>
          </h2>
          <p className={styles.description}>
            Join thousands of professionals who have accelerated their careers
            through our industry-focused training programs.
          </p>
        </div>

        {/* CENTER IMAGE */}
        <div className={styles.center}>
          <img src="/modeliamge.png" alt="Training" />
        </div>

        {/* RIGHT BENEFITS */}
        <div className={styles.right}>
          {benefits.map((item, index) => (
            <div key={index} className={styles.benefit}>
              <div className={styles.tick}>✓</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyJoinUS;