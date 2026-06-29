
/**
 * CareerTrack.jsx
 * Premium futuristic metro-style career journey section.
 * Uses CSS Modules → import styles from "./CareerTrack.module.css"
 *
 * Drop-in usage:
 *   import CareerTrack from "./CareerTrack";
 *   <CareerTrack />
 */

// import styles from "./";
import React from "react";
import styles from "./CareerTrack.module.css";
// import React from "react";
// import styles from "./CareerTrack.module.css";
import {
  FaBullseye,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaFileAlt,
  FaMicrophone,
  FaBriefcase,
  FaUserTie,
  FaTools,
  FaShieldAlt,
} from "react-icons/fa";

import {
  MdWorkspacePremium,
} from "react-icons/md";
import { PiCrownSimpleFill } from "react-icons/pi";

/* ─────────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────────── */
const STATIONS = [
  {
    icon: <FaBullseye />,
    label: "Choose Course",
    cx: 62,
    cy: 210,
    labelY: "below",
  },
  {
    icon: <FaChalkboardTeacher />,
    label: "Live Classes",
    cx: 210,
    cy: 118,
    labelY: "above",
  },
  {
    icon: <FaLaptopCode />,
    label: "Real Projects",
    cx: 358,
    cy: 210,
    labelY: "below",
  },
  {
    icon: <MdWorkspacePremium />,
    label: "Certification",
    cx: 506,
    cy: 118,
    labelY: "above",
  },
  {
    icon: <FaFileAlt />,
    label: "Resume",
    cx: 654,
    cy: 210,
    labelY: "below",
  },
  {
    icon: <FaMicrophone />,
    label: "Interview",
    cx: 802,
    cy: 118,
    labelY: "above",
  },
  {
    icon: <FaBriefcase />,
    label: "Placement",
    cx: 920,
    cy: 210,
    labelY: "below",
  },
];

const TRACK_PATH =
  "M 62 210 " +
  "C 120 210 150 118 210 118 " +
  "C 270 118 298 210 358 210 " +
  "C 418 210 446 118 506 118 " +
  "C 566 118 594 210 654 210 " +
  "C 714 210 742 118 802 118 " +
  "C 862 118 870 210 920 210 " +
  "C 950 210 968 210 1002 252";

const FEATURE_CARDS = [
  {
    icon: <FaUserTie />,
    title: "Expert Mentors",
    desc: "Industry veterans guiding your journey from classroom to career.",
  },
  {
    icon: <FaTools />,
    title: "Real Projects",
    desc: "Build a portfolio with real-world enterprise projects.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Career Support",
    desc: "Resume reviews, interview  and continuous guidance.",
  },
  {
    icon: <FaBriefcase />,
    title: "Placement Assistance",
    desc: "Job referrals, mock interviews and hiring support.",
  },
];

