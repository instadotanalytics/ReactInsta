// ImpactShowcase.jsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./ImpactShowcase.module.css";

// React Icons imports
import { FiUsers, FiUserCheck, FiBookOpen, FiBriefcase, FiAward, FiTrendingUp, FiCalendar, FiGlobe, FiClock, FiStar, FiTarget, FiCompass, FiZap, FiLayers, FiArrowRight } from "react-icons/fi";
import { FaGraduationCap, FaChalkboardTeacher, FaBook, FaSuitcase, FaBuilding, FaRocket, FaTrophy, FaChartLine, FaCalendarAlt, FaGlobeAmericas } from "react-icons/fa";
import { MdPeople, MdSchool, MdMenuBook, MdWork, MdBusinessCenter, MdEmojiEvents, MdTrendingUp as MdTrendingUpIcon, MdDateRange, MdPublic, MdAccessTime, MdStar, MdTrackChanges, MdExplore, MdFlashOn, MdViewModule, MdArrowForward, MdLocationOn, MdHome } from "react-icons/md";

const ImpactShowcase = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedValues, setAnimatedValues] = useState({});
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);

    // Impact metrics - optimized for 2-column mobile layout
    const metrics = [
        {
            id: 'students',
            icon: <FiUsers />,
            label: 'Students',
            value: 750,
            suffix: '+',
            color: '#4A90E2',
            bgColor: 'rgba(74, 144, 226, 0.08)'
        },
        {
            id: 'trainers',
            icon: <FaChalkboardTeacher />,
            label: 'Trainers',
            value: 12,
            suffix: '+',
            color: '#2997ff',
            bgColor: 'rgba(41, 151, 255, 0.08)'
        },
        {
            id: 'courses',
            icon: <FiBookOpen />,
            label: 'Courses',
            value: 6,
            suffix: '+',
            color: '#1c91ff',
            bgColor: 'rgba(28, 145, 255, 0.08)'
        },
        {
            id: 'placement',
            icon: <FiBriefcase />,
            label: 'Placement',
            value: 92,
            suffix: '%',
            color: '#4A90E2',
            bgColor: 'rgba(74, 144, 226, 0.08)'
        }
    ];

    // Journey milestones
    const milestones = [
        { year: '2018', title: 'Founded', description: 'Started our journey in Indore', icon: <FiCompass /> },
        { year: '2019', title: 'First Batch', description: '50 students enrolled', icon: <FiUsers /> },
        { year: '2020', title: 'Digital Growth', description: 'Expanded online', icon: <FiGlobe /> },
        { year: '2021', title: 'Partnerships', description: '50+ company tie-ups', icon: <FiTarget /> },
        { year: '2022', title: 'Recognition', description: 'ISO certified', icon: <FiAward /> },
        { year: '2023', title: '750+ Success', description: 'Placed in top companies', icon: <FiTrendingUp /> },
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

    // Canvas Animation
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

        class Shape {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = 20 + Math.random() * 40;
                this.rotation = Math.random() * Math.PI * 2;
                this.speed = 0.003 + Math.random() * 0.005;
                this.type = Math.floor(Math.random() * 3);
                this.opacity = 0.03 + Math.random() * 0.04;
                this.hue = 200 + Math.random() * 40;
                this.pulseSpeed = 0.02 + Math.random() * 0.03;
                this.pulseOffset = Math.random() * Math.PI * 2;
                this.xSpeed = (Math.random() - 0.5) * 0.2;
                this.ySpeed = (Math.random() - 0.5) * 0.2;
            }

            update() {
                this.rotation += this.speed;
                this.x += this.xSpeed;
                this.y += this.ySpeed;

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
                ctx.lineWidth = 1.5;

                if (this.type === 0) {
                    ctx.beginPath();
                    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.globalAlpha = this.opacity * 0.5;
                    ctx.beginPath();
                    ctx.arc(0, 0, size / 4, 0, Math.PI * 2);
                    ctx.stroke();
                } else if (this.type === 1) {
                    ctx.strokeRect(-size / 2, -size / 2, size, size);
                    ctx.globalAlpha = this.opacity * 0.5;
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

        const shapes = [];
        const numShapes = 20;
        for (let i = 0; i < numShapes; i++) {
            shapes.push(new Shape(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }

        const drawConnections = () => {
            for (let i = 0; i < shapes.length; i++) {
                for (let j = i + 1; j < shapes.length; j++) {
                    const dx = shapes[i].x - shapes[j].x;
                    const dy = shapes[i].y - shapes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 180) {
                        const opacity = (1 - distance / 180) * 0.05;
                        ctx.beginPath();
                        ctx.moveTo(shapes[i].x, shapes[i].y);
                        ctx.lineTo(shapes[j].x, shapes[j].y);
                        ctx.strokeStyle = `rgba(74, 144, 226, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        };

        const drawGradientMesh = () => {
            const gradient = ctx.createRadialGradient(
                canvas.width * 0.3 + Math.sin(time * 0.0003) * 100,
                canvas.height * 0.3 + Math.cos(time * 0.0004) * 100,
                0,
                canvas.width * 0.5,
                canvas.height * 0.5,
                canvas.width * 0.8
            );

            gradient.addColorStop(0, `rgba(74, 144, 226, ${0.04 + Math.sin(time * 0.0005) * 0.01})`);
            gradient.addColorStop(0.3, `rgba(41, 151, 255, ${0.03 + Math.cos(time * 0.0006) * 0.01})`);
            gradient.addColorStop(0.7, `rgba(28, 145, 255, ${0.02 + Math.sin(time * 0.0004) * 0.01})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const animate = () => {
            time++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGradientMesh();
            shapes.forEach(shape => {
                shape.update();
                shape.draw(ctx, time);
            });
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
            <canvas ref={canvasRef} className={styles.canvasBackground} />
            <div className={styles.patternOverlay} />

            <div className={styles.container}>
                {/* Section Header - Centered */}
                <div className={`${styles.header} ${isVisible ? styles.animateIn : ''}`}>
                    <h2 className={styles.title}>
                        <span className={styles.titleLine1}>Transforming Careers</span>
                        <span className={styles.titleLine2}>Through Excellence</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Empowering professionals with industry-leading training and placement support
                    </p>
                </div>

                {/* Metrics Grid - 2 columns on mobile, centered */}
                <div className={styles.metricsGrid}>
                    {metrics.map((metric, index) => (
                        <div
                            key={metric.id}
                            className={`${styles.metricCard} ${isVisible ? styles.animateMetric : ''}`}
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                background: metric.bgColor,
                                borderColor: `${metric.color}25`
                            }}
                        >
                            <div className={styles.metricIconWrapper}>
                                <div className={styles.metricIcon} style={{ color: metric.color, background: `${metric.color}15` }}>
                                    {metric.icon}
                                </div>
                            </div>
                            <div className={styles.metricContent}>
                                <div className={styles.metricValue} style={{ color: metric.color }}>
                                    {animatedValues[metric.id] || 0}{metric.suffix}
                                </div>
                                <div className={styles.metricLabel}>{metric.label}</div>
                                <div className={styles.metricBarWrapper}>
                                    <div className={styles.metricBar} style={{ background: `${metric.color}20` }}>
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
                            </div>
                        </div>
                    ))}
                </div>

                {/* Journey Timeline - Centered with no vertical lines */}
                <div className={styles.timelineSection}>
                    <div className={styles.timelineHeader}>
                        <h3 className={styles.sectionSubtitle}>
                            <span className={styles.subtitleLine}>Our Journey</span>
                            <span className={styles.subtitleDecor}>
                                <FiCalendar size={20} />
                            </span>
                        </h3>
                    </div>

                    <div className={styles.timeline}>
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`${styles.timelineItem} ${isVisible ? styles.animateTimeline : ''}`}
                                style={{ animationDelay: `${index * 0.08}s` }}
                            >
                                <div className={styles.timelineConnector}>
                                    <div className={styles.timelineDot} style={{
                                        background: `linear-gradient(135deg, #4A90E2, #2997ff)`,
                                        boxShadow: `0 0 20px rgba(74, 144, 226, 0.2)`
                                    }}>
                                        {milestone.icon}
                                    </div>
                                </div>
                                <div className={styles.timelineContent}>
                                    <div className={styles.timelineYear}>
                                        <FiClock size={12} /> {milestone.year}
                                    </div>
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