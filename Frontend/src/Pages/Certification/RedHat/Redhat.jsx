import React from 'react';
import styles from './Redhat.module.css';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import AboutRedhat from './AboutRedhat';
import CertificationApplyForm from '../../CertificationApplyForm';
import ReviewSection from '../../ReviewSection';
import Companypartners from '../../Courses/Companypartners';
import BenefitsRedhat from './BenefitsRedhat';

const certifications = [
  { code: 'RHCSA',     name: 'Linux Administration',     level: 'Foundational', color: '#3B82F6' },
  { code: 'RHCE',      name: 'Automation & Engineering', level: 'Advanced',     color: '#6366F1' },
  { code: 'OpenShift', name: 'Containers & Kubernetes',  level: 'Specialist',   color: '#0EA5E9' },
  { code: 'RHCA',      name: 'Architect Level',          level: 'Expert',       color: '#8B5CF6' },
];

const Redhat = () => {
  return (
    <>
      <Header />

      {/* ── HERO ── */}
      <section className={styles.hero}>

        {/* Pure CSS layered background */}
        <div className={styles.bgWrap} aria-hidden="true">
          <div className={styles.bgGlow1} />
          <div className={styles.bgGlow2} />
          <div className={styles.bgGlow3} />
          <div className={styles.bgRing1} />
          <div className={styles.bgRing2} />
          <div className={styles.bgRing3} />
          <div className={styles.bgRing4} />
          <div className={styles.bgBlob1} />
          <div className={styles.bgBlob2} />
          <div className={styles.bgShimmer} />
        </div>

        <div className={styles.heroInner}>

          {/* Heading block */}
          <div className={styles.topBlock}>
            <span className={styles.badge}>Red Hat Certification Platform</span>
            <h1 className={styles.heroTitle}>
              Red Hat <span className={styles.heroAccent}>Certifications</span>
            </h1>
            <p className={styles.heroSub}>
              Master Linux Administration, Automation, Containers &amp; Enterprise
              Infrastructure through industry-recognized certification paths.
            </p>
          </div>

          {/* Certification cards */}
          <div className={styles.cardsRow}>
            {certifications.map((cert, i) => (
              <div
                key={cert.code}
                className={styles.card}
                style={{ animationDelay: `${i * 0.35}s` }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardCode} style={{ color: cert.color }}>{cert.code}</span>
                  <span className={styles.cardLevel}>{cert.level}</span>
                </div>
                <p className={styles.cardName}>{cert.name}</p>
                <div className={styles.cardAccentLine} style={{ background: cert.color }} />
              </div>
            ))}
          </div>

        </div>
      </section>

      <AboutRedhat />
      <Companypartners />
      <CertificationApplyForm />
      <BenefitsRedhat />
      <ReviewSection />
      <Footer />
    </>
  );
};

export default Redhat;