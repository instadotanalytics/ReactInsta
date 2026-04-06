import React from "react";
import styles from "./IBM.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import CertificationApplyForm from "../../CertificationApplyForm";
import Companypartners from "../../Courses/Companypartners";
import AboutIBM from "./AboutIBM";
import ReviewSection from "../../ReviewSection";

const IBM = () => {
  const certifications = [
    {
      icon: "☁️",
      title: "Cloud Computing",
      description: "AWS, Azure, hybrid cloud architecture"
    },
    {
      icon: "🤖",
      title: "Artificial Intelligence",
      description: "Watson, NLP, machine learning"
    },
    {
      icon: "📊",
      title: "Data Science",
      description: "Analysis, visualization, Python"
    },
    {
      icon: "🔒",
      title: "Cybersecurity",
      description: "Threat management, compliance"
    }
  ];

  const benefits = [
    "Industry-recognized credentials",
    "Hands-on practical projects",
    "Flexible self-paced learning",
    "Career support & networking"
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          {/* LEFT CONTENT */}
          <div className={styles.leftContent}>
            <h1 className={styles.title}>
              Advance Your Career with <span className={styles.highlightText}>IBM Certifications</span>
            </h1>
            
            <p className={styles.description}>
              Gain industry-recognized credentials in Cloud Computing, 
              Artificial Intelligence, Data Science, and Cybersecurity 
              with professional IBM certification programs.
            </p>

            <div className={styles.badge}>
              <i className="fas fa-check-circle"></i>
              Globally trusted • Industry aligned • Career focused
            </div>

            {/* Certification Grid */}
            <div className={styles.certGrid}>
              {certifications.map((cert, index) => (
                <div key={index} className={styles.certCard}>
                  <span className={styles.certIcon}>{cert.icon}</span>
                  <div>
                    <h3 className={styles.certTitle}>{cert.title}</h3>
                    <p className={styles.certDesc}>{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
          
            {/* Stats Section */}
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>500K+</span>
                <span className={styles.statLabel}>Certified Professionals</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>87%</span>
                <span className={styles.statLabel}>Career Growth</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>150+</span>
                <span className={styles.statLabel}>Countries</span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className={styles.rightContent}>
            <div className={styles.imageWrapper}>
              <img 
                src="https://i.pinimg.com/1200x/d2/71/7c/d2717c8f0072c85b264b762ab436a513.jpg" 
                alt="IBM Professional Certification"
                className={styles.heroImage}
              />
              <div className={styles.imageBadge}>
                <i className="fas fa-certificate"></i>
                <div>
                  <strong>IBM Certified</strong>
                  <span>Premium Partner</span>
                </div>
              </div>
            </div>

            {/* Benefits List */}
            <div className={styles.benefitsCard}>
              <h4>Why get certified?</h4>
              <ul className={styles.benefitsList}>
                {benefits.map((benefit, index) => (
                  <li key={index}>
                    <i className="fas fa-check-circle"></i>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🏆</div>
              <h3>Industry Trust</h3>
              <p>Recognized by 90% of Fortune 500 companies</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔄</div>
              <h3>Always Updated</h3>
              <p>Curriculum aligned with latest tech trends</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>💼</div>
              <h3>Career Boost</h3>
              <p>Average 35% salary increase after certification</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🌐</div>
              <h3>Global Community</h3>
              <p>Connect with IBM professionals worldwide</p>
            </div>
          </div>
        </div>
      </section>
      <CertificationApplyForm/>
      <Companypartners/>
      <AboutIBM/>
      <ReviewSection/>
   

      <Footer />
    </>
  );
};

export default IBM;