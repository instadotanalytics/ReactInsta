import React, { useState } from "react";
import styles from "./FullTimeJobForm.module.css";
import { API_BASE_URL } from "../../../config/api.js";

const FullTimeJobForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    qualification: "",
    experience: "",
    skills: "",
    expectedSalary: "",
    preferredLocation: "",
    additionalInfo: "",
  });

  const clearErrors = () => setErrors({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Must be 10 digits";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required";
    if (!formData.experience) newErrors.experience = "Please select experience";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const nextStep = () => {
    if (validateStep1()) { clearErrors(); setStep(2); }
  };

  const prevStep = () => {
    clearErrors();
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/fulltimejob/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "", email: "", phone: "", position: "",
      qualification: "", experience: "", skills: "",
      expectedSalary: "", preferredLocation: "", additionalInfo: "",
    });
    setErrors({});
    setStep(1);
    setSubmitted(false);
  };

  return (
    <section className={styles.bannerSection}>
      <div className={styles.wrapper}>

        {/* LEFT PANEL */}
        <div className={styles.leftContent}>
          <span className={styles.badge}>We're hiring</span>
          <h1 className={styles.title}>Build your career with us</h1>
          <p className={styles.description}>
            Join our team and work on projects that matter. We value creativity,
            growth, and long-term success.
          </p>
          <ul className={styles.benefitsList}>
            <li className={styles.benefitItem}>
              <span className={styles.checkIcon}>✓</span>
              Competitive salary package
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.checkIcon}>✓</span>
              Real growth opportunities
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.checkIcon}>✓</span>
              Flexible work environment
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.checkIcon}>✓</span>
              Health &amp; wellness benefits
            </li>
          </ul>
        </div>

        {/* RIGHT FORM */}
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Apply now</h2>

          {/* Step Indicator */}
          <div className={styles.stepIndicator}>
            <div className={styles.stepWrapper}>
              <div
                className={`${styles.stepCircle} ${step === 1 ? styles.active : ""} ${step > 1 ? styles.completed : ""}`}
              >
                {step > 1 ? "✓" : "1"}
              </div>
              <span className={styles.stepLabel}>Personal</span>
            </div>
            <div className={`${styles.line} ${step > 1 ? styles.active : ""}`} />
            <div className={styles.stepWrapper}>
              <div className={`${styles.stepCircle} ${step === 2 ? styles.active : ""}`}>
                2
              </div>
              <span className={styles.stepLabel}>Professional</span>
            </div>
          </div>

          {/* Success State */}
          {submitted ? (
            <div className={styles.successBox}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>Application submitted!</h3>
              <p className={styles.successText}>
                We've received your application and will be in touch within 3–5 business days.
              </p>
              <button className={styles.nextButton} onClick={resetForm}>
                Apply again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>

              {/* STEP 1 */}
              {step === 1 && (
                <div className={styles.formStep}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Full name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.fullName ? styles.error : ""}`}
                    />
                    {errors.fullName && <span className={styles.errorMessage}>{errors.fullName}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Email address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.email ? styles.error : ""}`}
                    />
                    {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Phone number</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.phone ? styles.error : ""}`}
                    />
                    {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Position applying for</label>
                    <input
                      type="text"
                      name="position"
                      placeholder="e.g. Frontend Developer"
                      value={formData.position}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.position ? styles.error : ""}`}
                    />
                    {errors.position && <span className={styles.errorMessage}>{errors.position}</span>}
                  </div>

                  <button type="button" onClick={nextStep} className={styles.nextButton}>
                    Next step →
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className={styles.formStep}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Highest qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      placeholder="e.g. B.Tech Computer Science"
                      value={formData.qualification}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.qualification ? styles.error : ""}`}
                    />
                    {errors.qualification && <span className={styles.errorMessage}>{errors.qualification}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Years of experience</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className={`${styles.select} ${errors.experience ? styles.error : ""}`}
                    >
                      <option value="">Select experience</option>
                      <option value="Fresher">Fresher</option>
                      <option value="1 Year">1 year</option>
                      <option value="2+ Years">2+ years</option>
                      <option value="5+ Years">5+ years</option>
                    </select>
                    {errors.experience && <span className={styles.errorMessage}>{errors.experience}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Key skills</label>
                    <input
                      type="text"
                      name="skills"
                      placeholder="React, Node.js, etc."
                      value={formData.skills}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.skills ? styles.error : ""}`}
                    />
                    {errors.skills && <span className={styles.errorMessage}>{errors.skills}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      Expected salary (LPA){" "}
                      <span className={styles.optional}>optional</span>
                    </label>
                    <input
                      type="text"
                      name="expectedSalary"
                      placeholder="e.g. 8"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      About yourself{" "}
                      <span className={styles.optional}>optional</span>
                    </label>
                    <textarea
                      name="additionalInfo"
                      placeholder="A quick intro about your background..."
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows="3"
                      className={styles.textarea}
                    />
                  </div>

                  <div className={styles.buttonGroup}>
                    <button type="button" onClick={prevStep} className={styles.backButton}>
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting…" : "Submit application"}
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default FullTimeJobForm; 