// OurImpact.jsx - Premium ITGeeks-Style Sticky Storytelling
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './OurImpact.module.css';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: 1,
    title: 'Trusted By Learners Across India',
    subtitle: 'Empowering Careers Nationwide',
    desc: 'We provide industry-focused training programs that help learners gain real-world skills and grow their careers. Our comprehensive approach ensures every student achieves their professional goals.',
    image: '/images/download (1).jfif',
    tag: '01',
  },
  {
    id: 2,
    title: 'Industry-Aligned Curriculum',
    subtitle: 'Built with Industry Experts',
    desc: 'Courses designed with top industry experts. Stay ahead with industry-relevant skills, practical learning experiences, and up-to-date content tailored to employer expectations.',
    image: '/images/Importancia de la protección de datos y privacidad.jfif',
    tag: '02',
  },
  {
    id: 3,
    title: 'Hands-on Projects',
    subtitle: 'Real-World Experience',
    desc: 'Build a real-world portfolio with live projects. Apply your knowledge to practical challenges, gain industry experience, and develop job-ready skills through hands-on learning.',
    image: '/images/growth now.jfif',
    tag: '03',
  },
  {
    id: 4,
    title: 'Global Certification',
    subtitle: 'Recognized Worldwide',
    desc: 'Internationally recognized certificates that showcase your expertise and boost your career prospects. Gain credentials valued by employers across industries and around the world.',
    image: '/images/download (2).jfif',
    tag: '04',
  },
  {
    id: 5,
    title: 'Expert Mentors',
    subtitle: 'Learn from the Best',
    desc: 'Learn from experienced industry professionals who provide valuable guidance, practical insights, and mentorship to help you build confidence and succeed in your career.',
    image: '/images/download (3).jfif',
    tag: '05',
  },
];

const TOTAL = sections.length;

// ─── Skeleton ─────────────────────────────────────────────────────
const SkeletonOurImpact = () => (
  <div className={styles.skeletonWrapper}>
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonLeft}>
        <div className={styles.skeletonEyebrow} />
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonSubtitle} />
        <div className={styles.skeletonDesc}>
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLine} />
        </div>
        <div className={styles.skeletonButton} />
      </div>
      <div className={styles.skeletonRight}>
        <div className={styles.skeletonImage} />
      </div>
    </div>
  </div>
);

