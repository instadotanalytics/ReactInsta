// CareerSection.jsx — With Floating Bubbles & Auto Scroll
import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./CareerSection.module.css";

if (typeof document !== "undefined" && !document.getElementById("cs-fonts")) {
  const link = document.createElement("link");
  link.id = "cs-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&family=Outfit:wght@300;400;600;700;800&display=swap";
  document.head.appendChild(link);
}

// ─── Canvas Animation with Floating Bubbles ──────────────
const useCareerCanvas = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, dpr;
    let time = 0;
    let rafId;

    // ─── Bubbles ──────────────────────────────────────────
    const bubbles = [];
    const BUBBLE_COUNT = 35;

    for (let i = 0; i < BUBBLE_COUNT; i++) {
      bubbles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: 2 + Math.random() * 6,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: 0.15 + Math.random() * 0.25,
      });
    }

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // ─── Draw connecting lines ──────────────────────────
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const dx = bubbles[i].x - bubbles[j].x;
          const dy = bubbles[i].y - bubbles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 180) {
            const opacity = 0.06 * (1 - dist / 180);
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(bubbles[i].x, bubbles[i].y);
            ctx.lineTo(bubbles[j].x, bubbles[j].y);
            ctx.stroke();
          }
        }
      }

      // ─── Draw bubbles ──────────────────────────────────
      bubbles.forEach((b) => {
        // Glow effect
        const gradient = ctx.createRadialGradient(
          b.x, b.y, 0,
          b.x, b.y, b.r * 3
        );
        gradient.addColorStop(0, `rgba(37, 99, 235, ${b.opacity * 0.3})`);
        gradient.addColorStop(0.5, `rgba(37, 99, 235, ${b.opacity * 0.1})`);
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * 3, 0, Math.PI * 2);
        ctx.fill();

        // Main bubble
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${b.opacity * 0.6})`;
        ctx.fill();
        
        // Highlight
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.5})`;
        ctx.fill();

        // Move
        b.x += b.speedX + Math.sin(time * 0.5 + b.y * 0.01) * 0.02;
        b.y += b.speedY + Math.cos(time * 0.4 + b.x * 0.01) * 0.02;

        // Wrap around
        if (b.x < -20) b.x = width + 20;
        if (b.x > width + 20) b.x = -20;
        if (b.y < -20) b.y = height + 20;
        if (b.y > height + 20) b.y = -20;
      });

      time += 0.008;
      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [canvasRef]);
};

// ─── Icons ──────────────────────────────────────────────────
const icons = {
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  server: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  database: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  cloud: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  robot: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 2v3m0 0a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3z"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg>,
  devops: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
  chevLeft: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  chevRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  rocket: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>,
  sparkle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"/><path d="M20 20L21 22"/><path d="M4 20L3 22"/><path d="M16 4L17 2"/><path d="M8 4L7 2"/></svg>,
};

const trainings = [
  { icon:"code",     title:"Full Stack Development",  desc:"Master frontend & backend with React, Node.js & MongoDB. Build real-world applications." },
  { icon:"server",   title:"Backend Engineering",     desc:"Build scalable APIs, microservices & secure server-side applications." },
  { icon:"database", title:"Data Analytics",          desc:"Analyze real-world data using Python, SQL, Power BI & Tableau." },
  { icon:"cloud",    title:"Cloud Computing",         desc:"Deploy & manage scalable applications on AWS & Azure infrastructure." },
  { icon:"shield",   title:"Cyber Security",          desc:"Protect systems & networks from modern digital threats & vulnerabilities." },
  { icon:"robot",    title:"AI & Machine Learning",   desc:"Build intelligent systems using ML algorithms, TensorFlow & PyTorch." },
  { icon:"devops",   title:"DevOps Engineering",      desc:"Automate CI/CD pipelines with Docker, Kubernetes & cloud-native tools." },
];

const CARD_W = 310;
const SCROLL_INTERVAL = 3000;

const CareerSection = () => {
  const sliderRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useCareerCanvas(canvasRef);

  // ─── Auto Scroll ─────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      if (!sliderRef.current) return;
      const nextIdx = (activeIdx + 1) % trainings.length;
      sliderRef.current.scrollLeft = nextIdx * CARD_W;
      setActiveIdx(nextIdx);
    }, SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [activeIdx, isPaused]);

  const scroll = useCallback((dir) => {
    if (!sliderRef.current) return;
    const newIdx = dir === "left" 
      ? Math.max(0, activeIdx - 1)
      : Math.min(trainings.length - 1, activeIdx + 1);
    sliderRef.current.scrollLeft = newIdx * CARD_W;
    setActiveIdx(newIdx);
  }, [activeIdx]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const handler = () => {
      const idx = Math.min(Math.round(el.scrollLeft / CARD_W), trainings.length - 1);
      setActiveIdx(idx);
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const scrollToIdx = (i) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollLeft = i * CARD_W;
    setActiveIdx(i);
  };

  return (
    <section 
      className={styles.careerSection}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <canvas ref={canvasRef} className={styles.canvasBg} aria-hidden="true" />
      
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <div className={styles.badge}>
              {icons.sparkle}
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
            {trainings.map((item, i) => (
              <div key={i} className={`${styles.card} ${i === activeIdx ? styles.active : ""}`}>
                <div className={styles.iconWrap}>{icons[item.icon]}</div>
                <div className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
                <div className={styles.cardGlow} />
              </div>
            ))}
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