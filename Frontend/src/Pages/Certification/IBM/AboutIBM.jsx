import React from 'react';
import styles from './AboutIBM.module.css';
import { FiAward, FiTrendingUp, FiGlobe, FiClock, FiCheckCircle, FiBriefcase } from 'react-icons/fi';
import { FaCloud, FaRobot, FaShieldAlt, FaChartBar } from 'react-icons/fa';

const AboutIBMCertifications = () => {
  const certifications = [
    { icon: <FaCloud />, name: 'Cloud Computing', count: '8 certifications' },
    { icon: <FaRobot />, name: 'Artificial Intelligence', count: '6 certifications' },
    { icon: <FaChartBar />, name: 'Data Science', count: '5 certifications' },
    { icon: <FaShieldAlt />, name: 'Cybersecurity', count: '4 certifications' }
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
        
        {/* LEFT CONTENT - Compact & Clean */}
        <div className={styles.leftContent}>
          <span className={styles.badge}>IBM CERTIFICATIONS</span>
          
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
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Certifications</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>1M+</span>
              <span className={styles.statLabel}>Professionals</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>87%</span>
              <span className={styles.statLabel}>Hike in salary</span>
            </div>
          </div>

          {/* Certification Categories */}
          <div className={styles.certGrid}>
            {certifications.map((cert, index) => (
              <div key={index} className={styles.certItem}>
                <span className={styles.certIcon}>{cert.icon}</span>
                <div>
                  <h4>{cert.name}</h4>
                  <p>{cert.count}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits List */}
          <div className={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <div key={index} className={styles.benefitItem}>
                <span className={styles.benefitIcon}>{benefit.icon}</span>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - Image */}
        <div className={styles.rightContent}>
          <div className={styles.imageWrapper}>
            <img 
              src="https://i.pinimg.com/1200x/10/1d/67/101d67f6bc7fa6153e4a8ec68c578c38.jpg" 
              alt="IBM Certification Professional"
              className={styles.image}
            />
            
            {/* Floating Badge */}
            <div className={styles.floatingBadge}>
              <FiBriefcase className={styles.badgeIcon} />
              <div>
                <strong>IBM Certified</strong>
                <span>Premium Partner</span>
              </div>
            </div>

            {/* Small Stats Card */}
            <div className={styles.statsCard}>
              <div className={styles.statsCardItem}>
                <FiAward />
                <span>Global Recognition</span>
              </div>
              <div className={styles.statsCardItem}>
                <FiTrendingUp />
                <span>Career Boost</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIBMCertifications;