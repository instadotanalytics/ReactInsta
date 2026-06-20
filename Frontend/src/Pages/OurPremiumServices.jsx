// OurPremiumServices.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OurPremiumServices.module.css";

/* ── Inject Google Fonts ── */
if (typeof document !== "undefined" && !document.getElementById("ops-fonts")) {
  const link = document.createElement("link");
  link.id = "ops-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(link);
}

/* ── Icons ── */
const InternshipIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const FullTimeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    <path d="M16 3H8L6 7h12z" />
    <circle cx="12" cy="14" r="2" />
  </svg>
);

const PlacementIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const ArrowRight = () => (
  <svg className={styles.btnArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Data ── */
const services = [
  {
    id: 1,
    title: "Internship",
    tagline: "Build Real Experience",
    route: "/career/internship",
    icon: InternshipIcon,
    image:
      "https://img.freepik.com/free-vector/internship-program-concept-illustration_114360-3327.jpg",
    features: [
      "Real-time project experience",
      "Industry expert mentorship",
      "Certificate of completion",
      "Flexible working hours",
    ],
  },
  {
    id: 2,
    title: "Full Time Job",
    tagline: "Launch Your Career",
    route: "/career/fulltime",
    icon: FullTimeIcon,
    image:
      "https://img.freepik.com/free-vector/job-interview-concept-illustration_114360-2357.jpg",
    features: [
      "Full-time employment",
      "Health insurance benefits",
      "Paid leaves & holidays",
      "Professional development",
    ],
    popular: true,
  },
  {
    id: 3,
    title: "Placement",
    tagline: "Land Your Dream Role",
    route: "/career/placement",
    icon: PlacementIcon,
    image:
      "https://img.freepik.com/free-vector/career-path-concept-illustration_114360-3506.jpg",
    features: [
      "100% placement assistance",
      "Resume building workshop",
      "Mock interview sessions",
      "Company referrals",
    ],
  },
];

/* ── Component ── */
const OurPremiumServices = () => {
  const navigate = useNavigate();
  const cardsRef = useRef([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let connectingLines = [];
    let floatingShapes = [];
    let stars = [];
    let mouseX = 0;
    let mouseY = 0;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star class (background stars)
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.7;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.pulseOffset += this.pulseSpeed;
        this.opacity = 0.3 + 0.4 * Math.sin(this.pulseOffset);
      }

      draw() {
        const size = this.size * (1 + 0.2 * Math.sin(this.pulseOffset));
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26, 86, 219, ${this.opacity})`;
        ctx.fill();

        if (this.size > 1.5) {
          const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, size * 4);
          glow.addColorStop(0, `rgba(26, 86, 219, ${this.opacity * 0.2})`);
          glow.addColorStop(1, 'rgba(26, 86, 219, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(this.x, this.y, size * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulseOffset += this.pulseSpeed;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        const currentOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulseOffset));
        const size = this.size * (1 + 0.2 * Math.sin(this.pulseOffset));
        
        const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, size * 3);
        glow.addColorStop(0, `rgba(26, 86, 219, ${currentOpacity * 0.3})`);
        glow.addColorStop(1, 'rgba(26, 86, 219, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26, 86, 219, ${currentOpacity})`;
        ctx.fill();

        if (size > 2) {
          ctx.beginPath();
          ctx.arc(this.x - size * 0.2, this.y - size * 0.2, size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.5})`;
          ctx.fill();
        }
      }
    }

    // Connecting Line class
    class ConnectingLine {
      constructor() {
        this.p1 = Math.floor(Math.random() * particles.length);
        this.p2 = Math.floor(Math.random() * particles.length);
        this.opacity = Math.random() * 0.3 + 0.15;
        this.life = Math.random() * 100 + 50;
        this.maxLife = this.life;
      }

      update() {
        this.life--;
        this.opacity = (this.life / this.maxLife) * 0.3 + 0.1;
        if (this.life <= 0) {
          this.p1 = Math.floor(Math.random() * particles.length);
          this.p2 = Math.floor(Math.random() * particles.length);
          this.life = Math.random() * 100 + 50;
          this.maxLife = this.life;
        }
      }

      draw() {
        const p1 = particles[this.p1];
        const p2 = particles[this.p2];
        if (!p1 || !p2) return;

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 250;

        if (distance < maxDistance) {
          const opacity = this.opacity * (1 - distance / maxDistance);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(26, 86, 219, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          if (opacity > 0.1) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(26, 86, 219, ${opacity * 0.2})`;
            ctx.lineWidth = 4;
            ctx.stroke();
          }
        }
      }
    }

    // Floating Shape class
    class FloatingShape {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 40 + 15;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.015;
        this.opacity = Math.random() * 0.12 + 0.04;
        this.type = Math.floor(Math.random() * 3);
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.pulse += 0.01;

        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
      }

      draw() {
        const scale = 1 + 0.15 * Math.sin(this.pulse);
        const currentSize = this.size * scale;
        const opacity = this.opacity * (0.8 + 0.2 * Math.sin(this.pulse));

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = opacity;

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize);
        gradient.addColorStop(0, `rgba(26, 86, 219, ${opacity * 2})`);
        gradient.addColorStop(1, `rgba(26, 86, 219, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.strokeStyle = `rgba(26, 86, 219, ${opacity * 3})`;
        ctx.lineWidth = 1.5;

        if (this.type === 0) {
          ctx.beginPath();
          ctx.arc(0, 0, currentSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else if (this.type === 1) {
          const size = currentSize * 0.7;
          ctx.fillRect(-size/2, -size/2, size, size);
          ctx.strokeRect(-size/2, -size/2, size, size);
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -currentSize * 0.7);
          ctx.lineTo(currentSize * 0.7 * 0.866, currentSize * 0.7 * 0.5);
          ctx.lineTo(-currentSize * 0.7 * 0.866, currentSize * 0.7 * 0.5);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    // Initialize
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 12000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const lineCount = Math.min(20, Math.floor(particleCount / 3));
    for (let i = 0; i < lineCount; i++) {
      connectingLines.push(new ConnectingLine());
    }

    const shapeCount = Math.min(12, Math.floor((canvas.width * canvas.height) / 40000));
    for (let i = 0; i < shapeCount; i++) {
      floatingShapes.push(new FloatingShape());
    }

    const starCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      if (mouseX > 0 && mouseY > 0) {
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
        gradient.addColorStop(0, 'rgba(26, 86, 219, 0.08)');
        gradient.addColorStop(0.5, 'rgba(26, 86, 219, 0.04)');
        gradient.addColorStop(1, 'rgba(26, 86, 219, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      floatingShapes.forEach(shape => {
        shape.update();
        shape.draw();
      });

      particles.forEach(particle => {
        if (mouseX > 0 && mouseY > 0) {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            const force = (120 - distance) / 120;
            particle.x += (dx / distance) * force * 2.5;
            particle.y += (dy / distance) * force * 2.5;
          }
        }
        particle.update();
        particle.draw();
      });

      connectingLines.forEach(line => {
        line.update();
        line.draw();
      });

      if (mouseX > 0 && mouseY > 0) {
        particles.forEach(particle => {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            const opacity = 0.2 * (1 - distance / 120);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(26, 86, 219, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(26, 86, 219, ${opacity * 0.3})`;
            ctx.lineWidth = 4;
            ctx.stroke();
          }
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Card intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.premiumSection}>
      {/* Canvas Background */}
      <canvas ref={canvasRef} className={styles.canvasBackground} />
      
      {/* Wavy Background */}
      <div className={styles.wavesContainer}>
        <svg className={styles.waves} viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className={styles.wave1} d="M0,160 C320,80 480,240 720,160 C960,80 1120,240 1440,160 L1440,320 L0,320 Z" />
          <path className={styles.wave2} d="M0,200 C360,120 540,280 720,200 C900,120 1080,280 1440,200 L1440,320 L0,320 Z" />
          <path className={styles.wave3} d="M0,240 C400,160 600,300 720,240 C840,180 1020,300 1440,240 L1440,320 L0,320 Z" />
        </svg>
      </div>

      {/* Floating Shapes */}
      <div className={styles.floatingShape1} />
      <div className={styles.floatingShape2} />
      <div className={styles.floatingShape3} />
      <div className={styles.floatingShape4} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>Premium Services</span>
            <span className={styles.eyebrowLine} />
          </div>
          <h2 className={styles.title}>
            Your Path to a <span className={styles.highlight}>Successful Career</span>
          </h2>
          <div className={styles.titleUnderline} />
          <p className={styles.subtitle}>
            Choose the service that fits your goals — from first internship to full-time placement.
          </p>
        </div>

        {/* Cards */}
        <div className={styles.cardGrid}>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`${styles.card} ${service.popular ? styles.popularCard : ""}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => navigate(service.route)}
              >
                {/* Card background gradient */}
                <div className={styles.cardGradientBg} />

                {/* Popular badge */}
                {service.popular && (
                  <div className={styles.popularBadge}>
                    <span className={styles.popularDot} />
                    Most Popular
                  </div>
                )}

                {/* Image Section */}
                <div className={styles.imageContainer}>
                  <div className={styles.imageOverlay}>
                    <div className={styles.imageShine} />
                  </div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <div className={styles.iconCircle}>
                    <div className={styles.iconPulse} />
                    <div className={styles.iconWrapper}>
                      <Icon />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <span className={styles.serviceTagline}>{service.tagline}</span>
                  </div>

                  <div className={styles.cardDivider} />

                  <div className={styles.featuresList}>
                    {service.features.map((feat, i) => (
                      <div key={i} className={styles.featureItem}>
                        <div className={styles.checkWrap}>
                          <CheckIcon />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={styles.detailsButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(service.route);
                    }}
                  >
                    <span>View All Details</span>
                    <ArrowRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurPremiumServices;