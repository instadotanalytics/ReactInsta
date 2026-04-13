import { useEffect, useState } from 'react';
import styles from './HomeLanding.module.css';
import {
  FaRocket, FaCheckCircle,
  FaArrowRight, FaPlayCircle, FaStar
} from 'react-icons/fa';

const stats = [
  { value: '5000+',   label: 'Students Placed' },
  { value: '500+',    label: 'Hiring Partners'  },
  { value: '8.5 LPA', label: 'Avg. Package'    },
  { value: '25 LPA',  label: 'Top Package'     },
];

const badges = [
  '100% Job Guarantee',
  'ISO Certified',
  'Govt. Approved',
];

const courses = [
  'Java', 'Python', 'MERN Stack', 'AI / ML',
  'Data Science', 'Cyber Security', 'C / C++', 'Power BI', 'Tableau', 'C#',
];



export default function HomeLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className={styles.root}>

      {/* ── Hero ── */}
      <section className={styles.hero}>

        {/* Left: content */}
        <div className={styles.heroLeft}>
          <div className={styles.tag}>
            <FaRocket className={styles.tagIcon} />
            <span>India's #1 IT Training Institute — Indore</span>
          </div>

          <h1 className={styles.title}>
            <span className={styles.titleGrad}>100% Job Guarantee</span>
            <br />Training Programs
          </h1>

          <p className={styles.desc}>
            <strong>Insta Dot Analytics</strong> — Best IT Training Institute in Indore.
            Master in-demand skills with expert mentors, live projects, and dedicated
            placement support. Join <strong>5,000+</strong> alumni placed in top MNCs
            with packages from <strong>6–25 LPA</strong>.
          </p>

          <div className={styles.stats}>
            {stats.map(s => (
              <div key={s.label} className={styles.statCard}>
                <span className={styles.statVal}>{s.value}</span>
                <span className={styles.statLbl}>{s.label}</span>
              </div>
            ))}
          </div>

         

          <div className={styles.trustRow}>
            {badges.map(b => (
              <span key={b} className={styles.trustBadge}>
                <FaCheckCircle className={styles.checkIcon} />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Right: image */}
        <div className={styles.heroRight}>
          <div className={styles.imageFrame}>
            <img
              src="https://i.pinimg.com/1200x/06/f6/23/06f6235b88be4decbae8cae39ef01343.jpg"
              alt="Students learning at Insta Dot Analytics"
              className={styles.heroImg}
            />
          </div>

          <div className={`${styles.floatCard} ${styles.floatBL}`}>
            <span className={styles.floatEmoji}>🏆</span>
            <div>
              <div className={styles.floatVal}>25 LPA</div>
              <div className={styles.floatLbl}>Highest Package</div>
            </div>
          </div>

          <div className={`${styles.floatCard} ${styles.floatTR}`}>
            <span className={styles.floatEmoji}>🎓</span>
            <div>
              <div className={styles.floatVal}>5000+</div>
              <div className={styles.floatLbl}>Alumni Placed</div>
            </div>
          </div>

          <div className={`${styles.floatCard} ${styles.floatBR}`}>
            <FaStar className={styles.starIcon} />
            <div>
              <div className={styles.floatVal}>4.9 / 5</div>
              <div className={styles.floatLbl}>Student Rating</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}