// HorizontalScrollSection.jsx
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

const CARD_GAP = 28; // px — must match CSS

const HorizontalScrollSection = () => {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0–1
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateCardWidth = () => {
      setCardWidth(window.innerWidth * 0.8);
    };
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const onScroll = () => {
      const rect = outer.getBoundingClientRect();
      const total = outer.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const pct = Math.min(Math.max(scrolled / total, 0), 1);
      setProgress(pct);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || cardWidth === 0) return;

    // total distance cards need to travel
    const maxShift =
      (cardWidth + CARD_GAP) * cardData.length - window.innerWidth + 120; // right padding

    const shift = Math.max(progress * maxShift, 0);
    track.style.transform = `translateX(-${shift}px)`;
  }, [progress, cardWidth]);

  // dots indicator
  const activeIndex = Math.round(progress * (cardData.length - 1));

  return (
    <div
      ref={outerRef}
      className={styles.outer}
      style={{ height: `${100 + cardData.length * 50}vh` }}
    >
      {/* sticky viewport */}
      <div className={styles.sticky}>
        {/* Background grid + glows */}
        <div className={styles.bgGrid} />
        <div className={styles.bgGlowLeft} />
        <div className={styles.bgGlowRight} />

        {/* Header - Centered with auto height */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Our Memories</span>
          <h2 className={styles.heading}>
            Team & Project{" "}
            <span className={styles.accent}>Highlights</span>
          </h2>
          <p className={styles.sub}>Scroll through our cherished moments together</p>
        </div>

        {/* Cards track */}
        <div className={styles.trackWrap}>
          <div ref={trackRef} className={styles.track}>
            {cardData.map((card, i) => (
              <article className={styles.card} key={i}>
                {/* Text content - Left side */}
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

                {/* Image - Right side */}
                <div className={styles.imgWrap}>
                  <img
                    src={card.image}
                    alt={card.title}
                    className={styles.img}
                    loading="lazy"
                  />
                  <div className={styles.imgGrad} />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Dot indicators */}
        <div className={styles.dots}>
          {cardData.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollSection;