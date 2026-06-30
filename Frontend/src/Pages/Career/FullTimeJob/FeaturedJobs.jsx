// FeaturedJobs.jsx — Premium Redesign (clean, mobile-responsive)
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Briefcase,
  CheckCircle,
  Globe,
  ChevronDown,
  Building2,
  Sparkles,
} from "lucide-react";
import styles from "./FeaturedJobs.module.css";

// ─── Animated canvas background ───────────────────────────────────────────────
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    const mkP = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.45 + 0.1,
    });
    resize();
    const count = window.innerWidth < 640 ? 22 : 45; // fewer particles on mobile
    for (let i = 0; i < count; i++) particles.push(mkP());
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.a})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} className={styles.particleCanvas} />;
};

// ─── Counter animation hook ───────────────────────────────────────────────────
const useCounter = (target, duration = 1600, started = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return value;
};

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, target, suffix, label, colorClass, started }) => {
  const val = useCounter(target, 1600, started);
  const display =
    target >= 1000 ? `${(val / 1000).toFixed(val >= 1000 ? 0 : 1)}K+` : `${val}${suffix}`;
  return (
    <motion.div
      whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
      className={`${styles.statCard} ${styles[colorClass]}`}
    >
      <div className={`${styles.statIcon} ${styles[`${colorClass}Icon`]}`}>
        <Icon size={18} />
      </div>
      <div className={styles.statNum}>{display}</div>
      <div className={styles.statLabel}>{label}</div>
    </motion.div>
  );
};

// ─── Side card (left / right) ─────────────────────────────────────────────────
const SideCard = ({ job }) => (
  <motion.div
    whileHover={{ y: -6, transition: { type: "spring", stiffness: 260 } }}
    className={styles.sideCard}
  >
    <div className={`${styles.sideImgWrap} ${styles[`sideImg_${job.color}`]}`}>
      <div className={styles.sideImgLogo}>{job.logo}</div>
    </div>
    <div className={styles.sideBody}>
      <span className={`${styles.catTag} ${styles[`cat_${job.color}`]}`}>
        <Briefcase size={10} /> {job.type} · Full-time
      </span>
      <h3 className={styles.sideTitle}>{job.role}</h3>
      <p className={styles.sideMeta}>
        {job.company} · {job.salary} · {job.experience}
      </p>
      <div className={styles.techRow}>
        {job.techs.map((t) => (
          <span key={t} className={styles.tech}>
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// ─── Center featured card ──────────────────────────────────────────────────────
const CenterCard = ({ job }) => (
  <motion.div
    whileHover={{ y: -8, transition: { type: "spring", stiffness: 220 } }}
    className={styles.centerCard}
  >
    <div className={styles.centerImgWrap}>
      <div className={styles.centerImgInner}>
        <div className={styles.screenMock}>
          <div className={`${styles.bar} ${styles.barAccent}`} />
          <div className={styles.bar} />
          <div className={`${styles.bar} ${styles.barSm}`} />
          <div className={styles.barBlock} />
          <div className={styles.bar} />
        </div>
      </div>
      <div className={styles.centerOverlay} />
    </div>
    <div className={styles.centerBody}>
      <div className={styles.featuredLabel}>
        <Sparkles size={12} /> Featured · {job.company}
      </div>
      <h2 className={styles.centerTitle}>{job.role}</h2>
      <p className={styles.centerDesc}>{job.desc}</p>
      <div className={styles.techRow}>
        {job.techs.map((t) => (
          <span key={t} className={styles.centerTech}>
            {t}
          </span>
        ))}
      </div>
      <div className={styles.centerActions}>
        <span className={styles.centerMeta}>
          {job.type} · {job.salary}
        </span>
      </div>
    </div>
  </motion.div>
);

// ─── Main component ────────────────────────────────────────────────────────────
const FeaturedJobs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      setTimeout(() => setStatsStarted(true), 600);
    }
  }, [isInView, controls]);

  const fade = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, type: "spring", damping: 22, stiffness: 90 },
    }),
  };

  const jobs = [
    {
      company: "Google",
      logo: "G",
      role: "Software Engineer",
      type: "Remote",
      salary: "₹28 LPA",
      experience: "3–5 yrs",
      techs: ["Go", "Kubernetes", "gRPC"],
      color: "blue",
    },
    {
      company: "Microsoft",
      logo: "M",
      role: "Frontend Engineer — Design Systems",
      type: "Hybrid",
      salary: "₹22 LPA",
      experience: "2–4 yrs",
      desc: "Build the next generation of Fluent UI. Own design tokens and cross-platform consistency across 200M+ users.",
      techs: ["React", "TypeScript", "Figma", "Azure"],
      color: "purple",
    },
    {
      company: "Amazon",
      logo: "A",
      role: "Backend Engineer",
      type: "On-site",
      salary: "₹25 LPA",
      experience: "4–6 yrs",
      techs: ["Java", "AWS", "DynamoDB"],
      color: "orange",
    },
  ];

  const stats = [
    { icon: Briefcase, target: 12000, suffix: "+", label: "Active Jobs", colorClass: "statBlue" },
    { icon: Building2, target: 850, suffix: "+", label: "Hiring Companies", colorClass: "statPurple" },
    { icon: CheckCircle, target: 95, suffix: "%", label: "Verified Listings", colorClass: "statGreen" },
    { icon: Globe, target: 2300, suffix: "+", label: "Remote Jobs", colorClass: "statAmber" },
  ];

  return (
    <section ref={ref} className={styles.section}>
      <ParticleCanvas />

      {/* Decorative orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.inner}>
        {/* Hero */}
        <motion.div custom={0} variants={fade} initial="hidden" animate={controls} className={styles.hero}>
          <h1 className={styles.heroTitle}>Land Your Dream Job</h1>
          <p className={styles.heroDesc}>
            Discover thousands of verified full-time opportunities from the world's best companies.
          </p>
        </motion.div>

        {/* Three-card composition */}
        <motion.div custom={1} variants={fade} initial="hidden" animate={controls} className={styles.composition}>
          <div className={styles.compositionCenter}>
            <CenterCard job={jobs[1]} />
          </div>
          <div className={styles.compositionSide}>
            <SideCard job={jobs[0]} />
          </div>
          <div className={styles.compositionSide}>
            <SideCard job={jobs[2]} />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div custom={2} variants={fade} initial="hidden" animate={controls} className={styles.statsGrid}>
          {stats.map((s) => (
            <StatCard key={s.label} {...s} started={statsStarted} />
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className={styles.scrollHint}
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={styles.scrollContent}
          >
            <ChevronDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedJobs;