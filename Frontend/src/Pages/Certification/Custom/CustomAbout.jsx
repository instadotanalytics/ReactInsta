// CustomAbout.jsx
import React from 'react'
import styles from './CustomAbout.module.css'

const CustomAbout = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        {/* Left side - Image */}
        <div className={styles.imageWrapper}>
          <img 
            src="https://i.pinimg.com/1200x/33/a4/f1/33a4f14dbb3e2e4a2b9a14f88371f6cf.jpg" 
            alt="Certificate creation process" 
            className={styles.aboutImage}
          />
          <div className={styles.experienceBadge}>
            <span className={styles.years}>8+</span>
            <span className={styles.text}>Years of Excellence</span>
          </div>
        </div>

        {/* Right side - Content */}
        <div className={styles.content}>
          <span className={styles.subtitle}>About Our Company</span>
          <h2 className={styles.title}>
            We Create <span className={styles.highlight}>Memorable Certificates</span> for Your Achievements
          </h2>
          
          <p className={styles.description}>
            With over 8 years of experience in certificate design and printing, 
            we've helped thousands of organizations celebrate their achievements 
            with beautifully crafted custom certificates.
          </p>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🎯</div>
              <div className={styles.featureContent}>
                <h3>Premium Quality</h3>
                <p>High-quality paper and printing materials</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>⚡</div>
              <div className={styles.featureContent}>
                <h3>Fast Turnaround</h3>
                <p>24-48 hour delivery for bulk orders</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🎨</div>
              <div className={styles.featureContent}>
                <h3>Custom Designs</h3>
                <p>Fully customizable templates for your brand</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🔒</div>
              <div className={styles.featureContent}>
                <h3>Secure Verification</h3>
                <p>QR codes and unique IDs for authenticity</p>
              </div>
            </div>
          </div>

         

         
        </div>
      </div>
    </section>
  )
}

export default CustomAbout