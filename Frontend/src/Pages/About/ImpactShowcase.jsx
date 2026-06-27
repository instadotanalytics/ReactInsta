// ImpactShowcase.jsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./ImpactShowcase.module.css";

const ImpactShowcase = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedValues, setAnimatedValues] = useState({});
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);

    // Impact metrics - compact
    const metrics = [
        {
            id: 'students',
            icon: '👥',
            label: 'Students',
            value: 750,
            suffix: '+',
            color: '#6C63FF'
        },
        {
            id: 'trainers',
            icon: '👨‍🏫',
            label: 'Trainers',
            value: 12,
            suffix: '+',
            color: '#A855F7'
        },
        {
            id: 'courses',
            icon: '📚',
            label: 'Courses',
            value: 6,
            suffix: '+',
            color: '#EC4899'
        },
        {
            id: 'placement',
            icon: '💼',
            label: 'Placement',
            value: 92,
            suffix: '%',
            color: '#F59E0B'
        },
        {
            id: 'companies',
            icon: '🏢',
            label: 'Companies',
            value: 120,
            suffix: '+',
            color: '#10B981'
        },
    ];

    // Journey milestones - compact
    const milestones = [
        { year: '2018', title: 'Founded', description: 'Started our journey in Indore' },
        { year: '2019', title: 'First Batch', description: '50 students enrolled' },
        { year: '2020', title: 'Digital Growth', description: 'Expanded online' },
        { year: '2021', title: 'Partnerships', description: '50+ company tie-ups' },
        { year: '2022', title: 'Recognition', description: 'ISO certified' },
        { year: '2023', title: '750+ Success', description: 'Placed in top companies' },
    ];

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

    useEffect(() => {
        if (isVisible) {
            metrics.forEach(metric => {
                const timer = setTimeout(() => {
                    setAnimatedValues(prev => ({
                        ...prev,
                        [metric.id]: metric.value
                    }));
                }, 300);
                return () => clearTimeout(timer);
            });
        }
    }, [isVisible]);

    // Canvas Animation for Professional Background
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

        // Create geometric shapes
        class Shape {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = 20 + Math.random() * 40;
                this.rotation = Math.random() * Math.PI * 2;
                this.speed = 0.003 + Math.random() * 0.005;
                this.type = Math.floor(Math.random() * 3); // 0: circle, 1: square, 2: triangle
                this.opacity = 0.03 + Math.random() * 0.06;
                this.hue = 240 + Math.random() * 40; // Blue-purple range
                this.pulseSpeed = 0.02 + Math.random() * 0.03;
                this.pulseOffset = Math.random() * Math.PI * 2;
                this.xSpeed = (Math.random() - 0.5) * 0.3;
                this.ySpeed = (Math.random() - 0.5) * 0.3;
            }

            update() {
                this.rotation += this.speed;
                this.x += this.xSpeed;
                this.y += this.ySpeed;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.xSpeed *= -1;
                if (this.y < 0 || this.y > canvas.height) this.ySpeed *= -1;

                this.pulseOffset += this.pulseSpeed;
            }

            draw(ctx, time) {
                const scale = 1 + Math.sin(this.pulseOffset) * 0.15;
                const size = this.size * scale;

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.globalAlpha = this.opacity;
                ctx.strokeStyle = `hsl(${this.hue}, 70%, 65%)`;
                ctx.lineWidth = 2;

                if (this.type === 0) {
                    // Circle
                    ctx.beginPath();
                    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                    ctx.stroke();
                    // Inner circle
                    ctx.globalAlpha = this.opacity * 0.5;
                    ctx.beginPath();
                    ctx.arc(0, 0, size / 4, 0, Math.PI * 2);
                    ctx.stroke();
                } else if (this.type === 1) {
                    // Square
                    ctx.strokeRect(-size / 2, -size / 2, size, size);
                    // Inner square
                    ctx.globalAlpha = this.opacity * 0.5;
                    ctx.strokeRect(-size / 4, -size / 4, size / 2, size / 2);
                } else {
                    // Triangle
                    ctx.beginPath();
                    for (let i = 0; i < 3; i++) {
                        const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
                        const x = Math.cos(angle) * size / 2;
                        const y = Math.sin(angle) * size / 2;
                        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                    }
                    ctx.closePath();
                    ctx.stroke();
                    // Inner triangle
                    ctx.globalAlpha = this.opacity * 0.5;
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
        const numShapes = 25;
        for (let i = 0; i < numShapes; i++) {
            shapes.push(new Shape(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }

        // Create connecting lines
        const drawConnections = () => {
            for (let i = 0; i < shapes.length; i++) {
                for (let j = i + 1; j < shapes.length; j++) {
                    const dx = shapes[i].x - shapes[j].x;
                    const dy = shapes[i].y - shapes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 200) {
                        const opacity = (1 - distance / 200) * 0.06;
                        ctx.beginPath();
                        ctx.moveTo(shapes[i].x, shapes[i].y);
                        ctx.lineTo(shapes[j].x, shapes[j].y);
                        ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        };

        // Create gradient mesh
        const drawGradientMesh = () => {
            const gradient = ctx.createRadialGradient(
                canvas.width * 0.3 + Math.sin(time * 0.0003) * 100,
                canvas.height * 0.3 + Math.cos(time * 0.0004) * 100,
                0,
                canvas.width * 0.5,
                canvas.height * 0.5,
                canvas.width * 0.8
            );

            gradient.addColorStop(0, `rgba(108, 99, 255, ${0.04 + Math.sin(time * 0.0005) * 0.01})`);
            gradient.addColorStop(0.3, `rgba(168, 85, 247, ${0.03 + Math.cos(time * 0.0006) * 0.01})`);
            gradient.addColorStop(0.7, `rgba(236, 72, 153, ${0.02 + Math.sin(time * 0.0004) * 0.01})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        // Animation loop
        const animate = () => {
            time++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw gradient mesh
            drawGradientMesh();

            // Update and draw shapes
            shapes.forEach(shape => {
                shape.update();
                shape.draw(ctx, time);
            });

            // Draw connections
            drawConnections();

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section ref={sectionRef} className={styles.impactShowcase}>
            {/* Canvas Background */}
            <canvas ref={canvasRef} className={styles.canvasBackground} />

            {/* Geometric Pattern Overlay */}
            <div className={styles.patternOverlay} />

            <div className={styles.container}>
                {/* Section Header */}
                <div className={`${styles.header} ${isVisible ? styles.animateIn : ''}`}>
                    {/* <span className={styles.badge}>
                        <span className={styles.badgeDot} />
                        Our Impact
                    </span> */}
                    <h2 className={styles.title}>
                        <span className={styles.titleLine1}>Transforming Careers</span>
                        <span className={styles.titleLine2}>Through Excellence</span>
                    </h2>
                </div>

                {/* Metrics Grid */}
                <div className={styles.metricsGrid}>
                    {metrics.map((metric, index) => (
                        <div
                            key={metric.id}
                            className={`${styles.metricCard} ${isVisible ? styles.animateMetric : ''}`}
                            style={{
                                animationDelay: `${index * 0.08}s`,
                                borderColor: `${metric.color}33`
                            }}
                        >
                            <div className={styles.metricIconWrapper}>
                                <div className={styles.metricIcon}>{metric.icon}</div>
                                <div
                                    className={styles.metricRing}
                                    style={{
                                        borderColor: metric.color,
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                />
                            </div>
                            <div className={styles.metricValue} style={{ color: metric.color }}>
                                {animatedValues[metric.id] || 0}{metric.suffix}
                            </div>
                            <div className={styles.metricLabel}>{metric.label}</div>
                            <div
                                className={styles.metricBar}
                                style={{ background: `${metric.color}20` }}
                            >
                                <div
                                    className={styles.metricProgress}
                                    style={{
                                        width: isVisible ? `${Math.min((metric.value / 1000) * 100, 100)}%` : '0%',
                                        background: metric.color,
                                        animationDelay: `${index * 0.15}s`
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Journey Timeline */}
                <div className={styles.timelineSection}>
                    <h3 className={styles.sectionSubtitle}>
                        <span className={styles.subtitleLine}>Our Journey</span>
                        <span className={styles.subtitleDecor}>✦</span>
                    </h3>
                    <div className={styles.timeline}>
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`${styles.timelineItem} ${isVisible ? styles.animateTimeline : ''}`}
                                style={{ animationDelay: `${index * 0.08}s` }}
                            >
                                <div
                                    className={styles.timelineDot}
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        background: `hsl(${index * 60}, 80%, 60%)`
                                    }}
                                />
                                <div className={styles.timelineContent}>
                                    <div className={styles.timelineYear}>{milestone.year}</div>
                                    <h4 className={styles.timelineTitle}>{milestone.title}</h4>
                                    <p className={styles.timelineDescription}>{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImpactShowcase;