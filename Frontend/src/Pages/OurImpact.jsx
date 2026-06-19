import React, { useEffect, useRef, useState } from "react";
import styles from "./OurImpact.module.css";




const sections = [
  {
    title: "Trusted By Learners Across India",
    desc: "We provide industry-focused training programs that help learners gain real-world skills and grow their careers. Our comprehensive approach ensures every student achieves their professional goals.",
    image: "/images/download (1).jfif",
  },
  {
    title: "Industry-Aligned Curriculum",
    desc: "Courses designed with top industry experts. Stay ahead with industry-relevant skills, practical learning experiences, and up-to-date content tailored to employer expectations.",
    image: "/images/Importancia de la protección de datos y privacidad.jfif",
  },
  {
    title: "Hands-on Projects",
    desc: "Build a real-world portfolio with live projects. Apply your knowledge to practical challenges, gain industry experience, and develop job-ready skills through hands-on learning.",
    image: "/images/growth now.jfif",
  },
  {
    title: "Global Certification",
    desc: "Internationally recognized certificates that showcase your expertise and boost your career prospects. Gain credentials valued by employers across industries and around the world.",
    image: "/images/download (2).jfif",
  },
  {
    title: "Expert Mentors",
    desc: "Learn from experienced industry professionals who provide valuable guidance, practical insights, and mentorship to help you build confidence and succeed in your career.",
    image: "/images/download (3).jfif",
  },
];

const OurImpact = () => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

const handleScroll = () => {
  const slider = sliderRef.current;

  let index = 0;

  const isDesktop = window.innerWidth > 992;

  if (isDesktop) {
    // vertical scroll (desktop)
    index = Math.round(slider.scrollTop / slider.clientHeight);
  } else {
    // horizontal scroll (mobile)
    index = Math.round(slider.scrollLeft / slider.clientWidth);
  }

  setActiveIndex(index);
};


  return (
    <div className={styles.wrapper}>

      <div className={styles.left}>
        <h2>{sections[activeIndex].title}</h2>
        <p>{sections[activeIndex].desc}</p>
      </div>

      <div className={styles.right}>
        <div
          className={styles.imageSlider}
          ref={sliderRef}
            onScroll={handleScroll}
        >
          {sections.map((item, index) => (
            <div
              key={index}
              className={styles.imageCard}
            >
              <img
                src={item.image}
                alt={item.title}
              />
            </div>
          ))}
        </div>


        <div className={styles.sliderIndicator}>
          {activeIndex + 1} / {sections.length}
        </div>

        <p className={styles.swipeHint}>
          Swipe left to view more →
        </p>
        {activeIndex === sections.length - 1 && (
          <p className={styles.continueText}>
            Scroll down to continue ↓
          </p>
        )}
      </div>

    </div>
  );
};

export default OurImpact;