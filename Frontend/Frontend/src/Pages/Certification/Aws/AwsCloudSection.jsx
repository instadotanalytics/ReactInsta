import { useEffect, useRef, useState } from "react";
import {
  FaServer,
  FaBolt,
  FaUserShield,
  FaNetworkWired,
  FaGlobe,
  FaRoute,
  FaDatabase,
  FaEye,
  FaCubes,
  FaBell,
  FaLayerGroup,
  FaBoxOpen,
  FaCloud,
} from "react-icons/fa";
import styles from "./AwsCloudSection.module.css";

// Each service carries an icon + a one-word category, which doubles as the
// second "column" in the table-like card grid below.
const services = [
  { name: "EC2", category: "Compute", Icon: FaServer },
  { name: "Lambda", category: "Serverless", Icon: FaBolt },
  { name: "IAM", category: "Security", Icon: FaUserShield },
  { name: "VPC", category: "Networking", Icon: FaNetworkWired },
  { name: "CloudFront", category: "Delivery", Icon: FaGlobe },
  { name: "Route53", category: "DNS", Icon: FaRoute },
  { name: "RDS", category: "Database", Icon: FaDatabase },
  { name: "CloudWatch", category: "Monitoring", Icon: FaEye },
  { name: "ECS", category: "Containers", Icon: FaCubes },
  { name: "SNS", category: "Messaging", Icon: FaBell },
  { name: "SQS", category: "Queuing", Icon: FaLayerGroup },
  { name: "S3", category: "Storage", Icon: FaBoxOpen },
];

// Lightweight wavy-cloud + floating-dot ambient animation drawn on a canvas
// instead of PNG cloud images. Keeps the same soft-blue theme, costs nothing
// to load, and respects prefers-reduced-motion.
function AmbientCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let width, height;
    let particles = [];

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      const count = width < 640 ? 16 : 30;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.5 + Math.random() * 2.5,
        speed: 0.15 + Math.random() * 0.35,
        drift: (Math.random() - 0.5) * 0.3,
        alpha: 0.15 + Math.random() * 0.35,
      }));
    };

    // Three soft sine-wave bands stand in for "clouds" without using any
    // image assets — each scrolls at its own speed/opacity for depth.
    const waveLayers = [
      { amp: 26, freq: 0.006, speed: 0.18, yRatio: 0.15, alpha: 0.1 },
      { amp: 34, freq: 0.0045, speed: 0.12, yRatio: 0.45, alpha: 0.08 },
      { amp: 20, freq: 0.008, speed: 0.25, yRatio: 0.85, alpha: 0.07 },
    ];
    let t = 0;

    const drawWave = (layer) => {
      const baseY = height * layer.yRatio;
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x <= width; x += 8) {
        const y =
          baseY +
          Math.sin(x * layer.freq + t * layer.speed) * layer.amp +
          Math.sin(x * layer.freq * 2.3 + t * layer.speed * 1.4) * (layer.amp * 0.35);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const gradient = ctx.createLinearGradient(0, baseY - layer.amp, 0, height);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${layer.alpha})`);
      gradient.addColorStop(1, `rgba(173, 220, 255, ${layer.alpha * 0.4})`);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      waveLayers.forEach(drawWave);
      t += 1;

      particles.forEach((p) => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 188, 255, ${p.alpha})`;
        ctx.shadowColor = "rgba(139, 188, 255, 0.8)";
        ctx.shadowBlur = 8;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) cancelAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.ambientCanvas} />;
}

export default function AwsCloudSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.background}>
        <AmbientCanvas />
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <h2>
            Inside the <span>AWS Cloud</span>
          </h2>

          <p>
            Discover how modern cloud applications connect compute, networking,
            storage, security and serverless services into one intelligent cloud
            ecosystem designed for reliability, scalability and innovation.
          </p>
        </div>

        {/* Featured banner replaces the old circular center hub */}
        <div className={styles.hubBar}>
          <div className={styles.hubIconWrap}>
            <FaCloud className={styles.hubIcon} />
          </div>
          <div className={styles.hubText}>
            <span className={styles.hubTitle}>AWS Cloud</span>
            <span className={styles.hubSubtitle}>
              12 core services, one connected platform
            </span>
          </div>
        </div>

        {/* Table-like card grid replaces the orbit diagram */}
        <div className={styles.grid}>
          {services.map((service) => {
            const { Icon } = service;
            return (
              <div key={service.name} className={styles.serviceCard}>
                <div className={styles.serviceIconWrap}>
                  <Icon className={styles.serviceIcon} aria-hidden="true" />
                </div>
                <div className={styles.serviceText}>
                  <span className={styles.serviceName}>{service.name}</span>
                  <span className={styles.serviceCategory}>
                    {service.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}