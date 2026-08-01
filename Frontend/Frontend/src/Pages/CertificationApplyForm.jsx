import React, { useState } from "react";
import styles from "./CertificationApplyForm.module.css";
import { API_BASE_URL } from "../config/api.js";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiSend,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";
import { MdSchool, MdWorkspacePremium } from "react-icons/md";
import { FaAws, FaMicrosoft } from "react-icons/fa";
import { SiRedhat } from "react-icons/si";
import { FaLaptopCode } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

const certifications = [
  {
    id: "aws",
    name: "AWS Certification",
    icon: <FaAws />,
  },
  {
    id: "microsoft",
    name: "Microsoft Certification",
    icon: <FaMicrosoft />,
  },
  {
    id: "ibm",
    name: "IBM Certification",
    icon: <FaLaptopCode />,
  },
  {
    id: "redhat",
    name: "Red Hat Certification",
    icon: <SiRedhat />,
  },
  {
    id: "custom",
    name: "Custom Program",
    icon: <BsStars />,
  },
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

  const selectedCert = formData.certification
    ? certifications.find((c) => c.name === formData.certification)
    : null;

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
      <div className={styles.container}>
        {/* ── LEFT PANEL ── */}
        <div className={styles.left}>
          <div className={styles.leftContent}>
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
                <div className={styles.iconCircle}>
                  <MdWorkspacePremium size={22} />
                </div>
                <div>
                  <h4>Industry Recognized</h4>
                  <p>Globally accepted certifications</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.iconCircle}>
                  <MdSchool size={22} />
                </div>
                <div>
                  <h4>Expert Mentors</h4>
                  <p>Learn from industry professionals</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.iconCircle}>
                  <FiTrendingUp size={20} />
                </div>
                <div>
                  <h4>Career Support</h4>
                  <p>Guidance for your career growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className={styles.right}>
          <div className={styles.formTop}>
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
                    {cert.name}
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
            <FiAward style={{ marginRight: "6px", verticalAlign: "middle" }} />
            By submitting, you agree to our
            Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </section>
  );
};

export default CertificationApplyForm;
