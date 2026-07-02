import React from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import styles from "./Projectshowcase.module.css";

// ─── PROJECTS DATA — 6 cards (3 + 3 grid) ───────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "CRM Dashboard",
    description:
      "Customer relationship management dashboard with real-time analytics and sales pipeline tracking.",
    techs: ["React", "Node.js", "MongoDB"],
    difficulty: "Intermediate",
    accent: "blue",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    id: 2,
    title: "Banking Application",
    description:
      "Secure mobile banking app with transactions, portfolio tracking and real-time notifications.",
    techs: ["React Native", "Firebase", "Tailwind CSS"],
    difficulty: "Advanced",
    accent: "purple",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
  },
  {
    id: 3,
    title: "AI Chatbot",
    description:
      "Conversational AI assistant powered by NLP and deep learning for smart customer support.",
    techs: ["Python", "TensorFlow", "NLP"],
    difficulty: "Advanced",
    accent: "green",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with payments, inventory management and an admin panel.",
    techs: ["Next.js", "Stripe", "MongoDB"],
    difficulty: "Intermediate",
    accent: "orange",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  },
  {
    id: 5,
    title: "HR Analytics Dashboard",
    description:
      "HR metrics visualisation with workforce planning, attendance tracking and detailed reports.",
    techs: ["Power BI", "SQL", "Excel"],
    difficulty: "Beginner",
    accent: "pink",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    id: 6,
    title: "Social Media Network",
    description:
      "Full-featured social platform with real-time feeds, messaging, notifications and media sharing.",
    techs: ["React", "GraphQL", "PostgreSQL"],
    difficulty: "Advanced",
    accent: "teal",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
  },
];

const difficultyColor = {
  Beginner: "green",
  Intermediate: "orange",
  Advanced: "red",
};

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  return (
    <motion.div
      className={`${styles.projectCard} ${styles[`accent_${project.accent}`]}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
    >
      <div className={styles.cardImageWrap}>
        <img
          src={project.img}
          alt={project.title}
          className={styles.cardImage}
          loading="lazy"
        />
        <div className={styles.cardImageOverlay} />
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
        <div className={styles.techRow}>
          {project.techs.map((t) => (
            <span
              key={t}
              className={`${styles.techBadge} ${styles[`tech_${project.accent}`]}`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className={styles.diffRow}>
          <span
            className={`${styles.diffBadge} ${styles[`diff_${difficultyColor[project.difficulty]}`]}`}
          >
            {project.difficulty}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SVG CONNECTION LINES ─────────────────────────────────────────────────────
function ConnectionLines() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) controls.start({ strokeDashoffset: 0 });
  }, [inView, controls]);

  const paths = [
    "M 150 160 C 300  80 420 240 580 160",
    "M 580 160 C 740  80 860 240 1020 160",
    "M 150 360 C 300 280 420 440 580 360",
    "M 580 360 C 740 280 860 440 1020 360",
  ];

  return (
    <div ref={ref} className={styles.svgWrap} aria-hidden="true">
      <svg
        viewBox="0 0 1200 520"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svgLines}
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="600"
            initial={{ strokeDashoffset: 600 }}
            animate={controls}
            transition={{ duration: 1.6, delay: i * 0.3, ease: "easeInOut" }}
            opacity="0.4"
          />
        ))}
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ProjectShowcase() {
  return (
    <main className={styles.page}>
      {/* ── BG DECORATIONS ── */}
      <div className={styles.bgDecor} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
        {[...Array(12)].map((_, i) => (
          <div key={i} className={styles.dot} style={{ "--i": i }} />
        ))}
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.sparkle} style={{ "--j": i }}>
            ✦
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1 — HANDS-ON PROJECTS  (6 cards)
      ══════════════════════════════════════════ */}
      <section className={styles.projectsSection}>
        <div className={styles.container}>
          <div className={styles.heroBlock}>
            

            <motion.h1
              className={styles.mainHeading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              Build Real Projects.
              <br />
              Create Real <span className={styles.gradientText}>Impact.</span>
            </motion.h1>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              Work on industry-grade projects that sharpen your skills, boost
              your confidence, and make your portfolio stand out.
            </motion.p>
          </div>

          <ConnectionLines />

          {/* 6 cards → 3 columns × 2 rows */}
          <div className={styles.projectGrid}>
            <div className={styles.projectRow3}>
              {PROJECTS.slice(0, 3).map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
            <div className={styles.projectRow3}>
              {PROJECTS.slice(3, 6).map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i + 3} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
