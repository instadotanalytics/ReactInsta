import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  FaServer,
  FaRobot,
  FaCubes,
  FaNetworkWired,
  FaCodeBranch,
  FaChartBar,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import {
  SiRedhat,
  SiAnsible,
  SiKubernetes,
  SiGitlab,
  SiPrometheus,
  SiLinux,
} from "react-icons/si";
import styles from "./Enterpriseproject.module.css";

// ─── DATA ────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    icon: FaServer,
    accentIcon: SiLinux,
    title: "Linux Server Administration",
    description:
      "Deploy and harden multi-tier RHEL servers. Configure SELinux policies, systemd services, and LVM storage for real enterprise workloads.",
    techs: ["RHEL 9", "SELinux", "systemd", "LVM"],
    difficulty: "Intermediate",
    diffColor: "amber",
    hours: "40 hrs",
    progress: 72,
  },
  {
    id: 2,
    icon: FaRobot,
    accentIcon: SiAnsible,
    title: "Enterprise Automation with Ansible",
    description:
      "Author production-grade Ansible playbooks and roles to automate fleet configuration and compliance across 500+ node inventories.",
    techs: ["Ansible", "YAML", "Jinja2", "AWX"],
    difficulty: "Advanced",
    diffColor: "red",
    hours: "55 hrs",
    progress: 85,
  },
  {
    id: 3,
    icon: FaCubes,
    accentIcon: SiRedhat,
    title: "OpenShift Container Platform",
    description:
      "Stand up a production OpenShift 4 cluster, deploy microservices with Operators, and configure RBAC for enterprise container governance.",
    techs: ["OpenShift 4", "Operators", "RBAC", "Podman"],
    difficulty: "Advanced",
    diffColor: "red",
    hours: "65 hrs",
    progress: 60,
  },
  {
    id: 4,
    icon: FaNetworkWired,
    accentIcon: SiKubernetes,
    title: "Kubernetes Cluster Deployment",
    description:
      "Bootstrap a bare-metal kubeadm cluster, configure CNI networking, and implement HPA auto-scaling with persistent volumes.",
    techs: ["Kubernetes", "kubeadm", "Calico", "Helm"],
    difficulty: "Advanced",
    diffColor: "red",
    hours: "60 hrs",
    progress: 78,
  },
  {
    id: 5,
    icon: FaCodeBranch,
    accentIcon: SiGitlab,
    title: "Enterprise CI/CD Pipeline",
    description:
      "Build a GitOps pipeline from source to production using GitLab CI and Jenkins with SAST scanning and blue-green deployments.",
    techs: ["GitLab CI", "Jenkins", "ArgoCD", "Tekton"],
    difficulty: "Intermediate",
    diffColor: "amber",
    hours: "50 hrs",
    progress: 90,
  },
  {
    id: 6,
    icon: FaChartBar,
    accentIcon: SiPrometheus,
    title: "Monitoring & Logging Stack",
    description:
      "Instrument a full observability platform using Prometheus, Grafana dashboards, and the ELK stack with alerting and SLO tracking.",
    techs: ["Prometheus", "Grafana", "Elasticsearch", "Kibana"],
    difficulty: "Intermediate",
    diffColor: "amber",
    hours: "45 hrs",
    progress: 68,
  },
];

const DIFF_COLORS = {
  amber: { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
  red: { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
};

// ─── PROGRESS BAR ────────────────────────────────────────────────────────────
function ProgressBar({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div className={styles.progressTrack} ref={ref}>
      <motion.div
        className={styles.progressFill}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : {}}
        transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
      />
      <span className={styles.progressLabel}>{value}%</span>
    </div>
  );
}

// ─── FLOATING PARTICLE ───────────────────────────────────────────────────────
function Particle({ style }) {
  return (
    <motion.div
      className={styles.particle}
      style={style}
      animate={{ y: [0, -28, 0], opacity: [0.15, 0.4, 0.15] }}
      transition={{
        duration: style.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: style.delay,
      }}
    />
  );
}

// ─── PROJECT CARD ────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const Icon = project.icon;
  const AccentIcon = project.accentIcon;
  const diff = DIFF_COLORS[project.diffColor];

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" }}
      whileHover="hover"
    >
      {/* Uniform glow on hover */}
      <motion.div
        className={styles.cardGlow}
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className={styles.cardInner}>
        {/* Header row */}
        <div className={styles.cardHeader}>
          <motion.div
            className={styles.iconWrap}
            variants={{ hover: { scale: 1.07, rotate: -4 } }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <Icon className={styles.iconMain} />
            <AccentIcon className={styles.iconAccent} />
          </motion.div>

          <div className={styles.metaRight}>
            <span
              className={styles.diffBadge}
              style={{ background: diff.bg, color: diff.color }}
            >
              <span
                className={styles.diffDot}
                style={{ background: diff.dot }}
              />
              {project.difficulty}
            </span>
            <span className={styles.timeBadge}>
              <FaClock className={styles.clockIcon} />
              {project.hours}
            </span>
          </div>
        </div>

        {/* Title + desc */}
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>

        {/* Techs */}
        <div className={styles.techRow}>
          {project.techs.map((t) => (
            <span key={t} className={styles.chip}>
              {t}
            </span>
          ))}
        </div>

        {/* Progress */}
        <div className={styles.progressSection}>
          <span className={styles.progressTitle}>Lab Progress</span>
          <ProgressBar value={project.progress} />
        </div>

        {/* CTA */}
      </div>
    </motion.article>
  );
}

// ─── PARTICLES CONFIG ─────────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  width: `${6 + (i % 4) * 4}px`,
  height: `${6 + (i % 4) * 4}px`,
  top: `${(i * 53) % 95}%`,
  left: `${(i * 67 + 11) % 96}%`,
  duration: 4 + (i % 5),
  delay: i * 0.4,
  borderRadius: i % 3 === 0 ? "4px" : "50%",
}));

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function EnterpriseProject() {
  return (
    <section className={styles.section}>
      <div className={styles.gridBg} aria-hidden="true" />

      <div className={styles.particleLayer} aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <Particle key={i} style={p} />
        ))}
      </div>

      <div className={styles.blobLayer} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
      </div>

      <div className={styles.container}>
        {/* Header - Badge Removed */}
        <div className={styles.headerWrap}>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Build Enterprise-Level Projects
            <br />
            <span className={styles.headingAccent}>
              Used by Modern Companies
            </span>
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Go beyond theory. Every project mirrors a real production scenario —
            the kind senior engineers tackle daily at Fortune 500 companies and
            cloud-native startups.
          </motion.p>

          <motion.div
            className={styles.divider}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
