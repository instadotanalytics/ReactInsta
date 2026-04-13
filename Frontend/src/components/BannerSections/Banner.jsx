import React, { useState, useEffect, useCallback } from 'react'
import styles from './Banner.module.css'

const slides = [
  { id: 1, image: '/banner1.jpeg' },
  { id: 2, image: '/banner2.jpeg' },
  { id: 3, image: '/banner3.jpeg' },
  { id: 4, image: '/banner4.jpeg' },
  { id: 5, image: '/banner5.jpeg' },
]

const AUTOPLAY_INTERVAL = 5000

const Banner = () => {
  const [current, setCurrent] = useState(0)
  const [progressKey, setProgressKey] = useState(0)
  const [direction, setDirection] = useState('next')

  const goTo = useCallback((index, dir = 'next') => {
    setDirection(dir)
    setCurrent(index)
    setProgressKey((k) => k + 1)
  }, [])

  const prev = () => goTo((current - 1 + slides.length) % slides.length, 'prev')
  const next = useCallback(() => goTo((current + 1) % slides.length, 'next'), [current, goTo])

  useEffect(() => {
    const timer = setTimeout(next, AUTOPLAY_INTERVAL)
    return () => clearTimeout(timer)
  }, [next])

  return (
    <div className={styles.sliderWrapper}>

      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${i === current ? styles.active : ''}`}
        >
          <img
            className={styles.slideImage}
            src={slide.image}
            alt={`Slide ${slide.id}`}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className={styles.overlay} />
        </div>
      ))}

      {/* Slide Number Counter — top right */}
      <div className={styles.counter}>
        <span className={styles.counterCurrent}>
          {String(current + 1).padStart(2, '0')}
        </span>
        <span className={styles.counterSep}>/</span>
        <span className={styles.counterTotal}>
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Vertical line decoration near counter */}
      <div className={styles.counterLine} />

      {/* Prev / Next Buttons */}
      <button
        className={`${styles.navBtn} ${styles.prevBtn}`}
        onClick={prev}
        aria-label="Previous"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        className={`${styles.navBtn} ${styles.nextBtn}`}
        onClick={next}
        aria-label="Next"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Bottom Controls Row: dots + progress */}
      <div className={styles.bottomBar}>
        {/* Dot indicators */}
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

        {/* Slide label */}
        <span className={styles.slideLabel}>
          Slide {String(current + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Progress bar at very bottom */}
      <div key={progressKey} className={styles.progressBar} />

    </div>
  )
}

export default Banner