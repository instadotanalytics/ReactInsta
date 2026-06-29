// ImpactGrid.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './ImpactGrid.module.css';

// React Icons imports - Feather Icons (Fi) - ONLY VALID ONES
import { 
  FiUsers, 
  FiTrendingUp, 
  FiBriefcase, 
  FiBookOpen,
  FiTarget,
  FiEdit2,
  FiZap,
  FiBarChart2,
  FiAward,
  FiStar,
  FiCheckCircle,
  FiGlobe,
  FiClock,
  FiLayers,
  FiCompass
} from 'react-icons/fi';

// React Icons imports - Font Awesome (Fa) - ONLY VALID ONES
import {
  FaUsers,
  FaChartLine,
  FaSuitcase,
  FaBook,
  FaBullseye,
  FaPenFancy,
  FaBolt,
  FaChartBar,
  FaTrophy,
  FaStar as FaStarIcon,
  FaCheckCircle as FaCheckCircleIcon,
  FaGlobeAmericas,
  FaBuilding,
  FaClock as FaClockIcon,
  FaLayerGroup,
  FaCompass as FaCompassIcon,
  FaRocket
} from 'react-icons/fa';

// React Icons imports - Material Design (Md) - ONLY VALID ONES
import {
  MdPeople,
  MdTrendingUp as MdTrendingUpIcon,
  MdWork,
  MdMenuBook,
  MdTrackChanges,
  MdEdit,
  MdFlashOn,
  MdBarChart,
  MdEmojiEvents,
  MdStar as MdStarIcon,
  MdVerified,
  MdPublic,
  MdBusinessCenter,
  MdAccessTime,
  MdViewModule,
  MdExplore
} from 'react-icons/md';

const ImpactGrid = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({});
  const sectionRef = useRef(null);
  const [activeMetric, setActiveMetric] = useState(null);

  // Professional metrics data with React Icons
  const metrics = [
    {
      id: 'students',
      label: 'Students Trained',
      value: 750,
      suffix: '+',
      icon: <FaUsers />,
      description: 'Across 15+ countries',
      color: '#6C63FF'
    },
    {
      id: 'placements',
      label: 'Placement Rate',
      value: 92,
      suffix: '%',
      icon: <FiTrendingUp />,
      description: 'Industry average: 65%',
      color: '#10B981'
    },
    {
      id: 'companies',
      label: 'Hiring Partners',
      value: 120,
      suffix: '+',
      icon: <FaBuilding />,
      description: 'Including Fortune 500',
      color: '#F59E0B'
    },
    {
      id: 'courses',
      label: 'Courses Available',
      value: 50,
      suffix: '+',
      icon: <FiBookOpen />,
      description: 'Updated quarterly',
      color: '#EC4899'
    }
  ];

  // Professional focus areas with React Icons
  const focusAreas = [
    {
      title: 'Strategy',
      description: 'Data-driven learning paths aligned with industry demands',
      icon: <FiTarget />
    },
    {
      title: 'Design',
      description: 'Curriculum designed for practical, hands-on application',
      icon: <FiEdit2 />
    },
    {
      title: 'Development',
      description: 'Cutting-edge tech stacks used by top companies',
      icon: <FiZap />
    },
    {
      title: 'Growth',
      description: 'Continuous career support and skill advancement',
      icon: <FiBarChart2 />
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      metrics.forEach((metric, index) => {
        setTimeout(() => {
          setCounters(prev => ({
            ...prev,
            [metric.id]: metric.value
          }));
        }, 300 + index * 150);
      });
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className={styles.impactGrid}>
      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} ${isVisible ? styles.animateIn : ''}`}>
          <span className={styles.badge}>
            <FiAward size={14} /> Impact
          </span>
          <h2 className={styles.title}>
            <span className={styles.lightText}>Creating</span>
            <span className={styles.highlight}> Measurable</span>
            <br />
            <span className={styles.lightText}>Career</span>
            <span className={styles.highlight}> Transformation</span>
          </h2>
          <p className={styles.subtitle}>
            Where strategy meets execution — delivering results you can track
          </p>
        </div>

        {/* Metrics Grid */}
        <div className={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <div
              key={metric.id}
              className={`${styles.metricCard} ${isVisible ? styles.animateMetric : ''}`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                borderBottomColor: metric.color
              }}
              onMouseEnter={() => setActiveMetric(metric.id)}
              onMouseLeave={() => setActiveMetric(null)}
            >
              <div className={styles.metricHeader}>
                <span className={styles.metricIcon} style={{ color: metric.color }}>
                  {metric.icon}
                </span>
                <span 
                  className={styles.metricValue}
                  style={{ color: metric.color }}
                >
                  {counters[metric.id] || 0}{metric.suffix}
                </span>
              </div>
              
              <div className={styles.metricBody}>
                <h4 className={styles.metricLabel}>{metric.label}</h4>
                <p className={styles.metricDescription}>{metric.description}</p>
              </div>

              <div className={styles.metricBar}>
                <div 
                  className={styles.metricProgress}
                  style={{ 
                    width: isVisible ? `${(metric.value / 1000) * 100}%` : '0%',
                    background: metric.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Focus Areas */}
        <div className={styles.focusGrid}>
          {focusAreas.map((area, index) => (
            <div
              key={index}
              className={`${styles.focusCard} ${isVisible ? styles.animateFocus : ''}`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <span className={styles.focusIcon} style={{ color: '#6C63FF' }}>
                {area.icon}
              </span>
              <h4 className={styles.focusTitle}>{area.title}</h4>
              <p className={styles.focusDescription}>{area.description}</p>
              <div className={styles.focusLine} />
            </div>
          ))}
        </div>

        {/* Additional stat - clean and minimal */}
        <div className={`${styles.footerStat} ${isVisible ? styles.animateFooter : ''}`}>
          <span className={styles.footerIcon}>
            <FiAward />
          </span>
          <span className={styles.footerNumber}>8.5 LPA</span>
          <span className={styles.footerLabel}>Highest package • 2024</span>
          <span className={styles.footerDivider}>•</span>
          <span className={styles.footerIcon}>
            <FiTrendingUp />
          </span>
          <span className={styles.footerNumber}>92%</span>
          <span className={styles.footerLabel}>Placement rate</span>
        </div>
      </div>
    </section>
  );
};

export default ImpactGrid;