import React, { useState } from "react";
import styles from "./HrCounslerSignup.module.css";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api.js"; // apna path adjust karo

const HrCounslerSignup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "hr",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setError("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (data.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/hr/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      });

      const result = await res.json();

      if (result.success || res.ok) {
        setSuccess(result.message || "Account created successfully!");
        setTimeout(() => navigate("/hr-counsler-login"), 1800);
      } else {
        setError(result.message || "Signup failed. Please try again.");
      }
    } catch {
      setError("Unable to connect. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: "hr", label: "HR Manager", icon: "🏢", desc: "Manage staff & operations" },
    { value: "counselor", label: "Student Counselor", icon: "🎓", desc: "Guide & support students" },
  ];

  return (
    <div className={styles.page}>

      {/* ── Left Panel ── */}
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <div className={styles.brandMark}>
            <span className={styles.brandIcon}>◈</span>
            <span className={styles.brandName}>Insta Dot Analytics</span>
          </div>

          <h1 className={styles.heroHeading}>
            Join the<br />
            <em>Team.</em> <br />
            Create BY <em>Jeetendra</em>
          </h1>
          <p className={styles.heroSub}>
            Create your account and start managing students, sessions, and guidance — all from one powerful portal.
          </p>

          <div className={styles.featureList}>
            {[
              { icon: "✦", text: "Role-based access — HR & Counselor" },
              { icon: "✦", text: "Manage sessions & student inquiries" },
              { icon: "✦", text: "Real-time reports & analytics" },
              { icon: "✦", text: "Secure, encrypted credentials" },
            ].map((f, i) => (
              <div className={styles.featureItem} key={i}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.leftOrbs}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.orb3} />
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className={styles.rightPanel}>
        <div className={styles.formCard}>

          {/* Top */}
          <div className={styles.formTop}>
            <div className={styles.formIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <h2 className={styles.formTitle}>Create Account</h2>
            <p className={styles.formSubtitle}>Fill in your details to get started</p>
          </div>

          {/* Alerts */}
          {error && (
            <div className={`${styles.alertBox} ${styles.alertError}`}>
              <span>⚠</span> {error}
            </div>
          )}
          {success && (
            <div className={`${styles.alertBox} ${styles.alertSuccess}`}>
              <span>✓</span> {success} Redirecting to login…
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>

            {/* Role Selector */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Select Your Role</label>
              <div className={styles.roleGrid}>
                {roles.map((r) => (
                  <label
                    key={r.value}
                    className={`${styles.roleCard} ${data.role === r.value ? styles.roleActive : ""}`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r.value}
                      checked={data.role === r.value}
                      onChange={handleChange}
                      className={styles.roleRadio}
                    />
                    <span className={styles.roleEmoji}>{r.icon}</span>
                    <span className={styles.roleLabel}>{r.label}</span>
                    <span className={styles.roleDesc}>{r.desc}</span>
                    {data.role === r.value && (
                      <span className={styles.roleCheck}>✓</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Full Name</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  className={styles.input}
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={data.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  className={styles.input}
                  name="email"
                  type="email"
                  placeholder="you@organization.com"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Row */}
            <div className={styles.passwordRow}>
              {/* Password */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Password</label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    className={styles.input}
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Confirm Password</label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <input
                    className={styles.input}
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat password"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1}>
                    {showConfirm ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
            </div>

            {/* Password strength */}
            {data.password.length > 0 && (
              <div className={styles.strength}>
                <div className={styles.strengthBar}>
                  {[1, 2, 3, 4].map(n => (
                    <div
                      key={n}
                      className={`${styles.strengthSeg} ${data.password.length >= n * 3 ? styles[`str${Math.min(Math.ceil(data.password.length / 3), 4)}`] : ""
                        }`}
                    />
                  ))}
                </div>
                <span className={styles.strengthLabel}>
                  {data.password.length < 4 ? "Weak" : data.password.length < 7 ? "Fair" : data.password.length < 10 ? "Good" : "Strong"}
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              className={`${styles.submitBtn} ${loading ? styles.loading : ""}`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <><span className={styles.spinner} /> Creating Account…</>
              ) : (
                <>Create Account <span className={styles.btnArrow}>→</span></>
              )}
            </button>

          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <span>Already have an account?</span>
          </div>

          <Link to="/hr-counsler-login" className={styles.loginBtn}>
            Sign In Instead
          </Link>

          <p className={styles.footNote}>
            By signing up, you agree to our{" "}
            <span className={styles.footLink}>Terms of Service</span> &amp;{" "}
            <span className={styles.footLink}>Privacy Policy</span>
          </p>

        </div>
      </div>

    </div>
  );
};

export default HrCounslerSignup;