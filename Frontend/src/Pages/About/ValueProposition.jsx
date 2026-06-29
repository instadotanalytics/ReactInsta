// ValueProposition.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './ValueProposition.module.css';

const ValueProposition = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Value propositions
  const values = [
    {
      id: 1,
      icon: '🎯',
      title: 'Industry-Aligned Curriculum',
      description: 'Built with input from 50+ industry experts ensuring you learn exactly what employers demand.',
      stat: '94% Relevance',
      color: '#6C63FF',
      lightColor: '#EEF0FF'
    },
    {
      id: 2,
      icon: '🌍',
      title: 'Global Recognition',
      description: 'Internationally recognized certificates accepted by 200+ companies across 15+ countries.',
      stat: 'Global Reach',
      color: '#10B981',
      lightColor: '#ECFDF5'
    },
    {
      id: 3,
      icon: '💻',
      title: 'Hands-on Projects',
      description: 'Build real-world portfolio projects that demonstrate your skills to potential employers.',
      stat: '50+ Projects',
      color: '#EC4899',
      lightColor: '#FDF2F8'
    },
    {
      id: 4,
      icon: '🌟',
      title: 'Expert Mentorship',
      description: 'Learn from industry veterans who provide personalized guidance and career insights.',
      stat: '12+ Mentors',
      color: '#F59E0B',
      lightColor: '#FFFBEB'
    }
  ];

  // Canvas Animation - Light Theme
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking for interactive animation
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create floating shapes
    class Shape {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 30 + Math.random() * 60;
        this.rotation = Math.random() * Math.PI * 2;
        this.speed = 0.001 + Math.random() * 0.003;
        this.type = Math.floor(Math.random() * 3);
        this.opacity = 0.03 + Math.random() * 0.06;
        this.hue = 220 + Math.random() * 40;
        this.pulseSpeed = 0.01 + Math.random() * 0.02;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.xSpeed = (Math.random() - 0.5) * 0.2;
        this.ySpeed = (Math.random() - 0.5) * 0.2;
        this.strokeWidth = 1 + Math.random() * 1.5;
      }

      update(mouseX, mouseY) {
        this.rotation += this.speed;
        
        // Gentle mouse influence
        const dx = mouseX * canvas.width - this.x;
        const dy = mouseY * canvas.height - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 300) {
          const force = (1 - distance / 300) * 0.3;
          this.x += dx * force * 0.01;
          this.y += dy * force * 0.01;
        }
        
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        
        if (this.x < 0 || this.x > canvas.width) this.xSpeed *= -1;
        if (this.y < 0 || this.y > canvas.height) this.ySpeed *= -1;
        
        this.pulseOffset += this.pulseSpeed;
      }

      draw(ctx) {
        const scale = 1 + Math.sin(this.pulseOffset) * 0.1;
        const size = this.size * scale;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        
        ctx.strokeStyle = `hsl(${this.hue}, 60%, 70%)`;
        ctx.lineWidth = this.strokeWidth;

        if (this.type === 0) {
          ctx.beginPath();
          ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = this.opacity * 0.3;
          ctx.beginPath();
          ctx.arc(0, 0, size / 4, 0, Math.PI * 2);
          ctx.stroke();
        } else if (this.type === 1) {
          ctx.strokeRect(-size / 2, -size / 2, size, size);
          ctx.globalAlpha = this.opacity * 0.3;
          ctx.strokeRect(-size / 4, -size / 4, size / 2, size / 2);
        } else {
          ctx.beginPath();
          for (let i = 0; i < 3; i++) {
            const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * size / 2;
            const y = Math.sin(angle) * size / 2;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          ctx.globalAlpha = this.opacity * 0.3;
          ctx.beginPath();
          for (let i = 0; i < 3; i++) {
            const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * size / 4;
            const y = Math.sin(angle) * size / 4;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    // Create shapes
    const shapes = [];
    const numShapes = 30;
    for (let i = 0; i < numShapes; i++) {
      shapes.push(new Shape(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }

    // Draw connections
    const drawConnections = (mouseX, mouseY) => {
      // Draw connections between shapes
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const dx = shapes[i].x - shapes[j].x;
          const dy = shapes[i].y - shapes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.04;
            ctx.beginPath();
            ctx.moveTo(shapes[i].x, shapes[i].y);
            ctx.lineTo(shapes[j].x, shapes[j].y);
            ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw connections to mouse
      const mouseXPos = mouseX * canvas.width;
      const mouseYPos = mouseY * canvas.height;
      shapes.forEach(shape => {
        const dx = shape.x - mouseXPos;
        const dy = shape.y - mouseYPos;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.03;
          ctx.beginPath();
          ctx.moveTo(shape.x, shape.y);
          ctx.lineTo(mouseXPos, mouseYPos);
          ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    };

    // Draw gradient mesh - Light theme
    const drawGradientMesh = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time * 0.0002) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.0003) * 100,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      );
      
      gradient.addColorStop(0, `rgba(108, 99, 255, ${0.02 + Math.sin(time * 0.0004) * 0.01})`);
      gradient.addColorStop(0.3, `rgba(16, 185, 129, ${0.015 + Math.cos(time * 0.0005) * 0.007})`);
      gradient.addColorStop(0.7, `rgba(236, 72, 153, ${0.015 + Math.sin(time * 0.0003) * 0.007})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0.9)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Animation loop
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Light background
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.7
      );
      bgGradient.addColorStop(0, '#faf9fe');
      bgGradient.addColorStop(1, '#ffffff');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawGradientMesh();
      
      shapes.forEach(shape => {
        shape.update(mouseX, mouseY);
        shape.draw(ctx);
      });
      
      drawConnections(mouseX, mouseY);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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

  return (
    <section ref={sectionRef} className={styles.whyChooseUs}>
      {/* Canvas Background - Light Theme */}
      <canvas ref={canvasRef} className={styles.canvasBackground} />
      
      {/* Pattern Overlay - Light */}
      <div className={styles.patternOverlay} />

      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} ${isVisible ? styles.animateHeader : ''}`}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badge}>Why Choose Us</span>
          </div>
          <h2 className={styles.title}>
            Transform Your Career With
            <span className={styles.highlight}> Expert Training</span>
          </h2>
          <p className={styles.subtitle}>
            Join thousands of professionals who have accelerated their careers
            through our industry-focused training programs.
          </p>
        </div>

        {/* Value Cards */}
        <div className={styles.valueGrid}>
          {values.map((value, index) => (
            <div
              key={value.id}
              className={`${styles.valueCard} ${isVisible ? styles.animateCard : ''}`}
              style={{ 
                animationDelay: `${index * 0.12}s`,
                '--card-color': value.color,
                '--card-light': value.lightColor
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.cardInner}>
                {/* Colored top border */}
                <div className={styles.cardBorder} style={{ background: value.color }} />
                
                {/* Icon with pulse ring */}
                <div className={styles.iconWrapper}>
                  <div className={styles.iconPulse} style={{ 
                    background: value.color,
                    boxShadow: `0 0 40px ${value.color}20`
                  }} />
                  <span className={styles.cardIcon}>{value.icon}</span>
                </div>
                
                <h3 className={styles.cardTitle}>{value.title}</h3>
                <p className={styles.cardDescription}>{value.description}</p>
                
                {/* Stat with animated progress */}
                <div className={styles.cardStat}>
                  <span className={styles.statValue} style={{ color: value.color }}>
                    {value.stat}
                  </span>
                  <div className={styles.statBar}>
                    <div 
                      className={styles.statProgress}
                      style={{ 
                        width: isVisible ? '100%' : '0%',
                        background: value.color,
                        transitionDelay: `${index * 0.15 + 0.5}s`
                      }}
                    />
                  </div>
                </div>

                {/* Hover glow */}
                <div 
                  className={`${styles.cardGlow} ${hoveredIndex === index ? styles.glowActive : ''}`}
                  style={{ background: value.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default ValueProposition;