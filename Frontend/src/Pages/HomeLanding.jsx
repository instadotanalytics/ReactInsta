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
               <span>Insta Dot Analytics  </span><br />Best IT Tranning  Institude in Indore
            


Transform your career with industry-focused, job-oriented training programs. Learn in-demand skills guided by expert mentors and work on real-world projects. Join 5000+ successful students and get placed in top MNCs with packages ranging from 6–25 LPA. Your journey to a successful IT career starts here!
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
                src="https://i.pinimg.com/1200x/06/f6/23/06f6235b88be4decbae8cae39ef01343.jpg" 
                alt="Students Learning"
                className={styles.heroImage}
              />
              
             
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default HomeLanding;