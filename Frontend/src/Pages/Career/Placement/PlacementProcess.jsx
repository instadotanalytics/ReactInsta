// PlacementProcess.jsx
import React from 'react';
import styles from './PlacementProcess.module.css';
import { FaClipboardList, FaLaptopCode, FaHandshake, FaRocket, FaUserTie, FaBriefcase } from 'react-icons/fa';

const PlacementProcess = () => {
  const steps = [
    {
      icon: <FaClipboardList />,
      title: 'Skill Assessment',
      description: 'Evaluate your current skills and identify gaps with our comprehensive assessment tools.',
      duration: 'Week 1'
    },
    {
      icon: <FaLaptopCode />,
      title: 'Technical Training',
      description: 'Master industry-relevant technologies through hands-on projects and expert-led sessions.',
      duration: 'Week 2-12'
    },
    {
      icon: <FaUserTie />,
      title: 'Mock Interviews',
      description: 'Practice with real interview scenarios and get personalized feedback from industry experts.',
      duration: 'Week 13-14'
    },
    {
      icon: <FaBriefcase />,
      title: 'Resume Building',
      description: 'Create a professional resume that highlights your skills and project experience effectively.',
      duration: 'Week 15'
    },
    {
      icon: <FaHandshake />,
      title: 'Company Connect',
      description: 'Get introduced to our 500+ hiring partners through exclusive placement drives.',
      duration: 'Week 16-17'
    },
    {
      icon: <FaRocket />,
      title: 'Placement Success',
      description: 'Secure your dream job with confidence and start your professional journey.',
      duration: 'Week 18+'
    }
  ];

  return (
    <section className={styles['placement-process-section']}>
      <div className={styles['placement-process-container']}>
        <div className={styles['process-header']}>
          {/* <span className={styles['process-badge']}>Your Placement Journey</span> */}
          <h2 className={styles['process-title']}>
            How We <span className={styles['highlight-blue']}>Get You Placed</span>
          </h2>
          <p className={styles['process-subtitle']}>
            A structured 18-week roadmap designed to transform you from a learner to a industry-ready professional
          </p>
        </div>

        <div className={styles['process-timeline']}>
          {steps.map((step, index) => (
            <div key={index} className={styles['process-step']}>
              <div className={styles['step-connector']}>
                <div className={styles['step-number']}>{index + 1}</div>
                {index < steps.length - 1 && <div className={styles['step-line']}></div>}
              </div>
              <div className={styles['step-content']}>
                <div className={styles['step-icon']}>{step.icon}</div>
                <div className={styles['step-details']}>
                  <div className={styles['step-header']}>
                    <h3 className={styles['step-title']}>{step.title}</h3>
                    <span className={styles['step-duration']}>{step.duration}</span>
                  </div>
                  <p className={styles['step-description']}>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles['process-footer']}>
          <div className={styles['cta-box']}>
            <p className={styles['cta-text']}>
              💡 <strong>Ready to start your placement journey?</strong> Join our next batch and get placed in your dream company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementProcess;