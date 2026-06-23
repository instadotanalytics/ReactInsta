// OurPremiumServices.jsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OurPremiumServices.module.css";

/* ── Inject Google Fonts ── */
if (typeof document !== "undefined" && !document.getElementById("ops-fonts")) {
  const link = document.createElement("link");
  link.id = "ops-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(link);
}

/* ── Icons ── */
const ArrowRight = () => (
  <svg
    className={styles.btnArrow}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg
    className={styles.checkIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Data ── */
const services = [
  {
    id: 1,
    title: "Internship",
    tagline: "Build Real Experience",
    description: "Gain practical industry exposure through live projects.",
    route: "/career/internship",
    image: "/intern.png",
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
    description: "Find opportunities that match your skills and goals.",
    route: "/career/fulltime",
    image: "/jobseeker.png",
    features: [
      "Full-time employment",
      "Health insurance benefits",
      "Paid leaves & holidays",
      "Professional development",
    ],
  },
  {
    id: 3,
    title: "Placement",
    tagline: "Land Your Dream Role",
    description:
      "Get placement support, resume reviews, and interview preparation.",
    route: "/career/placement",
    image: "/placement.png",
    features: [
      "100% placement assistance",
      "Resume building workshop",
      "Mock interview sessions",
      "Company referrals",
    ],
  },
];

/* ── Component ── */
const OurPremiumServices = () => {
  const navigate = useNavigate();
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 },
    );

    cardsRef.current.forEach((card) => {
      if (card) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.premiumSection}>
      {/* Animated Gradient Background */}
      <div className={styles.gradientBg}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gradientOrb3} />
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}> Our Premium Services</span>
          <h2 className={styles.title}>
            Your Path to a{" "}
            <span className={styles.highlight}>Successful Career</span>
          </h2>
          <p className={styles.subtitle}>
            Choose the service that fits your goals — from first internship to
            full-time placement.
          </p>
        </div>

        {/* Cards */}
        <div className={styles.cardGrid}>
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={styles.card}
              onClick={() => navigate(service.route)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={service.image}
                  alt={service.title}
                  className={styles.cardImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlay} />
                {/* Title on image */}
                <div className={styles.imageTitle}>
                  <h3 className={styles.imageTitleText}>{service.title}</h3>
                  <span className={styles.imageTagline}>{service.tagline}</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <>
                  {/* <div className={styles.leftContent}> */}
                  <ul className={styles.featuresList}>
                    {service.features.map((feat, i) => (
                      <li key={i} className={styles.featureItem}>
                        <CheckIcon />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  {/* </div> */}

                  {/* <div className={styles.rightContent}> */}
                  <p className={styles.description}>{service.description}</p>

                  <button className={styles.ctaButton}>
                    <span>VIEW ALL DETAILS</span>
                    <ArrowRight />
                  </button>
                  {/* </div> */}
                </>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPremiumServices;
