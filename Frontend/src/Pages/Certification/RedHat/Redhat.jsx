import React from 'react';
import styles from './Redhat.module.css';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import AboutRedhat from './AboutRedhat';
import CertificationApplyForm from '../../CertificationApplyForm';
import ReviewSection from '../../ReviewSection';
import Companypartners from '../../Courses/Companypartners';
import BenefitsRedhat from './BenefitsRedhat';


const Redhat = () => {
  return (
    <>
    <Header/>
    <div className={styles.heroContainer}>
      <div className={styles.heroWrapper}>
        {/* Left side - Image */}
        <div className={styles.heroImage}>
          <img 
            src="https://i.pinimg.com/736x/de/d5/e8/ded5e88053296b4d926b80263fee98f6.jpg" 
            alt="Red Hat Technology" 
            className={styles.image}
          />
          <div className={styles.imageOverlay}></div>
        </div>

        {/* Right side - Content */}
        <div className={styles.heroContent}>
          <div className={styles.contentBox}>
            <h1 className={styles.title}>
              Red Hat<br />
              <span className={styles.titleHighlight}>Innovation</span>
            </h1>
            
            <p className={styles.description}>
              Open source solutions for enterprise transformation. 
              Empowering businesses with cutting-edge technology and 
              community-driven innovation.
            </p>

            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>20+</span>
                <span className={styles.statLabel}>Years of Innovation</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>90%</span>
                <span className={styles.statLabel}>Fortune 500 Trust</span>
              </div>
            </div>

            <div className={styles.featuresGrid}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>⚡</span>
                <span>Enterprise Ready</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🔒</span>
                <span>Security First</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🌍</span>
                <span>Global Community</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🚀</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AboutRedhat/>
    <Companypartners/>
    <CertificationApplyForm/>
    <BenefitsRedhat/>
    <ReviewSection/>
    <Footer/>
    </>
  );
};

export default Redhat;
