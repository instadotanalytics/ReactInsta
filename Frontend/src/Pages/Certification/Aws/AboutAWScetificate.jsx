import React, { useEffect, useRef } from "react";
import styles from "./AboutAWSCertificate.module.css";
import {
  FaAws,
  FaCloud,
  FaDatabase,
  FaShieldAlt,
  FaCode,
  FaNetworkWired,
  FaCheckCircle,
  FaClock,
  FaGlobe,
  FaAward,
  FaArrowRight,
  FaServer,
  FaCogs,
  FaLock,
  FaChartLine,
  FaUsers,
  FaBookOpen,
  FaLaptop,
  FaRegClock,
  FaLayerGroup,
  FaCertificate,
  FaStar,
  FaRocket,
} from "react-icons/fa";

const AboutAWSCertificate = () => {
  const canvasRef = useRef(null);

  // Same animated wavy canvas background as the hero section
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Base white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // Blob 1 — large top-right radial
      const g1 = ctx.createRadialGradient(
        width * 0.78, height * 0.18, 0,
        width * 0.78, height * 0.18, width * 0.52
      );
      g1.addColorStop(0, "rgba(180,175,255,0.55)");
      g1.addColorStop(0.5, "rgba(200,195,255,0.28)");
      g1.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Blob 2 — mid-left softer, gently animated
      const g2 = ctx.createRadialGradient(
        width * 0.18 + Math.sin(t * 0.4) * 30,
        height * 0.6 + Math.cos(t * 0.3) * 20,
        0,
        width * 0.18 + Math.sin(t * 0.4) * 30,
        height * 0.6 + Math.cos(t * 0.3) * 20,
        width * 0.38
      );
      g2.addColorStop(0, "rgba(160,155,255,0.30)");
      g2.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Wavy shape — signature wave
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
      waveGrad.addColorStop(0, "rgba(140,130,255,0.18)");
      waveGrad.addColorStop(1, "rgba(200,195,255,0.06)");
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
      waveGrad2.addColorStop(0, "rgba(120,110,245,0.10)");
      waveGrad2.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = waveGrad2;
      ctx.fill();
      ctx.restore();

      t += 0.008;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const certifications = [
    { level: "Foundational", name: "Cloud Practitioner", icon: <FaCloud />, badge: "CLF-C02" },
    { level: "Associate", name: "Solutions Architect", icon: <FaNetworkWired />, badge: "SAA-C03" },
    { level: "Associate", name: "Developer", icon: <FaCode />, badge: "DVA-C02" },
    { level: "Associate", name: "SysOps Administrator", icon: <FaDatabase />, badge: "SOA-C02" },
    { level: "Professional", name: "Solutions Architect", icon: <FaAward />, badge: "SAP-C02" },
    { level: "Professional", name: "DevOps Engineer", icon: <FaShieldAlt />, badge: "DOP-C02" },
    { level: "Specialty", name: "Security", icon: <FaLock />, badge: "SCS-C02" },
    { level: "Specialty", name: "Machine Learning", icon: <FaChartLine />, badge: "MLS-C01" },
    { level: "Specialty", name: "Database", icon: <FaDatabase />, badge: "DBS-C01" },
    { level: "Specialty", name: "SAP on AWS", icon: <FaServer />, badge: "PAS-C01" },
    { level: "Specialty", name: "Data Analytics", icon: <FaChartLine />, badge: "DAS-C01" },
    { level: "Specialty", name: "Advanced Networking", icon: <FaNetworkWired />, badge: "ANS-C01" },
  ];

  const benefits = [
    { icon: <FaCheckCircle />, text: "Globally recognized credentials" },
    { icon: <FaClock />, text: "3 years validity" },
    { icon: <FaGlobe />, text: "Accepted in 190+ countries" },
    { icon: <FaAward />, text: "Average salary premium: 25-40%" },
    { icon: <FaUsers />, text: "Join 1M+ certified professionals" },
    { icon: <FaRocket />, text: "Fast-track career growth" },
  ];

  const examDetails = [
    { type: "Multiple Choice", value: "65-75 questions" },
    { type: "Duration", value: "130-180 minutes" },
    { type: "Cost", value: "$100-$300 USD" },
    { type: "Passing Score", value: "720-750/1000" },
    { type: "Format", value: "Online or Test Center" },
    { type: "Validity", value: "3 years" },
  ];

  const pathSteps = [
    { step: "1", title: "Choose Your Path", desc: "Select certification based on your role and experience level" },
    { step: "2", title: "Prepare with Training", desc: "Digital courses, hands-on labs, and practice exams" },
    { step: "3", title: "Schedule Exam", desc: "Online proctored or test center, available year-round" },
    { step: "4", title: "Get Certified", desc: "Earn digital badge, certificate, and AWS Credly profile" },
  ];

  const learningResources = [
    { icon: <FaBookOpen />, title: "AWS Training", desc: "Official digital training" },
    { icon: <FaLaptop />, title: "Hands-on Labs", desc: "Practical experience" },
    { icon: <FaRegClock />, title: "Practice Exams", desc: "Test your knowledge" },
    { icon: <FaUsers />, title: "Study Groups", desc: "Peer learning" },
  ];

  const stats = [
    { number: "12", label: "Certifications", icon: <FaCertificate /> },
    { number: "4", label: "Levels", icon: <FaLayerGroup /> },
    { number: "1M+", label: "Certified", icon: <FaUsers /> },
    { number: "98%", label: "Success Rate", icon: <FaStar /> },
  ];

  return (
    <>
      <section className={styles.awsCertificationWrapper}>
        {/* Animated canvas background — same as hero */}
        <canvas ref={canvasRef} className={styles.canvas} />

        {/* First Section - About AWS */}
        <div className={styles.aboutAws}>
          <div className={styles.heroGrid}>
            {/* LEFT */}
            <div className={styles.content}>
              {/* <div className={styles.badge}>
                <FaAws />
                <span>AWS CERTIFICATION</span>
              </div> */}

              <h2 className={styles.title}>
                Validate Your Cloud Expertise with
                <span> AWS Certification</span>
              </h2>

              <p className={styles.description}>
                Earn industry-recognized cloud credentials and build expertise
                in architecture, security, DevOps, data engineering, and modern
                cloud solutions.
              </p>

              <div className={styles.stats}>
                {stats.map((item, index) => (
                  <div key={index} className={styles.statCard}>
                    <span className={styles.statIcon}>{item.icon}</span>
                    <h3>{item.number}</h3>
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className={styles.visual}>
              <img
                src="https://pitcacademy.com/wp-content/uploads/2025/02/AWS-Certified-Cloud-Practitioner.png"
                alt="AWS Certification"
                className={styles.certImage}
              />
            </div>
          </div>
        </div>

        {/* Second Section - Certification Journey */}
        <div className={styles.certificationJourneySection}>
          <div className={styles.contentWrapper}>
            <div className={styles.levelGrid}>
              <div className={styles.levelCard}>
                <FaCloud />
                <h3>Foundational</h3>
                <p>Cloud Practitioner</p>
              </div>
              <div className={styles.levelCard}>
                <FaCode />
                <h3>Associate</h3>
                <p>Architect • Developer • SysOps</p>
              </div>
              <div className={styles.levelCard}>
                <FaAward />
                <h3>Professional</h3>
                <p>Architect • DevOps</p>
              </div>
              <div className={styles.levelCard}>
                <FaRocket />
                <h3>Specialty</h3>
                <p>Security • ML • Data • Networking</p>
              </div>
            </div>

            <div className={styles.journeyRoadmap}>
              <div className={styles.roadTrackWrapper}>
                <div className={styles.roadLine}></div>

                {["START", "KM 2", "KM 3", "GOAL"].map((label, i) => (
                  <div
                    key={label}
                    className={styles.roadScale}
                    style={{ left: `${[4, 35, 65, 92][i]}%` }}
                  >
                    <div className={styles.scaleTick}></div>
                    <div className={styles.scaleLabel}>{label}</div>
                  </div>
                ))}

                <div className={styles.roadArrow}>
                  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <filter id="gpsShadow">
                        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.4" />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className={styles.roadStepsGrid}>
                {pathSteps.map((step) => (
                  <div key={step.step} className={styles.roadStep}>
                    <div className={styles.stepNode}></div>
                    <div className={styles.stepDist}>Step 0{step.step}</div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutAWSCertificate;