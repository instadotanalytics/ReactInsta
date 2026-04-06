import React from 'react';
import styles from './AboutAWSCertificate.module.css';
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
  FaRocket
} from 'react-icons/fa';

const AboutAWSCertificate = () => {
  const certifications = [
    { level: 'Foundational', name: 'Cloud Practitioner', icon: <FaCloud />, badge: 'CLF-C02' },
    { level: 'Associate', name: 'Solutions Architect', icon: <FaNetworkWired />, badge: 'SAA-C03' },
    { level: 'Associate', name: 'Developer', icon: <FaCode />, badge: 'DVA-C02' },
    { level: 'Associate', name: 'SysOps Administrator', icon: <FaDatabase />, badge: 'SOA-C02' },
    { level: 'Professional', name: 'Solutions Architect', icon: <FaAward />, badge: 'SAP-C02' },
    { level: 'Professional', name: 'DevOps Engineer', icon: <FaShieldAlt />, badge: 'DOP-C02' },
    { level: 'Specialty', name: 'Security', icon: <FaLock />, badge: 'SCS-C02' },
    { level: 'Specialty', name: 'Machine Learning', icon: <FaChartLine />, badge: 'MLS-C01' },
    { level: 'Specialty', name: 'Database', icon: <FaDatabase />, badge: 'DBS-C01' },
    { level: 'Specialty', name: 'SAP on AWS', icon: <FaServer />, badge: 'PAS-C01' },
    { level: 'Specialty', name: 'Data Analytics', icon: <FaChartLine />, badge: 'DAS-C01' },
    { level: 'Specialty', name: 'Advanced Networking', icon: <FaNetworkWired />, badge: 'ANS-C01' }
  ];

  const benefits = [
    { icon: <FaCheckCircle />, text: 'Globally recognized credentials' },
    { icon: <FaClock />, text: '3 years validity' },
    { icon: <FaGlobe />, text: 'Accepted in 190+ countries' },
    { icon: <FaAward />, text: 'Average salary premium: 25-40%' },
    { icon: <FaUsers />, text: 'Join 1M+ certified professionals' },
    { icon: <FaRocket />, text: 'Fast-track career growth' }
  ];

  const examDetails = [
    { type: 'Multiple Choice', value: '65-75 questions' },
    { type: 'Duration', value: '130-180 minutes' },
    { type: 'Cost', value: '$100-$300 USD' },
    { type: 'Passing Score', value: '720-750/1000' },
    { type: 'Format', value: 'Online or Test Center' },
    { type: 'Validity', value: '3 years' }
  ];

  const pathSteps = [
    { step: '1', title: 'Choose Your Path', desc: 'Select certification based on your role and experience level' },
    { step: '2', title: 'Prepare with Training', desc: 'Digital courses, hands-on labs, and practice exams' },
    { step: '3', title: 'Schedule Exam', desc: 'Online proctored or test center, available year-round' },
    { step: '4', title: 'Get Certified', desc: 'Earn digital badge, certificate, and AWS Credly profile' }
  ];

  const learningResources = [
    { icon: <FaBookOpen />, title: 'AWS Training', desc: 'Official digital training' },
    { icon: <FaLaptop />, title: 'Hands-on Labs', desc: 'Practical experience' },
    { icon: <FaRegClock />, title: 'Practice Exams', desc: 'Test your knowledge' },
    { icon: <FaUsers />, title: 'Study Groups', desc: 'Peer learning' }
  ];

  const stats = [
    { number: '12', label: 'Certifications', icon: <FaCertificate /> },
    { number: '4', label: 'Levels', icon: <FaLayerGroup /> },
    { number: '1M+', label: 'Certified', icon: <FaUsers /> },
    { number: '98%', label: 'Success Rate', icon: <FaStar /> }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* LEFT CONTENT */}
        <div className={styles.leftContent}>
          {/* Header Badge */}
          <div className={styles.badge}>
            <FaAws className={styles.awsIcon} />
            <span>AWS CERTIFICATIONS</span>
          </div>

          {/* Title */}
          <h1 className={styles.title}>
            Validate Your Cloud Expertise with{' '}
            <span className={styles.highlight}>AWS Certification</span>
          </h1>

          {/* Description */}
          <p className={styles.description}>
            AWS Certifications validate your cloud expertise and help you stand out 
            in today's competitive job market. Whether you're just starting or an 
            experienced professional, there's a certification path for you.
          </p>

          {/* Stats Row */}
          <div className={styles.statsRow}>
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>{stat.icon}</span>
                  <div>
                    <span className={styles.statNumber}>{stat.number}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                </div>
                {index < stats.length - 1 && <div className={styles.statDivider}></div>}
              </React.Fragment>
            ))}
          </div>

          {/* Certification Levels */}
          <div className={styles.certSection}>
            <h3>Certification Paths</h3>
            <div className={styles.certGrid}>
              {certifications.slice(0, 8).map((cert, index) => (
                <div key={index} className={styles.certCard}>
                  <span className={styles.certIcon}>{cert.icon}</span>
                  <div>
                    <span className={styles.certLevel}>{cert.level}</span>
                    <span className={styles.certName}>{cert.name}</span>
                    <span className={styles.certBadge}>{cert.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          
          </div>




        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className={styles.rightContent}>
          <div className={styles.imageWrapper}>
            <img 
              src="https://i.pinimg.com/736x/77/00/37/770037f8d3342d5e6def09dd96f2df49.jpg" 
              alt="AWS Certification Professional"
              className={styles.image}
            />

            {/* Floating Badge - Top */}
            <div className={`${styles.floatingBadge} ${styles.badgeTop}`}>
              <FaAws />
              <span>Official Partner</span>
            </div>

            {/* Floating Badge - Bottom */}
            <div className={`${styles.floatingBadge} ${styles.badgeBottom}`}>
              <div className={styles.badgeContent}>
                <span className={styles.badgeNumber}>98%</span>
                <span className={styles.badgeLabel}>Success Rate</span>
              </div>
            </div>

            {/* Certification Level Tags */}
            <div className={styles.levelTags}>
              <span className={styles.levelTag}>Foundational</span>
              <span className={styles.levelTag}>Associate</span>
              <span className={styles.levelTag}>Professional</span>
              <span className={styles.levelTag}>Specialty</span>
            </div>

            {/* Small Stats Card */}
            <div className={styles.statsCard}>
              <div className={styles.statsCardItem}>
                <FaAward />
                <span>Digital Badge</span>
              </div>
              <div className={styles.statsCardItem}>
                <FaGlobe />
                <span>Global Recognition</span>
              </div>
            </div>
          </div>

          {/* CERTIFICATION PATH SECTION WITH IMAGE */}
          <div className={styles.pathSection}>
            <h3 className={styles.pathTitle}>
              <FaLayerGroup className={styles.pathIcon} /> Your Certification Journey
            </h3>
            
            <div className={styles.pathContainer}>
              {/* Left Side - Image */}
              <div className={styles.pathImageWrapper}>
                <img 
                  src="https://i.pinimg.com/736x/76/d8/4d/76d84d55790605d472b4b77bcad701cd.jpg" 
                  alt="Certification Path"
                  className={styles.pathImage}
                />
                <div className={styles.pathImageBadge}>
                  <FaAward />
                  <span>4 Easy Steps</span>
                </div>
              </div>

              {/* Right Side - Steps */}
              <div className={styles.pathSteps}>
                {pathSteps.map((step, index) => (
                  <div key={index} className={styles.pathStep}>
                    <div className={styles.stepNumber}>{step.step}</div>
                    <div className={styles.stepContent}>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
                
              
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </section>
    
  );
};

export default AboutAWSCertificate;