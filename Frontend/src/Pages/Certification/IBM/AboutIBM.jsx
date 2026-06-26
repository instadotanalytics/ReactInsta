
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import styles from './AboutIBM.module.css';

import {
  FiAward,
  FiTrendingUp,
  FiGlobe,
  FiClock,
  FiArrowRight
} from 'react-icons/fi';

import {
  FaCloud,
  FaRobot,
  FaShieldAlt,
  FaChartBar
} from 'react-icons/fa';

import { HiOutlineBadgeCheck } from 'react-icons/hi';

const AboutIBMCertifications = () => {
  const controls = useAnimation();

  // Correct useInView usage
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const certifications = [
    {
      icon: <FaCloud />,
      name: 'Cloud Computing',
      count: '8 Certifications',
      color: '#2563EB',
      bg: '#EFF6FF',
      delay: 0.1
    },
    {
      icon: <FaRobot />,
      name: 'Artificial Intelligence',
      count: '6 Certifications',
      color: '#7C3AED',
      bg: '#F5F3FF',
      delay: 0.2
    },
    {
      icon: <FaChartBar />,
      name: 'Data Science',
      count: '5 Certifications',
      color: '#059669',
      bg: '#ECFDF5',
      delay: 0.3
    },
    {
      icon: <FaShieldAlt />,
      name: 'Cybersecurity',
      count: '4 Certifications',
      color: '#EA580C',
      bg: '#FFF7ED',
      delay: 0.4
    }
  ];

  const benefits = [
    {
      icon: <FiAward />,
      text: 'Industry-recognized credentials',
      delay: 0.1
    },
    {
      icon: <FiTrendingUp />,
      text: 'Career growth & higher salary',
      delay: 0.2
    },
    {
      icon: <FiGlobe />,
      text: 'Accepted in 150+ countries',
      delay: 0.3
    },
    {
      icon: <FiClock />,
      text: 'Self-paced learning',
      delay: 0.4
    }
  ];

  const stats = [
    { number: '50+', label: 'Certifications' },
    { number: '1M+', label: 'Professionals' },
    { number: '87%', label: 'Salary Hike' }
  ];

  return (
    <section
      className={styles.section}
      ref={ref}
    >
      <div className={styles.bgDecor1} />
      <div className={styles.bgDecor2} />

      <div className={styles.container}>

        {/* Left */}

        <motion.div
          className={styles.leftContent}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: -60 },
            visible: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >

          <motion.div
            className={styles.badgeWrapper}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className={styles.badge}>
              <HiOutlineBadgeCheck size={18} />
              IBM CERTIFICATIONS
            </span>
          </motion.div>

          <motion.h1
            className={styles.title}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{
              duration: 0.6,
              delay: 0.4
            }}
          >
            Validate Your Skills with{' '}
            <span className={styles.highlight}>
              IBM
            </span>
          </motion.h1>

          <motion.p
            className={styles.description}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{
              duration: 0.6,
              delay: 0.5
            }}
          >
            Earn globally recognized credentials
            that demonstrate your expertise in
            cutting-edge technologies.
            IBM certifications open doors
            to top opportunities worldwide.
          </motion.p>

          <motion.div
            className={styles.statsRow}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{
              duration: 0.6,
              delay: 0.6
            }}
          >
            {stats.map((stat, idx) => (
              <React.Fragment key={idx}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>
                    {stat.number}
                  </span>

                  <span className={styles.statLabel}>
                    {stat.label}
                  </span>
                </div>

                {idx < stats.length - 1 &&
                  <div className={styles.statDivider} />
                }
              </React.Fragment>
            ))}
          </motion.div>

          <motion.div
            className={styles.certGrid}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className={styles.certItem}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: -30
                  },
                  visible: {
                    opacity: 1,
                    x: 0
                  }
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.7 + cert.delay
                }}
                whileHover={{
                  scale: 1.02
                }}
              >
                <div
                  className={styles.certIcon}
                  style={{
                    background: cert.bg,
                    color: cert.color
                  }}
                >
                  {cert.icon}
                </div>

                <div className={styles.certInfo}>
                  <h4>{cert.name}</h4>
                  <p>{cert.count}</p>
                </div>

                <FiArrowRight
                  className={styles.certArrow}
                />
              </motion.div>
            ))}
          </motion.div>

        </motion.div>

        {/* Right */}

        <motion.div
          className={styles.rightContent}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {
              opacity: 0,
              x: 60
            },
            visible: {
              opacity: 1,
              x: 0
            }
          }}
          transition={{
            duration: 0.8,
            delay: 0.4
          }}
        >
          <div className={styles.imageContainer}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
              alt="IBM Professional Certification"
              className={styles.image}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutIBMCertifications;





