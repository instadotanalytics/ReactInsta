import React, { useState } from "react";
import styles from "./InternshipForm.module.css";
import { API_BASE_URL } from "../../../config/api.js";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBook,
  FiAward,
  FiLayers,
  FiCalendar,
  FiCode,
  FiClock,
  FiMonitor,
  FiBriefcase,
  FiDollarSign,
  FiArrowRight,
  FiArrowLeft,
  FiSend
} from "react-icons/fi";

const InternshipForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [touched, setTouched] = useState({});
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
    setFormData({ ...formData, [name]: value });
    setTouched({ ...touched, [name]: true });
  };

  const handleNext = () => {
    if (validateStep()) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => setCurrentStep(currentStep - 1);

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

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email && formData.mobile && formData.city;
      case 2:
        return formData.college && formData.course && formData.branch && formData.currentYear && formData.skills;
      case 3:
        return formData.duration && formData.mode && formData.internshipType &&
          (formData.internshipType === "unpaid" || formData.expectedStipend);
      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/internships`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      alert(data.message);
      setFormData({
        fullName: "", email: "", mobile: "", city: "",
        college: "", course: "", branch: "", currentYear: "", skills: "",
        duration: "", mode: "", internshipType: "", expectedStipend: ""
      });
      setTouched({});
      setCurrentStep(1);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const FloatingField = ({ name, type = "text", label, icon: Icon }) => (
    <div className={styles.floatingGroup}>
      <span className={styles.fieldIcon} aria-hidden="true">
        <Icon size={16} />
      </span>
      <input
        type={type}
        name={name}
        id={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder=" "
        required
        className={styles.floatingInput}
        autoComplete="off"
      />
      <label htmlFor={name} className={styles.floatingLabel}>{label}</label>
    </div>
  );

  const SelectField = ({ name, label, icon: Icon, children }) => (
    <div className={styles.floatingGroup}>
      <span className={styles.fieldIcon} aria-hidden="true">
        <Icon size={16} />
      </span>
      <select
        name={name}
        id={name}
        value={formData[name]}
        onChange={handleChange}
        required
        className={`${styles.floatingInput} ${styles.floatingSelect} ${formData[name] ? styles.hasValue : ""}`}
      >
        {children}
      </select>
      <label htmlFor={name} className={`${styles.floatingLabel} ${formData[name] ? styles.labelUp : ""}`}>{label}</label>
    </div>
  );

  const steps = [
    { num: "01", label: "Personal" },
    { num: "02", label: "Academic" },
    { num: "03", label: "Preferences" }
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Background animated elements */}
      <div className={styles.bgOrb1} aria-hidden="true" />
      <div className={styles.bgOrb2} aria-hidden="true" />
      <div className={styles.bgOrb3} aria-hidden="true" />
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.scanLine} aria-hidden="true" />

      <div className={styles.layout}>
        {/* LEFT PANEL */}
        <div className={styles.leftPanel}>

          <h1 className={styles.headline}>
            Kickstart Your Career<br />
            with the{" "}
            <span className={styles.gradientText}>Perfect Internship.</span>
          </h1>

          <p className={styles.subtext}>
            Join thousands of students who've found their dream internships through our platform. Get real-world experience and launch your career.
          </p>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNum}>500+</span>
              <span className={styles.statLabel}>Hiring Partners</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>10K+</span>
              <span className={styles.statLabel}>Students Trained</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>95%</span>
              <span className={styles.statLabel}>Placement Rate</span>
            </div>
          </div>

          {/* Step progress cards */}
          <div className={styles.stepCards}>
            {steps.map((step, i) => {
              const stepNum = i + 1;
              const isActive = currentStep === stepNum;
              const isCompleted = isStepComplete(stepNum);
              const isPast = currentStep > stepNum;
              return (
                <div
                  key={step.num}
                  className={`${styles.stepCard}
                    ${isActive ? styles.stepCardActive : ""}
                    ${(isCompleted || isPast) ? styles.stepCardDone : ""}
                  `}
                >
                  <div className={styles.stepBullet}>
                    {isCompleted || isPast ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : step.num}
                  </div>
                  <span className={styles.stepLabel}>{step.label}</span>
                  
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.rightPanel}>
          <div className={styles.glassCard}>
            <div className={styles.cardTop}>
              <div className={styles.stepBadge}>STEP 0{currentStep} / 03</div>
              <h2 className={styles.cardTitle}>
                {currentStep === 1 && "Personal Info"}
                {currentStep === 2 && "Academic Portfolio"}
                {currentStep === 3 && "Preferences"}
              </h2>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.formBody} noValidate>
              {currentStep === 1 && (
                <div className={`${styles.fieldsGrid} ${styles.singleColumn}`} key="step1">
                  <FloatingField name="fullName" label="Full Name" icon={FiUser} />
                  <FloatingField name="email" type="email" label="Email Address" icon={FiMail} />
                  <FloatingField name="mobile" type="tel" label="Mobile Number" icon={FiPhone} />
                  <FloatingField name="city" label="Current City" icon={FiMapPin} />
                </div>
              )}

              {currentStep === 2 && (
                <div className={styles.fieldsGrid} key="step2">
                  <div className={styles.spanFull}>
                    <FloatingField name="college" label="College / University" icon={FiBook} />
                  </div>
                  <FloatingField name="course" label="Course (e.g. B.Tech, BCA)" icon={FiAward} />
                  <FloatingField name="branch" label="Specialization Branch" icon={FiLayers} />
                  <FloatingField name="currentYear" label="Current Academic Year" icon={FiCalendar} />
                  <div className={styles.spanFull}>
                    <FloatingField name="skills" label="Skills / Technical Proficiencies" icon={FiCode} />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className={styles.fieldsGrid} key="step3">
                  <SelectField name="duration" label="Target Duration" icon={FiClock}>
                    <option value=""></option>
                    <option value="1 Month">1 Month</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                  </SelectField>

                  <SelectField name="mode" label="Work Mode" icon={FiMonitor}>
                    <option value=""></option>
                    <option value="Remote">Remote</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                  </SelectField>

                  <div className={styles.spanFull}>
                    <SelectField name="internshipType" label="Internship Type" icon={FiBriefcase}>
                      <option value=""></option>
                      <option value="paid">Paid</option>
                      <option value="unpaid">Unpaid</option>
                      <option value="stipend">Stipend Based</option>
                    </SelectField>
                  </div>

                  {formData.internshipType && formData.internshipType !== "unpaid" && (
                    <div className={`${styles.spanFull} ${styles.slideDown}`}>
                      <FloatingField name="expectedStipend" type="number" label="Expected Monthly Stipend (₹)" icon={FiDollarSign} />
                    </div>
                  )}
                </div>
              )}

              <div className={styles.formFooter}>
                {currentStep > 1 && (
                  <button type="button" onClick={handleBack} className={styles.btnBack}>
                    <FiArrowLeft size={16} />
                    Back
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className={styles.btnNext}
                    disabled={!validateStep()}
                  >
                    Continue
                    <FiArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={styles.btnSubmit}
                    disabled={!validateStep()}
                  >
                    Submit Application
                    <FiSend size={15} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipForm;
