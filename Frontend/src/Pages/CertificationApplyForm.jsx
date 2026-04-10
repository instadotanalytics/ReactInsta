import React, { useState } from "react";
import styles from "./CertificationApplyForm.module.css";
import { API_BASE_URL } from "../config/api.js";

const certifications = [
  {
    id: "aws",
    name: "AWS Certification",
    title: "Become AWS Certified",
    description:
      "Master cloud computing with Amazon Web Services and get certified as a Solutions Architect, Developer, or SysOps Administrator. Validate your expertise in designing scalable, secure, and reliable cloud infrastructure.",
    benefits: [
      "High Demand in Cloud Market",
      "Average Salary: $130K+",
      "Global Industry Recognition",
      "Hands-on Labs & Practice Exams",
    ],
    color: "#FF9900",
  },
  {
    id: "microsoft",
    name: "Microsoft Certification",
    title: "Become Microsoft Certified",
    description:
      "Master Microsoft technologies including Azure, Microsoft 365, Dynamics 365, and Power Platform. Build skills that are recognized by organizations worldwide and open doors to high-value enterprise roles.",
    benefits: [
      "Official Exam Preparation",
      "Industry Expert Trainers",
      "Flexible Online Learning",
      "Career Guidance & Support",
    ],
    color: "#0078d4",
  },
  {
    id: "ibm",
    name: "IBM Certification",
    title: "Become IBM Certified",
    description:
      "Gain enterprise-level expertise in IBM Cloud, AI, Data Science, and enterprise systems. Earn an IBM digital badge recognized across Fortune 500 companies and technology-led organizations worldwide.",
    benefits: [
      "Enterprise-Grade Skill Set",
      "AI & Cloud Specialization",
      "IBM Digital Badge Recognition",
      "Access to Global IBM Network",
    ],
    color: "#052FAD",
  },
  {
    id: "redhat",
    name: "Red Hat Certification",
    title: "Become Red Hat Certified",
    description:
      "Master enterprise Linux, OpenShift container orchestration, and Ansible automation with Red Hat's performance-based certification program. Prove your skills with real-world, hands-on exams.",
    benefits: [
      "Performance-Based Exams",
      "Linux & Open Source Expert",
      "Enterprise DevOps Ready",
      "Valued by Top Companies",
    ],
    color: "#CC0000",
  },
  {
    id: "custom",
    name: "Custom Program",
    title: "Custom Certification Program",
    description:
      "Design your own certification journey tailored to your career goals, current skill level, and schedule. Get one-on-one mentoring from industry experts who guide you every step of the way.",
    benefits: [
      "Personalized Learning Path",
      "One-on-One Expert Mentoring",
      "Flexible & Self-Paced Timeline",
      "Custom Project Portfolio",
    ],
    color: "#6B7280",
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

  const selectedCert = formData.certification
    ? certifications.find((c) => c.name === formData.certification)
    : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.certification) {
      alert("Please select a certification program before submitting.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();

      const certName = selectedCert?.name ?? "Certification";

      alert(
        `Application Submitted!\n\nThank you, ${formData.fullName}. We'll be in touch shortly about your ${certName} enrollment.`
      );

      setFormData({ fullName: "", email: "", phone: "", certification: "" });
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to submit your application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── LEFT PANEL ── */}
        <div className={`${styles.left} ${!selectedCert ? styles.leftDefault : ""}`}>
          {selectedCert ? (
            <>
              <div>
                <h2 style={{ color: selectedCert.color }}>{selectedCert.title}</h2>
                <p className={styles.description}>{selectedCert.description}</p>
              </div>

              <div className={styles.benefitsWrapper}>
                <h4>Program Benefits</h4>
                <ul className={styles.benefitsList}>
                  {selectedCert.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className={styles.defaultContent}>
              <div className={styles.defaultIcon}>🎓</div>
              <h2>Start Your Certification Journey</h2>
              <p className={styles.defaultDescription}>
                Select a program from the dropdown to explore its benefits, curriculum, and career outcomes.
              </p>
            </div>
          )}

          <div
            className={styles.highlightBox}
            style={{
              borderLeftColor: selectedCert ? selectedCert.color : "#818cf8",
            }}
          >
            <h4>Did You Know?</h4>
            <p>
              Certified professionals earn 25–40% higher salaries and are 2× more likely to be promoted within 12 months.
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className={styles.right}>
          <h3>Apply for Certification</h3>
          <p className={styles.formSubtitle}>
            Fill in your details below and our team will reach out within 24 hours.
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="e.g. Rahul Sharma"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="rahul@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="certification">Certification Program</label>
              <select
                id="certification"
                name="certification"
                required
                value={formData.certification}
                onChange={handleChange}
              >
                <option value="">Choose a certification program</option>
                {certifications.map((cert) => (
                  <option key={cert.id} value={cert.name}>
                    {cert.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!formData.certification || loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>

          <p className={styles.terms}>
            By submitting, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

      </div>
    </section>
  );
};

export default CertificationApplyForm;