import React, { useState } from "react";
import styles from "./CertificationApplyForm.module.css";
import { API_BASE_URL } from "../config/api.js"; // ✅ Global API config

const CertificationApplyForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    certification: "",
  });

  const [loading, setLoading] = useState(false);

  const certifications = [
    {
      id: "aws",
      name: "AWS Certification",
      title: "Become AWS Certified",
      description:
        "Master cloud computing with Amazon Web Services. Get certified as Solutions Architect, Developer, or SysOps Administrator.",
      benefits: [
        "✔ High Demand in Cloud Market",
        "✔ Average Salary: $130K+",
        "✔ Global Recognition",
        "✔ Hands-on Labs Included",
      ],
      color: "#FF9900",
      bgColor: "#fff4e5",
    },
    {
      id: "microsoft",
      name: "Microsoft Certification",
      title: "Become Microsoft Certified",
      description:
        "Master Microsoft technologies including Azure, Microsoft 365, Dynamics 365, and Power Platform.",
      benefits: [
        "✔ Official Exam Preparation",
        "✔ Industry Expert Trainers",
        "✔ Flexible Online Learning",
        "✔ Career Guidance & Support",
      ],
      color: "#0078d4",
      bgColor: "#e5f0fa",
    },
    {
      id: "ibm",
      name: "IBM Certification",
      title: "Become IBM Certified",
      description:
        "Gain expertise in IBM Cloud, AI, Data Science, and Enterprise Systems with professional certification.",
      benefits: [
        "✔ Enterprise-Grade Skills",
        "✔ AI & Cloud Specialization",
        "✔ IBM Badge Recognition",
        "✔ Global Network Access",
      ],
      color: "#052FAD",
      bgColor: "#e8ecf9",
    },
    {
      id: "redhat",
      name: "Red Hat Certification",
      title: "Become Red Hat Certified",
      description:
        "Master enterprise Linux, OpenShift, and Ansible automation with Red Hat's hands-on certification.",
      benefits: [
        "✔ Performance-Based Exams",
        "✔ Linux & Open Source Expert",
        "✔ Enterprise DevOps Ready",
        "✔ Valued by Top Companies",
      ],
      color: "#CC0000",
      bgColor: "#fee7e7",
    },
    {
      id: "custom",
      name: "Custom Program",
      title: "Custom Certification Program",
      description:
        "Tailor-made certification path based on your career goals and current skill level.",
      benefits: [
        "✔ Personalized Learning Path",
        "✔ One-on-One Mentoring",
        "✔ Flexible Timeline",
        "✔ Custom Project Portfolio",
      ],
      color: "#6B7280",
      bgColor: "#f3f4f6",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ API_BASE_URL se call ho raha hai — no localhost anywhere
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.certification) {
      alert("❌ Please select a certification program");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const selected = certifications.find(
        (c) => c.name === formData.certification
      );
      const certName = selected ? selected.name : "Certification";

      alert(
        `✅ Application Submitted Successfully!\n\nThank you ${formData.fullName} for applying.\nWe'll contact you soon about ${certName}.`
      );

      // Reset form
      setFormData({ fullName: "", email: "", phone: "", certification: "" });
    } catch (error) {
      console.error("Submission Error:", error);
      alert("❌ Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedCert = formData.certification
    ? certifications.find((c) => c.name === formData.certification)
    : null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* LEFT SIDE */}
        <div className={`${styles.left} ${!selectedCert ? styles.leftDefault : ""}`}>
          {selectedCert ? (
            <>
              <h2 style={{ color: selectedCert.color }}>{selectedCert.title}</h2>
              <p className={styles.description}>{selectedCert.description}</p>
              <div className={styles.benefitsWrapper}>
                <h4>Program Benefits:</h4>
                <ul className={styles.benefitsList}>
                  {selectedCert.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className={styles.defaultContent}>
              <div className={styles.defaultIcon}>🎓</div>
              <h2>Start Your Certification Journey</h2>
              <p className={styles.defaultDescription}>
                Select a certification program from the dropdown to view details.
              </p>
            </div>
          )}

          <div
            className={styles.highlightBox}
            style={{
              borderLeftColor: selectedCert ? selectedCert.color : "#0078d4",
            }}
          >
            <h4>Why Get Certified?</h4>
            <p>Certified professionals earn 25-40% higher salaries.</p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className={styles.right}>
          <h3>Apply for Certification</h3>
          <p className={styles.formSubtitle}>Fill the details to get started</p>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Select Certification *</label>
              <select
                name="certification"
                required
                value={formData.certification}
                onChange={handleChange}
              >
                <option value="">-- Choose a certification program --</option>
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
              style={{
                opacity: !formData.certification || loading ? 0.6 : 1,
                cursor: !formData.certification || loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>

          <p className={styles.terms}>
            By submitting, you agree to our Terms & Privacy Policy. We'll
            contact you within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CertificationApplyForm;