import React, { useRef, useEffect } from 'react';
import styles from './MicrosoftHeroSection.module.css';
import { FaStar, FaUsers, FaChalkboardTeacher, FaCertificate, FaCode, FaChartLine, FaBullhorn } from 'react-icons/fa';
import { MdLiveTv, MdSupportAgent, MdVerified, MdSchool } from 'react-icons/md';
import { GiCheckMark } from 'react-icons/gi';
import { BsLightningFill, BsTrophy } from 'react-icons/bs';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import AboutMicrosoft from './AboutMicrosoft';
import CertificationApplyForm from '../../CertificationApplyForm';
import CallToAction from './CallToAction';
import WhyJoinUS from '../../WhyJoinUS';
import ReviewSection from '../../ReviewSection';
import Companypartners from '../../Courses/Companypartners';

import MicroRight from "../../../assets/Microsoftright.png";

const MicrosoftHeroSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let gridOffsetX = 0;
    let gridOffsetY = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw geometric grid pattern
    const drawGrid = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Dark background with gradient
      const bgGradient = ctx.createRadialGradient(
        width/2, height/2, 0,
        width/2, height/2, Math.max(width, height) * 0.7
      );
      bgGradient.addColorStop(0, '#0d1b2a');
      bgGradient.addColorStop(0.5, '#0a0e1a');
      bgGradient.addColorStop(1, '#060810');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Animated grid offset
      gridOffsetX += 0.2;
      gridOffsetY += 0.15;

      // Main grid lines
      const spacing = 60;
      const offsetX = (gridOffsetX % spacing);
      const offsetY = (gridOffsetY % spacing);

      ctx.strokeStyle = 'rgba(0, 164, 239, 0.06)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = -spacing + offsetX; x < width + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = -spacing + offsetY; y < height + spacing; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Secondary grid (darker, larger spacing)
      const spacing2 = spacing * 4;
      const offsetX2 = (gridOffsetX * 0.5 % spacing2);
      const offsetY2 = (gridOffsetY * 0.5 % spacing2);

      ctx.strokeStyle = 'rgba(0, 164, 239, 0.03)';
      ctx.lineWidth = 2;

      for (let x = -spacing2 + offsetX2; x < width + spacing2; x += spacing2) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = -spacing2 + offsetY2; y < height + spacing2; y += spacing2) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Diagonal lines
      const diagSpacing = 80;
      const diagOffset = (gridOffsetX + gridOffsetY) * 0.3 % diagSpacing;

      ctx.strokeStyle = 'rgba(79, 70, 229, 0.03)';
      ctx.lineWidth = 1;

      for (let i = -height; i < width + height; i += diagSpacing) {
        const pos = i + diagOffset;
        ctx.beginPath();
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos + height, height);
        ctx.stroke();
      }

      // Floating geometric shapes
      drawGeometricShapes(ctx, width, height);
    };

    // Draw floating geometric shapes
    const drawGeometricShapes = (ctx, width, height) => {
      const time = Date.now() * 0.0005;
      const shapes = [
        { type: 'circle', x: 0.15, y: 0.2, size: 120, color: 'rgba(0, 164, 239, 0.05)' },
        { type: 'square', x: 0.85, y: 0.3, size: 100, color: 'rgba(79, 70, 229, 0.05)' },
        { type: 'circle', x: 0.5, y: 0.7, size: 150, color: 'rgba(0, 200, 255, 0.04)' },
        { type: 'triangle', x: 0.1, y: 0.8, size: 80, color: 'rgba(139, 92, 246, 0.04)' },
        { type: 'square', x: 0.9, y: 0.8, size: 90, color: 'rgba(59, 130, 246, 0.04)' },
        { type: 'circle', x: 0.7, y: 0.1, size: 100, color: 'rgba(0, 164, 239, 0.03)' },
        { type: 'triangle', x: 0.3, y: 0.9, size: 70, color: 'rgba(79, 70, 229, 0.03)' },
      ];

      shapes.forEach((shape, index) => {
        const x = width * shape.x + Math.sin(time + index * 1.2) * 40;
        const y = height * shape.y + Math.cos(time * 0.8 + index * 0.9) * 35;
        const size = shape.size + Math.sin(time * 0.5 + index * 0.7) * 15;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(time * 0.1 + index * 0.5);
        ctx.globalAlpha = 0.6;

        ctx.beginPath();
        switch(shape.type) {
          case 'circle':
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            break;
          case 'square':
            ctx.rect(-size/2, -size/2, size, size);
            break;
          case 'triangle':
            ctx.moveTo(0, -size/2);
            ctx.lineTo(size/2, size/2);
            ctx.lineTo(-size/2, size/2);
            ctx.closePath();
            break;
          default:
            ctx.arc(0, 0, size, 0, Math.PI * 2);
        }
        ctx.fillStyle = shape.color;
        ctx.fill();

        // Border for shapes
        ctx.strokeStyle = 'rgba(0, 164, 239, 0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      });
    };

    // Draw glowing nodes at grid intersections
    const drawNodes = () => {
      const width = canvas.width;
      const height = canvas.height;
      const spacing = 120;
      const time = Date.now() * 0.001;

      for (let x = spacing; x < width; x += spacing) {
        for (let y = spacing; y < height; y += spacing) {
          const distance = Math.sqrt(
            Math.pow(x - width/2, 2) + 
            Math.pow(y - height/2, 2)
          );
          const maxDistance = Math.sqrt(
            Math.pow(width/2, 2) + 
            Math.pow(height/2, 2)
          );
          const opacity = (1 - distance / maxDistance) * 0.15;
          
          if (opacity > 0.02) {
            const pulse = Math.sin(time + x * 0.01 + y * 0.01) * 0.5 + 0.5;
            const size = 2 + pulse * 3;

            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
            gradient.addColorStop(0, `rgba(0, 164, 239, ${opacity * pulse})`);
            gradient.addColorStop(1, `rgba(0, 164, 239, 0)`);

            ctx.beginPath();
            ctx.arc(x, y, size * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 164, 239, ${opacity * pulse * 0.5})`;
            ctx.fill();
          }
        }
      }
    };

    // Draw hexagon pattern
    const drawHexagons = () => {
      const width = canvas.width;
      const height = canvas.height;
      const hexSize = 30;
      const hexWidth = hexSize * Math.sqrt(3);
      const hexHeight = hexSize * 2;
      const time = Date.now() * 0.0003;

      ctx.strokeStyle = 'rgba(0, 164, 239, 0.02)';
      ctx.lineWidth = 1;

      for (let row = -1; row < Math.ceil(height / hexHeight) + 1; row++) {
        for (let col = -1; col < Math.ceil(width / hexWidth) + 1; col++) {
          const offsetX = (row % 2) * hexSize * Math.sqrt(3) / 2;
          const x = col * hexWidth + offsetX;
          const y = row * hexHeight * 0.75;

          // Skip if far from center to save performance
          const distFromCenter = Math.sqrt(
            Math.pow(x - width/2, 2) + 
            Math.pow(y - height/2, 2)
          );
          if (distFromCenter > Math.max(width, height) * 0.6) continue;

          const pulse = Math.sin(time + x * 0.02 + y * 0.02) * 0.5 + 0.5;
          const size = hexSize + pulse * 5;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(time * 0.02);

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 180) * (60 * i - 30);
            const hx = size * Math.cos(angle);
            const hy = size * Math.sin(angle);
            i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(0, 164, 239, ${0.01 + pulse * 0.03})`;
          ctx.stroke();

          ctx.restore();
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw base grid
      drawGrid();
      
      // Draw hexagon pattern
      drawHexagons();
      
      // Draw glowing nodes
      drawNodes();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      // Optional: Add mouse interaction for grid
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <Header />
      <section className={styles.heroSection}>
        <div className={styles.canvasContainer}>
          <canvas ref={canvasRef} className={styles.heroCanvas}></canvas>
        </div>

        <div className={styles.container}>
          {/* Row 1: Header Section */}
          <div className={styles.row}>
            <div className={styles.col12}>
              <div className={styles.headerContent}>
                <div className={styles.badge}>
                  <BsLightningFill className={styles.badgeIcon} />
                  <span>Microsoft Certified Partner</span>
                </div>
                <h1 className={styles.mainHeading}>
                  Upskill Yourself with <br />
                  <span className={styles.highlight}>Industry-Ready</span> Courses
                </h1>
                <p className={styles.description}>
                  Choose from 25+ professional courses designed by industry experts.
                  Get certified and boost your career with 100% placement assistance.
                </p>
                <div className={styles.ctaButtons}>
                  <button className={styles.primaryBtn}>Explore Courses</button>
                  <button className={styles.secondaryBtn}>View Brochure</button>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Stats Section */}
          <div className={styles.row}>
            <div className={styles.col12}>
              <div className={styles.statsContainer}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}><FaCode /></div>
                  <div className={styles.statNumber}>25+</div>
                  <div className={styles.statLabel}>Professional Courses</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}><FaUsers /></div>
                  <div className={styles.statNumber}>5000+</div>
                  <div className={styles.statLabel}>Students Enrolled</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}><MdSchool /></div>
                  <div className={styles.statNumber}>150+</div>
                  <div className={styles.statLabel}>Batches Completed</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}><BsTrophy /></div>
                  <div className={styles.statNumber}>4.9</div>
                  <div className={styles.statLabel}>Student Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Features and Image Section */}
          <div className={styles.row}>
            <div className={styles.col6}>
              <div className={styles.featuresSection}>
                <h2 className={styles.sectionTitle}>Why Choose Us</h2>
                <div className={styles.featuresGrid}>
                  <div className={styles.featureItem}>
                    <MdLiveTv className={styles.featureIcon} />
                    <div>
                      <h4>Live Interactive Classes</h4>
                      <p>Real-time learning with industry experts</p>
                    </div>
                  </div>
                  <div className={styles.featureItem}>
                    <FaChalkboardTeacher className={styles.featureIcon} />
                    <div>
                      <h4>1:1 Mentorship</h4>
                      <p>Personalized guidance for career growth</p>
                    </div>
                  </div>
                  <div className={styles.featureItem}>
                    <MdSupportAgent className={styles.featureIcon} />
                    <div>
                      <h4>Placement Support</h4>
                      <p>100% assistance with job placement</p>
                    </div>
                  </div>
                  <div className={styles.featureItem}>
                    <MdVerified className={styles.featureIcon} />
                    <div>
                      <h4>Industry Certification</h4>
                      <p>Globally recognized certifications</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.col6}>
              <div className={styles.imageWrapper}>
                <img
                  src={MicroRight}
                  alt="Microsoft Certification Training"
                  className={styles.heroImage}
                />
                <div className={styles.imageBadge}>
                  <FaCertificate className={styles.badgeIcon2} />
                  <span>Certified Course</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Popular Courses Section */}
          <div className={styles.row}>
            <div className={styles.col12}>
              <div className={styles.coursesSection}>
                <h2 className={styles.sectionTitle}>Popular Courses</h2>
                <div className={styles.courseTags}>
                  <span className={styles.courseTag}>
                    <FaCode className={styles.tagIcon} />
                    Full Stack Development
                  </span>
                  <span className={styles.courseTag}>
                    <FaChartLine className={styles.tagIcon} />
                    Data Science
                  </span>
                  <span className={styles.courseTag}>
                    <FaBullhorn className={styles.tagIcon} />
                    Digital Marketing
                  </span>
                  <span className={styles.courseTag}>
                    <FaCode className={styles.tagIcon} />
                    Cloud Computing
                  </span>
                  <span className={styles.courseTag}>
                    <FaChartLine className={styles.tagIcon} />
                    AI & Machine Learning
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 5: Bottom CTA Section */}
          <div className={styles.row}>
            <div className={styles.col12}>
              <div className={styles.bottomStats}>
                <div className={styles.bottomStatItem}>
                  <GiCheckMark className={styles.checkIcon} />
                  <span className={styles.bottomStatHighlight}>Learn from Industry Experts</span>
                </div>
                <div className={styles.bottomStatDivider}>|</div>
                <div className={styles.bottomStatItem}>
                  <GiCheckMark className={styles.checkIcon} />
                  <span className={styles.bottomStatHighlight}>25+ Courses Available</span>
                </div>
                <div className={styles.bottomStatDivider}>|</div>
                <div className={styles.bottomStatItem}>
                  <GiCheckMark className={styles.checkIcon} />
                  <span className={styles.bottomStatHighlight}>100% Placement Assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutMicrosoft />
      <Companypartners />
      <CertificationApplyForm />
      <WhyJoinUS />
      <CallToAction />
      <ReviewSection />
      <Footer />
    </>
  );
};

export default MicrosoftHeroSection;