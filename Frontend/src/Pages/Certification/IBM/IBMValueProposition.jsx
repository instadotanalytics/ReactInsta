import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './IBMValueProposition.module.css';

import {
    FiAward,
    FiTrendingUp,
    FiGlobe,
    FiClock,
    FiUsers,
    FiBriefcase,
    FiStar,
    FiCheckCircle,
    FiArrowRight,
    FiPlay
} from 'react-icons/fi';

import {
    FaCloud,
    FaRobot,
    FaShieldAlt,
    FaChartBar,
    FaCode,
    FaDatabase,
    FaBrain,
    FaNetworkWired
} from 'react-icons/fa';

const IBMValueProposition = () => {
    const controls = useAnimation();
    const [activeCard, setActiveCard] = useState(null);
    const [counts, setCounts] = useState({ certified: 0, career: 0, countries: 0, salary: 0 });
    const statsRef = useRef(null);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
            animateCounts();
        }
    }, [inView, controls]);

    const animateCounts = () => {
        const duration = 2000;
        const startTime = performance.now();
        const targetCertified = 500000;
        const targetCareer = 87;
        const targetCountries = 150;
        const targetSalary = 35;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
                certified: Math.round(targetCertified * ease),
                career: Math.round(targetCareer * ease),
                countries: Math.round(targetCountries * ease),
                salary: Math.round(targetSalary * ease)
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num;
    };

    // Unique career paths data
    const careerPaths = [
        {
            icon: <FaCloud />,
            title: 'Cloud Architect',
            description: 'Design and manage cloud infrastructure with AWS, Azure, and hybrid solutions.',
            color: '#2563EB',
            delay: 0.1,
            badge: 'Popular'
        },
        {
            icon: <FaBrain />,
            title: 'AI Specialist',
            description: 'Build intelligent systems using Watson AI, NLP, and machine learning models.',
            color: '#7C3AED',
            delay: 0.2,
            badge: 'Trending'
        },
        {
            icon: <FaDatabase />,
            title: 'Data Scientist',
            description: 'Extract insights from data using advanced analytics, visualization, and Python.',
            color: '#059669',
            delay: 0.3,
            badge: 'High Demand'
        },
        {
            icon: <FaShieldAlt />,
            title: 'Security Expert',
            description: 'Protect organizations with threat management, compliance, and risk assessment.',
            color: '#EA580C',
            delay: 0.4,
            badge: 'Critical'
        }
    ];

    // IBM Success stories
    const successStories = [
        {
            icon: <FiUsers />,
            text: '90% of Fortune 500 companies recognize IBM certifications',
            color: '#2563EB'
        },
        {
            icon: <FiTrendingUp />,
            text: 'Average 35% salary increase after certification',
            color: '#7C3AED'
        },
        {
            icon: <FiGlobe />,
            text: 'Accepted in 150+ countries worldwide',
            color: '#059669'
        },
        {
            icon: <FiClock />,
            text: 'Self-paced learning with 24/7 access',
            color: '#EA580C'
        }
    ];

    // IBM Specializations
    const specializations = [
        {
            icon: <FaCloud />,
            name: 'Cloud Computing',
            certifications: '8',
            color: '#2563EB',
            skills: ['AWS', 'Azure', 'Hybrid Cloud']
        },
        {
            icon: <FaRobot />,
            name: 'Artificial Intelligence',
            certifications: '6',
            color: '#7C3AED',
            skills: ['Watson AI', 'NLP', 'Machine Learning']
        },
        {
            icon: <FaChartBar />,
            name: 'Data Science',
            certifications: '5',
            color: '#059669',
            skills: ['Analysis', 'Visualization', 'Python']
        },
        {
            icon: <FaShieldAlt />,
            name: 'Cybersecurity',
            certifications: '4',
            color: '#EA580C',
            skills: ['Threat Management', 'Compliance', 'Risk Assessment']
        }
    ];

    return (
        <section className={styles.section} ref={ref}>
            {/* Animated Background Orbs */}
            <div className={styles.orb1}></div>
            <div className={styles.orb2}></div>
            <div className={styles.orb3}></div>
            <div className={styles.orb4}></div>

            <div className={styles.container}>
                {/* Header with animated gradient */}
                <motion.div
                    className={styles.header}
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: -30 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6 }}
                >
                    
                    <h2 className={styles.title}>
                        Transform Your Career with{' '}
                        <span className={styles.highlight}>IBM Certifications</span>
                    </h2>
                    <div className={styles.titleLine}></div>
                    <p className={styles.subtitle}>
                        Join 1 million+ professionals worldwide who have accelerated their careers
                        with industry-recognized IBM credentials.
                    </p>
                </motion.div>

                {/* Stats Dashboard */}
                {/* <motion.div
                    className={styles.statsDashboard}
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    ref={statsRef}
                >
                    <div className={styles.statItem}>
                        <div className={styles.statIcon}>🎓</div>
                        <div className={styles.statNumber}>{formatNumber(counts.certified)}+</div>
                        <div className={styles.statLabel}>Certified Professionals</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <div className={styles.statIcon}>📈</div>
                        <div className={styles.statNumber}>{counts.career}%</div>
                        <div className={styles.statLabel}>Career Growth</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <div className={styles.statIcon}>🌍</div>
                        <div className={styles.statNumber}>{counts.countries}+</div>
                        <div className={styles.statLabel}>Countries Worldwide</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <div className={styles.statIcon}>💰</div>
                        <div className={styles.statNumber}>{counts.salary}%</div>
                        <div className={styles.statLabel}>Salar Increase</div>
                    </div>
                </motion.div> */}

                {/* Success Stories Grid */}
                <motion.div
                    className={styles.successGrid}
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                    }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {successStories.map((story, index) => (
                        <motion.div
                            key={index}
                            className={styles.successCard}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                            whileHover={{ scale: 1.02, y: -4 }}
                        >
                            <div className={styles.successIcon} style={{ color: story.color }}>
                                {story.icon}
                            </div>
                            <p className={styles.successText}>{story.text}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Career Paths - Unique Section */}
                <motion.div
                    className={styles.careerSection}
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className={styles.careerHeader}>
                        <h3 className={styles.sectionTitle}>Choose Your <span className={styles.highlight}>Future</span></h3>
                        <p className={styles.sectionSubtitle}>Four specialized tracks to accelerate your career</p>
                    </div>

                    <div className={styles.careerGrid}>
                        {careerPaths.map((path, index) => (
                            <motion.div
                                key={index}
                                className={`${styles.careerCard} ${activeCard === index ? styles.active : ''}`}
                                onMouseEnter={() => setActiveCard(index)}
                                onMouseLeave={() => setActiveCard(null)}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                                whileHover={{ y: -6 }}
                            >
                                <div className={styles.careerIcon} style={{ background: `${path.color}15`, color: path.color }}>
                                    {path.icon}
                                </div>
                                {path.badge && (
                                    <span className={styles.careerBadge} style={{ background: `${path.color}10`, color: path.color }}>
                                        {path.badge}
                                    </span>
                                )}
                                <h4 className={styles.careerTitle}>{path.title}</h4>
                                <p className={styles.careerDesc}>{path.description}</p>
                                
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Specializations Grid */}
                <motion.div
                    className={styles.specializationSection}
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    <div className={styles.specHeader}>
                        <h3 className={styles.sectionTitle}>
                            <span className={styles.highlight}>50+</span> Certifications Available
                        </h3>
                        <p className={styles.sectionSubtitle}>Choose from 4 major domains</p>
                    </div>

                    <div className={styles.specGrid}>
                        {specializations.map((spec, index) => (
                            <motion.div
                                key={index}
                                className={styles.specCard}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9 },
                                    visible: { opacity: 1, scale: 1 }
                                }}
                                transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
                                whileHover={{ y: -4, scale: 1.02 }}
                            >
                                <div className={styles.specIcon} style={{ background: `${spec.color}15`, color: spec.color }}>
                                    {spec.icon}
                                </div>
                                <h4 className={styles.specName}>{spec.name}</h4>
                                <span className={styles.specCount}>{spec.certifications} certifications</span>
                                <div className={styles.specSkills}>
                                    {spec.skills.map((skill, idx) => (
                                        <span key={idx} className={styles.skillTag}>{skill}</span>
                                    ))}
                                </div>
                                <div className={styles.specProgress}>
                                    <div
                                        className={styles.specProgressBar}
                                        style={{
                                            width: `${(parseInt(spec.certifications) / 8) * 100}%`,
                                            background: spec.color
                                        }}
                                    ></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                {/* Stats Dashboard - Premium with SVG Icons */}
                <motion.div
                    className={styles.statsDashboard}
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    ref={statsRef}
                >
                    <div className={styles.statItem}>
                        <svg className={styles.statSvgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <div className={styles.statNumber}>{formatNumber(counts.certified)}+</div>
                        <div className={styles.statLabel}>Certified Professionals</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <svg className={styles.statSvgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <div className={styles.statNumber}>{counts.career}%</div>
                        <div className={styles.statLabel}>Career Growth</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <svg className={styles.statSvgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        <div className={styles.statNumber}>{counts.countries}+</div>
                        <div className={styles.statLabel}>Countries Worldwide</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <svg className={styles.statSvgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                        <div className={styles.statNumber}>{counts.salary}%</div>
                        <div className={styles.statLabel}>Salary Increase</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default IBMValueProposition;