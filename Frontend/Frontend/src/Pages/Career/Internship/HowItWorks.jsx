import React, { useEffect, useRef, useState } from "react";
import styles from "./HowItWorks.module.css";
import { FiEdit3, FiUserCheck, FiVideo, FiAward } from "react-icons/fi";

const steps = [
  {
    icon: FiEdit3,
    num: "01",
    title: "Apply Online",
    desc: "Fill out our quick application form with your details, skills, and preferences in under 3 minutes.",
  },
  {
    icon: FiUserCheck,
    num: "02",
    title: "Get Shortlisted",
    desc: "Our team reviews your profile and matches you with internships that fit your skills and goals.",
  },
  {
    icon: FiVideo,
    num: "03",
    title: "Interview & Onboard",
    desc: "Meet with our partner companies through a simple interview process and get onboarded quickly.",
  },
  {
    icon: FiAward,
    num: "04",
    title: "Start Your Internship",
    desc: "Begin real-world projects, gain mentorship, and build a portfolio that sets you apart.",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.bgGlow1} aria-hidden="true" />
      <div className={styles.bgGlow2} aria-hidden="true" />
      <div className={styles.bgDots} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.header}>
          
          <h2 className={styles.title}>
            How It <span className={styles.titleAccent}>Works</span>
          </h2>
          <p className={styles.subtitle}>
            From application to your first day — here's exactly what to expect
            on your journey with us.
          </p>
        </div>

        <div
          className={`${styles.stepper} ${isVisible ? styles.stepperVisible : ""}`}
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.num}>
                <div
                  className={styles.stepItem}
                  style={{ transitionDelay: `${i * 140}ms` }}
                >
                  <div className={styles.iconCircle}>
                    <div className={styles.iconCircleGlow} aria-hidden="true" />
                    <Icon size={24} className={styles.icon} />
                    <span className={styles.stepBadge}>{step.num}</span>
                  </div>
                  <div className={styles.stepText}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <div
                    className={styles.connector}
                    style={{ transitionDelay: `${i * 140 + 70}ms` }}
                    aria-hidden="true"
                  >
                    <div className={styles.connectorFill} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
