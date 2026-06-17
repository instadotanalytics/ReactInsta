import React, { useEffect, useCallback } from 'react';
import styles from './Internship.module.css';
import { 
  FaStar,
  FaBuilding,
  FaUserGraduate,
  FaRegCalendarAlt
} from 'react-icons/fa';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Companypartners from '../../Courses/Companypartners';
import InternshipForm from './InternshipForm';
import ReviewSection from '../../ReviewSection';
import FAQSection from '../../FAQSection';
import WhyJoinUS from '../../WhyJoinUS';
import OurImpact from '../../OurImpact';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const stats = [
  { icon: <FaBuilding />, value: '50+',  label: 'Partner Companies' },
  { icon: <FaUserGraduate />, value: '500+', label: 'Interns Placed' },
  { icon: <FaRegCalendarAlt />, value: '6',    label: 'Programs' },
  { icon: <FaStar />, value: '4.8', label: 'Rating' },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Internship = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Header />
      <div className={styles.internshipPage}>

        {/* ── HERO SECTION ── */}
        <section className={styles.heroSection}>
          {/* full-bleed background image */}
          <div className={styles.heroBg}>
            <img
              src={HERO_IMAGE}
              alt="Interns collaborating"
              className={styles.heroBgImg}
            />
            {/* layered overlays */}
            <div className={styles.heroOverlay} />
            <div className={styles.heroOverlayGradient} />
          </div>

          {/* content */}
          <div className={styles.heroInner}>

            {/* headline */}
            <h1 className={styles.heroTitle}>
              Kickstart Your<br />
              <span className={styles.heroAccent}>Professional Journey</span>
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
                onClick={() => scrollTo('internship-form')}
              >
                Start Your Career
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
                {['Microsoft', 'Google', 'Amazon', 'Meta', 'Apple'].map((c) => (
                  <span key={c} className={styles.companyName}>{c}</span>
                ))}
              </div>
            </div>
          </div>


        </section>

        {/* ── REST OF PAGE (unchanged) ── */}
        <div id="internship-form" style={{ scrollMarginTop: '80px' }}>
          <InternshipForm />
        </div>
        <div id="explore-programs" style={{ scrollMarginTop: '80px' }}>
          <Companypartners />
        </div>
        <ReviewSection />
        <WhyJoinUS />
        <OurImpact />
        <FAQSection />
        <Footer />
      </div>
    </>
  );
};

export default Internship;