import React, { useEffect } from 'react';
import styles from './CoursesHome.module.css';
import { 
  FaRocket,
  FaArrowRight,
  FaStar,
  FaUsers,
  FaCheckCircle,
  FaGraduationCap,
  FaPlayCircle,
  FaBook,
  FaClock,
  FaCertificate,
  FaLaptopCode,
  FaChartLine,
  FaGlobe,
  FaBriefcase
} from 'react-icons/fa';


const CoursesHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseStats = [
    { value: "25+", label: "Courses" },
    { value: "5000+", label: "Students" },
    { value: "150+", label: "Batches" },
    { value: "4.9", label: "Rating" }
  ];

  const popularCourses = [
    { name: "Full Stack Development", icon: <FaLaptopCode />, color: "#4361ee" },
    { name: "Data Science", icon: <FaChartLine />, color: "#f72585" },
    { name: "Digital Marketing", icon: <FaGlobe />, color: "#06d6a0" }
  ];

  return (
    <div className={styles.coursesHome}>
      

      {/* Courses Hero Banner Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>
              <FaGraduationCap className={styles.tagIcon} />
              <span>Learn from Industry Experts 🎓</span>
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.gradientText}>Upskill Yourself</span>
              <br />with Industry-Ready Courses
            </h1>
            <p className={styles.heroDesc}>
              Choose from 25+ professional courses designed by industry experts. 
              Get certified and boost your career with 100% placement assistance.
            </p>

            <div className={styles.courseStats}>
              {courseStats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

          

            <div className={styles.courseFeatures}>
              <span className={styles.featureBadge}>
                <FaCheckCircle /> Live Classes
              </span>
              <span className={styles.featureBadge}>
                <FaCheckCircle /> 1:1 Mentorship
              </span>
              <span className={styles.featureBadge}>
                <FaCheckCircle /> Placement Support
              </span>
              <span className={styles.featureBadge}>
                <FaCheckCircle /> Certification
              </span>
            </div>

            <div className={styles.popularCourses}>
              <p className={styles.popularText}>Popular Courses:</p>
              <div className={styles.courseTags}>
                {popularCourses.map((course, index) => (
                  <span key={index} className={styles.courseTag} style={{ borderColor: course.color }}>
                    <span style={{ color: course.color }}>{course.icon}</span>
                    {course.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageContainer}>
              <img 
                src="https://i.pinimg.com/1200x/cc/57/0b/cc570b0b64ad6ed4e605725470d76f32.jpg" 
                alt="Online Learning"
                className={styles.heroImage}
              />
              <div className={styles.floatingCard} style={{ top: '15%', right: '10%' }}>
                <FaBook className={styles.cardIcon} style={{ color: '#4361ee' }} />
                <div>
                  <strong>25+</strong>
                  <span>Courses</span>
                </div>
              </div>
              <div className={styles.floatingCard} style={{ bottom: '20%', left: '10%' }}>
                <FaCertificate className={styles.cardIcon} style={{ color: '#f72585' }} />
                <div>
                  <strong>Certified</strong>
                  <span>Courses</span>
                </div>
              </div>
              <div className={styles.floatingCard} style={{ top: '50%', right: '5%' }}>
                <FaClock className={styles.cardIcon} style={{ color: '#06d6a0' }} />
                <div>
                  <strong>Flexible</strong>
                  <span>Timings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default CoursesHome;