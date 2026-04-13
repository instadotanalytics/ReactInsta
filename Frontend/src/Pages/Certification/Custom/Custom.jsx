// Custom.jsx
import React from 'react'
import styles from './Custom.module.css'
import CustomAbout from './CustomAbout'
import Footer from "../../../components/Footer/Footer"
import Header from "../../../components/Header/Header"
import Companypartners from "../../Courses/Companypartners"
import CertificationApplyForm from "../../CertificationApplyForm"
import ReviewSection from "../../ReviewSection"

const Custom = () => {
  return (
    <>
      <Header />

      <section className={styles.hero}>
        <div className={styles.container}>

          {/* ── Left: Content ── */}
          <div className={styles.content}>

            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Custom Certificates
            </span>

            <h1 className={styles.title}>
              Create <span className={styles.highlight}>Custom Certificates</span> That Impress
            </h1>

            <p className={styles.description}>
              Design professional, personalized certificates for your achievements,
              training programs, and special recognitions. Fully customizable templates
              with your company branding.
            </p>

            <div className={styles.features}>
              {[
                'Premium certificate templates',
                'Add company logo & branding',
                'Digital & print ready formats',
                'Bulk certificate generation',
              ].map((text, i) => (
                <div key={i} className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

           

            <div className={styles.stats}>
              {[
                { num: '15K+', label: 'Certificates Created' },
                { num: '500+', label: 'Happy Companies' },
                { num: '50+',  label: 'Design Templates' },
              ].map((s, i) => (
                <div key={i} className={styles.statItem}>
                  <h3>{s.num}</h3>
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Image ── */}
          <div className={styles.imageWrapper}>
            <div className={styles.imgFrame}>
              <img
                src="https://i.pinimg.com/1200x/83/8c/cc/838ccc2629857f40606a3d6927de1e72.jpg"
                alt="Custom certificate preview"
                className={styles.heroImage}
              />
            </div>

            <div className={styles.certificateBadge}>
              Premium Quality
            </div>

            <div className={styles.floatingCard}>
              <div className={styles.fcNum}>15K+</div>
              <div className={styles.fcLabel}>Certs Issued</div>
            </div>

            <div className={styles.dotsGrid} />
          </div>

        </div>
      </section>

      <CustomAbout />
      <Companypartners />
      <CertificationApplyForm />
      <ReviewSection />
      <Footer />
    </>
  )
}

export default Custom