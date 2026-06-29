import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./About.module.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ValueProposition from "./About/ValueProposition";
import CareerSection from "./CareerSection";
import ImpactGrid from "./About/ImpactGrid";
import ImpactShowcase from "./About/ImpactShowcase";
import ClientTestimonials from "./About/ClientTestimonials";
import FAQSection from "./FAQSection";

// React Icons imports - Feather Icons (Fi) - ONLY VALID ONES
import {
  FiUsers,
  FiUserCheck,
  FiBookOpen,
  FiAward,
  FiTrendingUp,
  FiBriefcase,
  FiStar,
  FiCheckCircle,
  FiTarget,
  FiCompass,
  FiZap,
  FiLayers,
  FiGlobe,
  FiClock,
  FiTool,
  FiBarChart2,
  FiCode,
  FiDollarSign
} from "react-icons/fi";

// React Icons imports - Font Awesome (Fa) - ONLY VALID ONES
import {
  FaRocket,
  FaFlask,
  FaMicrochip,
  FaMoneyBillWave,
  FaSuitcase,
  FaBullseye,
  FaBolt,
  FaLayerGroup,
  FaGlobeAmericas,
  FaClock,
  FaGraduationCap,
  FaChartLine,
  FaCode as FaCodeIcon,
  FaTools,
  FaAward as FaAwardIcon,
  FaStar as FaStarIcon,
  FaUsers as FaUsersIcon,
  FaUserCheck as FaUserCheckIcon,
  FaBookOpen as FaBookOpenIcon
} from "react-icons/fa";

// React Icons imports - Material Design (Md) - ONLY VALID ONES
import {
  MdRocket,
  MdScience,
  MdMemory,
  MdAttachMoney,
  MdWork,
  MdTrackChanges,
  MdExplore,
  MdFlashOn,
  MdViewModule,
  MdPublic,
  MdAccessTime,
  MdSchool,
  MdTrendingUp,
  MdCode,
  MdBuild,
  MdStar,
  MdPeople,
  MdPerson,
  MdBook
} from "react-icons/md";

const About = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const stats = [
    { value: "750+", label: "Students", icon: <FaUsersIcon />, color: "#3b82f6" },
    { value: "12+", label: "Experts", icon: <FaUserCheckIcon />, color: "#7c3aed" },
    { value: "6+", label: "Courses Offered", icon: <FaBookOpenIcon />, color: "#06b6d4" },
    { value: "5+", label: "Years Experience", icon: <FaAwardIcon />, color: "#10b981" },
  ];

  const features = [
    { icon: <FaRocket />, text: "Scratch to Advanced Courses", color: "#3b82f6" },
    { icon: <FaFlask />, text: "Hands-on Experimentation", color: "#7c3aed" },
    { icon: <FaMicrochip />, text: "Latest Technology Updates", color: "#06b6d4" },
    { icon: <FaMoneyBillWave />, text: "Affordable Learning", color: "#10b981" },
    { icon: <FaSuitcase />, text: "Job Ready Skills", color: "#f59e0b" },
  ];

  const successStories = [
    { icon: <FiTrendingUp />, value: "8.5 LPA", label: "Highest Package", sub: "2024 Batch", color: "#3b82f6" },
    { icon: <FiAward />, value: "92%", label: "Placement Rate", sub: "Last 6 Months", color: "#7c3aed" },
    { icon: <FiBriefcase />, value: "120+", label: "Companies Visited", sub: "This Year", color: "#06b6d4" },
    { icon: <FiStar />, value: "5+", label: "Job Offers/Student", sub: "Average", color: "#10b981" },
  ];

  return (
    <>
      <Header />
      
      <section className={styles.aboutSection} ref={ref}>
        {/* Animated Background Orbs */}
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
        <div className={styles.orb4}></div>

        <div className={styles.container}>
          {/* Hero Section - Full Height */}
          <div className={styles.heroSection}>
            <motion.div 
              className={styles.heroContent}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className={styles.badge}>About Us</span>
              </motion.div>

              <motion.h1 
                className={styles.heroTitle}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Taking your imagination as{" "}
                <span className={styles.highlight}>
                  our upcoming opportunity
                </span>
              </motion.h1>

              <motion.div className={styles.titleUnderline} />

              <motion.p 
                className={styles.heroDescription}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                We are one of the Indore EdTech training institutes, who
                energetically deliver immersive digital learning experiences
                through the latest courses and technology, industry
                partnerships, and top-notch faculty at ease. We provide training
                in the latest technologies like Java, JavaScript, React, and PHP
                etc.
              </motion.p>

              {/* Stats Cards */}
              <motion.div 
                className={styles.statsGrid}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className={styles.statCard}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                    whileHover={{ y: -4 }}
                  >
                    <div className={styles.statIconWrapper} style={{ background: `${stat.color}15`, color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div>
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              className={styles.heroImage}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop&auto=format&q=80"
                  alt="Students learning together"
                  className={styles.heroImg}
                />
              </div>
            </motion.div>
          </div>

          <ImpactShowcase/>    

          {/* Features Section - Redesigned */}
          <motion.div 
            className={styles.featuresSection}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className={styles.featuresHeader}>
              <h2 className={styles.sectionTitle}>
                Upgrade Your Skills with <br/><span className={styles.highlight}>Industry-Focused Training</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Comprehensive programs designed to make you job-ready
              </p>
            </div>

            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={styles.featureCard}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.4, delay: 0.8 + (index * 0.08) }}
                  whileHover={{ y: -4 }}
                >
                  <div className={styles.featureIcon} style={{ background: `${feature.color}15`, color: feature.color }}>
                    {feature.icon}
                  </div>
                  <p className={styles.featureText}>{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <ImpactGrid/>

          {/* Journey Section */}
          <motion.div 
            className={styles.journeySection}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className={styles.journeyContent}>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -40 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <span className={styles.sectionBadge}>
                 Our Journey
                </span>
                <h2 className={styles.sectionTitle}>
                  Our Journey for <span className={styles.highlight}>Students Career Growth</span>
                </h2>
                <p className={styles.journeyText}>
                  IT Training Indore Center is a part of Conative IT Solutions Pvt
                  Ltd. It is a leading IT company based in Indore (M.P).
                </p>
                <p className={styles.journeyText}>
                  Conative IT Solutions is the Best Web Design and Web Development
                  Company providing website design and website development
                  services to clients across the globe.
                </p>

                <div className={styles.companyBadge}>
                  <div className={styles.badgeIconWrapper}>
                    <FiAward size={24} />
                  </div>
                  <div>
                    <strong>Part of Conative IT Solutions Pvt Ltd</strong>
                    <span>Established 2018 • ISO Certified</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className={styles.journeyImage}
              variants={{
                hidden: { opacity: 0, x: 40 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className={styles.journeyImageWrapper}>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format&q=80"
                  alt="Our journey"
                  className={styles.journeyImg}
                />
              </div>
            </motion.div>
          </motion.div>

          <ValueProposition/>

          {/* Success Stories Section */}
          <motion.div 
            className={styles.successStories}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className={styles.successHeader}>
              <span className={styles.sectionBadge}>
                <FaStarIcon size={14} /> Success Stories
              </span>
              <h2>750+ Success Stories <span className={styles.highlight}>and Counting!</span></h2>
              <p>Join our alumni network working at India's top companies</p>
            </div>

            <div className={styles.successGrid}>
              {successStories.map((story, index) => (
                <motion.div 
                  key={index} 
                  className={styles.successCard}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.4, delay: 1.3 + (index * 0.1) }}
                  whileHover={{ y: -6 }}
                >
                  <div className={styles.successIcon} style={{ background: `${story.color}15`, color: story.color }}>
                    {story.icon}
                  </div>
                  <h3 className={styles.successValue}>{story.value}</h3>
                  <p className={styles.successLabel}>{story.label}</p>
                  <small className={styles.successSub}>{story.sub}</small>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CareerSection />
      <ClientTestimonials/>
      <FAQSection />
      <Footer />
    </>
  );
};

export default About;