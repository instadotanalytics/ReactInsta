import React, { useState, useEffect, useCallback } from 'react'
import styles from './Banner.module.css'

const slides = [
  { id: 1, image: '/banner1.png' },
  { id: 2, image: '/banner2.png' },
  { id: 3, image: '/banner3.png' },
  { id: 4, image: '/banner4.png' },
  { id: 5, image: '/banner5.png' },
]

const AUTOPLAY_INTERVAL = 5000

const getSlideClass = (slideIndex, currentIndex, total) => {
  const diff = ((slideIndex - currentIndex) % total + total) % total
 
  if (diff === 0)               return styles.active
  if (diff === 1)               return styles.nextSlide
  if (diff === 2)               return styles.nextSlide2
  if (diff === total - 1)       return styles.prevSlide
  if (diff === total - 2)       return styles.prevSlide2
  return styles.hiddenSlide
}

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
          className={`${styles.slide} ${getSlideClass(i, current, slides.length)}`}
          onClick={() => i !== current && goTo(i)}
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

    </div>
  )
}

export default Banner