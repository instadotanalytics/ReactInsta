import React, { useRef, useState, useCallback, useEffect } from "react";
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

const CARD_WIDTH = 300;
const CARD_GAP = 20;

const CareerSection = () => {
  const sliderRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateArrowStates = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setIsAtStart(scrollLeft <= 10);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
  }, []);

  const scrollToIndex = useCallback((index) => {
    if (!sliderRef.current) return;
    const scrollPosition = index * (CARD_WIDTH + CARD_GAP);
    sliderRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
    setActiveIdx(index);
  }, []);

  const scroll = useCallback(
    (dir) => {
      if (!sliderRef.current) return;

      const newIdx =
        dir === "left"
          ? Math.max(0, activeIdx - 1)
          : Math.min(trainings.length - 1, activeIdx + 1);

      scrollToIndex(newIdx);
    },
    [activeIdx, scrollToIndex]
  );

  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const newIndex = Math.round(scrollLeft / (CARD_WIDTH + CARD_GAP));
    if (newIndex !== activeIdx) {
      setActiveIdx(Math.max(0, Math.min(newIndex, trainings.length - 1)));
    }
    updateArrowStates();
  }, [activeIdx, updateArrowStates]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll, { passive: true });
      updateArrowStates();
      return () => slider.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll, updateArrowStates]);

  return (
    <section className={styles.careerSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Upgrade Your Skills with{" "}
            <span className={styles.titleAccent}>Industry-Focused</span>{" "}
            Training
          </h2>
          <p className={styles.subtitle}>
            Hands-on learning, real-world projects, and expert mentorship to accelerate your career growth.
          </p>
        </div>

        {/* Slider */}
        <div className={styles.sliderWrapper}>
          {/* Left Arrow */}
          <button
            className={`${styles.arrowBtn} ${styles.leftArrow} ${
              isAtStart ? styles.arrowDisabled : ""
            }`}
            onClick={() => scroll("left")}
            disabled={isAtStart}
            aria-label="Scroll left"
          >
            <FaArrowLeft />
          </button>

          {/* Cards Track */}
          <div className={styles.sliderTrack}>
            <div className={styles.slider} ref={sliderRef}>
              {trainings.map((item, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.cardImageWrap}>
                    <img
                      src={images[item.image]}
                      alt={item.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            className={`${styles.arrowBtn} ${styles.rightArrow} ${
              isAtEnd ? styles.arrowDisabled : ""
            }`}
            onClick={() => scroll("right")}
            disabled={isAtEnd}
            aria-label="Scroll right"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Navigation Dots */}
        <div className={styles.dotsRow}>
          {trainings.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${
                i === activeIdx ? styles.activeDot : ""
              }`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;