import React, { useState } from "react";
import styles from "./Contact.module.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Companypartners from "./Courses/Companypartners";
import ReviewSection from "./ReviewSection";
import FAQSection from "./FAQSection";
import { API_BASE_URL } from "../config/api.js";

import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiArrowRight,
  FiChevronDown,
  FiCheckCircle,
} from "react-icons/fi";
import { BsPatchCheck } from "react-icons/bs";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { RiMedalLine } from "react-icons/ri";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(
        "Unable to connect to server. Please check your internet connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMapPin size={20} />,
      label: "Our Location",
      value:
        "P13-14, Ground Floor, Metro Tower, Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh",
    },
    {
      icon: <FiPhone size={20} />,
      label: "Phone",
      value: "+91 6232685820  ·  Mon–Sat: 10AM – 7PM",
    },
    {
      icon: <FiMail size={20} />,
      label: "Email",
      value: "info@instadotanalytics.com",
    },
  ];

  const features = [
    {
      icon: <HiOutlineLightningBolt size={22} />,
      title: "Job-Focused Curriculum",
      desc: "Courses built around what top IT companies actually hire for — updated every quarter.",
    },
    {
      icon: <BsPatchCheck size={22} />,
      title: "Hands-On Projects",
      desc: "Build a portfolio of real-world capstone projects that genuinely impress recruiters.",
    },
    {
      icon: <RiMedalLine size={22} />,
      title: "Placement Support",
      desc: "Resume prep, mock interviews, and direct referrals to 150+ hiring partner companies.",
    },
  ];

  return (
    <>
      <Header />

      <div className={styles.page}>
        {/* ── Hero ── */}
        <div className={styles.heroHeader}>
          <div className={styles.heroInner}>
            {/* Badge */}
          

            {/* Title */}
            <h1 className={styles.title}>
              Build Your <span className={styles.accent}>Future</span>
              <br />
              With Industry-Ready Skills
            </h1>

            {/* Subtitle */}
            <p className={styles.subtitle}>
              Master Java Full Stack, React, Spring Boot, Node.js and more —
              through hands-on training crafted by industry experts to get you
              hired faster.
            </p>

            {/* Description */}
            <p className={styles.heroDesc}>
              Join thousands of students who transformed their careers with our
              structured programs, real-world capstone projects, and dedicated
              placement support. Our curriculum is built around what top
              companies actually look for — so you're job-ready from day one.
            </p>

            {/* Buttons */}
            <div className={styles.heroBtns}>
              <a href="/courses" className={styles.btnPrimary}>
                Explore Courses <FiArrowRight />
              </a>
            </div>

            {/* Feature Cards */}
            <div className={styles.featGrid}>
              {features.map((f, i) => (
                <div className={styles.featCard} key={i}>
                  <div className={styles.featIconBox}>{f.icon}</div>
                  <div className={styles.featTitle}>{f.title}</div>
                  <div className={styles.featDesc}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          {/* <div className={styles.scrollHint}>
            <span>Scroll down</span>
            <FiChevronDown className={styles.scrollArrow} size={18} />
          </div> */}
        </div>

        {/* ── Below Hero ── */}
        <div className={styles.container}>
          {/* Main Grid */}
          <div className={styles.mainGrid}>
            {/* Left — Info */}
            <div className={styles.infoCol}>
              <div className={styles.infoInner}>
                {/* watermark text */}
                <span className={styles.watermark}>CONTACT</span>

                <h2 className={styles.infoHeading}>Contact Information</h2>
                <p className={styles.infoDesc}>
                  Fill up the form and our team will get back to you within 24
                  hours.
                </p>

                <div className={styles.infoList}>
                  {contactInfo.map((item, i) => (
                    <div className={styles.infoItem} key={i}>
                      <div className={styles.infoIcon}>{item.icon}</div>
                      <div>
                        <p className={styles.infoLabel}>{item.label}</p>
                        <p className={styles.infoValue}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.dotsGrid}>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <span key={i} className={styles.dot} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className={styles.formCol}>
              <form className={styles.form} onSubmit={handleSubmit}>
                {submitted && (
                  <p className={styles.successMsg}>
                    <FiCheckCircle size={16} /> Message sent successfully!
                  </p>
                )}

                {error && <p className={styles.errorMsg}>{error}</p>}

                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.fieldInput}
                      placeholder=" "
                      required
                    />
                    <label className={styles.fieldLabel}>Full Name</label>
                  </div>

                  <div className={styles.field}>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.fieldInput}
                      placeholder=" "
                      required
                    />
                    <label className={styles.fieldLabel}>Phone Number</label>
                  </div>
                </div>

                <div className={styles.field}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.fieldInput}
                    placeholder=" "
                    required
                  />
                  <label className={styles.fieldLabel}>Email Address</label>
                </div>

                <div className={styles.field}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${styles.fieldInput} ${styles.fieldTextarea}`}
                    placeholder=" "
                    required
                  />
                  <label className={styles.fieldLabel}>Your Message</label>
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  <span>{loading ? "Sending..." : "Send Message "}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className={styles.mapWrapper}>
            <div className={styles.mapFrame}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.9578356683155!2d75.89718498963744!3d22.75330334092318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396302ab01f137ed%3A0xd9ae82fbc59ab08a!2sP-9%2C%20Vijay%20Nagar%2C%20Scheme%20No%2054%2C%20Indore%2C%20Madhya%20Pradesh%20452010!5e0!3m2!1sen!2sin!4v1773321741083!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>
          </div>
        </div>
      </div>

      <Companypartners />
      <ReviewSection />
      <FAQSection />
      <Footer />
    </>
  );
};

export default Contact;
