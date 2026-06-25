import React, { useState, useEffect, useRef } from "react";
import styles from "./CertificationApplyForm.module.css";
import { API_BASE_URL } from "../config/api.js";
import { FiUser, FiMail, FiPhone, FiBookOpen, FiSend } from "react-icons/fi";

const certifications = [
  { id: "aws", name: "AWS Certification", icon: "☁️" },
  { id: "microsoft", name: "Microsoft Certification", icon: "💻" },
  { id: "ibm", name: "IBM Certification", icon: "🤖" },
  { id: "redhat", name: "Red Hat Certification", icon: "🐧" },
  { id: "custom", name: "Custom Program", icon: "🎯" },
];

const CertificationApplyForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    certification: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const canvasRef = useRef(null);

  const selectedCert = formData.certification
    ? certifications.find((c) => c.name === formData.certification)
    : null;

  // ─── Single-color wave lines rushing forward — light background ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Single accent color — deep indigo/blue on white
    const COLOR = "79, 70, 229"; // indigo-600

    const SEGMENT_COUNT = 55;
    const LINE_COUNT = 22;
    const FOV = 380;
    const SPREAD_X = 1200;
    const SPREAD_Y = 420;
    const Z_FAR = 1100;
    const SPEED = 3.5;

    const lines = Array.from({ length: LINE_COUNT }, () => {
      const baseY = (Math.random() - 0.5) * SPREAD_Y;
      const ampX = (Math.random() * 0.5 + 0.25) * SPREAD_X * 0.35;
      const ampY = (Math.random() * 0.4 + 0.1) * SPREAD_Y * 0.45;
      const freqX = 0.004 + Math.random() * 0.005;
      const freqY = 0.005 + Math.random() * 0.007;
      const phaseX = Math.random() * Math.PI * 2;
      const phaseY = Math.random() * Math.PI * 2;
      const zOff = Math.random() * Z_FAR;
      const dots = Array.from(
        { length: Math.floor(Math.random() * 3 + 2) },
        () => ({
          t: Math.random(),
        }),
      );
      return { baseY, ampX, ampY, freqX, freqY, phaseX, phaseY, zOff, dots };
    });

    let time = 0;

    const project = (x, y, z, cx, cy) => {
      const scale = FOV / (FOV + Math.max(z, 0));
      return { sx: cx + x * scale, sy: cy + y * scale, scale };
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      // Light fade trail — white background
      ctx.fillStyle = "rgba(248, 248, 255, 0.22)";
      ctx.fillRect(0, 0, W, H);

      time += SPEED;

      for (const ln of lines) {
        const zBase = (ln.zOff + time) % Z_FAR;

        const pts = [];
        for (let s = 0; s < SEGMENT_COUNT; s++) {
          const t = s / (SEGMENT_COUNT - 1);
          const z = zBase - t * Z_FAR * 0.8;
          if (z < -FOV) continue;

          const wx =
            Math.sin(t * Math.PI * 3 + ln.phaseX + time * 0.0008) * ln.ampX +
            Math.cos(t * Math.PI * 2 + ln.phaseX * 0.7) * ln.ampX * 0.35;
          const wy =
            ln.baseY +
            Math.sin(t * Math.PI * 4 + ln.phaseY + time * 0.0006) * ln.ampY +
            Math.cos(t * Math.PI * 2.5 + ln.phaseY * 0.6) * ln.ampY * 0.25;

          const p = project(wx, wy, z, cx, cy);
          pts.push({ ...p, z, t });
        }

        if (pts.length < 2) continue;

        // Draw line segments
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          const depth = Math.max(0, 1 - b.z / Z_FAR);
          const opacity = Math.pow(depth, 1.6) * 0.55;
          const width = b.scale * 1.5;

          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = `rgba(${COLOR}, ${opacity})`;
          ctx.lineWidth = Math.max(0.3, width);
          ctx.stroke();
        }

        // Draw dots
        for (const dot of ln.dots) {
          const idx = Math.floor(dot.t * (pts.length - 1));
          const p = pts[idx];
          if (!p) continue;
          const depth = Math.max(0, 1 - p.z / Z_FAR);
          const opacity = Math.pow(depth, 1.3) * 0.85;
          const r = p.scale * 3.5 * depth;

          // Soft glow
          const grd = ctx.createRadialGradient(
            p.sx,
            p.sy,
            0,
            p.sx,
            p.sy,
            r * 3,
          );
          grd.addColorStop(0, `rgba(${COLOR}, ${opacity * 0.35})`);
          grd.addColorStop(0.5, `rgba(${COLOR}, ${opacity * 0.1})`);
          grd.addColorStop(1, `rgba(${COLOR}, 0)`);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Solid dot
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, Math.max(0.5, r), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${COLOR}, ${opacity})`;
          ctx.fill();

          // White center highlight
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, Math.max(0.2, r * 0.38), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.95})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    // White base
    ctx.fillStyle = "#f8f8ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ─── Form handlers ────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[\d\s\+\-\(\)]{10,15}$/.test(formData.phone.trim()))
      newErrors.phone = "Please enter a valid phone number";
    if (!formData.certification)
      newErrors.certification = "Please select a certification";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      await response.json();
      alert(
        `✅ Application Submitted!\n\nThank you, ${formData.fullName}.\nWe'll be in touch about your ${selectedCert?.name ?? "Certification"} enrollment.\n\n📧 Confirmation sent to: ${formData.email}`,
      );
      setFormData({ fullName: "", email: "", phone: "", certification: "" });
      setErrors({});
    } catch (error) {
      console.error("Submission Error:", error);
      alert("❌ Failed to submit. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <canvas ref={canvasRef} className={styles.canvasBackground} />
      <div className={styles.overlay} />

      <div className={styles.container}>
        {/* ── LEFT PANEL ── */}
        <div className={styles.left}>
          <div className={styles.careerBadge}>
            <span>🎓</span> Advance Your Career
          </div>

          <h2>
            Apply for Your
            <span> Certification</span>
          </h2>

          <div className={styles.blueline}></div>

          <p className={styles.description}>
            Take the next step in your professional journey. Choose a program
            that aligns with your goals and unlock new opportunities.
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.iconCircle}>🏅</div>
              <div>
                <h4>Industry Recognized</h4>
                <p>Globally accepted certifications</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.iconCircle}>🎓</div>
              <div>
                <h4>Expert Mentors</h4>
                <p>Learn from industry professionals</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.iconCircle}>📈</div>
              <div>
                <h4>Career Support</h4>
                <p>Guidance for your career growth</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className={styles.right}>
          <div className={styles.formTop}>
            <span className={styles.badge}>🚀 Limited Seats Available</span>
            <h3>Start Your Certification Journey</h3>
            <p className={styles.smallText}>
              Fill your details and our team will contact you within 24 hours.
            </p>
            <div className={styles.dots}>
              <span></span>
              <span></span>
              <span className={styles.active}></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <FiUser className={styles.inputIcon} />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                {errors.fullName && (
                  <span className={styles.errorText}>{errors.fullName}</span>
                )}
              </div>
              <div className={styles.inputGroup}>
                <FiMail className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <FiPhone className={styles.inputIcon} />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && (
                <span className={styles.errorText}>{errors.phone}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <FiBookOpen className={styles.inputIcon} />
              <select
                name="certification"
                value={formData.certification}
                onChange={handleChange}
                required
              >
                <option value="">Choose Certification Program</option>
                {certifications.map((cert) => (
                  <option key={cert.id} value={cert.name}>
                    {cert.icon} {cert.name}
                  </option>
                ))}
              </select>
              {errors.certification && (
                <span className={styles.errorText}>{errors.certification}</span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              <FiSend />
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>

          <p className={styles.terms}>
            🔒 By submitting, you agree to our
            <span> Terms of Service </span>and<span> Privacy Policy</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CertificationApplyForm;
