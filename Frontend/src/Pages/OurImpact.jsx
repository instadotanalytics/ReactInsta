import React from "react";
import styles from "./OurImpact.module.css";

const ImpactIcon = () => (
  <div className={styles.iconWrapper}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);

const features = [
  {
    title: "Industry-Aligned Curriculum",
    desc: "Courses designed with top industry experts",
  },
  {
    title: "Hands-on Projects",
    desc: "Build real-world portfolio with live projects",
  },
  {
    title: "Global Certification",
    desc: "Internationally recognized certificates",
  },
  {
    title: "Expert Mentors",
    desc: "Learn from seasoned industry professionals",
  },
];

const stats = [
  { number: "10K+", label: "Students Trained" },
  { number: "95%",  label: "Placement Rate"   },
  { number: "50+",  label: "Expert Mentors"   },
  { number: "100+", label: "Corporate Partners"},
];

const OurImpact = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <div className={styles.content}>

        {/* ── LEFT ── */}
        <div className={styles.left}>
          <span className={styles.badge}>Our Impact</span>

          <h2 className={styles.title}>
            Transforming Careers Through
            <br />
            <span className={styles.highlight}> Quality Education</span>
          </h2>

          <p className={styles.desc}>
            We provide industry-focused training programs that help learners
            gain real-world skills and grow their careers. Our comprehensive
            approach ensures every student achieves their professional goals.
          </p>

          <div className={styles.features}>
            {features.map((f, i) => (
              <div className={styles.featureItem} key={i}>
                <div className={styles.featureIcon}>
                  <ImpactIcon />
                </div>
                <div className={styles.featureContent}>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.stats}>
            {stats.map((s, i) => (
              <div className={styles.stat} key={i}>
                <div className={styles.statNumber}>
                  <span>{s.number}</span>
                </div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            {/* Top-right floating rating card */}
            <div className={styles.ratingBadge}>
              <div className={styles.ratingStars}>
                {["⭐","⭐","⭐","⭐","⭐"].map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <div className={styles.ratingInfo}>
                <div className={styles.ratingNumber}>4.9</div>
                <div className={styles.ratingLabel}>Student Rating</div>
              </div>
            </div>

            <img
              src="https://i.pinimg.com/736x/40/c3/64/40c3647635f831066267fc7c39917030.jpg"
              alt="Training session with students and mentor"
              className={styles.image}
              loading="lazy"
            />

            {/* Bottom-left floating experience badge */}
            <div className={styles.experienceBadge}>
              <div className={styles.experienceNumber}>15+</div>
              <div className={styles.experienceText}>Years of Excellence</div>
            </div>

            <div className={styles.pattern} />
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default OurImpact;