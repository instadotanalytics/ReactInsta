// CareerSection.jsx — White Theme
import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./CareerSection.module.css";

if (typeof document !== "undefined" && !document.getElementById("cs-fonts")) {
  const link = document.createElement("link");
  link.id = "cs-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap";
  document.head.appendChild(link);
}

const icons = {
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  server: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  database: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  cloud: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  robot: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 2v3m0 0a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3z"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg>,
  devops: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
  arrowRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  chevLeft: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  chevRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  rocket: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>,
};

const palette = [
  { accent:"#2d6e3a", iconBg:"rgba(45,110,58,0.07)",  iconBgH:"rgba(45,110,58,0.13)",  iconBorder:"rgba(45,110,58,0.15)"  },
  { accent:"#0e7b6c", iconBg:"rgba(14,123,108,0.07)", iconBgH:"rgba(14,123,108,0.13)", iconBorder:"rgba(14,123,108,0.15)" },
  { accent:"#b06a00", iconBg:"rgba(176,106,0,0.07)",  iconBgH:"rgba(176,106,0,0.13)",  iconBorder:"rgba(176,106,0,0.15)"  },
  { accent:"#1a55a8", iconBg:"rgba(26,85,168,0.07)",  iconBgH:"rgba(26,85,168,0.13)",  iconBorder:"rgba(26,85,168,0.15)"  },
  { accent:"#b0243a", iconBg:"rgba(176,36,58,0.07)",  iconBgH:"rgba(176,36,58,0.13)",  iconBorder:"rgba(176,36,58,0.15)"  },
  { accent:"#6b34b0", iconBg:"rgba(107,52,176,0.07)", iconBgH:"rgba(107,52,176,0.13)", iconBorder:"rgba(107,52,176,0.15)" },
  { accent:"#0079a8", iconBg:"rgba(0,121,168,0.07)",  iconBgH:"rgba(0,121,168,0.13)",  iconBorder:"rgba(0,121,168,0.15)"  },
];

const trainings = [
  { icon:"code",     title:"Full Stack Development",  desc:"Master frontend & backend technologies including React, Node.js & MongoDB." },
  { icon:"server",   title:"Backend Engineering",     desc:"Build scalable APIs and secure server-side applications with Node & Python." },
  { icon:"database", title:"Data Analytics",          desc:"Analyze real-world data using Python, SQL & Power BI dashboards." },
  { icon:"cloud",    title:"Cloud Computing",         desc:"Deploy and manage production applications on AWS & Azure infrastructure." },
  { icon:"shield",   title:"Cyber Security",          desc:"Protect systems and networks from modern digital threats and vulnerabilities." },
  { icon:"robot",    title:"AI & Machine Learning",   desc:"Build intelligent systems using ML algorithms, TensorFlow & PyTorch." },
  { icon:"devops",   title:"DevOps Engineering",      desc:"Automate CI/CD pipelines, Docker containers & infrastructure deployment." },
];

const CARD_W = 298;

const CareerSection = () => {
  const sliderRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scroll = useCallback((dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollLeft += dir === "left" ? -CARD_W : CARD_W;
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const handler = () => setActiveIdx(Math.min(Math.round(el.scrollLeft / CARD_W), trainings.length - 1));
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const scrollToIdx = (i) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollLeft = i * CARD_W;
  };

  return (
    <section className={styles.careerSection}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <div className={styles.badge}>
              {icons.rocket}
              IT Professional Training
            </div>
            <h2 className={styles.title}>
              Upgrade Your Skills with{" "}
              <span className={styles.titleAccent}>Industry-Focused</span>{" "}
              Training
            </h2>
            <p className={styles.subtitle}>
              Hands-on learning, real-world projects, and expert mentorship to
              accelerate your IT career.
            </p>
          </div>

          <div className={styles.arrowGroup}>
            <button className={styles.arrowBtn} onClick={() => scroll("left")} aria-label="Scroll left">
              {icons.chevLeft}
            </button>
            <button className={styles.arrowBtn} onClick={() => scroll("right")} aria-label="Scroll right">
              {icons.chevRight}
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className={styles.sliderTrack}>
          <div className={styles.slider} ref={sliderRef}>
            {trainings.map((item, i) => {
              const p = palette[i % palette.length];
              return (
                <div
                  key={i}
                  className={styles.card}
                  style={{
                    "--card-accent": p.accent,
                    "--icon-bg":     p.iconBg,
                    "--icon-bg-h":   p.iconBgH,
                    "--icon-border": p.iconBorder,
                  }}
                >
                  <div className={styles.iconWrap}>{icons[item.icon]}</div>
                  <div className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                  <button className={styles.learnLink}>
                    
                   
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className={styles.dotsRow}>
          {trainings.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIdx ? styles.active : ""}`}
              onClick={() => scrollToIdx(i)}
              aria-label={`Card ${i + 1}`}
            />
          ))}
        </div>

        {/* Stats strip */}
        <div className={styles.statsStrip}>
          <div className={styles.statItem}>
            <div className={styles.statNum}>7<span>+</span></div>
            <div className={styles.statLabel}>IT Programs</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>10<span>k+</span></div>
            <div className={styles.statLabel}>Students Trained</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>95<span>%</span></div>
            <div className={styles.statLabel}>Placement Rate</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>4.9<span>★</span></div>
            <div className={styles.statLabel}>Avg. Rating</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CareerSection;