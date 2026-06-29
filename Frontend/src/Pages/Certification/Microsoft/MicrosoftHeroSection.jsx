import React, { useRef, useEffect } from "react";
import styles from "./MicrosoftHeroSection.module.css";
import {
  FaStar,
  FaUsers,
  FaChalkboardTeacher,
  FaCertificate,
  FaCode,
  FaChartLine,
  FaBullhorn,
} from "react-icons/fa";
import { MdLiveTv, MdSupportAgent, MdVerified, MdSchool } from "react-icons/md";
import { BsLightningFill, BsTrophy } from "react-icons/bs";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import AboutMicrosoft from "./AboutMicrosoft";
import CertificationApplyForm from "../../CertificationApplyForm";
import CallToAction from "./CallToAction";
import Companypartners from "../../Courses/Companypartners";

import MicroRight from "../../../assets/Microsoftright.png";

const MicrosoftHeroSection = () => {
  return (
    <>
      <Header />
      <section className={styles.heroSection}>

        <div className={styles.container}>
          {/* Row 1: Header Section */}
          <div className={styles.row}>
            <div className={styles.col12}>
              <div className={styles.headerContent}>
              
                <h1 className={styles.mainHeading}>
                  Upskill Yourself with <br />
                  <span className={styles.highlight}>Industry-Ready</span>{" "}
                  Courses
                </h1>
                <p className={styles.description}>
                  Choose from 25+ professional courses designed by industry
                  experts. Get certified and boost your career with 100%
                  placement assistance.
                </p>
              </div>
            </div>
          </div>

          {/* Row 2: Stats Section */}
          <div className={styles.row}>
            <div className={styles.col12}>
              <div className={styles.statsContainer}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <FaCode />
                  </div>
                  <div className={styles.statNumber}>25+</div>
                  <div className={styles.statLabel}>Professional Courses</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <FaUsers />
                  </div>
                  <div className={styles.statNumber}>5000+</div>
                  <div className={styles.statLabel}>Students Enrolled</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <MdSchool />
                  </div>
                  <div className={styles.statNumber}>150+</div>
                  <div className={styles.statLabel}>Batches Completed</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <BsTrophy />
                  </div>
                  <div className={styles.statNumber}>4.9</div>
                  <div className={styles.statLabel}>Student Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Features and Image Section */}
          <div className={styles.row}>
            <div className={styles.col2}>
              <div className={styles.featuresSection}>
                <h2 className={styles.sectionTitle}>Why Choose Us</h2>
                <div className={styles.featuresGrid}>
                  <div className={styles.featureItem}>
                    <MdLiveTv className={styles.featureIcon} />
                    <div>
                      <h4>Live Interactive Classes</h4>
                      <p>Real-time learning with industry experts</p>
                    </div>
                  </div>
                  <div className={styles.featureItem}>
                    <FaChalkboardTeacher className={styles.featureIcon} />
                    <div>
                      <h4>1:1 Mentorship</h4>
                      <p>Personalized guidance for career growth</p>
                    </div>
                  </div>
                  <div className={styles.featureItem}>
                    <MdSupportAgent className={styles.featureIcon} />
                    <div>
                      <h4>Placement Support</h4>
                      <p>100% assistance with job placement</p>
                    </div>
                  </div>
                  <div className={styles.featureItem}>
                    <MdVerified className={styles.featureIcon} />
                    <div>
                      <h4>Industry Certification</h4>
                      <p>Globally recognized certifications</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>

          {/* Row 4: Popular Courses Section */}
          <div className={styles.row}>
            <div className={styles.col12}>
             
             <div className={styles.coursesSection}>
  <h2 className={styles.sectionTitle}>Popular Courses</h2>

  <div className={styles.courseTags}>
    <div className={styles.courseTag}>
      <FaCode className={styles.tagIcon} />
      <span>Full Stack Development</span>
    </div>

    <div className={styles.courseTag}>
      <FaChartLine className={styles.tagIcon} />
      <span>Data Science</span>
    </div>

    <div className={styles.courseTag}>
      <FaBullhorn className={styles.tagIcon} />
      <span>Digital Marketing</span>
    </div>

    <div className={styles.courseTag}>
      <FaCode className={styles.tagIcon} />
      <span>Cloud Computing</span>
    </div>

    <div className={styles.courseTag}>
      <FaChartLine className={styles.tagIcon} />
      <span>AI & Machine Learning</span>
    </div>
  </div>
</div>
</div>
</div>

        </div>
      </section>

      <AboutMicrosoft />
      <Companypartners />
      <CertificationApplyForm />
      <CallToAction />
      <Footer />
    </>
  );
};

export default MicrosoftHeroSection;
