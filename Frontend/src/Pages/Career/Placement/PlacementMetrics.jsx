// PlacementMetrics.jsx
import React from 'react';
import styles from './PlacementMetrics.module.css';
import { FaBuilding, FaChartLine, FaMoneyBillWave, FaStar } from 'react-icons/fa';

const PlacementMetrics = () => {
  const metrics = [
    {
      icon: <FaBuilding />,
      value: '500+',
      label: 'Hiring Partners',
      description: 'Active companies recruiting from our talent pool'
    },
    {
      icon: <FaChartLine />,
      value: '95%',
      label: 'Placement Rate',
      description: 'Students placed within 6 months of completion'
    },
    {
      icon: <FaMoneyBillWave />,
      value: '₹4.5 LPA',
      label: 'Average Package',
      description: 'Highest package offered: ₹12 LPA'
    },
    {
      icon: <FaStar />,
      value: '50+',
      label: 'Recurring Recruiters',
      description: 'Companies that hire from us every batch'
    }
  ];

  return (
    <section className={styles['placement-metrics-section']}>
      <div className={styles['placement-metrics-container']}>
        <div className={styles['metrics-header']}>
          <span className={styles['metrics-badge']}>Placement Impact</span>
          <h2 className={styles['metrics-title']}>
            Your <span className={styles['highlight-blue']}>Career Numbers</span> Speak
          </h2>
          <p className={styles['metrics-subtitle']}>
            Real data from our successful placements that demonstrate our commitment to your career growth
          </p>
        </div>

        <div className={styles['metrics-grid']}>
          {metrics.map((metric, index) => (
            <div key={index} className={styles['metric-card']}>
              <div className={styles['metric-icon']}>{metric.icon}</div>
              <div className={styles['metric-value']}>{metric.value}</div>
              <div className={styles['metric-label']}>{metric.label}</div>
              <div className={styles['metric-description']}>{metric.description}</div>
            </div>
          ))}
        </div>

        <div className={styles['metrics-footer']}>
          <div className={styles['testimonial-highlight']}>
            <span className={styles['quote-icon']}>"</span>
            <p className={styles['quote-text']}>
              Insta Dot Analytics didn't just train me - they placed me in my dream role at Genpact with ₹6 LPA
            </p>
            <span className={styles['quote-author']}>- Om Prashant Kasar, Software Engineer</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementMetrics;