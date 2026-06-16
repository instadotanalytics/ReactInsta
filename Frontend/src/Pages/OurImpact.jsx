import React, { useEffect, useRef } from "react";
import styles from "./OurImpact.module.css";

// ─── Wave Canvas Animation ───
const useWaveCanvas = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, dpr;
    let time = 0;
    let rafId;

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
      
      const waveCount = 3;
      const colors = [
        'rgba(255, 215, 0, 0.08)',
        'rgba(255, 180, 0, 0.06)',
        'rgba(255, 160, 0, 0.04)'
      ];

      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const offset = (w / waveCount) * Math.PI * 2;
        const amplitude = 20 + w * 8;
        const frequency = 0.015 + w * 0.003;
        const yOffset = height * (0.3 + w * 0.15);

        for (let x = 0; x <= width; x += 1) {
          const y = yOffset + 
            Math.sin(x * frequency + time + offset) * amplitude +
            Math.sin(x * frequency * 0.5 + time * 0.7 + offset * 1.3) * amplitude * 0.5;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = colors[w];
        ctx.lineWidth = 2 + w;
        ctx.stroke();
      }

      // Second set of waves flowing opposite direction
      for (let w = 0; w < 2; w++) {
        ctx.beginPath();
        const offset = w * Math.PI + 1.2;
        const amplitude = 15 + w * 6;
        const frequency = 0.02 + w * 0.005;
        const yOffset = height * (0.7 + w * 0.12);

        for (let x = 0; x <= width; x += 1) {
          const y = yOffset + 
            Math.sin((width - x) * frequency + time * 0.6 + offset) * amplitude +
            Math.cos(x * frequency * 0.4 + time * 0.4) * amplitude * 0.3;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(255, 215, 0, ${0.05 + w * 0.02})`;
        ctx.lineWidth = 1.5 + w;
        ctx.stroke();
      }

      // Glowing dots on wave intersections
      for (let i = 0; i < 8; i++) {
        const x = (i / 8) * width;
        const y = height * 0.5 + 
          Math.sin(x * 0.02 + time * 0.5) * 25 +
          Math.sin(x * 0.01 + time * 0.3) * 15;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 0.02;
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

// ─── Impact Icon ───
const ImpactIcon = () => (
  <div className={styles.iconWrapper}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);

const features = [
  {
    title: "Industry-Aligned Curriculum",
    desc: "Courses designed with top industry experts",
  },
  {
    title: "Hands-on Projects",
    desc: "Build real-world portfolio with live projects",
  },
  {
    title: "Global Certification",
    desc: "Internationally recognized certificates",
  },
  {
    title: "Expert Mentors",
    desc: "Learn from seasoned industry professionals",
  },
];

const stats = [
  { number: "10K+", label: "Students Trained" },
  { number: "95%",  label: "Placement Rate"   },
  { number: "50+",  label: "Expert Mentors"   },
  { number: "100+", label: "Corporate Partners"},
];

const OurImpact = () => {
  const canvasRef = useRef(null);
  useWaveCanvas(canvasRef);

  return (
    <section className={styles.section}>
      <canvas ref={canvasRef} className={styles.waveCanvas} aria-hidden="true" />
      
      <div className={styles.container}>
        <div className={styles.content}>

          {/* ── LEFT ── */}
          <div className={styles.left}>
           

            <h2 className={styles.title}>
              <span className={styles.titleLine1}>Transforming Careers</span>
              <br />
              <span className={styles.titleLine2}>Through <span className={styles.highlight}>Excellence</span></span>
            </h2>

            <p className={styles.desc}>
              We provide industry-focused training programs that help learners
              gain real-world skills and grow their careers. Our comprehensive
              approach ensures every student achieves their professional goals.
            </p>

            <div className={styles.features}>
              {features.map((f, i) => (
                <div className={styles.featureItem} key={i}>
                  <div className={styles.featureIcon}>
                    <ImpactIcon />
                  </div>
                  <div className={styles.featureContent}>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.stats}>
              {stats.map((s, i) => (
                <div className={styles.stat} key={i}>
                  <div className={styles.statNumber}>
                    <span>{s.number}</span>
                  </div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className={styles.right}>
            <div className={styles.imageWrapper}>
              {/* Top-right floating rating card */}
           

              <img
                src="https://i.pinimg.com/1200x/83/8c/cc/838ccc2629857f40606a3d6927de1e72.jpg"
                alt="Training session with students and mentor"
                className={styles.image}
                loading="lazy"
              />

             

              <div className={styles.pattern} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurImpact;