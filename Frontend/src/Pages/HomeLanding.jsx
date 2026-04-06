import React, { useEffect } from 'react';
import styles from './HomeLanding.module.css';
import { 
  FaRocket,
  FaArrowRight,
  FaStar,
  FaUsers,
  FaCheckCircle,
  FaTrophy,
  FaPlayCircle
} from 'react-icons/fa';


const HomeLanding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const successStats = [
    { value: "5000+", label: "Students Placed" },
    { value: "500+", label: "Hiring Partners" },
    { value: "8.5 LPA", label: "Average Package" },
    { value: "25 LPA", label: "Highest Package" }
  ];

  return (
    <div className={styles.homeLanding}>
      

      {/* Hero Banner Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>
              <FaRocket className={styles.tagIcon} />
              <span>India's #1 Training Institute </span>
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.gradientText}>100% Job Guarantee</span>
              <br />Training Programs
            </h1>
            <p className={styles.heroDesc}>
              Transform your career with industry-relevant training. Get placed in top MNCs 
              with 6-25 LPA packages. 5000+ successful placements and counting!
            </p>

            <div className={styles.successStats}>
              {successStats.map((stat, index) => (
                <div key={index} className={styles.successStat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

          
            <div className={styles.trustBadges}>
              <span className={styles.trustBadge}>
                <FaCheckCircle /> 100% Job Guarantee
              </span>
              <span className={styles.trustBadge}>
                <FaCheckCircle /> ISO Certified
              </span>
              <span className={styles.trustBadge}>
                <FaCheckCircle /> Government Approved
              </span>
            </div>
          </div>

          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageContainer}>
              <img 
                src="https://i.pinimg.com/736x/1a/2f/fa/1a2ffa9d918a1a13d7810f5a9de19906.jpg" 
                alt="Students Learning"
                className={styles.heroImage}
              />
              <div className={styles.floatingCard} style={{ top: '15%', right: '10%' }}>
                <FaTrophy className={styles.cardIcon} style={{ color: '#ffb703' }} />
                <div>
                  <strong>100%</strong>
                  <span>Job Guarantee</span>
                </div>
              </div>
              <div className={styles.floatingCard} style={{ bottom: '20%', left: '10%' }}>
                <FaUsers className={styles.cardIcon} style={{ color: '#4361ee' }} />
                <div>
                  <strong>5000+</strong>
                  <span>Students Placed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default HomeLanding;