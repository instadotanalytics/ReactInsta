import React from "react";
import styles from "./AboutAWSCertificate.module.css";
import {
  FaAws,
  FaCloud,
  FaDatabase,
  FaShieldAlt,
  FaCode,
  FaNetworkWired,
  FaCheckCircle,
  FaClock,
  FaGlobe,
  FaAward,
  FaArrowRight,
  FaServer,
  FaCogs,
  FaLock,
  FaChartLine,
  FaUsers,
  FaBookOpen,
  FaLaptop,
  FaRegClock,
  FaLayerGroup,
  FaCertificate,
  FaStar,
  FaRocket,
} from "react-icons/fa";

const AboutAWSCertificate = () => {
  const certifications = [
    {
      level: "Foundational",
      name: "Cloud Practitioner",
      icon: <FaCloud />,
      badge: "CLF-C02",
    },
    {
      level: "Associate",
      name: "Solutions Architect",
      icon: <FaNetworkWired />,
      badge: "SAA-C03",
    },
    {
      level: "Associate",
      name: "Developer",
      icon: <FaCode />,
      badge: "DVA-C02",
    },
    {
      level: "Associate",
      name: "SysOps Administrator",
      icon: <FaDatabase />,
      badge: "SOA-C02",
    },
    {
      level: "Professional",
      name: "Solutions Architect",
      icon: <FaAward />,
      badge: "SAP-C02",
    },
    {
      level: "Professional",
      name: "DevOps Engineer",
      icon: <FaShieldAlt />,
      badge: "DOP-C02",
    },
    {
      level: "Specialty",
      name: "Security",
      icon: <FaLock />,
      badge: "SCS-C02",
    },
    {
      level: "Specialty",
      name: "Machine Learning",
      icon: <FaChartLine />,
      badge: "MLS-C01",
    },
    {
      level: "Specialty",
      name: "Database",
      icon: <FaDatabase />,
      badge: "DBS-C01",
    },
    {
      level: "Specialty",
      name: "SAP on AWS",
      icon: <FaServer />,
      badge: "PAS-C01",
    },
    {
      level: "Specialty",
      name: "Data Analytics",
      icon: <FaChartLine />,
      badge: "DAS-C01",
    },
    {
      level: "Specialty",
      name: "Advanced Networking",
      icon: <FaNetworkWired />,
      badge: "ANS-C01",
    },
  ];

  const benefits = [
    { icon: <FaCheckCircle />, text: "Globally recognized credentials" },
    { icon: <FaClock />, text: "3 years validity" },
    { icon: <FaGlobe />, text: "Accepted in 190+ countries" },
    { icon: <FaAward />, text: "Average salary premium: 25-40%" },
    { icon: <FaUsers />, text: "Join 1M+ certified professionals" },
    { icon: <FaRocket />, text: "Fast-track career growth" },
  ];

  const examDetails = [
    { type: "Multiple Choice", value: "65-75 questions" },
    { type: "Duration", value: "130-180 minutes" },
    { type: "Cost", value: "$100-$300 USD" },
    { type: "Passing Score", value: "720-750/1000" },
    { type: "Format", value: "Online or Test Center" },
    { type: "Validity", value: "3 years" },
  ];

  const pathSteps = [
    {
      step: "1",
      title: "Choose Your Path",
      desc: "Select certification based on your role and experience level",
    },
    {
      step: "2",
      title: "Prepare with Training",
      desc: "Digital courses, hands-on labs, and practice exams",
    },
    {
      step: "3",
      title: "Schedule Exam",
      desc: "Online proctored or test center, available year-round",
    },
    {
      step: "4",
      title: "Get Certified",
      desc: "Earn digital badge, certificate, and AWS Credly profile",
    },
  ];

  const learningResources = [
    {
      icon: <FaBookOpen />,
      title: "AWS Training",
      desc: "Official digital training",
    },
    {
      icon: <FaLaptop />,
      title: "Hands-on Labs",
      desc: "Practical experience",
    },
    {
      icon: <FaRegClock />,
      title: "Practice Exams",
      desc: "Test your knowledge",
    },
    { icon: <FaUsers />, title: "Study Groups", desc: "Peer learning" },
  ];

  const stats = [
    { number: "12", label: "Certifications", icon: <FaCertificate /> },
    { number: "4", label: "Levels", icon: <FaLayerGroup /> },
    { number: "1M+", label: "Certified", icon: <FaUsers /> },
    { number: "98%", label: "Success Rate", icon: <FaStar /> },
  ];

  return (
    <>
      <section className={styles.awsCertificationWrapper}>
        {/* First Section - About AWS */}
        <div className={styles.aboutAws}>
          <div className={styles.heroGrid}>
            {/* LEFT */}
            <div className={styles.content}>
              <div className={styles.badge}>
                <FaAws />
                <span>AWS CERTIFICATION</span>
              </div>

              <h2 className={styles.title}>
                Validate Your Cloud Expertise with
                <span> AWS Certification</span>
              </h2>

              <p className={styles.description}>
                Earn industry-recognized cloud credentials and build expertise
                in architecture, security, DevOps, data engineering, and modern
                cloud solutions.
              </p>

              <div className={styles.stats}>
                {stats.map((item, index) => (
                  <div key={index} className={styles.statCard}>
                    <span className={styles.statIcon}>{item.icon}</span>
                    <h3>{item.number}</h3>
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className={styles.visual}>
              <img
                src="https://pitcacademy.com/wp-content/uploads/2025/02/AWS-Certified-Cloud-Practitioner.png"
                alt="AWS Certification"
                className={styles.certImage}
              />
            </div>
          </div>
        </div>

        {/* Second Section - Certification Journey */}
        <div className={styles.certificationJourneySection}>
          <div className={styles.contentWrapper}>
            {/* <h2 className={styles.levelsTitle}>Certification Levels</h2> */}

            <div className={styles.levelGrid}>
              <div className={styles.levelCard}>
                <FaCloud />
                <h3>Foundational</h3>
                <p>Cloud Practitioner</p>
              </div>

              <div className={styles.levelCard}>
                <FaCode />
                <h3>Associate</h3>
                <p>Architect • Developer • SysOps</p>
              </div>

              <div className={styles.levelCard}>
                <FaAward />
                <h3>Professional</h3>
                <p>Architect • DevOps</p>
              </div>

              <div className={styles.levelCard}>
                <FaRocket />
                <h3>Specialty</h3>
                <p>Security • ML • Data • Networking</p>
              </div>
            </div>

            <div className={styles.journeyRoadmap}>
              <div className={styles.roadTrackWrapper}>
                <div className={styles.roadLine}></div>

                {/* Scale markers */}
                {["START", "KM 2", "KM 3", "GOAL"].map((label, i) => (
                  <div
                    key={label}
                    className={styles.roadScale}
                    style={{ left: `${[4, 35, 65, 92][i]}%` }}
                  >
                    <div className={styles.scaleTick}></div>
                    <div className={styles.scaleLabel}>{label}</div>
                  </div>
                ))}

                {/* GPS nav pointer */}
                <div className={styles.roadArrow}>
                  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <filter id="gpsShadow">
                        <feDropShadow
                          dx="0"
                          dy="2"
                          stdDeviation="2"
                          floodOpacity="0.4"
                        />
                      </filter>
                    </defs>
                    {/* Outer circle */}
                    {/* <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="#1a2d6e"
                      stroke="#4a6ac8"
                      strokeWidth="1.5"
                    />
                    {/* Right-pointing arrow (like Google Maps) */}
                    {/* <path
                      d="M14 24 L14 40 L44 32 Z"
                      fill="#6a8cff"
                      filter="url(#gpsShadow)"
                      // transform="rotate(90, 32, 32)"
                    /> */}
                    {/* Highlight on arrow top face */}
                    {/* <path
                      d="M14 24 L44 32 L29 32 Z"
                      fill="#9ab3ff"
                      // transform="rotate(90, 32, 32)"
                    />
                    {/* Center dot */}
                    {/* <circle cx="32" cy="32" r="3" fill="#fff" opacity="0.9" /> */} 
                  </svg>
                </div>
              </div>

              <div className={styles.roadStepsGrid}>
                {pathSteps.map((step, i) => (
                  <div key={step.step} className={styles.roadStep}>
                    <div className={styles.stepNode}></div>
                    <div className={styles.stepDist}>Step 0{step.step}</div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutAWSCertificate;