/* ─────────────────────────────────────────────────────────────────
   SVG <defs> — gradients + filters
───────────────────────────────────────────────────────────────── */
function SvgDefs() {
  return (
    <defs>
      {/* Track gradient */}
      <linearGradient id="ct_trackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="35%" stopColor="#7c3aed" />
        <stop offset="70%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>

      {/* Station circle fill */}
      <radialGradient id="ct_stationBg" cx="50%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#ede9fe" />
      </radialGradient>

      {/* Destination circle fill */}
      <radialGradient id="ct_destBg" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#faf5ff" />
        <stop offset="100%" stopColor="#c4b5fd" />
      </radialGradient>

      {/* Station glow filter */}
      <filter id="ct_stationGlow" x="-55%" y="-55%" width="210%" height="210%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feFlood floodColor="#a855f7" floodOpacity="0.45" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Destination platform glow */}
      <filter id="ct_destGlow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="14" result="blur" />
        <feFlood floodColor="#7c3aed" floodOpacity="0.55" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Track shadow glow */}
      <filter id="ct_trackGlow" x="-5%" y="-200%" width="110%" height="500%">
        <feGaussianBlur stdDeviation="7" result="blur" />
        <feFlood floodColor="#a855f7" floodOpacity="0.28" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Single metro station
───────────────────────────────────────────────────────────────── */
function Station({ icon, label, cx, cy, labelY, delay }) {
  const charPx = 7.2;
  const padH = 20;
  const boxW = Math.max(label.length * charPx + padH * 2, 76);
  const boxH = 24;
  const boxX = cx - boxW / 2;
  const boxGapPx = 16; // gap between station edge and label box

  const aboveBoxY = cy - 28 - boxGapPx - boxH;
  const belowBoxY = cy + 28 + boxGapPx;
  const aboveTxtY = aboveBoxY + boxH / 2 + 1;
  const belowTxtY = belowBoxY + boxH / 2 + 1;

  return (
    <g>
      {/* Animated pulse ring */}
      <circle
        className={styles.pulseRing}
        cx={cx}
        cy={cy}
        r={18}
        fill="none"
        stroke="#a855f7"
        strokeWidth="2"
        style={{ animationDelay: `${delay}s` }}
      />

      {/* Station body with glow */}
      <g filter="url(#ct_stationGlow)">
        <circle
          cx={cx}
          cy={cy}
          r={28}
          fill="url(#ct_stationBg)"
          stroke="#c4b5fd"
          strokeWidth="2"
        />
        <circle
          cx={cx}
          cy={cy}
          r={22}
          fill="white"
          stroke="#a855f7"
          strokeWidth="1.5"
        />
        <foreignObject
  x={cx - 12}
  y={cy - 12}
  width="24"
  height="24"
>
  <div
    style={{
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#7c3aed",
      fontSize: "16px",
    }}
  >
    {icon}
  </div>
</foreignObject>
      </g>

      {/* Label pill — above or below */}
      {labelY === "above" ? (
        <>
          <rect
            x={boxX}
            y={aboveBoxY}
            width={boxW}
            height={boxH}
            rx="8"
            fill="rgba(167,139,250,0.12)"
            stroke="rgba(167,139,250,0.3)"
            strokeWidth="1"
          />
          <text
            x={cx}
            y={aboveTxtY}
            textAnchor="middle"
            dominantBaseline="middle"
            className={styles.stationLabel}
          >
            {label}
          </text>
        </>
      ) : (
        <>
          <rect
            x={boxX}
            y={belowBoxY}
            width={boxW}
            height={boxH}
            rx="8"
            fill="rgba(167,139,250,0.12)"
            stroke="rgba(167,139,250,0.3)"
            strokeWidth="1"
          />
          <text
            x={cx}
            y={belowTxtY}
            textAnchor="middle"
            dominantBaseline="middle"
            className={styles.stationLabel}
          >
            {label}
          </text>
        </>
      )}
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Animated travelling dot along the track
───────────────────────────────────────────────────────────────── */
function TrackDot({ delayS, color }) {
  return (
    <circle r="5" fill="white" stroke={color} strokeWidth="2">
      <animateMotion dur="2.8s" repeatCount="indefinite">
    <mpath xlinkHref="#ct_mainTrack" />
</animateMotion>
      <animate
        attributeName="opacity"
        values="0;0;1;1;0"
        keyTimes="0;0.05;0.1;0.9;1"
        dur="2.8s"
        repeatCount="indefinite"
        begin={`${delayS}s`}
      />
    </circle>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Destination platform — Dream Job
───────────────────────────────────────────────────────────────── */
function Destination() {
  const cx = 1002;
  const cy = 252;

  return (
    <g>
      {/* Outer halo */}
      <circle
        cx={cx}
        cy={cy}
        r={62}
        fill="rgba(139,92,246,0.08)"
        filter="url(#ct_destGlow)"
      />
      {/* Platform rings */}
      <circle
        cx={cx}
        cy={cy}
        r={46}
        fill="url(#ct_destBg)"
        stroke="#a855f7"
        strokeWidth="2.5"
      />
      <circle
        cx={cx}
        cy={cy}
        r={37}
        fill="white"
        stroke="#c4b5fd"
        strokeWidth="1.5"
      />

      {/* Trophy */}
    <foreignObject
  x={cx - 16}
  y={cy - 16}
  width="32"
  height="32"
>
  <div className={styles.destinationIcon}>
    <PiCrownSimpleFill />
  </div>
</foreignObject>

      {/* Rocket */}
      <text x={cx + 52} y={cy - 32} fontSize="16" className={styles.rocket}>
        
      </text>

      {/* Floating stars */}
      <text
        x={cx - 40}
        y={cy - 52}
        fontSize="10"
        className={styles.star}
        style={{ animationDelay: "0s" }}
      >
        
      </text>
      <text
        x={cx + 38}
        y={cy - 58}
        fontSize="8"
        className={styles.star}
        style={{ animationDelay: "0.6s" }}
      >
        
      </text>
      <text
        x={cx + 58}
        y={cy + 20}
        fontSize="9"
        className={styles.star}
        style={{ animationDelay: "1.2s" }}
      >
      
      </text>
      <text
        x={cx - 60}
        y={cy + 16}
        fontSize="8"
        className={styles.star}
        style={{ animationDelay: "1.8s" }}
      >
      
      </text>

      {/* Confetti sparks */}
      <text
        x={cx + 22}
        y={cy - 70}
        fontSize="9"
        className={styles.confetti}
        style={{ animationDelay: "0s" }}
      >
        
      </text>
      <text
        x={cx - 20}
        y={cy - 66}
        fontSize="7"
        className={styles.confetti}
        style={{ animationDelay: "0.5s" }}
      >
        
      </text>
      <text
        x={cx + 46}
        y={cy - 46}
        fontSize="6"
        className={styles.confetti}
        style={{ animationDelay: "1s" }}
      >
        
      </text>
      <text
        x={cx - 44}
        y={cy - 40}
        fontSize="6"
        className={styles.confetti}
        style={{ animationDelay: "1.5s" }}
      >
        
      </text>

      {/* Dream Job label */}
      <text x={cx} y={cy + 66} textAnchor="middle" className={styles.destTitle}>
        Dream Job
      </text>

      
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Metro Map SVG assembly
───────────────────────────────────────────────────────────────── */
function MetroMap() {
  return (
    <div className={styles.metroWrap}>
      <svg
        viewBox="0 0 1100 370"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        className={styles.svg}
        aria-label="Career Track metro-style journey map: seven stations from Choose Course to Placement, ending at Dream Job"
      >
        <SvgDefs />

        {/* Wide glow shadow behind track */}
        <path
          d={TRACK_PATH}
          fill="none"
          stroke="url(#ct_trackGrad)"
          strokeWidth="16"
          strokeLinecap="round"
          opacity="0.15"
          filter="url(#ct_trackGlow)"
        />

        {/* Main gradient track */}
        <path
          id="ct_mainTrack"
          d={TRACK_PATH}
          fill="none"
          stroke="url(#ct_trackGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Animated white dash overlay */}
        <path
          d={TRACK_PATH}
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="18 10"
          opacity="0.48"
          className={styles.trackDash}
        />

        {/* Seven stations */}
        {STATIONS.map((s, i) => (
          <Station key={s.label} {...s} delay={i * 0.35} />
        ))}

        {/* Destination */}
        <Destination />

        {/* Three animated dots travelling the track */}
        <TrackDot delayS={0} color="#a855f7" />
        <TrackDot delayS={0.93} color="#7c3aed" />
        <TrackDot delayS={1.86} color="#6366f1" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Individual glass feature card
───────────────────────────────────────────────────────────────── */
function FeatureCard({ icon, title, desc }) {
  return (
    <div className={styles.glassCard}>
      <div className={styles.cardIcon}>
    {icon}
</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{desc}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Root export
───────────────────────────────────────────────────────────────── */
export default function CareerTrack() {
  return (
    <section className={styles.root} aria-label="Career Track journey section">
      {/* Decorative background blobs */}
      <div className={`${styles.blob} ${styles.blob1}`} aria-hidden="true" />
      <div className={`${styles.blob} ${styles.blob2}`} aria-hidden="true" />
      <div className={`${styles.blob} ${styles.blob3}`} aria-hidden="true" />

      {/* ── Section header ── */}
      <header className={styles.header}>
      
        <h1 className={styles.heading}>
          Your Journey to
          <br />
          Dream Job
        </h1>

        <p className={styles.subheading}>
          A premium path from zero to placement —<br />
          engineered for the ambitious.
        </p>
      </header>

      {/* ── Metro map ── */}
      <MetroMap />

      {/* ── Feature cards ── */}
      <div
        className={styles.cardsRow}
        role="list"
        aria-label="Platform features"
      >
        {FEATURE_CARDS.map((card) => (
          <div key={card.title} role="listitem">
            <FeatureCard {...card} />
          </div>
        ))}
      </div>
    </section>
  );
}