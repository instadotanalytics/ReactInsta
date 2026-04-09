import React, { useState, useEffect, useCallback } from 'react'
import styles from './Banner.module.css'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Coding / Developer Image
    tag: 'Web Development',
    title: ['Master', 'Frontend Skills'],
    titleItalicIndex: 1,
    description:
      'Learn HTML, CSS, and JavaScript to build stunning websites. Start your journey as a modern web developer today.',
    cta: 'Enroll Now',
  },
  {
    id: 2,
    image: 'https://i.pinimg.com/736x/7b/fd/87/7bfd875e85fbbed980e9df59bcde8579.jpg', // Backend / Server Image
    tag: 'Backend',
    title: ['Dive into', 'Server-Side Development'],
    titleItalicIndex: 1,
    description:
      'Understand databases, APIs, and server-side programming. Build robust backends with Node.js, Python, or Java.',
    cta: 'Learn More',
  },
  {
    id: 3,
    image: 'https://i.pinimg.com/736x/3f/a8/80/3fa8800db6f8af0c736b78e9d85e6fba.jpg', // Cloud / DevOps Image
    tag: 'Cloud & DevOps',
    title: ['Explore', 'Cloud Technologies'],
    titleItalicIndex: 1,
    description:
      'Get hands-on experience with AWS, Azure, and CI/CD pipelines. Learn to deploy and manage scalable applications.',
    cta: 'Start Learning',
  },
  {
    id: 4,
    image: 'https://i.pinimg.com/736x/51/f2/33/51f233f4e9ceab328fda4882eb6457ad.jpg', // Data Science / AI Image
    tag: 'Data Science',
    title: ['Analyze', 'Data with Python'],
    titleItalicIndex: 1,
    description:
      'Learn Python, SQL, and machine learning algorithms to extract insights from data and build AI models.',
    cta: 'Explore Courses',
  },
  {
    id: 5,
    image: 'https://i.pinimg.com/1200x/52/4e/b7/524eb7e05b71dede4ea88230c7da51ed.jpg', // Cybersecurity Image
    tag: 'Cybersecurity',
    title: ['Secure', 'Digital Systems'],
    titleItalicIndex: 1,
    description:
      'Understand network security, ethical hacking, and risk management. Protect systems and data from cyber threats.',
    cta: 'Join Now',
  },
];
const AUTOPLAY_INTERVAL = 5000

const Banner = () => {
  const [current, setCurrent] = useState(0)
  const [progressKey, setProgressKey] = useState(0)

  const goTo = useCallback((index) => {
    setCurrent(index)
    setProgressKey((k) => k + 1)
  }, [])

  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])

  useEffect(() => {
    const timer = setTimeout(next, AUTOPLAY_INTERVAL)
    return () => clearTimeout(timer)
  }, [next])

  return (
    <div className={styles.sliderWrapper}>
      {/* Slides */}
      {slides.map((slide, i) => (
        <div key={slide.id} className={`${styles.slide} ${i === current ? styles.active : ''}`}>
          <img
            className={styles.slideImage}
            src={slide.image}
            alt={slide.title.join(' ')}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className={styles.overlay} />

          <div className={styles.content}>
            <p className={styles.slideNumber}>
              {String(i + 1).padStart(2, '0')} &nbsp; {slide.tag}
            </p>

            <h2 className={styles.title}>
              {slide.title.map((line, li) =>
                li === slide.titleItalicIndex ? (
                  <span key={li}>
                    <span className={styles.titleItalic}>{line}</span>
                    {li < slide.title.length - 1 && <br />}
                  </span>
                ) : (
                  <span key={li}>
                    {line}
                    {li < slide.title.length - 1 && <br />}
                  </span>
                )
              )}
            </h2>

            <p className={styles.description}>{slide.description}</p>

            <button className={styles.cta}>
              {slide.cta} <span className={styles.ctaArrow}>→</span>
            </button>
          </div>
        </div>
      ))}

      {/* Counter */}
      <div className={styles.counter}>
        <span className={styles.counterCurrent}>{String(current + 1).padStart(2, '0')}</span>
        &nbsp;/&nbsp;{String(slides.length).padStart(2, '0')}
      </div>

      {/* Nav Buttons */}
      <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prev} aria-label="Previous">
        ←
      </button>
      <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={next} aria-label="Next">
        →
      </button>

      {/* Dots */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.activeDot : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div key={progressKey} className={styles.progressBar} />
    </div>
  )
}

export default Banner