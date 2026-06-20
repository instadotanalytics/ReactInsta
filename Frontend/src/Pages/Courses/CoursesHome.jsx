// CoursesHome.jsx
import React, { useEffect, useRef } from "react";
import styles from "./CoursesHome.module.css";
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
  FaBriefcase,
  FaCode,
  FaDatabase,
  FaBullhorn,
} from "react-icons/fa";

const CoursesHome = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Canvas Animation with Checkered Pattern
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let checkeredSquares = [];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create checkered pattern squares
    const createCheckeredPattern = () => {
      const gridSize = 40;
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      checkeredSquares = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if ((i + j) % 2 === 0) {
            checkeredSquares.push({
              x: i * gridSize,
              y: j * gridSize,
              width: gridSize,
              height: gridSize,
              opacity: Math.random() * 0.18 + 0.08,
              pulse: Math.random() * Math.PI * 2,
              pulseSpeed: Math.random() * 0.01 + 0.005,
            });
          }
        }
      }
    };

    createCheckeredPattern();

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        const pulseOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse));
        ctx.fillStyle = `rgba(99, 102, 241, ${pulseOpacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw connections
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 0.05 * (1 - distance / 150);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.8})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw checkered pattern
      checkeredSquares.forEach((square) => {
        square.pulse += square.pulseSpeed;
        const pulseOpacity =
          square.opacity * (0.7 + 0.3 * Math.sin(square.pulse));
        ctx.fillStyle = `rgba(99,102,241, ${pulseOpacity})`;
        ctx.fillRect(square.x, square.y, square.width, square.height);

        // Add border to checkered squares
        ctx.strokeStyle = `rgba(99,102,241, ${pulseOpacity * 0.8})`;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(square.x, square.y, square.width, square.height);
      });

      // Draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Recreate checkered pattern on resize
    const handleResize = () => {
      resizeCanvas();
      createCheckeredPattern();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const courseStats = [
    { value: "25+", label: "Courses", icon: <FaBook /> },
    { value: "5000+", label: "Students", icon: <FaUsers /> },
    { value: "150+", label: "Batches", icon: <FaClock /> },
    { value: "4.9", label: "Rating", icon: <FaStar /> },
  ];

  const popularCourses = [
    {
      name: "Full Stack Development",
      icon: <FaCode />,
      description: "MERN, Python, Cloud",
      color: "#4361ee",
    },
    {
      name: "Data Science",
      icon: <FaDatabase />,
      description: "ML, AI, Analytics",
      color: "#f72585",
    },
    {
      name: "Digital Marketing",
      icon: <FaBullhorn />,
      description: "SEO, Social Media, Ads",
      color: "#06d6a0",
    },
  ];

  const features = [
    "Live Classes",
    "1:1 Mentorship",
    "Placement Support",
    "Certification",
  ];

  return (
    <div className={styles.coursesHome}>
      <section className={styles.heroSection}>
        <canvas ref={canvasRef} className={styles.canvasBackground} />

        <div className={styles.heroContainer}>
          <div className={styles.centerHero}>
            <div className={styles.topStats}>
              <span>25+ Courses</span>
              <span>5000+ Students</span>
              <span>150+ Batches</span>
              <span>4.9 Rating</span>
            </div>

            <h1 className={styles.heroTitle}>
              Upskill Yourself
              <br />
              <span className={styles.gradientText}>
                with Industry-Ready Courses
              </span>
            </h1>

            <p className={styles.heroDesc}>
              Learn in-demand skills with expert mentors, industry-recognized
              certifications, and career-focused training programs.
            </p>

            <div className={styles.courseFeatures}>
              {features.map((feature, index) => (
                <span key={index} className={styles.featureBadge}>
                  <FaCheckCircle />
                  {feature}
                </span>
              ))}
            </div>

            <div className={styles.courseTags}>
              {popularCourses.map((course, index) => (
                <div key={index} className={styles.courseTag}>
                  <span
                    className={styles.courseIcon}
                    style={{ color: course.color }}
                  >
                    {course.icon}
                  </span>

                  <span>{course.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesHome;
