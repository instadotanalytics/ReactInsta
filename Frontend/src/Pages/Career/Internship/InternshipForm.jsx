import React, { useState } from "react";
import styles from "./InternshipForm.module.css";
import { API_BASE_URL } from "../../../config/api.js"; // apna path adjust karo

const InternshipForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    college: "",
    course: "",
    branch: "",
    currentYear: "",
    skills: "",
    duration: "",
    mode: "",
    internshipType: "",
    expectedStipend: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email && formData.mobile && formData.city;
      case 2:
        return formData.college && formData.course && formData.branch && formData.currentYear && formData.skills;
      case 3:
        return formData.duration && formData.mode && formData.internshipType &&
          (formData.internshipType === "unpaid" || formData.expectedStipend);
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/internships`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message);

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        city: "",
        college: "",
        course: "",
        branch: "",
        currentYear: "",
        skills: "",
        duration: "",
        mode: "",
        internshipType: "",
        expectedStipend: ""
      });
      setCurrentStep(1);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Personal Information</h3>
            <div className={styles.formGrid}>
              <input
                className={styles.input}
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
              <input
                className={styles.input}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />
              <input
                className={styles.input}
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                required
              />
              <input
                className={styles.input}
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Educational Details</h3>
            <div className={styles.formGrid}>
              <input
                className={styles.input}
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="College Name"
                required
              />
              <input
                className={styles.input}
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Course (e.g., B.Tech, BCA)"
                required
              />
              <input
                className={styles.input}
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="Branch/Specialization"
                required
              />
              <input
                className={styles.input}
                name="currentYear"
                value={formData.currentYear}
                onChange={handleChange}
                placeholder="Current Year"
                required
              />
              <input
                className={styles.input}
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Skills (comma separated)"
                required
                style={{ gridColumn: "span 2" }}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Internship Preferences</h3>
            <div className={styles.formGrid}>
              <select
                className={styles.select}
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              >
                <option value="">Select Duration</option>
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
              </select>

              <select
                className={styles.select}
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                required
              >
                <option value="">Select Mode</option>
                <option value="Remote">Remote</option>
                <option value="Onsite">Onsite</option>
                <option value="Hybrid">Hybrid</option>
              </select>

              <select
                className={styles.select}
                name="internshipType"
                value={formData.internshipType}
                onChange={handleChange}
                required
              >
                <option value="">Internship Type</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="stipend">Stipend Based</option>
              </select>

              {formData.internshipType !== "unpaid" && formData.internshipType !== "" && (
                <div className={styles.stipendInput}>
                  <input
                    className={styles.input}
                    type="number"
                    name="expectedStipend"
                    value={formData.expectedStipend}
                    onChange={handleChange}
                    placeholder="Expected Stipend (₹)"
                  />
                </div>
              )}
            </div>

            {/* Review Section */}
            <div className={styles.reviewSection}>
              <h4 style={{ marginBottom: "15px", color: "#333" }}>Review Your Application</h4>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Name:</span>
                <span className={styles.reviewValue}>{formData.fullName || "Not provided"}</span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Email:</span>
                <span className={styles.reviewValue}>{formData.email || "Not provided"}</span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>College:</span>
                <span className={styles.reviewValue}>{formData.college || "Not provided"}</span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Course:</span>
                <span className={styles.reviewValue}>{formData.course || "Not provided"}</span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Duration:</span>
                <span className={styles.reviewValue}>{formData.duration || "Not selected"}</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Content Section */}
      <div className={styles.leftContent}>
        <h1 className={styles.title}>
          Kickstart Your Career with the Perfect Internship
        </h1>
        <p className={styles.subtitle}>
          Join thousands of students who have found their dream internships
          through our platform. Get hands-on experience and launch your career.
        </p>

        <ul className={styles.features}>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>🎯</span>
            <span className={styles.featureText}>
              <strong>Personalized Matches</strong>
              Get internships tailored to your skills
            </span>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>🏢</span>
            <span className={styles.featureText}>
              <strong>Top Companies</strong>
              Work with leading companies worldwide
            </span>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>💼</span>
            <span className={styles.featureText}>
              <strong>Paid Opportunities</strong>
              Earn while you learn
            </span>
          </li>
        </ul>
      </div>

      {/* Right Form Section */}
      <div className={styles.rightForm}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Apply for Internship</h2>
          <p className={styles.formSubtitle}>
            Step {currentStep} of 3 - {currentStep === 1 ? "Personal Info" : currentStep === 2 ? "Education" : "Preferences"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          <div className={styles.progressSteps}>
            <span className={currentStep >= 1 ? styles.stepActive : ""}>
              <span className={styles.stepDot} /> Personal
            </span>
            <span className={currentStep >= 2 ? styles.stepActive : ""}>
              <span className={styles.stepDot} /> Education
            </span>
            <span className={currentStep >= 3 ? styles.stepActive : ""}>
              <span className={styles.stepDot} /> Preferences
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {renderStep()}

          <div className={styles.buttonGroup}>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className={styles.backButton}
              >
                Back
              </button>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className={styles.nextButton}
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className={styles.submitButton}
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternshipForm;