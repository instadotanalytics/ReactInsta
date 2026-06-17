import { useEffect, useRef, useState } from 'react';
import styles from './HomeLanding.module.css';
import {
  FaRocket, FaCheckCircle,
  FaArrowRight, FaPlayCircle, FaStar
} from 'react-icons/fa';

const stats = [
  { value: '5000+',   label: 'Students Placed' },
  { value: '500+',    label: 'Hiring Partners'  },
  { value: '8.5 LPA', label: 'Avg. Package'    },
  { value: '25 LPA',  label: 'Top Package'     },
];

const badges = [
  '100% Job Guarantee',
  'ISO Certified',
  'Govt. Approved',
];

/* ── Wave Canvas Animation (Right to Left) ── */
function useWaveCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height, dpr, animationId;
    let time = 0;

    const resize = () => {
      // Get full viewport dimensions
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      time += 0.008;
      
      // Wave settings - moving right to left
      const waves = [
        { amplitude: 25, frequency: 0.02, speed: 0.6, color: 'rgba(37, 186, 235, 0.08)' },
        { amplitude: 35, frequency: 0.025, speed: 0.8, color: 'rgba(37, 205, 235, 0.06)' },
        { amplitude: 45, frequency: 0.03, speed: 1.0, color: 'rgba(14, 165, 233, 0.05)' },
        { amplitude: 20, frequency: 0.015, speed: 0.4, color: 'rgba(2, 52, 253, 0.07)' },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        // Moving from right to left
        const offset = time * wave.speed * 100;
        
        for (let x = 0; x <= width; x += 1) {
          const y = height / 2 + 
            wave.amplitude * Math.sin((x + offset) * wave.frequency) +
            wave.amplitude * 0.5 * Math.sin((x + offset * 0.7) * wave.frequency * 1.5 + 1);
          
          if (x === 0) {
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      // Add floating particles
      for (let i = 0; i < 40; i++) {
        const x = (i * 137 + time * 50 * (0.5 + i % 3 * 0.2)) % width;
        const y = height * 0.3 + Math.sin(i * 2.3 + time * (0.5 + i % 2)) * 50 + 
                  Math.sin(i * 1.7 + time * 0.8) * 30;
        const size = 1 + (i % 3);
        const opacity = 0.1 + (i % 5) * 0.03;
        
        ctx.fillStyle = `rgba(37, 99, 235, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [canvasRef]);
}

export default function HomeLanding() {
  const waveCanvasRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useWaveCanvas(waveCanvasRef);

  return (
    <div className={styles.root}>
      {/* ── Wave Canvas Background ── */}
      <canvas ref={waveCanvasRef} className={styles.bgCanvas} aria-hidden="true" />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        {/* Left: content */}
        <div className={styles.heroLeft}>
          <h1 className={styles.title}>
            <span className={styles.titleGrad}>100% Job Guarantee</span>
            <br />Training Programs
          </h1>

          <p className={styles.desc}>
            <strong>Insta Dot Analytics</strong> — Best IT Training Institute in Indore.
            Master in-demand skills with expert mentors, live projects, and dedicated
            placement support. Join <strong>5,000+</strong> alumni placed in top MNCs
            with packages from <strong>6–25 LPA</strong>.
          </p>

          <div className={styles.stats}>
            {stats.map(s => (
              <div key={s.label} className={styles.statCard}>
                <span className={styles.statVal}>{s.value}</span>
                <span className={styles.statLbl}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.ratingRow}>
            <span className={styles.starsWrap}>
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className={styles.ratingStar} />
              ))}
            </span>
            <span className={styles.ratingText}>4.8 out of 5 &middot; 1,200+ student reviews</span>
          </div>

          <div className={styles.trustRow}>
            {badges.map(b => (
              <span key={b} className={styles.trustBadge}>
                <FaCheckCircle className={styles.checkIcon} />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Right: image - Hidden on mobile */}
        <div className={styles.heroRight}>
          <div className={styles.imageFrame}>
            <img
              src="https://i.pinimg.com/1200x/06/f6/23/06f6235b88be4decbae8cae39ef01343.jpg"
              alt="Students learning at Insta Dot Analytics"
              className={styles.heroImg}
            />
          </div>
        </div>
      </section>
    </div>
  );
}