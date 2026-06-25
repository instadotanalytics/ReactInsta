import React, { useEffect, useRef } from 'react';
import styles from './Redhat.module.css';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import AboutRedhat from './AboutRedhat';
import CertificationApplyForm from '../../CertificationApplyForm';
import ReviewSection from '../../ReviewSection';
import Companypartners from '../../Courses/Companypartners';
import BenefitsRedhat from './BenefitsRedhat';

const certifications = [
  { code: 'RHCSA', name: 'Linux Administration',      level: 'Foundational', color: '#3B82F6' },
  { code: 'RHCE',  name: 'Automation & Engineering',  level: 'Advanced',     color: '#6366F1' },
  { code: 'OpenShift', name: 'Containers & Kubernetes', level: 'Specialist', color: '#0EA5E9' },
  { code: 'RHCA',  name: 'Architect Level',            level: 'Expert',      color: '#8B5CF6' },
];

const skills   = ['Linux', 'Shell Scripting', 'Ansible', 'Containers', 'Kubernetes', 'OpenShift', 'DevOps'];
const careers  = ['Linux Admin', 'DevOps Engineer', 'Platform Engineer', 'Cloud Engineer'];
const statRows = [
  { value: '4+',       label: 'Certification Tracks' },
  { value: '100+',     label: 'Skills Covered'       },
  { value: 'Hands-On', label: 'Labs Included'        },
];

const Redhat = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Retina-sharp: scale by devicePixelRatio
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    };

    let { w, h } = resize();

    const NODE_COUNT = 42;
    const MAX_DIST   = 170;

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x:  Math.random() * w,
      y:  Math.random() * h,
      r:  Math.random() * 2.5 + 1.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = 0.13 * (1 - dist / MAX_DIST);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(99,160,240,${alpha})`;
            ctx.lineWidth   = 0.75;
            ctx.stroke();
          }
        }
      }

      nodes.forEach(nd => {
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99,160,240,0.18)';
        ctx.fill();
        // crisp 1-px ring
        ctx.strokeStyle = 'rgba(99,160,240,0.28)';
        ctx.lineWidth   = 0.6;
        ctx.stroke();

        nd.x += nd.vx;
        nd.y += nd.vy;
        if (nd.x < 0 || nd.x > w) nd.vx *= -1;
        if (nd.y < 0 || nd.y > h) nd.vy *= -1;
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => { ({ w, h } = resize()); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <>
      <Header />

      {/* ── SINGLE FULL-VIEWPORT HERO ── */}
      <section className={styles.hero}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

        <div className={styles.heroInner}>

          {/* TOP: badge + heading + sub */}
          <div className={styles.topBlock}>
            {/* <span className={styles.badge}>Red Hat Certification Platform</span> */}
            <h1 className={styles.heroTitle}>
              Red Hat <span className={styles.heroAccent}>Certifications</span>
            </h1>
            <p className={styles.heroSub}>
              Master Linux Administration, Automation, Containers &amp; Enterprise
              Infrastructure through industry-recognized certification paths.
            </p>
          </div>

          {/* CENTER: cert cards */}
          <div className={styles.cardsRow}>
            {certifications.map((cert, i) => (
              <div
                key={cert.code}
                className={styles.card}
                style={{ animationDelay: `${i * 0.35}s` }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardCode} style={{ color: cert.color }}>{cert.code}</span>
                  <span className={styles.cardLevel}>{cert.level}</span>
                </div>
                <p className={styles.cardName}>{cert.name}</p>
                <div className={styles.cardAccentLine} style={{ background: cert.color }} />
              </div>
            ))}
          </div>

          {/* BOTTOM: 3 info blocks */}
          <div className={styles.infoBar}>

            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Skills</p>
              <div className={styles.pillRow}>
                {skills.map(s => (
                  <span key={s} className={styles.pill}>{s}</span>
                ))}
              </div>
            </div>

            <div className={styles.infoDivider} />

            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Career Paths</p>
              <div className={styles.pillRow}>
                {careers.map(c => (
                  <span key={c} className={styles.pill}>{c}</span>
                ))}
              </div>
            </div>

            <div className={styles.infoDivider} />

            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Statistics</p>
              <div className={styles.statsRow}>
                {statRows.map(st => (
                  <div key={st.label} className={styles.statItem}>
                    <span className={styles.statVal}>{st.value}</span>
                    <span className={styles.statLbl}>{st.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <AboutRedhat />
      <Companypartners />
      <CertificationApplyForm />
      <BenefitsRedhat />
      <ReviewSection />
      <Footer />
    </>
  );
};

export default Redhat;