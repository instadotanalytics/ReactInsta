import React, { useState } from "react";
import styles from "./HrCounslerLogin.module.css";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api.js"; // apna path adjust karo

const HrCounslerLogin = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setError("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/hr/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        localStorage.setItem("token", result.token);
        if (result.role === "hr") {
          navigate("/hr-dashboard");
        } else {
          navigate("/counselor-dashboard");
        }
      } else {
        setError(result.message || "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Unable to connect. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>

      {/* ── Left Panel ── */}
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <div className={styles.brandMark}>
            <span className={styles.brandIcon}>◈</span>
            <span className={styles.brandName}>Insta Dot Analytics </span>
          </div>
          <h1 className={styles.heroHeading}>
            Manage.<br />
            Guide.<br />
            <em>Empower.</em> <br />
            <em>Create By.</em>Jeetendra
          </h1>
          <p className={styles.heroSub}>
            One unified portal for HR teams and student counselors to collaborate, track, and grow together.
          </p>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>🏢 HR Management</span>
            <span className={styles.heroBadge}>🎓 Student Counseling</span>
            <span className={styles.heroBadge}>📊 Analytics</span>
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2 className={styles.formTitle}>Welcome back</h2>
            <p className={styles.formSubtitle}>Sign in to your HR &amp; Counselor account</p>
          </div>

          {/* Error */}
          {error && (
            <div className={styles.errorBox}>
              <span className={styles.errorIcon}>⚠</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>

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
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <div className={styles.labelRow}>
                <label className={styles.label}>Password</label>
                <button type="button" className={styles.forgotBtn}>Forgot password?</button>
              </div>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  className={styles.input}
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPass(!showPass)}
                  tabIndex={-1}
                >
                  {showPass ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              className={`${styles.submitBtn} ${loading ? styles.loading : ""}`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className={styles.spinner} />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <span className={styles.btnArrow}>→</span>
                </>
              )}
            </button>

          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <span>Don't have an account?</span>
          </div>

          {/* Signup Link */}
          <Link to="/hr-counsler-signup" className={styles.signupBtn}>
            Create New Account
          </Link>

          <p className={styles.footNote}>
            By signing in, you agree to our{" "}
            <span className={styles.footLink}>Terms of Service</span> &amp;{" "}
            <span className={styles.footLink}>Privacy Policy</span>
          </p>
        </div>
      </div>

    </div>
  );
};

export default HrCounslerLogin;