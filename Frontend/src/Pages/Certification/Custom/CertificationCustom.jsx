import React, { useEffect, useRef, useState } from 'react';
import styles from './CertificationCustom.module.css';

const CertificationCustom = () => {
  const [activeTab, setActiveTab] = useState('benefits');
  const statsRef = useRef(null);
  const [counts, setCounts] = useState({ certs: 0, companies: 0, templates: 0 });

  // Animation for stats counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounts();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounts = () => {
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        certs: Math.round(15000 * ease),
        companies: Math.round(500 * ease),
        templates: Math.round(50 * ease),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className={styles.container}>
      {/* Animated background orbs */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>
      <div className={styles.orb3}></div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Create Custom Certificates
            <span className={styles.gradientText}> That Impress</span>
          </h1>
          <p>
            Design professional, personalized certificates for your achievements,
            training programs, and special recognitions. Fully customizable templates
            with your company branding.
          </p>
        </div>

        {/* Floating stats cards */}
        <div className={styles.statsGrid} ref={statsRef}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{counts.certs.toLocaleString()}+</div>
            <div className={styles.statLabel}>Certificates Created</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{counts.companies}+</div>
            <div className={styles.statLabel}>Happy Companies</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{counts.templates}+</div>
            <div className={styles.statLabel}>Design Templates</div>
          </div>
        </div>

        {/* Feature badges */}
        <div className={styles.featureBadges}>
          <span>✓ Premium certificate templates</span>
          <span>✓ Add company logo & branding</span>
          <span>✓ Digital & print ready formats</span>
          <span>✓ Bulk certificate generation</span>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about}>
        <div className={styles.aboutHeader}>
          <h2>We Create Memorable Certificates for Your Achievements</h2>
          <p>
            With over 8 years of experience in certificate design and printing,
            we've helped thousands of organizations celebrate their achievements
            with beautifully crafted custom certificates.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h3>Premium Quality</h3>
            <p>High-quality paper and printing materials</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Fast Turnaround</h3>
            <p>24-48 hour delivery for bulk orders</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎨</div>
            <h3>Custom Designs</h3>
            <p>Fully customizable templates for your brand</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>Secure Verification</h3>
            <p>QR codes and unique IDs for authenticity</p>
          </div>
        </div>
      </section>

      {/* Trusted Companies */}
      <section className={styles.trusted}>
        <h3>Trusted by Dreamers, Doers and Leaders</h3>
        <div className={styles.companyMarquee}>
          <div className={styles.marqueeTrack}>
            {['Microsoft', 'Amazon', 'Apple', 'Meta', 'IBM', 'Intel', 'Cisco', 'Oracle', 'Salesforce', 'Adobe', 'NVIDIA'].map((company) => (
              <span key={company} className={styles.companyLogo}>{company}</span>
            ))}
            {/* Duplicate for seamless loop */}
            {['Microsoft', 'Amazon', 'Apple', 'Meta', 'IBM', 'Intel', 'Cisco', 'Oracle', 'Salesforce', 'Adobe', 'NVIDIA'].map((company) => (
              <span key={company + '-dup'} className={styles.companyLogo}>{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Journey */}
      <section className={styles.journey}>
        <div className={styles.journeyHeader}>
          <span className={styles.journeyIcon}>🎓</span>
          <h2>Start Your Certification Journey</h2>
          <p>
            Select a program to explore its benefits, curriculum, and career outcomes.
          </p>
        </div>

        <div className={styles.tabContainer}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'benefits' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('benefits')}
            >
              Benefits
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'curriculum' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'outcomes' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('outcomes')}
            >
              Career Outcomes
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'benefits' && (
              <div className={styles.factBox}>
                <h4>Did You Know?</h4>
                <p>
                  Certified professionals earn 25–40% higher salaries and are 2× more likely
                  to be promoted within 12 months.
                </p>
              </div>
            )}
            {activeTab === 'curriculum' && (
              <div className={styles.curriculumList}>
                <h4>What You'll Learn</h4>
                <ul>
                  <li>✓ Advanced certification design principles</li>
                  <li>✓ Digital & print production techniques</li>
                  <li>✓ Brand integration & customization</li>
                  <li>✓ Quality assurance & verification methods</li>
                </ul>
              </div>
            )}
            {activeTab === 'outcomes' && (
              <div className={styles.outcomesGrid}>
                <div className={styles.outcomeCard}>
                  <span className={styles.outcomeEmoji}>🚀</span>
                  <h5>Career Growth</h5>
                  <p>Accelerate your career with recognized certification</p>
                </div>
                <div className={styles.outcomeCard}>
                  <span className={styles.outcomeEmoji}>💼</span>
                  <h5>New Opportunities</h5>
                  <p>Unlock doors to premium job positions</p>
                </div>
                <div className={styles.outcomeCard}>
                  <span className={styles.outcomeEmoji}>📈</span>
                  <h5>Higher Earnings</h5>
                  <p>Significantly increase your earning potential</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <h2>What Our Students Say</h2>
        <p className={styles.testimonialSubtitle}>
          Real feedback from real learners who transformed their careers with our training programs.
        </p>

        <div className={styles.testimonialGrid}>
          {[
            { name: 'Priya Sharma', location: 'Mumbai, Maharashtra', text: 'Amazing experience! Everything was delivered exactly as promised. The team guided me throughout the process.' },
            { name: 'Aarav Mehta', location: 'Ahmedabad, Gujarat', text: 'Excellent quality and service. The pricing is slightly higher, but it\'s absolutely worth it. Highly recommended!' },
            { name: 'Ananya Desai', location: 'Pune, Maharashtra', text: 'I enrolled online and everything went smoothly. The course content was practical and well-structured.' },
            { name: 'Vikram Singh', location: 'Jaipur, Rajasthan', text: 'Outstanding training experience. The mentors were very supportive and knowledgeable.' },
            { name: 'Neha Gupta', location: 'Delhi, NCR', text: 'First time joining such a program and I\'m impressed. Customer support responded quickly and professionally.' }
          ].map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p>"{testimonial.text}"</p>
              <div className={styles.testimonialAuthor}>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CertificationCustom;