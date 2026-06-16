import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBookOpen,
  FaChevronDown,
  FaCheck,
  FaExclamationCircle,
  FaTimes,
  FaSpinner,
  FaArrowRight,
  FaGraduationCap,
  FaCheckCircle,
  FaLock
} from "react-icons/fa";
import styles from "./RegistrationPopUp.module.css";
import { API_BASE_URL } from "../../config/api";

const RegistrationPopUp = ({ onClose, onSuccess, onError }) => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

      setMessage({ type: "success", text: "You're registered! We'll reach out soon." });
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
      icon: <FaUser size={17} />,
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "rahul@example.com",
      icon: <FaEnvelope size={17} />,
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone Number",
      placeholder: "98765 43210",
      icon: <FaPhone size={17} />,
    },
  ];

  const features = [
    "Industry-aligned curriculum",
    "Live mentor support",
    "Certificate on completion",
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose} disabled={submitting} aria-label="Close">
          <FaTimes size={16} />
        </button>

        {/* Left visual panel — hidden on mobile */}
        <div className={styles.visualPanel}>
          <div className={styles.visualPattern} aria-hidden="true" />
          <FaGraduationCap className={styles.visualWatermark} aria-hidden="true" />

          <div className={styles.visualContent}>
            <span className={styles.eyebrow}>Cohort Enrollment</span>
            <h3 className={styles.visualHeadline}>Your seat is waiting.</h3>
            <p className={styles.visualSub}>
              Join a fast-growing learner community and start building real
              skills this week.
            </p>

            <div className={styles.statBlock}>
              <span className={styles.statNumber}>5,000+</span>
              <span className={styles.statLabel}>students already learning</span>
            </div>

            <ul className={styles.featureList}>
              {features.map((f) => (
                <li key={f}>
                  <FaCheckCircle size={16} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.avatarRow}>
            <div className={styles.avatarGroup}>
              <span className={styles.avatar}>RS</span>
              <span className={styles.avatar}>AP</span>
              <span className={styles.avatar}>MK</span>
            </div>
            <span className={styles.avatarNote}>Trusted by learners nationwide</span>
          </div>
        </div>

        {/* Right form panel */}
        <div className={styles.formPanel}>
          <div className={styles.header}>
            <div className={styles.headerIcon}>
              <FaGraduationCap size={24} />
            </div>
            <div>
              <h2 className={styles.title}>Secure Your Spot</h2>
              <p className={styles.subtitle}>Fill in your details to get started</p>
            </div>
          </div>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: message.type === "success" ? "100%" : submitting ? "80%" : "40%" }}
            />
          </div>

          {message.text && (
            <div className={`${styles.alert} ${message.type === "success" ? styles.alertSuccess : styles.alertError}`}>
              {message.type === "success" ? (
                <FaCheck size={18} />
              ) : (
                <FaExclamationCircle size={18} />
              )}
              {message.text}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {fields.map((f, i) => (
              <div className={styles.fieldWrap} key={f.name} style={{ animationDelay: `${i * 0.06}s` }}>
                <label className={`${styles.label} ${focused === f.name || formData[f.name] ? styles.labelFloated : ""}`}>
                  {f.label}
                </label>
                <div className={`${styles.inputBox} ${errors[f.name] ? styles.inputError : ""} ${focused === f.name ? styles.inputFocused : ""}`}>
                  <span className={`${styles.inputIcon} ${focused === f.name ? styles.inputIconActive : ""}`}>
                    {f.icon}
                  </span>
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
                  <FaBookOpen size={17} />
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
                  <FaChevronDown size={16} />
                </span>
              </div>
              {errors.course && <span className={styles.errorMsg}>{errors.course}</span>}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? (
                <span className={styles.btnLoader}>
                  <FaSpinner size={20} className={styles.spinIcon} />
                  Registering…
                </span>
              ) : (
                <>
                  Register Now
                  <FaArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className={styles.footerNote}>
            <FaLock size={12} />
            Your details are kept private. By registering, you agree to our{" "}
          
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPopUp;