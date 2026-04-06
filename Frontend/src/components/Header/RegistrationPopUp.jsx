import React, { useState, useEffect } from "react";
import styles from "./RegistrationPopUp.module.css";
import { API_BASE_URL } from "../../config/api";

const RegistrationPopUp = ({ onClose, onSuccess, onError }) => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1); // multi-step feel
  const [focused, setFocused] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    source: "website",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        const res = await fetch(`${API_BASE_URL}/courses`);
        const data = await res.json();
        if (res.ok) {
          setCourses(data.data || data);
        } else {
          throw new Error(data.message || "Failed to load courses");
        }
      } catch (error) {
        setMessage({ type: "error", text: error.message });
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage({ type: "", text: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10-digit Indian number";
    }
    if (!formData.course) newErrors.course = "Please select a course";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE_URL}/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setMessage({ type: "success", text: "You're registered! 🎉 We'll reach out soon." });
      setFormData({ fullName: "", email: "", phone: "", course: "", source: "website" });
      if (onSuccess) onSuccess(data);
      setTimeout(() => onClose(), 2500);
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Something went wrong" });
      if (onError) onError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    {
      name: "fullName",
      type: "text",
      label: "Full Name",
      placeholder: "Rahul Sharma",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "rahul@example.com",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone Number",
      placeholder: "98765 43210",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose} disabled={submitting} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Left accent strip */}
        <div className={styles.accentStrip} />

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div>
            <h2 className={styles.title}>Secure Your Spot</h2>
            <p className={styles.subtitle}>Join 5,000+ students already learning</p>
          </div>
        </div>

        {/* Progress dots */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: message.type === "success" ? "100%" : submitting ? "80%" : "40%" }} />
        </div>

        {/* Message */}
        {message.text && (
          <div className={`${styles.alert} ${message.type === "success" ? styles.alertSuccess : styles.alertError}`}>
            {message.type === "success" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            )}
            {message.text}
          </div>
        )}

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {fields.map((f, i) => (
            <div className={styles.fieldWrap} key={f.name} style={{ animationDelay: `${i * 0.06}s` }}>
              <label className={`${styles.label} ${focused === f.name || formData[f.name] ? styles.labelFloated : ""}`}>
                {f.label}
              </label>
              <div className={`${styles.inputBox} ${errors[f.name] ? styles.inputError : ""} ${focused === f.name ? styles.inputFocused : ""}`}>
                <span className={`${styles.inputIcon} ${focused === f.name ? styles.inputIconActive : ""}`}>{f.icon}</span>
                <input
                  type={f.type}
                  name={f.name}
                  value={formData[f.name]}
                  onChange={handleChange}
                  onFocus={() => setFocused(f.name)}
                  onBlur={() => setFocused(null)}
                  className={styles.input}
                  disabled={submitting}
                  placeholder={focused === f.name ? f.placeholder : ""}
                />
              </div>
              {errors[f.name] && <span className={styles.errorMsg}>{errors[f.name]}</span>}
            </div>
          ))}

          {/* Course Select */}
          <div className={styles.fieldWrap} style={{ animationDelay: "0.18s" }}>
            <label className={`${styles.label} ${focused === "course" || formData.course ? styles.labelFloated : ""}`}>
              Select Course
            </label>
            <div className={`${styles.inputBox} ${styles.selectBox} ${errors.course ? styles.inputError : ""} ${focused === "course" ? styles.inputFocused : ""}`}>
              <span className={`${styles.inputIcon} ${focused === "course" ? styles.inputIconActive : ""}`}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </span>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                onFocus={() => setFocused("course")}
                onBlur={() => setFocused(null)}
                className={styles.select}
                disabled={loadingCourses || submitting}
              >
                <option value="">{loadingCourses ? "Loading courses..." : "Choose your program"}</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title || course.name}
                  </option>
                ))}
              </select>
              <span className={styles.selectChevron}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </span>
            </div>
            {errors.course && <span className={styles.errorMsg}>{errors.course}</span>}
          </div>

          {/* Trust badges */}
          <div className={styles.trust}>
            {["🔒 Secure", "✅ No Spam", "🎓 Certified"].map((t) => (
              <span key={t} className={styles.trustBadge}>{t}</span>
            ))}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? (
              <span className={styles.btnLoader}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.spinIcon}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Registering…
              </span>
            ) : (
              <>
                Register Now
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer note */}
        <p className={styles.footerNote}>By registering, you agree to our <a href="#">Terms</a> & <a href="#">Privacy Policy</a></p>
      </div>
    </div>
  );
};

export default RegistrationPopUp;