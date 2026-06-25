import React, { useEffect, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaRocket,
  FaCode,
  FaCloud,
  FaBrain,
  FaShieldAlt,
  FaChartLine
} from 'react-icons/fa';

import styles from './InnovationShowcase.module.css';

const InnovationShowcase = () => {
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

  // Generate particles only once
  const particles = useMemo(
    () =>
      [...Array(15)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 10 + 10}s`
      })),
    []
  );

  const features = [
    { icon: FaRocket, title: "Innovation", desc: "Cutting-edge solutions", color: "#7C3AED" },
    { icon: FaCode, title: "Technology", desc: "Next-gen development", color: "#2563EB" },
    { icon: FaCloud, title: "Cloud", desc: "Scalable infrastructure", color: "#0891B2" },
    { icon: FaBrain, title: "AI", desc: "Intelligent systems", color: "#DB2777" },
    { icon: FaShieldAlt, title: "Security", desc: "Enterprise grade", color: "#059669" },
    { icon: FaChartLine, title: "Growth", desc: "Data-driven results", color: "#D97706" }
  ];

  return (
    <section className={styles.showcaseSection}>
      
      <div className={styles.animatedBg}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gradientOrb3} />
      </div>

      <div className={styles.particles}>
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.width,
              height: particle.height,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.container}>

          <motion.div
            ref={ref}
            className={styles.mainContent}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            transition={{ duration: 0.8 }}
          >

            {/* Left */}
            <motion.div
              className={styles.leftContent}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { x: -50, opacity: 0 },
                visible: { x: 0, opacity: 1 }
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className={styles.badge}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { scale: 0 },
                  visible: { scale: 1 }
                }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className={styles.badgeDot} />
                <span>Building Tomorrow's Solutions</span>
              </motion.div>

              <motion.h1
                className={styles.mainHeading}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className={styles.gradientText}>
                  Innovation
                </span>

                <br />

                <span className={styles.darkText}>
                  Powered by
                </span>

                <br />

                <span className={styles.gradientText2}>
                  Excellence
                </span>
              </motion.h1>

              <motion.p
                className={styles.description}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Empowering businesses with cutting-edge
                technology solutions that drive transformation
                and deliver measurable results.
              </motion.p>
            </motion.div>

            {/* Right */}
            <motion.div
              className={styles.rightContent}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { x: 50, opacity: 0 },
                visible: { x: 0, opacity: 1 }
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className={styles.featuresGrid}>
                {features.map((feature, idx) => {
                  const Icon = feature.icon;

                  return (
                    <motion.div
                      key={idx}
                      className={styles.featureCard}
                      initial="hidden"
                      animate={controls}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + idx * 0.1
                      }}
                      whileHover={{
                        y: -8
                      }}
                      style={{
                        borderColor: `${feature.color}30`
                      }}
                    >
                      <div
                        className={styles.featureIcon}
                        style={{
                          background: `${feature.color}15`
                        }}
                      >
                        <Icon
                          size={24}
                          style={{
                            color: feature.color
                          }}
                        />
                      </div>

                      <h3 className={styles.featureTitle}>
                        {feature.title}
                      </h3>

                      <p className={styles.featureDesc}>
                        {feature.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default InnovationShowcase;