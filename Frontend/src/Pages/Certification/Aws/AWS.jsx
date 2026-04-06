import React from 'react';
import styles from './AWS.module.css';
import { 
  FaAws, 
  FaCloud, 
  FaDatabase, 
  FaShieldAlt, 
  FaRocket, 
  FaCheckCircle,
  FaArrowRight,
  FaUsers,
  FaServer,
  FaGlobe
} from 'react-icons/fa';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import AboutAWSCertificate from './AboutAWScetificate';
import CertificationApplyForm from "../../CertificationApplyForm";
import Companypartners from "../../Courses/Companypartners";
import ReviewSection from "../../ReviewSection";

const AWS = () => {
  const services = [
    { icon: <FaCloud />, name: 'EC2, S3, Lambda' },
    { icon: <FaDatabase />, name: 'RDS, DynamoDB' },
    { icon: <FaShieldAlt />, name: 'IAM, Security' },
    { icon: <FaRocket />, name: 'DevOps & ML' }
  ];

  const stats = [
    { icon: <FaUsers />, value: '1M+', label: 'Active Users' },
    { icon: <FaServer />, value: '200+', label: 'Services' },
    { icon: <FaGlobe />, value: '245+', label: 'Countries' }
  ];

  return (
    <>
    <Header/>
    <section className={styles.heroSection}>
      <div className={styles.container}>
        
        {/* LEFT SIDE - IMAGE */}
        <div className={styles.leftContent}>
          <div className={styles.imageWrapper}>
            <img 
              src="https://i.pinimg.com/1200x/84/4f/41/844f41040cc7fe423f5b6b7ae8c1efb0.jpg" 
              alt="AWS Cloud Computing"
              className={styles.image}
            />
            
            {/* Floating Service Badges - Fixed */}
            <div className={`${styles.floatingBadge} ${styles.topBadge}`}>
              <FaAws className={styles.awsIcon} />
              <span>AWS Certified</span>
            </div>

            <div className={`${styles.floatingBadge} ${styles.bottomBadge}`}>
              <div className={styles.badgeContent}>
                <span className={styles.badgeNumber}>12+</span>
                <span className={styles.badgeLabel}>Certifications</span>
              </div>
            </div>

            {/* Stats Mini Card */}
            <div className={styles.statsMiniCard}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.miniStat}>
                  <span className={styles.miniStatIcon}>{stat.icon}</span>
                  <div>
                    <span className={styles.miniStatValue}>{stat.value}</span>
                    <span className={styles.miniStatLabel}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - CONTENT */}
        <div className={styles.rightContent}>
          {/* Badge */}
          <div className={styles.badge}>
            <FaAws className={styles.badgeIcon} />
            <span>AMAZON WEB SERVICES</span>
          </div>

          {/* Title */}
          <h1 className={styles.title}>
            Master Cloud Computing with{' '}
            <span className={styles.highlight}>AWS Certification</span>
          </h1>

          {/* Description */}
          <p className={styles.description}>
            Become an AWS Certified Cloud Professional. Gain expertise in cloud 
            architecture, development, operations, and security. Join the millions 
            of professionals who have accelerated their careers with AWS.
          </p>

          {/* Service Tags */}
          <div className={styles.serviceTags}>
            {services.map((service, index) => (
              <div key={index} className={styles.tag}>
                <span className={styles.tagIcon}>{service.icon}</span>
                <span>{service.name}</span>
              </div>
            ))}
          </div>

          {/* Key Benefits */}
          <div className={styles.benefitsGrid}>
            <div className={styles.benefit}>
              <FaCheckCircle className={styles.benefitIcon} />
              <span>Industry Recognition</span>
            </div>
            <div className={styles.benefit}>
              <FaCheckCircle className={styles.benefitIcon} />
              <span>Higher Salary</span>
            </div>
            <div className={styles.benefit}>
              <FaCheckCircle className={styles.benefitIcon} />
              <span>Global Opportunities</span>
            </div>
            <div className={styles.benefit}>
              <FaCheckCircle className={styles.benefitIcon} />
              <span>Hands-on Learning</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className={styles.trustIndicators}>
            <div className={styles.trustItem}>
              <span className={styles.trustDot}></span>
              <span>Official AWS Partner</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustDot}></span>
              <span>Exam Voucher Included</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustDot}></span>
              <span>Money-back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <AboutAWSCertificate/>
    <CertificationApplyForm/>
    < Companypartners/>
     <ReviewSection/>
    <Footer/>
    </>
  );
};

export default AWS;