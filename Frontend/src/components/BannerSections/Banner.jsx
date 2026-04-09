import React, { useState, useEffect, useCallback } from 'react'
import styles from './Banner.module.css'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    tag: 'Adventure',
    title: ['Discover the', 'Hidden Peaks'],
    titleItalicIndex: 1,
    description:
      'Journey beyond the known horizon. Every mountain holds a secret waiting to be uncovered by those bold enough to climb.',
    cta: 'Explore Now',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1600&q=80',
    tag: 'Wildlife',
    title: ['Into the', 'Wild Unknown'],
    titleItalicIndex: 1,
    description:
      'Witness nature in its rawest form. The untamed world breathes with a rhythm older than time itself.',
    cta: 'Learn More',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80',
    tag: 'Urban',
    title: ['Cities that', 'Never Sleep'],
    titleItalicIndex: 0,
    description:
      'Skylines that pulse with ambition. Every light in every window is a story still being written.',
    cta: 'Discover More',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=80',
    tag: 'Ocean',
    title: ['Beneath the', 'Azure Depths'],
    titleItalicIndex: 1,
    description:
      'The ocean holds more mysteries than the sky. Dive into a world of silence, colour and wonder.',
    cta: 'Go Deeper',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80',
    tag: 'Forest',
    title: ['Lost in the', 'Ancient Grove'],
    titleItalicIndex: 0,
    description:
      'Forests remember what cities have forgotten. Step inside and let the ancient canopy reclaim you.',
    cta: 'Wander In',
  },
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