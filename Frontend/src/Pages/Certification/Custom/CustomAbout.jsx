// CustomAbout.jsx
import React from 'react'
import styles from './CustomAbout.module.css'

const features = [
  {
    icon: '🎯',
    title: 'Premium Quality',
    desc: 'High-quality paper and printing materials',
  },
  {
    icon: '⚡',
    title: 'Fast Turnaround',
    desc: '24-48 hour delivery for bulk orders',
  },
  {
    icon: '🎨',
    title: 'Custom Designs',
    desc: 'Fully customizable templates for your brand',
  },
  {
    icon: '🔒',
    title: 'Secure Verification',
    desc: 'QR codes and unique IDs for authenticity',
  },
]

const stats = [
  { num: '8+',   label: 'Years Experience' },
  { num: '15K+', label: 'Certificates Made' },
  { num: '500+', label: 'Happy Clients' },
]

const CustomAbout = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>

        {/* ── Left: Image ── */}
        <div className={styles.imageWrapper}>
          <div className={styles.imgOuter}>
            <img
              src="https://i.pinimg.com/1200x/33/a4/f1/33a4f14dbb3e2e4a2b9a14f88371f6cf.jpg"
              alt="Certificate creation process"
              className={styles.aboutImage}
            />
          </div>

          <div className={styles.experienceBadge}>
            <span className={styles.years}>8+</span>
            <span className={styles.badgeText}>Years of{'\n'}Excellence</span>
          </div>

          <div className={styles.dotsGrid} />
        </div>

        {/* ── Right: Content ── */}
        <div className={styles.content}>

          <span className={styles.subtitle}>About Our Company</span>

          <h2 className={styles.title}>
            We Create{' '}
            <span className={styles.highlight}>Memorable Certificates</span>{' '}
            for Your Achievements
          </h2>

          <p className={styles.description}>
            With over 8 years of experience in certificate design and printing,
            we've helped thousands of organizations celebrate their achievements
            with beautifully crafted custom certificates.
          </p>

          <div className={styles.features}>
            {features.map((f, i) => (
              <div key={i} className={styles.featureItem}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div className={styles.featureContent}>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.stats}>
            {stats.map((s, i) => (
              <div key={i} className={styles.statBox}>
                <h4>{s.num}</h4>
                <p>{s.label}</p>
              </div>
            ))}
          </div>

          <button className={styles.learnMoreBtn}>
            Learn More About Us
            <span className={styles.arrow}>→</span>
          </button>

        </div>
      </div>
    </section>
  )
}

export default CustomAbout