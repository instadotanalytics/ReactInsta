import React, { useEffect } from 'react';
import styles from './Internship.module.css';
import { 
  FaRocket,
  FaArrowRight,
  FaStar,
  FaUsers,
  FaRegFileAlt,
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

const Internship = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { icon: <FaBuilding />, value: "50+", label: "Partner Companies" },
    { icon: <FaUserGraduate />, value: "500+", label: "Interns Placed" },
    { icon: <FaRegCalendarAlt />, value: "6", label: "Programs" },
    { icon: <FaStar />, value: "4.8", label: "Rating" }
  ];

  return (
    <>
    <Header/>
    <div className={styles.internshipPage}>
      
      
      {/* Modern Banner Section */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerContent}>
          
            <h1 className={styles.bannerTitle}>
              Kickstart Your Professional Journey with{' '}
              <span className={styles.gradientText}>Industry-Led Internships</span>
            </h1>
            <p className={styles.bannerDesc}>
              Join 500+ successful interns who transformed their careers through hands-on projects, 
              expert mentorship, and real-world experience at India's top companies.
            </p>
            
            <div className={styles.bannerStats}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statBox}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.bannerCompanies}>
              <p className={styles.companiesText}>Our interns work at</p>
              <div className={styles.companyLogos}>
                <span>Microsoft</span>
                <span>Google</span>
                <span>Amazon</span>
                <span>Meta</span>
                <span>Apple</span>
              </div>
            </div>
          </div>

          <div className={styles.bannerImageWrapper}>
            <div className={styles.bannerImageContainer}>
              <img 
                src="https://i.pinimg.com/736x/47/38/6c/47386cc6981f75d199cf3ab716def9b7.jpg" 
                alt="Internship Program"
                className={styles.bannerImage}
              />
              <div className={styles.floatingCard} style={{ top: '20%', right: '10%' }}>
                <FaStar className={styles.cardIcon} />
                <div>
                  <strong>95%</strong>
                  <span>Placement Rate</span>
                </div>
              </div>
              <div className={styles.floatingCard} style={{ bottom: '20%', left: '10%' }}>
                <FaUsers className={styles.cardIcon} />
                <div>
                  <strong>50+</strong>
                  <span>Mentors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <InternshipForm/>
      <Companypartners/>
      <ReviewSection/>
      <WhyJoinUS/>
      <OurImpact/>
      <FAQSection/>
      <Footer />
    </div>
    </>
  );
};

export default Internship;