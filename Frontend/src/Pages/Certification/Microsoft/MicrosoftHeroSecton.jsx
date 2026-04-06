import React from 'react';
import styles from './MicrosoftHeroSection.module.css';
import { FaStar, FaUsers, FaChalkboardTeacher, FaCertificate } from 'react-icons/fa';
import { MdLiveTv, MdSupportAgent } from 'react-icons/md';
import { GiCheckMark } from 'react-icons/gi';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import AboutMicrosoft from './AboutMicrosoft';
import CertificationApplyForm from '../../CertificationApplyForm';
import CallToAction from './CallToAction';
import WhyJoinUS from '../../WhyJoinUS';
import ReviewSection from '../../ReviewSection';
import Companypartners from '../../Courses/Companypartners';

const MicrosoftHeroSection = () => {
  return (
    <>
    <Header/>
    <section className={styles.heroSection}>
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.contentLeft}>
          <h1 className={styles.mainHeading}>
            Upskill Yourself with <span className={styles.highlight}>Industry-Ready</span> Courses
          </h1>
          
          <p className={styles.description}>
            Choose from 25+ professional courses designed by industry experts. 
            Get certified and boost your career with 100% placement assistance.
          </p>

          {/* Stats Cards */}
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>25+</div>
              <div className={styles.statLabel}>Courses</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>5000+</div>
              <div className={styles.statLabel}>Students</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>150+</div>
              <div className={styles.statLabel}>Batches</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>4.9</div>
              <div className={styles.statLabel}>
                Rating <FaStar className={styles.starIcon} />
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <MdLiveTv className={styles.featureIcon} />
              <span>Live Classes</span>
            </div>
            <div className={styles.featureItem}>
              <FaChalkboardTeacher className={styles.featureIcon} />
              <span>1:1 Mentorship</span>
            </div>
            <div className={styles.featureItem}>
              <MdSupportAgent className={styles.featureIcon} />
              <span>Placement Support</span>
            </div>
            <div className={styles.featureItem}>
              <FaCertificate className={styles.featureIcon} />
              <span>Certification</span>
            </div>
          </div>

          {/* Popular Courses */}
          <div className={styles.popularCourses}>
            <h3 className={styles.popularTitle}>Popular Courses:</h3>
            <div className={styles.courseTags}>
              <span className={styles.courseTag}>Full Stack Development</span>
              <span className={styles.courseTag}>Data Science</span>
              <span className={styles.courseTag}>Digital Marketing</span>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className={styles.bottomStats}>
            <div className={styles.bottomStatItem}>
              <span className={styles.bottomStatHighlight}>Learn from Industry Experts</span>
            </div>
            <div className={styles.bottomStatDivider}>|</div>
            <div className={styles.bottomStatItem}>
              <span className={styles.bottomStatHighlight}>25+ Courses</span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className={styles.contentRight}>
          <div className={styles.imageWrapper}>
            <img 
              src="https://i.pinimg.com/736x/ef/45/b5/ef45b5a1100a3310e7429aa92131f159.jpg" 
              alt="Microsoft Certification Training"
              className={styles.heroImage}
            />
            <div className={styles.imageOverlay}></div>
            
            {/* Microsoft Badge */}
            <div className={styles.microsoftBadge}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" 
                alt="Microsoft"
                className={styles.microsoftLogo}
              />
              <span>Certified Training Partner</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <AboutMicrosoft/>
    <Companypartners/>
    <CertificationApplyForm/>
    <WhyJoinUS/>
    <CallToAction/>
    <ReviewSection/>
    <Footer/>
    </>
  );
};

export default MicrosoftHeroSection;