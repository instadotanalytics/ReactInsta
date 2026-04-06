// Custom.jsx
import React from 'react'
import styles from './Custom.module.css'
import CustomAbout from './CustomAbout'
import Footer  from "../../../components/Footer/Footer"
import Header from "../../../components/Header/Header"
import Companypartners from "../../Courses/Companypartners"
import CertificationApplyForm from "../../CertificationApplyForm"
import ReviewSection from "../../ReviewSection"

const Custom = () => {
  return (
     <>
     <Header/>
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Left side - Content */}
        <div className={styles.content}>
          <h1 className={styles.title}>
            Create <span className={styles.highlight}>Custom Certificates</span> That Impress
          </h1>
          <p className={styles.description}>
            Design professional, personalized certificates for your achievements, 
            training programs, and special recognitions. Fully customizable templates 
            with your company branding.
          </p>
          <div className={styles.features}>
            <div className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Premium certificate templates</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Add company logo & branding</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Digital & print ready formats</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Bulk certificate generation</span>
            </div>
          </div>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <h3>15K+</h3>
              <p>Certificates Created</p>
            </div>
            <div className={styles.statItem}>
              <h3>500+</h3>
              <p>Happy Companies</p>
            </div>
            <div className={styles.statItem}>
              <h3>50+</h3>
              <p>Design Templates</p>
            </div>
          </div>
        </div>

        {/* Right side - Certificate Preview Image */}
        <div className={styles.imageWrapper}>
          <img 
            src="https://i.pinimg.com/1200x/83/8c/cc/838ccc2629857f40606a3d6927de1e72.jpg" 
            alt="Custom certificate preview" 
            className={styles.heroImage}
          />
          <div className={styles.certificateBadge}>
            <span>Premium Quality</span>
          </div>
        </div>
      </div>
    </section>
    <CustomAbout/>
    <Companypartners/>
    <CertificationApplyForm/>
    <ReviewSection/>
    <Footer/>
   </>
  )
}

export default Custom