import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import styles from './CustomAbout.module.css'

const features = [
  { icon: '🎯', title: 'Premium Quality', desc: 'High-quality paper and printing materials', color: '#3b82f6' },
  { icon: '⚡', title: 'Fast Turnaround', desc: '24-48 hour delivery for bulk orders', color: '#4f46e5' },
  { icon: '🎨', title: 'Custom Designs', desc: 'Fully customizable templates for your brand', color: '#06b6d4' },
  { icon: '🔒', title: 'Secure Verification', desc: 'QR codes and unique IDs for authenticity', color: '#10b981' },
]

const stats = [
  { num: '8+', label: 'Years Experience' },
  { num: '15K+', label: 'Certificates Made' },
  { num: '500+', label: 'Happy Clients' },
]

const CustomAbout = () => {
  const [counts, setCounts] = useState({ years: 0, certs: 0, clients: 0 })
  const statsRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const animationRef = useRef(null)
  const hasAnimatedRef = useRef(false)

  // Memoize features to prevent re-renders
  const memoizedFeatures = useMemo(() => features, [])
  const memoizedStats = useMemo(() => stats, [])

  // Reset counts when becoming invisible
  const resetCounts = useCallback(() => {
    setCounts({ years: 0, certs: 0, clients: 0 })
    hasAnimatedRef.current = false
  }, [])

  // Optimized counter animation
  const animateCounts = useCallback(() => {
    if (!isVisible) return
    
    // Reset counts before starting animation
    setCounts({ years: 0, certs: 0, clients: 0 })
    hasAnimatedRef.current = false

    const duration = 1500
    const startTime = performance.now()
    const targetYears = 8
    const targetCerts = 15000
    const targetClients = 500

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)

      setCounts({
        years: Math.round(targetYears * ease),
        certs: Math.round(targetCerts * ease),
        clients: Math.round(targetClients * ease),
      })

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        hasAnimatedRef.current = true
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [isVisible])

  // Optimized intersection observer with reset on leave
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Only animate if not already animated or if we want to re-animate
            if (!hasAnimatedRef.current) {
              animateCounts()
            }
          } else {
            setIsVisible(false)
            // Reset counts when element leaves viewport
            resetCounts()
          }
        })
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animateCounts, resetCounts])

  // Start animation when visible
  useEffect(() => {
    if (isVisible && !hasAnimatedRef.current) {
      animateCounts()
    }
  }, [isVisible, animateCounts])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const imageSrc = useMemo(() => {
    return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&auto=format&q=80'
  }, [])

  return (
    <section className={styles.about}>
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>
      <div className={styles.orb3}></div>

      <div className={styles.container}>
        {/* ── Left: Image ── */}
        <div className={`${styles.imageWrapper} ${isVisible ? styles.fadeInLeft : ''}`}>
          <div className={styles.imgOuter}>
            <div className={styles.imageGlow}></div>
            
            <div className={styles.imageContainer}>
              {!imageLoaded && <div className={styles.imagePlaceholder} />}
              <img
                src={imageSrc}
                alt="Certificate creation process"
                className={`${styles.aboutImage} ${imageLoaded ? styles.imageLoaded : ''}`}
                loading="lazy"
                onLoad={handleImageLoad}
                width="600"
                height="400"
                decoding="async"
              />
            </div>
            
            <div className={styles.imageOverlay}></div>
            
            <div className={`${styles.corner} ${styles.cornerTL}`}></div>
            <div className={`${styles.corner} ${styles.cornerTR}`}></div>
            <div className={`${styles.corner} ${styles.cornerBL}`}></div>
            <div className={`${styles.corner} ${styles.cornerBR}`}></div>
          </div>

          {/* <div className={styles.experienceBadge}>
            <span className={styles.years}>{counts.years}+</span>
            <span className={styles.badgeText}>
              Years of<br />Excellence
            </span>
          </div> */}
        </div>

        {/* ── Right: Content ── */}
        <div className={`${styles.content} ${isVisible ? styles.fadeInRight : ''}`}>
          <span className={styles.subtitle}>
            <span className={styles.subtitleDot}></span>
            About Our Company
          </span>

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
            {memoizedFeatures.map((f, i) => (
              <div 
                key={i} 
                className={styles.featureItem}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={styles.featureIcon} style={{ background: `linear-gradient(135deg, ${f.color}15, ${f.color}08)` }}>
                  {f.icon}
                </div>
                <div className={styles.featureContent}>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.stats} ref={statsRef}>
            {memoizedStats.map((s, i) => (
              <div key={i} className={styles.statBox}>
                <div className={styles.statNumber}>
                  <h4>
                    {i === 0 ? counts.years : i === 1 ? counts.certs.toLocaleString() : counts.clients}+
                  </h4>
                  <p>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomAbout