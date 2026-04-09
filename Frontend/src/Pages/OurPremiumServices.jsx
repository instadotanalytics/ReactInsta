// OurPremiumServices.jsx — Luxury Dark Redesign
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OurPremiumServices.module.css";

/* ── Inject Google Fonts once ── */
if (typeof document !== "undefined" && !document.getElementById("ops-fonts")) {
  const link = document.createElement("link");
  link.id = "ops-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Syne:wght@400;600;700;800&display=swap";
  document.head.appendChild(link);
}

/* ── Inline SVG icons (no external dep needed) ── */
const InternshipIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const FullTimeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    <path d="M16 3H8L6 7h12z" />
    <circle cx="12" cy="14" r="2" />
  </svg>
);

const PlacementIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const ArrowRight = () => (
  <svg className={styles.btnArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Shield / Star / Users icons for footnote ── */
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/* ── Data ── */
const services = [
  {
    id: 1,
    title: "Internship",
    tagline: "Build Real Experience",
    route: "/career/internship",
    icon: InternshipIcon,
    image:
      "https://img.freepik.com/free-vector/internship-program-concept-illustration_114360-3327.jpg",
    features: [
      "Real-time project experience",
      "Industry expert mentorship",
      "Certificate of completion",
      "Flexible working hours",
    ],
  },
  {
    id: 2,
    title: "Full Time Job",
    tagline: "Launch Your Career",
    route: "/career/fulltime",
    icon: FullTimeIcon,
    image:
      "https://img.freepik.com/free-vector/job-interview-concept-illustration_114360-2357.jpg",
    features: [
      "Full-time employment",
      "Health insurance benefits",
      "Paid leaves & holidays",
      "Professional development",
    ],
    popular: true,
  },
  {
    id: 3,
    title: "Placement",
    tagline: "Land Your Dream Role",
    route: "/career/placement",
    icon: PlacementIcon,
    image:
      "https://img.freepik.com/free-vector/career-path-concept-illustration_114360-3506.jpg",
    features: [
      "100% placement assistance",
      "Resume building workshop",
      "Mock interview sessions",
      "Company referrals",
    ],
  },
];

const footNotes = [
  { icon: ShieldIcon, text: "Verified opportunities" },
  { icon: StarIcon,   text: "4.9 average rating" },
  { icon: UsersIcon,  text: "10,000+ placed students" },
];

/* ── Component ── */
const OurPremiumServices = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.premiumSection}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>Premium Services</div>
          <h2 className={styles.title}>
            Your Path to a <em>Successful Career</em>
          </h2>
          <p className={styles.subtitle}>
            Choose the service that fits your goals — from first internship to full-time placement.
          </p>
        </div>

        {/* Cards */}
        <div className={styles.cardGrid}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`${styles.card} ${service.popular ? styles.popularCard : ""}`}
                onClick={() => navigate(service.route)}
              >
                {/* top accent bar */}
                <div className={styles.cardAccentBar} />

                {/* popular badge */}
                {service.popular && (
                  <div className={styles.popularBadge}>Most Popular</div>
                )}

                {/* image zone */}
                <div className={styles.imageContainer}>
                  <div className={styles.imageOverlay} />
                  <img
                    src={service.image}
                    alt={service.title}
                    className={styles.cardImage}
                  />
                  <div className={styles.serviceIconWrap}>
                    <Icon />
                  </div>
                </div>

                {/* content */}
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <span className={styles.serviceTagline}>{service.tagline}</span>
                  </div>

                  <hr className={styles.cardDivider} />

                  <div className={styles.featuresList}>
                    {service.features.map((feat, i) => (
                      <div key={i} className={styles.featureItem}>
                        <div className={styles.checkWrap}>
                          <CheckIcon />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={styles.detailsButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(service.route);
                    }}
                  >
                    <span>View All Details</span>
                    <ArrowRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote trust strip */}
        <div className={styles.footNote}>
          {footNotes.map((item, i) => {
            const FNIcon = item.icon;
            return (
              <React.Fragment key={i}>
                <div className={styles.footNoteItem}>
                  <FNIcon />
                  <span>{item.text}</span>
                </div>
                {i < footNotes.length - 1 && (
                  <div className={styles.footNoteDot} />
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default OurPremiumServices;