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



/* Animated dot-network background — skipped on small screens & reduced-motion */
function useNetworkCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.innerWidth < 640) return; // skip on mobile for performance

    const ctx = canvas.getContext('2d');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width, height, dpr, nodes = [], rafId;

    const initNodes = () => {
      const count = Math.min(55, Math.max(20, Math.floor((width * height) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };

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
      initNodes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReduced) {
        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        });
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.14 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.fillStyle = 'rgba(29, 78, 216, 0.5)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!prefersReduced) rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [canvasRef]);
}

export default function HomeLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const networkCanvasRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useNetworkCanvas(networkCanvasRef);

  return (
    <div className={styles.root}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <canvas ref={networkCanvasRef} className={styles.bgCanvas} aria-hidden="true" />

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

        {/* Right: image */}
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