const OurImpact = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const textWrapRefs = useRef([]);
  const imageTrackRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 992 : false
  );

  // ─── Resize watcher ───────────────────────────────────────────
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ─── Simulated load ───────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // ─── Core scroll-driven storytelling (one step per scroll) ─────
  useEffect(() => {
    if (loading || isMobile) return;

    const section = sectionRef.current;
    const imageTrack = imageTrackRef.current;
    if (!section || !imageTrack) return;

    // Current step the UI is showing (0..TOTAL-1)
    let current = 0;
    let isAnimating = false;
    let queuedDirection = 0;

    const slideHeight = () => imageTrack.offsetHeight / TOTAL;

    const goToStep = (nextIndex) => {
      if (nextIndex < 0 || nextIndex > TOTAL - 1) return;
      if (nextIndex === current) return;

      isAnimating = true;
      const goingForward = nextIndex > current;

      // ── Image: move exactly one slide-height ──
      gsap.to(imageTrack, {
        y: -nextIndex * slideHeight(),
        duration: 0.85,
        ease: 'power2.inOut',
        onComplete: () => {
          isAnimating = false;
          if (queuedDirection !== 0) {
            const dir = queuedDirection;
            queuedDirection = 0;
            goToStep(current + dir);
          }
        },
      });

      // ── Text: fade/slide out old, fade/slide in new ──
      const prevText = textWrapRefs.current[current];
      const nextText = textWrapRefs.current[nextIndex];

      if (prevText) {
        gsap.to(prevText, {
          opacity: 0,
          y: goingForward ? -40 : 40,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      if (nextText) {
        gsap.fromTo(
          nextText,
          { opacity: 0, y: goingForward ? 40 : -40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          }
        );
        const kids = nextText.children;
        if (kids?.length) {
          gsap.fromTo(
            kids,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.07,
              ease: 'power2.out',
              delay: 0.05,
              overwrite: 'auto',
            }
          );
        }
      }

      current = nextIndex;
      setActiveIndex(nextIndex);
    };

    const ctx = gsap.context(() => {
      // Text panels start hidden except the first
      textWrapRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40 });
      });
      gsap.set(imageTrack, { y: 0 });

      // ── Pin the section ──
      const pinST = ScrollTrigger.create({
        id: 'impactPin',
        trigger: section,
        start: 'top top',
        end: '+=100vh',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // ── Wheel handler ──
      const onWheel = (e) => {
        if (!pinST.isActive) return;

        const dir = e.deltaY > 0 ? 1 : -1;
        const atStart = current === 0 && dir < 0;
        const atEnd = current === TOTAL - 1 && dir > 0;
        if (atStart || atEnd) return;

        e.preventDefault();

        if (isAnimating) {
          queuedDirection = dir;
          return;
        }
        goToStep(current + dir);
      };

      // ── Touch handler ──
      let touchStartY = 0;
      const onTouchStart = (e) => {
        touchStartY = e.touches[0].clientY;
      };
      const onTouchMove = (e) => {
        if (!pinST.isActive) return;
        const deltaY = touchStartY - e.touches[0].clientY;
        if (Math.abs(deltaY) < 30) return;

        const dir = deltaY > 0 ? 1 : -1;
        const atStart = current === 0 && dir < 0;
        const atEnd = current === TOTAL - 1 && dir > 0;
        if (atStart || atEnd) return;

        e.preventDefault();
        touchStartY = e.touches[0].clientY;

        if (isAnimating) {
          queuedDirection = dir;
          return;
        }
        goToStep(current + dir);
      };

      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: false });

      const onResize = () => {
        gsap.set(imageTrack, { y: -current * slideHeight() });
      };
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('resize', onResize);
      };
    }, section);

    return () => ctx.revert();
  }, [loading, isMobile]);

  if (loading) {
    return (
      <section className={styles.impactSection}>
        <SkeletonOurImpact />
      </section>
    );
  }

  return (
    <section
      className={`${styles.impactSection} ${isMobile ? styles.mobileView : ''}`}
      ref={sectionRef}
    >
      <div className={styles.bgEffects}>
        <div className={styles.bgGlow1} />
        <div className={styles.bgGlow2} />
        <div className={styles.bgGrid} />
      </div>

      {/* Desktop: pinned storytelling track */}
      {!isMobile && (
        <div className={styles.impactContainer} ref={trackRef}>
          <div className={styles.contentWrapper}>
            {/* LEFT — 40% */}
            <div className={styles.leftContent}>
              <div className={styles.progressWrapper}>
                <div className={styles.progressLine}>
                  <div
                    className={styles.progressFill}
                    style={{
                      height: `${(activeIndex / (TOTAL - 1)) * 100}%`,
                    }}
                  />
                </div>
                <div className={styles.progressDots}>
                  {sections.map((s, i) => (
                    <div
                      key={s.id}
                      className={`${styles.progressDot} ${
                        i <= activeIndex ? styles.active : ''
                      } ${i === activeIndex ? styles.current : ''}`}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.panelsContainer}>
                {sections.map((s, i) => (
                  <div
                    key={s.id}
                    className={`${styles.panel} ${
                      i === activeIndex ? styles.active : ''
                    }`}
                    style={{ zIndex: i === activeIndex ? 2 : 1 }}
                  >
                    <div
                      className={styles.panelContent}
                      ref={(el) => (textWrapRefs.current[i] = el)}
                    >
                      <span className={styles.tag}>{s.tag}</span>
                      <span className={styles.eyebrow}>{s.subtitle}</span>
                      <h2 className={styles.title}>{s.title}</h2>
                      <p className={styles.description}>{s.desc}</p>
                   
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — 60% */}
            <div className={styles.rightContent}>
              <div className={styles.imageContainer}>
                <div
                  className={styles.imageTrack}
                  ref={imageTrackRef}
                  style={{ '--slide-count': TOTAL }}
                >
                  {sections.map((s, i) => (
                    <div key={s.id} className={styles.imageSlide}>
                      <img
                        src={s.image}
                        alt={s.title}
                        className={styles.image}
                        loading="lazy"
                      />
                      <div className={styles.imageOverlay}>
                        <div
                          className={`${styles.imageGlow} ${
                            i === activeIndex ? styles.active : ''
                          }`}
                        />
                        <div className={styles.imageBorder} />
                        <span className={styles.imageCounter}>
                          {String(i + 1).padStart(2, '0')} /{' '}
                          {String(TOTAL).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile: stacked cards */}
      {isMobile && (
        <div className={styles.mobileCards}>
          {sections.map((s) => (
            <div key={s.id} className={styles.mobileCard}>
              <div className={styles.mobileImageWrapper}>
                <img
                  src={s.image}
                  alt={s.title}
                  className={styles.mobileImage}
                  loading="lazy"
                />
                <span className={styles.mobileTag}>{s.tag}</span>
              </div>
              <div className={styles.mobileContent}>
                <span className={styles.mobileEyebrow}>{s.subtitle}</span>
                <h3 className={styles.mobileTitle}>{s.title}</h3>
                <p className={styles.mobileDesc}>{s.desc}</p>
               
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OurImpact;