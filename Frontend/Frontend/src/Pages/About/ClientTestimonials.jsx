// ClientTestimonials.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './ClientTestimonials.module.css';

const ClientTestimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Testimonial data - unique and professional
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "Microsoft",
      image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=818CF8&color=fff&size=80",
      quote: "The training program transformed my career completely. Within 3 months of completion, I landed my dream job at Microsoft. The mentors were incredibly supportive and the curriculum was exactly what the industry demands.",
      rating: 5,
      color: "#818CF8",
      lightColor: "#EEF0FF"
    },
    {
      id: 2,
      name: "Aarav Mehta",
      role: "Full Stack Developer",
      company: "Amazon",
      image: "https://ui-avatars.com/api/?name=Aarav+Mehta&background=34D399&color=fff&size=80",
      quote: "The hands-on projects were a game changer. I built a real-world portfolio that impressed Amazon recruiters. The practical approach and expert guidance made all the difference in my learning journey.",
      rating: 5,
      color: "#34D399",
      lightColor: "#ECFDF5"
    },
    {
      id: 3,
      name: "Ananya Desai",
      role: "Data Analyst",
      company: "Google",
      image: "https://ui-avatars.com/api/?name=Ananya+Desai&background=F472B6&color=fff&size=80",
      quote: "The instructors are industry veterans who bring real-world experience to every session. I gained not just technical skills but also the confidence to excel in a competitive environment.",
      rating: 5,
      color: "#F472B6",
      lightColor: "#FDF2F8"
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "DevOps Engineer",
      company: "IBM",
      image: "https://ui-avatars.com/api/?name=Vikram+Singh&background=FBBF24&color=fff&size=80",
      quote: "The placement assistance was exceptional. They didn't just train me; they prepared me for interviews, helped with resume building, and connected me with top companies.",
      rating: 5,
      color: "#FBBF24",
      lightColor: "#FFFBEB"
    },
    {
      id: 5,
      name: "Neha Gupta",
      role: "Cloud Architect",
      company: "AWS",
      image: "https://ui-avatars.com/api/?name=Neha+Gupta&background=60A5FA&color=fff&size=80",
      quote: "The global certification opened doors I never thought possible. I'm now working with international clients and my career has reached new heights. Highly recommended!",
      rating: 5,
      color: "#60A5FA",
      lightColor: "#EFF6FF"
    }
  ];

  // Canvas Animation - Professional Light Theme
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create floating dots
    class Dot {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 2 + Math.random() * 3;
        this.speed = 0.2 + Math.random() * 0.3;
        this.opacity = 0.3 + Math.random() * 0.4;
        this.direction = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;
        
        if (this.x < 0 || this.x > canvas.width) this.direction = Math.PI - this.direction;
        if (this.y < 0 || this.y > canvas.height) this.direction = -this.direction;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity * 0.3})`;
        ctx.fill();
      }
    }

    // Create floating stars
    class Star {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 8 + Math.random() * 15;
        this.opacity = 0.02 + Math.random() * 0.03;
        this.rotation = Math.random() * Math.PI * 2;
        this.speed = 0.001 + Math.random() * 0.002;
        this.pulseSpeed = 0.01 + Math.random() * 0.02;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.rotation += this.speed;
        this.pulseOffset += this.pulseSpeed;
      }

      draw(ctx) {
        const scale = 1 + Math.sin(this.pulseOffset) * 0.1;
        const size = this.size * scale;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = '#6C63FF';
        ctx.lineWidth = 0.5;

        // Draw star shape
        const spikes = 5;
        const outerRadius = size / 2;
        const innerRadius = size / 4;
        
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
      }
    }

    // Create dots
    const dots = [];
    for (let i = 0; i < 60; i++) {
      dots.push(new Dot(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }

    // Create stars
    const stars = [];
    for (let i = 0; i < 15; i++) {
      stars.push(new Star(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }

    // Draw gradient mesh
    const drawGradientMesh = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time * 0.0002) * 150,
        canvas.height * 0.3 + Math.cos(time * 0.0003) * 150,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      );
      
      gradient.addColorStop(0, `rgba(108, 99, 255, ${0.02 + Math.sin(time * 0.0004) * 0.008})`);
      gradient.addColorStop(0.3, `rgba(52, 211, 153, ${0.015 + Math.cos(time * 0.0005) * 0.005})`);
      gradient.addColorStop(0.7, `rgba(244, 114, 182, ${0.01 + Math.sin(time * 0.0003) * 0.005})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0.95)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Animation loop
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Light background
      ctx.fillStyle = '#faf9fe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawGradientMesh();
      
      stars.forEach(star => {
        star.update();
        star.draw(ctx);
      });
      
      dots.forEach(dot => {
        dot.update();
        dot.draw(ctx);
      });
      
      // Draw connections between dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.04;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section ref={sectionRef} className={styles.testimonials}>
      {/* Canvas Background */}
      <canvas ref={canvasRef} className={styles.canvasBackground} />
      
      {/* Pattern Overlay */}
      <div className={styles.patternOverlay} />

      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} ${isVisible ? styles.animateHeader : ''}`}>
          {/* <div className={styles.badgeWrapper}>
            <span className={styles.badge}>✦ Student Stories</span>
          </div> */}
          <h2 className={styles.title}>
            <span className={styles.titleLight}>What Our</span>
            <span className={styles.highlight}> Students Say</span>
          </h2>
          <p className={styles.subtitle}>
            Real feedback from real learners who transformed their careers with us
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className={`${styles.mainCard} ${isVisible ? styles.animateMain : ''}`}>
          <div className={styles.cardContent}>
            {/* Quote mark */}
            <div className={styles.quoteMark}>"</div>
            
            {/* Testimonial text */}
            <p className={styles.quoteText}>{currentTestimonial.quote}</p>
            
            {/* Author info */}
            <div className={styles.authorSection}>
              <div className={styles.authorImage}>
                <img 
                  src={currentTestimonial.image} 
                  alt={currentTestimonial.name}
                  loading="lazy"
                />
              </div>
              <div className={styles.authorInfo}>
                <h4 className={styles.authorName}>{currentTestimonial.name}</h4>
                <p className={styles.authorRole}>
                  {currentTestimonial.role} at {currentTestimonial.company}
                </p>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={styles.star}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Colored accent */}
          <div className={styles.cardAccent} style={{ background: currentTestimonial.color }} />
        </div>

        {/* Dots Navigation */}
        <div className={styles.dotsContainer}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
              onClick={() => handleDotClick(index)}
              style={{
                background: index === activeIndex ? testimonials[index].color : '#e0e0e8'
              }}
            />
          ))}
        </div>

        {/* Mini cards - Horizontal scroll */}
        <div className={`${styles.miniCards} ${isVisible ? styles.animateMini : ''}`}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`${styles.miniCard} ${index === activeIndex ? styles.activeMini : ''}`}
              onClick={() => handleDotClick(index)}
              style={{
                borderColor: index === activeIndex ? testimonial.color : 'transparent'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.miniCardInner}>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className={styles.miniAvatar}
                />
                <div className={styles.miniInfo}>
                  <h5 className={styles.miniName}>{testimonial.name}</h5>
                  <p className={styles.miniRole}>{testimonial.role}</p>
                </div>
                {index === activeIndex && (
                  <div className={styles.miniActiveBadge} style={{ background: testimonial.color }} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;