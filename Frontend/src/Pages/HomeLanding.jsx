import { useEffect, useRef } from "react";
import styles from "./HomeLanding.module.css";
import {
  FaStar,
  FaArrowRight,
  FaThLarge,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const SPACING = 34; // distance between grid dots
const RADIUS = 170; // cursor glow radius in px

/* ── Interactive grid-dot canvas: dots glow + grow near the cursor ── */
function useHeroFX(heroRef, canvasRef) {
  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext("2d");
    let w,
      h,
      dpr,
      dots = [],
      animationId;
    let mouseX = -9999,
      mouseY = -9999,
      active = false;

    const buildDots = () => {
      dots = [];
      for (let y = SPACING / 2; y < h; y += SPACING) {
        for (let x = SPACING / 2; x < w; x += SPACING) {
          dots.push({
            x: x + (Math.random() * 8 - 4),
            y: y + (Math.random() * 8 - 4),
            r: 1 + Math.random() * 0.8,
            base: 0.18 + Math.random() * 0.18,
            glow: 0,
            pulse: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const resize = () => {
      w = hero.clientWidth;
      h = hero.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const dot of dots) {
        dot.pulse += 0.012;
        const breathe = 0.5 + Math.sin(dot.pulse) * 0.5;

        let targetGlow = 0;
        if (active) {
          const dx = dot.x - mouseX;
          const dy = dot.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < RADIUS) targetGlow = Math.pow(1 - dist / RADIUS, 2);
        }
        dot.glow += (targetGlow - dot.glow) * 0.12;

        const opacity = Math.min(
          dot.base + breathe * 0.06 + dot.glow * 0.85,
          1,
        );
        const radius = dot.r + dot.glow * 3.2;

        if (dot.glow > 0.04) {
          const grad = ctx.createRadialGradient(
            dot.x,
            dot.y,
            0,
            dot.x,
            dot.y,
            radius * 5,
          );
          grad.addColorStop(0, `rgba(255,255,255,${0.85 * dot.glow})`);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, radius * 5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      active = true;
      hero.style.setProperty("--mx", `${mouseX}px`);
      hero.style.setProperty("--my", `${mouseY}px`);
    };
    const handleMouseLeave = () => {
      active = false;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [heroRef, canvasRef]);
}

export default function HomeLanding() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useHeroFX(heroRef, canvasRef);

  return (
    <section ref={heroRef} className={styles.hero}>
      <canvas ref={canvasRef} className={styles.bgCanvas} aria-hidden="true" />

      <div className={styles.linesBg}></div>

      <div className={styles.blueWash}></div>

      <div className={styles.topGlow}></div>

      <div className={styles.spotlight} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.title}>
          Built for <span className={styles.accent}>Scale</span> &amp;
          <br />
          <span className={styles.noWrap}>
            <span className={styles.accent}>Intelligence.</span> Powered by{" "}
            <span className={styles.accent}>AI.</span>
          </span>
        </h1>

        <p className={styles.desc}>
          From London startups to Singapore enterprises — we build AI agents,
          ship full-stack products, and scale cloud infrastructure. Fast.
          Reliable. Built to last.
        </p>

        <div className={styles.ctaRow}>
          <a href="/contact" className={styles.btnPrimary}>
            Start Your Career
            <FaArrowRight />
          </a>
          <a href="/courses" className={styles.btnSecondary}>
            <FaThLarge />
            See Our Courses
            <FaExternalLinkAlt className={styles.arrowIcon} />
          </a>
        </div>
      </div>
    </section>
  );
}
