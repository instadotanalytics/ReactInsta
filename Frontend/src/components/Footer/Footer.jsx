import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
} from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Internship", path: "/career/internship" },
    { label: "Full Time Jobs", path: "/career/fulltime" },
    { label: "Placements", path: "/career/placement" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const certifications = [
    { label: "AWS Certification", path: "/certification/aws" },
    { label: "Microsoft Certification", path: "/certification/microsoft" },
    { label: "IBM Certification", path: "/certification/ibm" },
    { label: "Red Hat Certification", path: "/certification/redhat" },
    { label: "Custom Program", path: "/certification/custom" },
  ];

  const socials = [
    { icon: <FaInstagram />, href: "https://www.instagram.com/instadotanalytics/", label: "Instagram" },
    { icon: <FaLinkedinIn />, href: "https://in.linkedin.com/company/instadotanalytics", label: "LinkedIn" },
  ];

  // ─── Canvas: cursor-tracking particle / data-node network ─────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId;
    let particles = [];

    const mouse = { x: -9999, y: -9999, active: false };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Density scales with footer area; capped for performance.
    const getParticleCount = () => {
      const area = width * height;
      return Math.min(70, Math.max(28, Math.round(area / 16000)));
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = getParticleCount();
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    const onMouseMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y >= 0 && mouse.y <= height;
    };
    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const LINK_DIST = 130;
    const CURSOR_DIST = 160;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Gentle attraction toward cursor for a "tracking" feel
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_DIST && dist > 0.01) {
            const force = (1 - dist / CURSOR_DIST) * 0.012;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Light velocity damping so particles don't accelerate forever
        p.vx *= 0.985;
        p.vy *= 0.985;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(92, 200, 240, 0.55)";
        ctx.fill();
      }

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(4, 159, 219, ${0.16 * (1 - dist / LINK_DIST)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Connect particles to the cursor itself
      if (mouse.active) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_DIST) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(92, 200, 240, ${0.3 * (1 - dist / CURSOR_DIST)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        // Cursor glow node
        const grad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 8
        );
        grad.addColorStop(0, "rgba(92, 200, 240, 0.9)");
        grad.addColorStop(1, "rgba(92, 200, 240, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();

    if (!prefersReducedMotion) {
      draw();
      wrap.addEventListener("mousemove", onMouseMove);
      wrap.addEventListener("mouseleave", onMouseLeave);
    } else {
      // Reduced motion: render one static frame, no RAF loop, no tracking.
      draw();
      cancelAnimationFrame(rafId);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      wrap.removeEventListener("mousemove", onMouseMove);
      wrap.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <footer className={styles.footer} ref={wrapRef}>
      {/* Wave top edge */}
      <div className={styles.waveTop} aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className={styles.waveSvg}
        >
          <path
            d="M0,32 C240,80 480,0 720,24 C960,48 1200,8 1440,40 L1440,80 L0,80 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Cursor-tracking particle canvas */}
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.container}>
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <div className={styles.logoWrapper}>
            <img
              src="https://mllffozprx61.i.optimole.com/w:393/h:128/q:mauto/ig:avif/https://instadotanalytics.com/wp-content/uploads/2023/05/WhatsApp_Image_2024-07-11_at_15.57.22_70256fed-removebg-preview.png"
              alt="Insta Dot Analytics"
              className={styles.logoImage}
            />
          </div>
          <p className={styles.brandDesc}>
            Job-oriented IT training in Indore — practical courses, real
            projects, and placement support to launch your tech career.
          </p>

          <ul className={styles.contactList}>
            <li>
              <FaMapMarkerAlt className={styles.contactIcon} />
              <span>P13-14, Metro Tower, Vijay Nagar, Indore (M.P.)</span>
            </li>
            <li>
              <FaEnvelope className={styles.contactIcon} />
              <a href="mailto:info@instadotanalytics.com">info@instadotanalytics.com</a>
            </li>
            <li>
              <FaPhoneAlt className={styles.contactIcon} />
              <a href="tel:+916232685820">+91 6232 685 820</a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className={styles.linksCol}>
          <h3 className={styles.colHeading}>Quick Links</h3>
          <ul className={styles.linkList}>
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div className={styles.linksCol}>
          <h3 className={styles.colHeading}>Certifications</h3>
          <ul className={styles.linkList}>
            {certifications.map((cert) => (
              <li key={cert.path}>
                <Link to={cert.path} className={styles.navLink}>
                  {cert.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow + CTA */}
        <div className={styles.socialCol}>
          <h3 className={styles.colHeading}>Stay Connected</h3>
          <p className={styles.socialDesc}>
            Job alerts and placement updates, straight from the team.
          </p>

          <div className={styles.socialRow}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <Link to="/contact" className={styles.ctaBtn}>
            Get in Touch <FaArrowRight className={styles.btnArrow} />
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © {currentYear} Insta Dot Analytics. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;