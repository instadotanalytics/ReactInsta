import React, { useEffect, useRef } from 'react';
import styles from './AWS.module.css';
import {
  FaAws,
  FaCloud,
  FaDatabase,
  FaShieldAlt,
  FaRocket,
  FaCheckCircle,
  FaUsers,
  FaServer,
  FaGlobe
} from 'react-icons/fa';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import AboutAWSCertificate from './AboutAWScetificate';
import CertificationApplyForm from "../../CertificationApplyForm";
import Companypartners from "../../Courses/Companypartners";
import ReviewSection from "../../ReviewSection";

const AWS = () => {
  const canvasRef = useRef(null);

  // Animated wavy canvas background — matches the soft lavender/blue wave in the reference
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Base white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Blob 1 — large top-right radial
      const g1 = ctx.createRadialGradient(
        width * 0.78, height * 0.18, 0,
        width * 0.78, height * 0.18, width * 0.52
      );
      g1.addColorStop(0, 'rgba(180,175,255,0.55)');
      g1.addColorStop(0.5, 'rgba(200,195,255,0.28)');
      g1.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Blob 2 — mid-left softer
      const g2 = ctx.createRadialGradient(
        width * 0.18 + Math.sin(t * 0.4) * 30,
        height * 0.6 + Math.cos(t * 0.3) * 20,
        0,
        width * 0.18 + Math.sin(t * 0.4) * 30,
        height * 0.6 + Math.cos(t * 0.3) * 20,
        width * 0.38
      );
      g2.addColorStop(0, 'rgba(160,155,255,0.30)');
      g2.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Wavy shape — the signature "wave" from the reference
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height * 0.55);
      for (let x = 0; x <= width; x += 4) {
        const y =
          height * 0.52 +
          Math.sin((x / width) * Math.PI * 2.2 + t * 0.6) * height * 0.09 +
          Math.sin((x / width) * Math.PI * 1.1 + t * 0.4) * height * 0.05;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const waveGrad = ctx.createLinearGradient(0, height * 0.45, 0, height);
      waveGrad.addColorStop(0, 'rgba(140,130,255,0.18)');
      waveGrad.addColorStop(1, 'rgba(200,195,255,0.06)');
      ctx.fillStyle = waveGrad;
      ctx.fill();
      ctx.restore();

      // Second thinner wave layer on top
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height * 0.62);
      for (let x = 0; x <= width; x += 4) {
        const y =
          height * 0.60 +
          Math.sin((x / width) * Math.PI * 1.8 + t * 0.5 + 1) * height * 0.06 +
          Math.sin((x / width) * Math.PI * 0.9 + t * 0.3) * height * 0.03;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const waveGrad2 = ctx.createLinearGradient(0, height * 0.55, 0, height);
      waveGrad2.addColorStop(0, 'rgba(120,110,245,0.10)');
      waveGrad2.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = waveGrad2;
      ctx.fill();
      ctx.restore();

      t += 0.008;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const services = [
    { icon: <FaCloud />, name: 'EC2, S3, Lambda' },
    { icon: <FaDatabase />, name: 'RDS, DynamoDB' },
    { icon: <FaShieldAlt />, name: 'IAM, Security' },
    { icon: <FaRocket />, name: 'DevOps & ML' },
  ];

  return (
    <>
      <Header />

      <section className={styles.heroSection}>
        {/* Animated canvas background */}
        <canvas ref={canvasRef} className={styles.canvas} />

        <div className={styles.container}>
          {/* AWS Image - placed above text with stylish container */}
          <div className={styles.imageWrapper}>
            <img 
              src="https://exahost.com/wp-content/uploads/2021/10/AWS-cloud_.png" 
              alt="AWS Big Data Analytics"
              className={styles.awsImage}
            />
            <div className={styles.imageGlow}></div>
          </div>

          {/* Partner badge pills — top-left, matching reference */}
          <div className={styles.partnerRow}>
            <span className={styles.partnerPill}>
              <FaAws className={styles.pillIcon} /> AWS Partner
            </span>
            <span className={styles.partnerPill}>
              <FaCheckCircle className={styles.pillIcon} /> Certified Partner
            </span>
          </div>

          {/* Headline — centered, dark */}
          <h1 className={styles.title}>
            Master Cloud Computing<br />
            with <span className={styles.highlight}>AWS Certification</span>
          </h1>

          {/* Tagline */}
          <p className={styles.description}>
            Become an AWS Certified Cloud Professional. Gain expertise in cloud
            architecture, development, and security — join millions who have
            accelerated their careers with AWS.
          </p>

           {/* Service tags — single row, pill style */}
          <div className={styles.serviceTags}>
            {services.map((s, i) => (
              <span key={i} className={styles.tag}>
                <span className={styles.tagIcon}>{s.icon}</span>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <AboutAWSCertificate />
      <CertificationApplyForm />
      <Companypartners />
      <ReviewSection />
      <Footer />
    </>
  );
};

export default AWS;