import React, { useRef, useEffect, useState } from "react";
import styles from "./Awsprojects.module.css";

const projects = [
  {
    id: 1,
    metric: "5+",
    metricLabel: "Services Used",
    title: "Static Website Hosting",
    description:
      "Deploy a globally distributed static site with CDN acceleration and custom domain routing.",
    services: ["S3", "CloudFront", "Route 53"],
    tag: "Storage & CDN",
    accent: "#3B82F6",
    height: "short",
  },
  {
    id: 2,
    metric: "0",
    metricSuffix: "Servers",
    metricLabel: "Managed by You",
    title: "Serverless REST API",
    description:
      "Build a fully managed, auto-scaling API with pay-per-request billing and NoSQL persistence.",
    services: ["Lambda", "API Gateway", "DynamoDB"],
    tag: "Serverless",
    accent: "#6366F1",
    height: "tall",
  },
  {
    id: 3,
    metric: "100%",
    metricLabel: "Network Isolation",
    title: "VPC Networking Lab",
    description:
      "Design a secure, multi-subnet network architecture with controlled ingress and egress traffic.",
    services: ["VPC", "NAT Gateway", "Security Groups"],
    tag: "Networking",
    accent: "#0EA5E9",
    height: "medium",
  },
  {
    id: 4,
    metric: "CI/CD",
    metricLabel: "Fully Automated",
    title: "CI/CD Pipeline",
    description:
      "Automate build, test, and container deployment workflows on every code push.",
    services: ["CodePipeline", "CodeBuild", "ECS"],
    tag: "DevOps",
    accent: "#10B981",
    height: "tall",
  },
  {
    id: 5,
    metric: "HA",
    metricLabel: "High Availability",
    title: "Multi-Tier Web App",
    description:
      "Architect a resilient, load-balanced application tier backed by managed relational storage.",
    services: ["ALB", "EC2", "RDS", "Auto Scaling"],
    tag: "Production Ready",
    accent: "#8B5CF6",
    height: "medium",
  },
];

const heightMap = {
  short: 300,
  medium: 360,
  tall: 420,
};

export default function AWSProjects() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.sectionVisible : ""}`}
      aria-labelledby="aws-projects-title"
    >
      {/* Ambient blobs */}
      <div className={styles.blob} style={{ top: "5%", left: "10%", background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)", width: 480, height: 480 }} aria-hidden="true" />
      <div className={styles.blob} style={{ bottom: "8%", right: "8%", background: "radial-gradient(circle, rgba(14,165,233,0.09) 0%, transparent 70%)", width: 380, height: 380 }} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.eyebrow} aria-label="Section category">Hands-On Learning</span>
          <h2 id="aws-projects-title" className={styles.title}>
            Hands-On <span className={styles.titleAccent}>AWS Projects</span>
          </h2>
          <p className={styles.subtitle}>
            Build production-inspired cloud solutions and gain practical experience
            with core AWS services.
          </p>
        </header>

        {/* Cards */}
        <div className={styles.grid} role="list">
          {projects.map((p, i) => (
            <article
              key={p.id}
              role="listitem"
              className={styles.card}
              style={{
                "--card-accent": p.accent,
                "--card-delay": `${i * 80}ms`,
                "--card-min-height": `${heightMap[p.height]}px`,
                animationDelay: `${i * 80}ms`,
              }}
              tabIndex={0}
              aria-label={`Project: ${p.title}`}
            >
              {/* Top accent line */}
              <div className={styles.accentLine} aria-hidden="true" />

              {/* Tag */}
              <span className={styles.categoryTag}>{p.tag}</span>

              {/* Metric */}
              <div className={styles.metricBlock} aria-label={`Metric: ${p.metric}${p.metricSuffix ?? ""} ${p.metricLabel}`}>
                <span className={styles.metricValue}>
                  {p.metric}
                  {p.metricSuffix && (
                    <span className={styles.metricSuffix}>{p.metricSuffix}</span>
                  )}
                </span>
                <span className={styles.metricLabel}>{p.metricLabel}</span>
              </div>

              {/* Body */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.description}</p>
              </div>

              {/* Service chips */}
              <footer className={styles.chips} aria-label="AWS services used">
                {p.services.map((s) => (
                  <span key={s} className={styles.chip}>{s}</span>
                ))}
              </footer>

              {/* Hover glow */}
              <div className={styles.hoverGlow} aria-hidden="true" />
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <button className={styles.ctaBtn} type="button">
            Explore All Projects
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}