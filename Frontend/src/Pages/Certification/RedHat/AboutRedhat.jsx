import React from 'react';
import styles from './AboutRedhat.module.css';

const certPath = [
  {
    code: 'RHCSA',
    full: 'Red Hat Certified System Administrator',
    level: 'Foundational',
    color: '#3B82F6',
    desc: 'Learn enterprise Linux administration, storage management, networking, security, and troubleshooting.',
    skills: ['Linux', 'Networking', 'Storage', 'Security'],
  },
  {
    code: 'RHCE',
    full: 'Red Hat Certified Engineer',
    level: 'Advanced',
    color: '#6366F1',
    desc: 'Master automation, Ansible, services, infrastructure management, and enterprise deployments.',
    skills: ['Ansible', 'Automation', 'Services', 'Infrastructure'],
  },
  {
    code: 'OpenShift',
    full: 'Red Hat OpenShift Administrator',
    level: 'Specialist',
    color: '#0EA5E9',
    desc: 'Deploy, manage, and scale containerized workloads on OpenShift and Kubernetes clusters.',
    skills: ['Containers', 'Podman', 'OpenShift', 'Kubernetes'],
  },
  {
    code: 'RHCA',
    full: 'Red Hat Certified Architect',
    level: 'Expert',
    color: '#8B5CF6',
    desc: 'Achieve the highest Red Hat credential by mastering enterprise architecture, automation, and platform engineering.',
    skills: ['Architecture', 'Automation', 'Platform Eng.', 'Enterprise'],
  },
];

/* SVG layout constants — cards alternate top/bottom */
const ANCHORS = [
  { cx: 148,  cy: 130, cardSide: 'top'    },
  { cx: 412,  cy: 420, cardSide: 'bottom' },
  { cx: 668,  cy: 130, cardSide: 'top'    },
  { cx: 932,  cy: 420, cardSide: 'bottom' },
];

/* Smooth cubic bezier through the four anchors */
const PATH_D =
  'M 148 130 C 240 130, 320 420, 412 420 S 576 130, 668 130 S 840 420, 932 420';

const AboutRedhat = () => (
  <section className={styles.section}>
    <div className={styles.dotGrid} aria-hidden="true" />

    <div className={styles.container}>

      {/* ── header ── */}
      <div className={styles.header}>
        {/* <span className={styles.eyebrow}>Certification Journey</span> */}
        <h2 className={styles.title}>Your Red Hat Certification Journey</h2>
        <p className={styles.sub}>
          Progress from Linux fundamentals to enterprise-level automation,
          containers, and platform engineering.
        </p>
      </div>

      {/* ── roadmap ── */}
      <div className={styles.roadmap} aria-label="Certification progression roadmap">

        {/* SVG path + nodes */}
        <svg
          className={styles.svg}
          viewBox="0 0 1080 560"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="rg" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor="#3B82F6" />
              <stop offset="33%"  stopColor="#6366F1" />
              <stop offset="66%"  stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>

            {/* soft glow filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* shadow track */}
          <path d={PATH_D} stroke="rgba(147,197,253,0.18)" strokeWidth="10" strokeLinecap="round" />

          {/* main path */}
          <path
            d={PATH_D}
            stroke="url(#rg)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* connector verticals + nodes */}
          {ANCHORS.map(({ cx, cy, cardSide }, i) => {
            const lineLen = 72;
            const y2 = cardSide === 'top' ? cy - lineLen : cy + lineLen;
            return (
              <g key={i}>
                {/* vertical connector to card */}
                <line
                  x1={cx} y1={cy}
                  x2={cx} y2={y2}
                  stroke={certPath[i].color}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  strokeOpacity="0.45"
                />

                {/* outer ring */}
                <circle cx={cx} cy={cy} r="14" fill={certPath[i].color} fillOpacity="0.1" />
                {/* mid ring */}
                <circle cx={cx} cy={cy} r="8"  fill={certPath[i].color} fillOpacity="0.25" />
                {/* core */}
                <circle cx={cx} cy={cy} r="4.5" fill={certPath[i].color} />
                {/* white center */}
                <circle cx={cx} cy={cy} r="2"  fill="#fff" />

                {/* step index */}
                <text
                  x={cx + 20} y={cy + 5}
                  fontSize="10"
                  fontWeight="700"
                  fill={certPath[i].color}
                  fillOpacity="0.6"
                  fontFamily="system-ui, sans-serif"
                >
                  {String(i + 1).padStart(2, '0')}
                </text>
              </g>
            );
          })}
        </svg>

        {/* cert cards — CSS grid-based on mobile, absolute on desktop */}
        <div className={styles.cardsLayer}>
          {certPath.map((cert, i) => (
            <div
              key={cert.code}
              className={`${styles.card} ${ANCHORS[i].cardSide === 'top' ? styles.cardTop : styles.cardBottom}`}
              style={{ '--c': cert.color }}
            >
              {/* step pill */}
              <div className={styles.stepRow}>
                <span className={styles.stepNum} style={{ color: cert.color }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.cardLevel}>{cert.level}</span>
              </div>

              <span className={styles.cardCode} style={{ color: cert.color }}>{cert.code}</span>
              <p className={styles.cardFull}>{cert.full}</p>
              <p className={styles.cardDesc}>{cert.desc}</p>

              <div className={styles.skillRow}>
                {cert.skills.map(sk => (
                  <span key={sk} className={styles.skillPill}>{sk}</span>
                ))}
              </div>

              <div className={styles.cardBar} style={{ background: cert.color }} />
            </div>
          ))}
        </div>

      </div>
    </div>
  </section>
);

export default AboutRedhat;