import React, { useRef, useEffect, useState } from 'react';
import styles from './MemoriesSection.module.css';

const memories = [
  {
    id: 1,
    tag: 'Workshop',
    title: 'React Deep Dive',
    description: 'Interns built live components and shipped real features straight to the production codebase.',
    date: 'March 2024',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80',
  },
  {
    id: 2,
    tag: 'Team Outing',
    title: 'Culture Day',
    description: 'A full day away from screens — team lunches, board games, and bonds built to outlast every deadline.',
    date: 'April 2024',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80',
  },
  {
    id: 3,
    tag: 'Hackathon',
    title: '48-Hour Build',
    description: 'Five intern teams. One problem. Forty-eight hours of caffeine, code, and pure creativity.',
    date: 'May 2024',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&q=80',
  },
  {
    id: 4,
    tag: 'Mentorship',
    title: '1-on-1 Sessions',
    description: 'Senior engineers paired with interns weekly — reviewing PRs, sharing stories, building futures.',
    date: 'Ongoing',
    img: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=700&q=80',
  },
  {
    id: 5,
    tag: 'Demo Day',
    title: 'Final Showcase',
    description: 'Interns presented their projects to the entire company. Real stakes. Real applause.',
    date: 'June 2024',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&q=80',
  },
  {
    id: 6,
    tag: 'Offsite',
    title: 'Mountain Retreat',
    description: 'Strategy meets serenity. Planning the next quarter with a backdrop that reminded us why we build.',
    date: 'July 2024',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80',
  },
];

export default function MemoriesSection() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const outerRect = outer.getBoundingClientRect();
        const outerH = outer.offsetHeight;
        const winH = window.innerHeight;

        // scrolled = how many px we've scrolled past the top of this section
        const scrolled = -outerRect.top;
        // total scrollable = outerH minus one viewport (the sticky zone)
        const total = outerH - winH;

        if (total <= 0) return;

        const pct = Math.max(0, Math.min(1, scrolled / total));
        setProgress(pct);
        setActiveIdx(Math.min(memories.length - 1, Math.floor(pct * memories.length)));

        // move the cards track
        const maxShift = inner.scrollWidth - inner.offsetWidth;
        inner.style.transform = `translateX(${-pct * maxShift}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // run once on mount
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    /* outerRef: tall div that creates the scroll space */
    <div
      ref={outerRef}
      className={styles.outer}
      style={{ '--card-count': memories.length }}
    >
      {/* sticky panel — always 100vh tall, pinned at top:0 */}
      <div className={styles.panel}>

        {/* ghost background text */}
        <span className={styles.ghost} aria-hidden="true">Memories</span>

        {/* ── HEADER ROW ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.we}>We</span>
            <h2 className={styles.title}>Remember</h2>
          </div>
          <p className={styles.subtitle}>
            Moments that shaped every intern who walked through our doors —
            captured, kept, celebrated.
          </p>
          <div className={styles.meta}>
            <div className={styles.dots}>
              {memories.map((_, i) => (
                <span
                  key={i}
                  className={`${styles.dot} ${i === activeIdx ? styles.dotOn : ''}`}
                />
              ))}
            </div>
            <span className={styles.count}>
              {String(activeIdx + 1).padStart(2, '0')} / {String(memories.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ── CARDS ── */}
        <div className={styles.clipZone}>
          <div ref={innerRef} className={styles.track}>
            {memories.map((m, i) => (
              <article
                key={m.id}
                className={`${styles.card} ${i === activeIdx ? styles.cardOn : ''}`}
              >
                <div className={styles.imgBox}>
                  <img src={m.img} alt={m.title} />
                  <span className={styles.tag}>{m.tag}</span>
                  <span className={styles.num}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className={styles.body}>
                  <span className={styles.date}>{m.date}</span>
                  <h3 className={styles.name}>{m.title}</h3>
                  <p className={styles.desc}>{m.description}</p>
                  <span className={styles.arrow}>↗</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── PROGRESS ── */}
        <div className={styles.footer}>
          <div className={styles.bar}>
            <div className={styles.fill} style={{ width: `${progress * 100}%` }} />
          </div>
          <span className={styles.hint}>scroll to explore →</span>
        </div>

      </div>
    </div>
  );
}