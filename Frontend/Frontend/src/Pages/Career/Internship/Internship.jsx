import React, { useEffect } from "react";
import styles from "./Internship.module.css";
import {
  FaStar,
  FaBuilding,
  FaUserGraduate,
  FaRegCalendarAlt,
  FaArrowRight,
  FaThLarge,
} from "react-icons/fa";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Companypartners from "../../Courses/Companypartners";
import InternshipForm from "./InternshipForm";
// import ReviewSection from "../../ReviewSection";
import FAQSection from "../../FAQSection";
import HowItWorks from "./HowItWorks";

// import WhyJoinUS from "../../WhyJoinUS";
// import OurImpact from "../../OurImpact";

const stats = [
  { icon: <FaBuilding />, value: "50+", label: "Partner Companies" },
  { icon: <FaUserGraduate />, value: "500+", label: "Interns Placed" },
  { icon: <FaRegCalendarAlt />, value: "6", label: "Programs" },
  { icon: <FaStar />, value: "4.8", label: "Rating" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Internship = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className={styles.internshipPage}>
        {/* ── HERO SECTION ── */}
        <section className={styles.heroSection}>
          {/* light blue gradient + dotted background, no image */}
          <div className={styles.heroBg}>
            <div className={styles.heroDots} />
          </div>

          {/* content */}
          <div className={styles.heroInner}>
            {/* headline */}
            <h1 className={styles.heroTitle}>
              Kickstart Your{" "}
              <span className={styles.heroAccent}>Professional</span>
              <br />
              Journey. <span className={styles.heroAccent}>Powered by AI.</span>
            </h1>

            {/* sub-copy */}
            <p className={styles.heroDesc}>
              Join 500+ successful interns who transformed their careers through
              hands-on projects, expert mentorship, and real-world experience at
              India's top companies.
            </p>

            {/* CTA row */}
            <div className={styles.heroActions}>
              <button
                className={styles.ctaPrimary}
                onClick={() => scrollTo("internship-form")}
              >
                Start Your Career <FaArrowRight />
              </button>
              <button
                className={styles.ctaSecondary}
                onClick={() => scrollTo("explore-programs")}
              >
                <FaThLarge /> Explore Programs
              </button>
            </div>

            {/* stats strip */}
            <div className={styles.statsStrip}>
              {stats.map((s, i) => (
                <div key={i} className={styles.statPill}>
                  <span className={styles.statPillIcon}>{s.icon}</span>
                  <span className={styles.statPillValue}>{s.value}</span>
                  <span className={styles.statPillLabel}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* companies */}
            <div className={styles.heroCompanies}>
              <span className={styles.companiesLabel}>Our interns work at</span>
              <div className={styles.companiesList}>
                {["Microsoft", "Google", "Amazon", "Meta", "Apple"].map((c) => (
                  <span key={c} className={styles.companyName}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <HowItWorks />

        {/* ── REST OF PAGE (unchanged) ── */}
        <div id="internship-form" style={{ scrollMarginTop: "80px" }}>
          <InternshipForm />
        </div>
        
        {/* <ReviewSection />
        <WhyJoinUS />
        <OurImpact /> */}
        <div id="explore-programs" style={{ scrollMarginTop: "80px" }}>
          <Companypartners />
        </div>
        <FAQSection />
        <Footer />
      </div>
    </>
  );
};

export default Internship;
