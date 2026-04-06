import React from 'react';
import styles from './AboutRedhat.module.css';

const AboutRedhat = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Left Content */}
          <div className={styles.contentLeft}>
            <span className={styles.subtitle}>About Red Hat</span>
            <h1 className={styles.title}>
              World's Leading Provider of 
              <span className={styles.highlight}> Open Source</span> Solutions
            </h1>
            <p className={styles.description}>
              Red Hat is the world's leading provider of enterprise open source solutions, 
              including Linux, cloud, container, and Kubernetes technologies. We use a 
              community-powered approach to deliver reliable and high-performance IT 
              solutions.
            </p>
            
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <h3 className={styles.statNumber}>25+</h3>
                <p className={styles.statLabel}>Years of Innovation</p>
              </div>
              <div className={styles.statItem}>
                <h3 className={styles.statNumber}>90+</h3>
                <p className={styles.statLabel}>Fortune 500 Companies</p>
              </div>
              <div className={styles.statItem}>
                <h3 className={styles.statNumber}>20B+</h3>
                <p className={styles.statLabel}>Container Downloads</p>
              </div>
            </div>

            <div className={styles.featuresList}>
              <div className={styles.feature}>
                <span className={styles.checkIcon}>✓</span>
                <span>Enterprise-grade Linux platforms</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.checkIcon}>✓</span>
                <span>Cloud-native development solutions</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.checkIcon}>✓</span>
                <span>Automation and management tools</span>
              </div>
            </div>

          </div>

          {/* Right Image */}
          <div className={styles.contentRight}>
            <div className={styles.imageWrapper}>
              <img 
                src="https://i.pinimg.com/736x/00/fc/8d/00fc8dc5b18fef41a06763154fffe238.jpg" 
                alt="Red Hat Technology Infrastructure" 
                className={styles.image}
              />
              <div className={styles.imageOverlay}></div>
              <div className={styles.experienceBadge}>
                <span className={styles.badgeNumber}>25+</span>
                <span className={styles.badgeText}>Years of<br />Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutRedhat;