import React from "react";
import styles from "./About.module.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import WhyJoinUS from "./WhyJoinUS";
import CareerSection from "./CareerSection";
import OurImpact from "./OurImpact";
import Companypartners from "./Courses/Companypartners";
import ReviewSection from "./ReviewSection";
import FAQSection from "./FAQSection";

const About = () => {
  // Stats data
  const stats = [
    { value: "750+", label: "Students Joined", icon: "👥" },
    { value: "12+", label: "Expert Trainers", icon: "👨‍🏫" },
    { value: "6+", label: "Courses Offered", icon: "💻" },
    { value: "5+", label: "Years Experience", icon: "⭐" },
  ];

  // Features data
  const features = [
    "Looking for Scratch Courses",
    "Search for Experimentation while Learning",
    "Looking Technology Updates",
    "Pocket-friendly Courses",
    "Job Oriented Skills Upgradation",
  ];

  return (
    <>
      <Header />
      <section className={styles.aboutSection}>
        <div className={styles.container}>
          {/* Hero Section with Image */}
          <div className={styles.heroSection}>
            <div className={styles.heroContent}>
              <span className={styles.badge}>About Us</span>
              <h1 className={styles.heroTitle}>
                Taking your imagination as{" "}
                <span className={styles.highlight}>
                  our upcoming opportunity
                </span>
              </h1>
              <p className={styles.heroDescription}>
                We are one of the Indore EdTech training institutes, who
                energetically deliver immersive digital learning experiences
                through the latest courses and technology, industry
                partnerships, and top-notch faculty at ease. We provide training
                in the latest technologies like Java, JavaScript, React, and PHP
                etc.
              </p>

              {/* Stats Cards */}
              <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                  <div key={index} className={styles.statCard}>
                    <span className={styles.statIcon}>{stat.icon}</span>
                    <div>
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className={styles.heroImage}>
              <img
                src="https://i.pinimg.com/1200x/33/ae/98/33ae98d3f7ee3f79ce452e81299d200b.jpg"
                alt="Students learning together"
                className={styles.heroImg}
              />
              <div className={styles.imageBadge}>
                <span>🎓</span>
                <div>
                  <strong>100% Placement</strong>
                  <span>Assistance</span>
                </div>
              </div>
            </div>
          </div>
          <Companypartners />

          {/* Features Section */}
          <div className={styles.featuresSection}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleIcon}>📚</span>
              Courses we Offer
            </h2>
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <span className={styles.featureCheck}>✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <OurImpact />

          {/* Journey Section with Image */}
          <div className={styles.journeySection}>
            <div className={styles.journeyContent}>
              <h2 className={styles.sectionTitle}>
                Our Journey for Students Career Growth
              </h2>
              <p className={styles.journeyText}>
                IT Training Indore Center is a part of Conative IT Solutions Pvt
                Ltd. It is a leading IT company based in Indore (M.P).
              </p>
              <p className={styles.journeyText}>
                Conative IT Solutions is the Best Web Design and Web Development
                Company providing website design and website development
                services to clients across the globe. It is an India-based
                offshore development center offering Web Solutions at reasonable
                rates for Web application development, website designing,
                website maintenance, online shopping cart solutions, e-commerce
                solutions, portal development, web directory development for
                global businesses.
              </p>

              {/* Company Badge */}
              <div className={styles.companyBadge}>
                <span className={styles.badgeIcon}>🏢</span>
                <div>
                  <strong>Part of Conative IT Solutions Pvt Ltd</strong>
                  <span>Established 2018 • ISO Certified</span>
                </div>
              </div>
            </div>

            {/* Journey Image with Stats */}
            <div className={styles.journeyImage}>
              <img
                src="https://i.pinimg.com/736x/4c/a4/73/4ca4732a3a3ba06a36bc8fea1aefad50.jpg"
                alt="Our journey"
                className={styles.journeyImg}
              />
              <div className={styles.experienceBadge}>
                <span className={styles.expNumber}>5+</span>
                <span>Years of Excellence</span>
              </div>
            </div>
          </div>

          <WhyJoinUS />

          {/* New CTA Section - Success Stories */}
          <div className={styles.successStories}>
            <div className={styles.successHeader}>
              <h2>750+ Success Stories and Counting!</h2>
              <p>Join our alumni network working at India's top companies</p>
            </div>

            <div className={styles.successGrid}>
              <div className={styles.successCard}>
                <div className={styles.successIcon}>🏆</div>
                <h3>8.5 LPA</h3>
                <p>Highest Package</p>
                <small>2024 Batch</small>
              </div>

              <div className={styles.successCard}>
                <div className={styles.successIcon}>🎯</div>
                <h3>92%</h3>
                <p>Placement Rate</p>
                <small>Last 6 Months</small>
              </div>

              <div className={styles.successCard}>
                <div className={styles.successIcon}>🚀</div>
                <h3>120+</h3>
                <p>Companies Visited</p>
                <small>This Year</small>
              </div>

              <div className={styles.successCard}>
                <div className={styles.successIcon}>💼</div>
                <h3>5+</h3>
                <p>Job Offers/Student</p>
                <small>Average</small>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CareerSection />
      <ReviewSection />
      <FAQSection />
      <Footer />
    </>
  );
};

export default About;
