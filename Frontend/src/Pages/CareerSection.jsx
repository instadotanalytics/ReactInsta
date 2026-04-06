import React, { useRef } from "react";
import styles from "./CareerSection.module.css";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaCloud,
  FaShieldAlt,
  FaRobot,
  FaProjectDiagram,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

const CareerSection = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 320;
    if (direction === "left") {
      sliderRef.current.scrollLeft -= scrollAmount;
    } else {
      sliderRef.current.scrollLeft += scrollAmount;
    }
  };

  const trainings = [
    {
      icon: <FaCode />,
      title: "Full Stack Development",
      desc: "Master frontend & backend technologies including React, Node.js & MongoDB."
    },
    {
      icon: <FaServer />,
      title: "Backend Engineering",
      desc: "Build scalable APIs and secure server-side applications."
    },
    {
      icon: <FaDatabase />,
      title: "Data Analytics",
      desc: "Analyze real-world data using Python, SQL & Power BI."
    },
    {
      icon: <FaCloud />,
      title: "Cloud Computing",
      desc: "Deploy and manage applications on AWS & Azure."
    },
    {
      icon: <FaShieldAlt />,
      title: "Cyber Security",
      desc: "Protect systems and networks from digital threats."
    },
    {
      icon: <FaRobot />,
      title: "AI & Machine Learning",
      desc: "Build intelligent systems using ML algorithms."
    },
    {
      icon: <FaProjectDiagram />,
      title: "DevOps Engineering",
      desc: "Automate CI/CD pipelines and infrastructure deployment."
    }
  ];

  return (
    <section className={styles.careerSection}>
      <div className={styles.container}>

        <div className={styles.badge}>
          IT Professional Training Programs 🚀
        </div>

        <h2 className={styles.title}>
          Upgrade Your Skills with Industry-Focused IT Training
        </h2>

        <p className={styles.subtitle}>
          Hands-on learning, real-world projects, and expert mentorship to accelerate your IT career.
        </p>

        <div className={styles.sliderWrapper}>

          <button className={styles.arrowLeft} onClick={() => scroll("left")}>
            <FaChevronLeft />
          </button>

          <div className={styles.slider} ref={sliderRef}>
            {trainings.map((item, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.icon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <button className={styles.arrowRight} onClick={() => scroll("right")}>
            <FaChevronRight />
          </button>

        </div>
      </div>
    </section>
  );
};

export default CareerSection;