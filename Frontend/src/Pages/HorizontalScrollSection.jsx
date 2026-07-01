import React, { useRef, useEffect, useState } from "react";
import styles from "./HorizontalScrollSection.module.css";

const cardData = [
  {
    image: "https://i.pinimg.com/1200x/af/ed/63/afed63bef7e17aa7ec6c5fe02002c280.jpg",
    title: "Team Building Workshop",
    subtitle: "Strengthening Bonds",
    description:
      "Our annual team building retreat brought together 200+ employees for three days of collaboration, innovation challenges, and unforgettable memories in the mountains.",
    tag: "Team Moment",
  },
  {
    image: "https://i.pinimg.com/736x/4f/f4/21/4ff421f80ce73b7b2474cb424ceecd74.jpg",
    title: "Project Phoenix Launch",
    subtitle: "Our Biggest Achievement",
    description:
      "The entire team celebrating the successful launch of Project Phoenix - our flagship AI platform that took 18 months of hard work, late nights, and incredible teamwork.",
    tag: "Success Story",
  },
  {
    image: "https://i.pinimg.com/1200x/54/ba/ca/54baca30dbb6f384229f99432ad5c1bb.jpg",
    title: "Annual Tech Conference",
    subtitle: "Learning & Growing",
    description:
      "50 team members presented at our annual tech conference, showcasing innovative projects and sharing knowledge with industry leaders from around the globe.",
    tag: "Innovation",
  },
  {
    image: "https://i.pinimg.com/736x/1b/3a/17/1b3a17808e3f370dc6be6780af4fcb95.jpg",
    title: "Community Hackathon",
    subtitle: "Giving Back Together",
    description:
      "Our developers and designers came together for a 48-hour hackathon, building solutions for local non-profits. The energy, creativity, and team spirit were truly inspiring.",
    tag: "Social Impact",
  },
  {
    image: "https://i.pinimg.com/1200x/92/b1/33/92b1332b9bff0ab1f659b4c9f9bc8e05.jpg",
    title: "Year-End Celebration",
    subtitle: "Celebrating Our People",
    description:
      "Looking back at an incredible year of growth, innovation, and teamwork. Every smile in this photo represents countless hours of dedication and passion for what we do.",
    tag: "Memories",
  },
];

const HorizontalScrollSection = () => {
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const max = scrollWidth - clientWidth;
      setMaxScroll(max);
      const progress = max > 0 ? scrollLeft / max : 0;
      setScrollProgress(progress);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const activeIndex = Math.round(scrollProgress * (cardData.length - 1));

  return (
    <section className={styles.section}>
      {/* Background decorations */}
      <div className={styles.bgGrid} />
      <div className={styles.bgGlowLeft} />
      <div className={styles.bgGlowRight} />

      {/* Header */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>Our Memories</span>
        <h2 className={styles.heading}>
          Team & Project <span className={styles.accent}>Highlights</span>
        </h2>
        <p className={styles.sub}>Scroll right to explore our cherished moments</p>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={scrollContainerRef} className={styles.scrollContainer}>
        <div className={styles.track}>
          {cardData.map((card, i) => (
            <article className={styles.card} key={i}>
              {/* Image - Left side */}
              <div className={styles.imgWrap}>
                <img
                  src={card.image}
                  alt={card.title}
                  className={styles.img}
                  loading="lazy"
                />
                <div className={styles.imgGrad} />
              </div>

              {/* Text content - Right side */}
              <div className={styles.body}>
                <span className={styles.tag}>{card.tag}</span>
                <p className={styles.cardNum}>
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(cardData.length).padStart(2, "0")}
                </p>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardSub}>{card.subtitle}</p>
                <p className={styles.cardDesc}>{card.description}</p>
                <div className={styles.cardLine} />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Dot Indicators */}
      <div className={styles.dots}>
        {cardData.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;