import React from 'react';
import styles from './BenefitsRedhat.module.css';

const BenefitsRedhat = () => {
  const benefits = [
    {
      id: 1,
      icon: "🚀",
      title: "Enterprise-Grade Stability",
      description: "99.999% uptime with mission-critical support and 10+ years of lifecycle coverage for your infrastructure.",
      highlight: "5 Nines Availability"
    },
    {
      id: 2,
      icon: "🛡️",
      title: "Security First Approach",
      description: "Proactive vulnerability identification and fixes with FIPS 140-2 and Common Criteria certifications.",
      highlight: "24/7 Security Monitoring"
    },
    {
      id: 3,
      icon: "💻",
      title: "Hybrid Cloud Flexibility",
      description: "Seamlessly deploy and manage workloads across on-premise, multi-cloud, and edge environments.",
      highlight: "Any Infrastructure"
    },
    {
      id: 4,
      icon: "⚡",
      title: "Innovation Acceleration",
      description: "Access to cutting-edge technologies through OpenShift and industry-leading Kubernetes platform.",
      highlight: "60% Faster Deployment"
    },
    {
      id: 5,
      icon: "🌍",
      title: "Global Ecosystem",
      description: "Certified solutions from 2000+ technology partners including AWS, Microsoft, Google, and IBM.",
      highlight: "2000+ Partners"
    },
    {
      id: 6,
      icon: "💰",
      title: "Cost Optimization",
      description: "Reduce TCO by up to 40% with open source solutions and avoid vendor lock-in.",
      highlight: "40% Lower TCO"
    }
  ];

  return (
    <section className={styles.benefitsSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.subtitle}>Why Choose Red Hat</span>
          <h2 className={styles.title}>
            Transform Your Business with 
            <span className={styles.highlight}> Enterprise Open Source</span>
          </h2>
          <p className={styles.description}>
            Join thousands of enterprises that trust Red Hat to power their digital transformation 
            journey with secure, scalable, and innovative open source solutions.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit) => (
            <div key={benefit.id} className={styles.benefitCard}>
              <div className={styles.cardInner}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>{benefit.icon}</span>
                  <div className={styles.iconGlow}></div>
                </div>
                
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDescription}>{benefit.description}</p>
                
                <div className={styles.highlightBadge}>
                  <span className={styles.highlightText}>{benefit.highlight}</span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsRedhat;