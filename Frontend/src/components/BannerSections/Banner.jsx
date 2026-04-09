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

      {slides.map((slide, i) => (
        <div key={slide.id} className={`${styles.slide} ${i === current ? styles.active : ''}`}>
          <img
            className={styles.slideImage}
            src={slide.image}
            alt={`Slide ${slide.id}`}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className={styles.overlay} />
        </div>
      ))}

      <div className={styles.counter}>
        <span className={styles.counterCurrent}>{String(current + 1).padStart(2, '0')}</span>
        &nbsp;/&nbsp;{String(slides.length).padStart(2, '0')}
      </div>

      <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prev} aria-label="Previous">
        ←
      </button>
      <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={next} aria-label="Next">
        →
      </button>

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

      <div key={progressKey} className={styles.progressBar} />

    </div>
  )
}

export default Banner