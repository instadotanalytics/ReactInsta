import React, { useState } from "react";
import styles from "./FullTimeJobForm.module.css";
import { API_BASE_URL } from "../../../config/api.js"; // apna path adjust karo

const FullTimeJobForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.position.trim()) newErrors.position = "Position is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const nextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/fulltimejob/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("🎉 Application Submitted Successfully!");
        setStep(1);
        setFormData({
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
        setErrors({});
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("❌ Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.bannerSection}>
      <div className={styles.wrapper}>

        {/* LEFT CONTENT */}
        <div className={styles.leftContent}>
          <div className={styles.contentWrapper}>
            <h1 className={styles.title}>
              Build Your Career With Us <span className={styles.rocket}>🚀</span>
            </h1>
            <p className={styles.description}>
              Join our innovative team and work on cutting-edge projects.
              We value creativity, growth, and long-term success.
            </p>
            <ul className={styles.benefitsList}>
              <li className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                Competitive Salary
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                Growth Opportunities
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                Flexible Work Environment
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Apply Now</h2>

          {/* Step Indicator */}
          <div className={styles.stepIndicator}>
            <div className={styles.stepWrapper}>
              <div className={`${styles.stepCircle} ${step === 1 ? styles.active : ""} ${step > 1 ? styles.completed : ""}`}>
                {step > 1 ? "✓" : "1"}
              </div>
              <span className={styles.stepLabel}>Personal Info</span>
            </div>
            <div className={`${styles.line} ${step > 1 ? styles.active : ""}`}></div>
            <div className={styles.stepWrapper}>
              <div className={`${styles.stepCircle} ${step === 2 ? styles.active : ""}`}>2</div>
              <span className={styles.stepLabel}>Professional</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>

            {step === 1 && (
              <div className={styles.formStep}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.fullName ? styles.error : ""}`}
                    required
                  />
                  {errors.fullName && <span className={styles.errorMessage}>{errors.fullName}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.email ? styles.error : ""}`}
                    required
                  />
                  {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.phone ? styles.error : ""}`}
                    required
                  />
                  {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="position"
                    placeholder="Applying for Position"
                    value={formData.position}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.position ? styles.error : ""}`}
                    required
                  />
                  {errors.position && <span className={styles.errorMessage}>{errors.position}</span>}
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className={styles.nextButton}
                >
                  Next Step →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className={styles.formStep}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="qualification"
                    placeholder="Qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.qualification ? styles.error : ""}`}
                    required
                  />
                  {errors.qualification && <span className={styles.errorMessage}>{errors.qualification}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={`${styles.select} ${errors.experience ? styles.error : ""}`}
                    required
                  >
                    <option value="">Select Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="1 Year">1 Year</option>
                    <option value="2+ Years">2+ Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                  {errors.experience && <span className={styles.errorMessage}>{errors.experience}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="skills"
                    placeholder="Skills (React, Node, etc)"
                    value={formData.skills}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.skills ? styles.error : ""}`}
                    required
                  />
                  {errors.skills && <span className={styles.errorMessage}>{errors.skills}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="expectedSalary"
                    placeholder="Expected Salary (LPA)"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <textarea
                    name="additionalInfo"
                    placeholder="Tell us about yourself..."
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows="3"
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    onClick={prevStep}
                    className={styles.backButton}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>

      </div>
    </section>
  );
};

export default FullTimeJobForm;