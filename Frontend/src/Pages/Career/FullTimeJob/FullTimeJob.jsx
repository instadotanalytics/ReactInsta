// FullTimeJob.jsx
import React, { useEffect, useRef, useState } from "react";
import { FiTrendingUp, FiMapPin, FiDollarSign, FiSearch, FiArrowRight } from "react-icons/fi";
import { FaBuilding, FaRocket, FaUsers, FaBriefcase } from "react-icons/fa";
import styles from "./FullTimeJob.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
// import WhyJoinUS from "../../WhyJoinUS";
// import ReviewSection from "../../ReviewSection";
import FAQSection from "../../FAQSection";
import FullTimeJobForm from "./FullTimeJobForm";
import FeaturedJobs from "./FeaturedJobs";
// import Companypartners from "../../Courses/Companypartners";
// import OurImpact from "../../OurImpact";

const FullTimeJob = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Mouse interaction
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          const force = (150 - distance) / 150;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 123, 255, ${this.opacity})`;
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(0, 123, 255, ${this.opacity * 0.3})`;
      }
    }

    const initParticles = () => {
      const count = Math.min(80, (canvas.width * canvas.height) / 15000);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 123, 255, ${0.08 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, "#f0f8ff");
      gradient.addColorStop(1, "#ffffff");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw floating circles
      for (let i = 0; i < 5; i++) {
        const time = Date.now() / 1000;
        const x = canvas.width / 2 + Math.sin(time * 0.3 + i * 1.2) * canvas.width * 0.35;
        const y = canvas.height / 2 + Math.cos(time * 0.2 + i * 0.8) * canvas.height * 0.3;
        const radius = 80 + Math.sin(time * 0.5 + i) * 30;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 123, 255, 0.03)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(0, 123, 255, 0.05)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      drawLines();

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  // Statistics counter animation
  const stats = [
    { number: "10K+", label: "Jobs Posted", icon: <FaBriefcase /> },
    { number: "500+", label: "Companies", icon: <FaBuilding /> },
    { number: "50K+", label: "Active Users", icon: <FaUsers /> },
    { number: "95%", label: "Success Rate", icon: <FaRocket /> },
  ];

  return (
    <>
      <Header />
      <section className={styles.banner}>
        <canvas ref={canvasRef} className={styles.canvas} />
        
        {/* Floating decorative elements */}
        <div className={styles.floatingElement1}>
          {/* <div className={styles.floatingCard}>
            {/* <FiTrendingUp className={styles.floatingIcon} /> */}
            {/* <span>Top Companies Hiring</span> */}
          {/* </div> */} 
        </div>
        <div className={styles.floatingElement2}>
          {/* <div className={styles.floatingCard}>
            <FiMapPin className={styles.floatingIcon} />
            <span>Remote & On-site</span>
          </div> */}
        </div>

        <div className={styles.bannerContainer}>
          {/* Left Content */}
          <div className={styles.left}>
            {/* <div className={styles.badgeWrapper}>
              <span className={styles.badge}>
                <span className={styles.pulse}></span>
                🚀 1000+ Live Jobs
              </span>
            </div> */}

            <h1 className={styles.title}>
              Find Your Dream
              <br />
              <span className={styles.highlight}>Full-Time Career</span>
            </h1>

            <p className={styles.description}>
              Discover high-paying roles tailored to your skills and experience.
              Get personalized job recommendations, real-time updates, and
              direct apply opportunities with leading startups, MNCs, and
              growing enterprises.
            </p>

            {/* Search Bar */}
            <div className={styles.searchWrapper}>
              <div className={styles.searchBar}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or keywords..."
                  className={styles.searchInput}
                />
                <button className={styles.searchBtn}>
                  Search Jobs <FiArrowRight />
                </button>
              </div>
            </div>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <FiMapPin className={styles.featureIcon} />
                <span>Pan India</span>
              </div>
              <div className={styles.featureItem}>
                <FiDollarSign className={styles.featureIcon} />
                <span>Competitive Salary</span>
              </div>
              <div className={styles.featureItem}>
                <FaBuilding className={styles.featureIcon} />
                <span>Top MNCs</span>
              </div>
            </div>
          </div>

          {/* Right Section - Stats & Visual */}
          <div className={styles.right}>
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div className={styles.rightImage}>
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Career Opportunities"
              />
              <div className={styles.imageOverlay}>
                <div className={styles.overlayContent}>
                  <span>🌟 Featured</span>
                  <p>Top companies are hiring now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Companypartners /> */}
      <FeaturedJobs />
      <FullTimeJobForm />
      {/* <WhyJoinUS />
      <ReviewSection />
      <OurImpact /> */}
      <FAQSection />
      <Footer />
    </>
  );
};

export default FullTimeJob;