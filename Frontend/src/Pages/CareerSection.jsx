
import React, { useRef, useState, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./CareerSection.module.css";


const images = {
  fullstack: "/FULL.png",
  backend: "/backendengineering.png",
  data: "/dataanalytic.png",
  cloud: "/cloudcomputing.png",
  cyber: "/cybersecurity.png",
  ai: "/AIML.png",
  devops: "/devops.png",
};

const trainings = [
  {
    image: "fullstack",
    title: "Full Stack Development",
    desc: "Master frontend & backend with React, Node.js & MongoDB.",
  },
  {
    image: "backend",
    title: "Backend Engineering",
    desc: "Build scalable APIs and secure server-side applications.",
  },
  {
    image: "data",
    title: "Data Analytics",
    desc: "Analyze data using Python, SQL, Power BI & Tableau.",
  },
  {
    image: "cloud",
    title: "Cloud Computing",
    desc: "Deploy scalable applications on AWS & Azure.",
  },
  {
    image: "cyber",
    title: "Cyber Security",
    desc: "Protect systems & networks from modern threats.",
  },
  {
    image: "ai",
    title: "AI & Machine Learning",
    desc: "Build intelligent systems using ML algorithms.",
  },
  {
    image: "devops",
    title: "DevOps Engineering",
    desc: "Automate CI/CD pipelines using Docker & Kubernetes.",
  },
];

const CARD_W = 260;

const CareerSection = () => {
  const sliderRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scroll = useCallback(
    (dir) => {
      if (!sliderRef.current) return;

      const newIdx =
        dir === "left"
          ? Math.max(0, activeIdx - 1)
          : Math.min(trainings.length - 1, activeIdx + 1);

      sliderRef.current.scrollLeft = newIdx * CARD_W;
      setActiveIdx(newIdx);
    },
    [activeIdx]
  );

  const scrollToIdx = (i) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollLeft = i * CARD_W;
    setActiveIdx(i);
  };

  return (
    <section className={styles.careerSection}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>
              Upgrade Your Skills with{" "}
              <span className={styles.titleAccent}>Industry-Focused</span>{" "}
              Training
            </h2>

            <p className={styles.subtitle}>
              Hands-on learning, real-world projects, and expert mentorship.
            </p>
          </div>
        </div>

        <div className={styles.sliderWrapper}>
          <button
            className={`${styles.arrowBtn} ${styles.leftArrow}`}
            onClick={() => scroll("left")}
          >
            <FaArrowLeft />
          </button>

          <div className={styles.sliderTrack}>
            <div className={styles.slider} ref={sliderRef}>
              {trainings.map((item, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.cardImageWrap}>
                    <img
                      src={images[item.image]}
                      alt={item.title}
                      className={styles.cardImage}
                    />
                  </div>

                

                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`${styles.arrowBtn} ${styles.rightArrow}`}
            onClick={() => scroll("right")}
          >
            <FaArrowRight />
          </button>
        </div>

        <div className={styles.dotsRow}>
          {trainings.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${
                i === activeIdx ? styles.active : ""
              }`}
              onClick={() => scrollToIdx(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;