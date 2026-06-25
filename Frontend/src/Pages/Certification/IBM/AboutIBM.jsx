import React from 'react';
import styles from './AboutIBM.module.css';
import { FiAward, FiTrendingUp, FiGlobe, FiClock, FiArrowRight } from 'react-icons/fi';
import { FaCloud, FaRobot, FaShieldAlt, FaChartBar } from 'react-icons/fa';
import { HiOutlineBadgeCheck } from 'react-icons/hi';

const AboutIBMCertifications = () => {
  const certifications = [
    { icon: <FaCloud />, name: 'Cloud Computing', count: '8 certifications', color: '#2563EB', bg: '#EFF6FF' },
    { icon: <FaRobot />, name: 'Artificial Intelligence', count: '6 certifications', color: '#7C3AED', bg: '#F5F3FF' },
    { icon: <FaChartBar />, name: 'Data Science', count: '5 certifications', color: '#059669', bg: '#ECFDF5' },
    { icon: <FaShieldAlt />, name: 'Cybersecurity', count: '4 certifications', color: '#EA580C', bg: '#FFF7ED' }
  ];

  const benefits = [
    { icon: <FiAward />, text: 'Industry-recognized credentials' },
    { icon: <FiTrendingUp />, text: 'Career growth & higher salary' },
    { icon: <FiGlobe />, text: 'Accepted in 150+ countries' },
    { icon: <FiClock />, text: 'Self-paced learning' }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* ─── LEFT CONTENT ─── */}
        <div className={styles.leftContent}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badge}>
              <HiOutlineBadgeCheck size={16} />
              IBM CERTIFICATIONS
            </span>
          </div>

          <h1 className={styles.title}>
            Validate Your Skills with <span className={styles.highlight}>IBM</span>
          </h1>

          <p className={styles.description}>
            Earn globally recognized credentials that demonstrate your expertise
            in cutting-edge technologies. IBM certifications open doors to top
            opportunities worldwide.
          </p>

          {/* Quick Stats */}
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Certifications</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>1M+</span>
              <span className={styles.statLabel}>Professionals</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>87%</span>
              <span className={styles.statLabel}>Hike in salary</span>
            </div>
          </div>

          {/* Certification Categories */}
          <div className={styles.certGrid}>
            {certifications.map((cert, index) => (
              <div key={index} className={styles.certItem} style={{ '--hover-color': cert.color }}>
                <div className={styles.certIcon} style={{ background: cert.bg, color: cert.color }}>
                  {cert.icon}
                </div>
                <div className={styles.certInfo}>
                  <h4>{cert.name}</h4>
                  <p>{cert.count}</p>
                </div>
                <FiArrowRight className={styles.certArrow} />
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className={styles.benefitsWrapper}>
            <div className={styles.benefitsList}>
              {benefits.map((benefit, index) => (
                <div key={index} className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>
                    {benefit.icon}
                  </div>
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT CONTENT ─── */}
        <div className={styles.rightContent}>
          <div className={styles.imageContainer}>
            <img 
  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
  alt="IBM Professional Certification"
  className={styles.image}
/>
            <div className={styles.imageOverlay}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIBMCertifications;