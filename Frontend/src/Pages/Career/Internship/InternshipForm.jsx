import React, { useState } from "react";
import styles from "./InternshipForm.module.css";
import { API_BASE_URL } from "../../../config/api.js";

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

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainCard}>
        
        {/* Left Side: Editorial Content Area */}
        <div className={styles.leftPanel}>
          <div className={styles.promoBadge}>
            <span className={styles.badgePulse}></span>
            Kickstart Your Career with the Perfect Internship →
          </div>
          <h1 className={styles.mainTitle}>
            Join thousands of students who have found their dream internships <span>through our platform.</span>
          </h1>
          <p className={styles.mainSubtitle}>
            Get hands-on experience and launch your career.
          </p>

          {/* Quick Option Grid matching the layout buttons of your image */}
          <div className={styles.optionGrid}>
            <div className={`${styles.optionItem} ${currentStep === 1 ? styles.optionActive : ""}`}>
              <div className={styles.checkboxIndicator}></div>
              <span> Personal</span>
            </div>
            <div className={`${styles.optionItem} ${currentStep === 2 ? styles.optionActive : ""}`}>
              <div className={styles.checkboxIndicator}></div>
              <span> Education </span>
            </div>
            <div className={`${styles.optionItem} ${currentStep === 3 ? styles.optionActive : ""}`}>
              <div className={styles.checkboxIndicator}></div>
              <span>Preferences</span>
            </div>
          </div>
        </div>

        {/* Right Side: Floating Interactive Card Form Area */}
        <div className={styles.rightPanel}>
          <div className={styles.glassCard}>

            {/* Stepper Headers */}
            <div className={styles.formHeader}>
              <div className={styles.stepCounter}>STEP 0{currentStep} / 03</div>
              <h2 className={styles.stepHeadline}>
                {currentStep === 1 && "Personal Registry"}
                {currentStep === 2 && "Academic Portfolio"}
                {currentStep === 3 && "Final Placement Terms"}
              </h2>
            </div>

            {/* Step Content Renderers */}
            <form onSubmit={handleSubmit} className={styles.formElement}>
              {currentStep === 1 && (
                <div className={styles.stepWrapper}>
                  <div className={styles.inputGroup}>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className={styles.premiumInput} />
                  </div>
                  <div className={styles.inputGroup}>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className={styles.premiumInput} />
                  </div>
                  <div className={styles.inputGroup}>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" required className={styles.premiumInput} />
                  </div>
                  <div className={styles.inputGroup}>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Current City" required className={styles.premiumInput} />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className={styles.stepWrapper}>
                  <div className={styles.inputGroup}>
                    <input type="text" name="college" value={formData.college} onChange={handleChange} placeholder="College / University Name" required className={styles.premiumInput} />
                  </div>
                  <div className={styles.inputGroup}>
                    <input type="text" name="course" value={formData.course} onChange={handleChange} placeholder="Course Track (e.g. B.Tech, BCA)" required className={styles.premiumInput} />
                  </div>
                  <div className={styles.inputGroup}>
                    <input type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="Specialization Branch" required className={styles.premiumInput} />
                  </div>
                  <div className={styles.inputGroup}>
                    <input type="text" name="currentYear" value={formData.currentYear} onChange={handleChange} placeholder="Current Academic Year" required className={styles.premiumInput} />
                  </div>
                  <div className={`${styles.inputGroup} ${styles.spanAll}`}>
                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills / Core Technical Proficiencies" required className={styles.premiumInput} />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className={styles.stepWrapper}>
                  <div className={styles.inputGroup}>
                    <select name="duration" value={formData.duration} onChange={handleChange} required className={styles.premiumSelect}>
                      <option value="">Select Target Duration</option>
                      <option value="1 Month">1 Month Fast-track</option>
                      <option value="3 Months">3 Months Full Quarter</option>
                      <option value="6 Months">6 Months Extended Internship</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <select name="mode" value={formData.mode} onChange={handleChange} required className={styles.premiumSelect}>
                      <option value="">Select Workflow Mode</option>
                      <option value="Remote">Remote Operations</option>
                      <option value="Onsite">Onsite Placement</option>
                      <option value="Hybrid">Hybrid Schedule</option>
                    </select>
                  </div>
                  <div className={`${styles.inputGroup} ${formData.internshipType === "unpaid" ? "" : styles.spanAll}`}>
                    <select name="internshipType" value={formData.internshipType} onChange={handleChange} required className={styles.premiumSelect}>
                      <option value="">Compensation Type</option>
                      <option value="paid">Paid Contract</option>
                      <option value="unpaid">Unpaid Internship</option>
                      <option value="stipend">Performance Stipend Based</option>
                    </select>
                  </div>

                  {formData.internshipType !== "unpaid" && formData.internshipType !== "" && (
                    <div className={`${styles.inputGroup} ${styles.spanAll} ${styles.stipendAnimate}`}>
                      <input type="number" name="expectedStipend" value={formData.expectedStipend} onChange={handleChange} placeholder="Expected Monthly Stipend (₹)" className={styles.premiumInput} />
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons Container */}
              <div className={styles.footerNavigation}>
                {currentStep > 1 && (
                  <button type="button" onClick={handleBack} className={styles.buttonSecondary}>
                    Go Back
                  </button>
                )}
                {currentStep < 3 ? (
                  <button type="button" onClick={handleNext} className={styles.buttonPrimary}>
                    Continue Forward
                  </button>
                ) : (
                  <button type="submit" className={styles.buttonSubmit}>
                    Finalize Application
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