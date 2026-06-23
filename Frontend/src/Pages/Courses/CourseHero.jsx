import { useState, useEffect } from "react";
import styles from "./CourseHero.module.css";

const texts = [
  "Learn Modern Development",
  "Build Real Projects",
  "Master React & Backend",
  "Become Industry Ready"
];

function CourseHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      {/* <div className={styles.aurora}></div> */}
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <p className={styles.tag}>
          PROFESSIONAL COURSES
        </p>

        <h1 key={index} className={styles.heading}>
          {texts[index]}
        </h1>

        <p className={styles.desc}>
          Learn from experts and build practical projects
          that prepare you for real-world opportunities.
        </p>
      </div>
    </section>
  );
}

export default CourseHero;