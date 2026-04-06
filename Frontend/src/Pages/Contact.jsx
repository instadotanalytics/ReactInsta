import React, { useState } from "react";
import styles from "./Contact.module.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Companypartners from "./Courses/Companypartners";
import ReviewSection from "./ReviewSection";
import FAQSection from "./FAQSection";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: "Our Location",
      value: "P13-14, Ground Floor, Metro Tower, Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      label: "Phone",
      value: "+91 6232685820\nMon–Sat: 10AM – 7PM",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: "Email",
      value: "info@instadotanalytics.com",
    },
  ];

  return (
    <>
      <Header />

      <div className={styles.page}>
        {/* Background decoration */}
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />

        <div className={styles.container}>
          {/* Hero Header */}
          <div className={styles.heroHeader}>
            <span className={styles.badge}>Get In Touch</span>
            <h1 className={styles.title}>
              Let's <em>Talk</em> About<br />Your Future
            </h1>
            <p className={styles.subtitle}>
              Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Main Grid */}
          <div className={styles.mainGrid}>
            {/* Left — Info */}
            <div className={styles.infoCol}>
              <div className={styles.infoInner}>
                <h2 className={styles.infoHeading}>Contact Information</h2>
                <p className={styles.infoDesc}>
                  Fill up the form and our team will get back to you within 24 hours.
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

                {/* Social Links */}
                <div className={styles.socials}>
                  {["LinkedIn", "Twitter", "Instagram"].map((s) => (
                    <a key={s} href="#" className={styles.socialBtn}>{s[0]}</a>
                  ))}
                </div>

                {/* Decorative dots */}
                <div className={styles.dotsGrid}>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <span key={i} className={styles.dot} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className={styles.formCol}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={`${styles.field} ${focused === "name" ? styles.fieldActive : ""}`}>
                    <label className={styles.fieldLabel}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={styles.fieldInput}
                      required
                      placeholder="Rahul Sharma"
                    />
                    <span className={styles.fieldLine} />
                  </div>

                  <div className={`${styles.field} ${focused === "email" ? styles.fieldActive : ""}`}>
                    <label className={styles.fieldLabel}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={styles.fieldInput}
                      required
                      placeholder="rahul@example.com"
                    />
                    <span className={styles.fieldLine} />
                  </div>
                </div>

                <div className={`${styles.field} ${focused === "phone" ? styles.fieldActive : ""}`}>
                  <label className={styles.fieldLabel}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                    className={styles.fieldInput}
                    required
                    placeholder="+91 98765 43210"
                  />
                  <span className={styles.fieldLine} />
                </div>

                <div className={`${styles.field} ${focused === "message" ? styles.fieldActive : ""}`}>
                  <label className={styles.fieldLabel}>Your Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className={`${styles.fieldInput} ${styles.fieldTextarea}`}
                    required
                    placeholder="Tell us about your query or what you'd like to learn..."
                  />
                  <span className={styles.fieldLine} />
                </div>

                {submitted && (
                  <div className={styles.successBox}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Message sent! We'll get back to you soon.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitBtn}
                >
                  {loading ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      Send Message
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className={styles.mapWrapper}>
            <div className={styles.mapHeader}>
              <h3 className={styles.mapTitle}>Find Us Here</h3>
              <p className={styles.mapSubtitle}>Visit our office in Vijay Nagar, Indore</p>
            </div>
            <div className={styles.mapFrame}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.9578356683155!2d75.89718498963744!3d22.75330334092318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396302ab01f137ed%3A0xd9ae82fbc59ab08a!2sP-9%2C%20Vijay%20Nagar%2C%20Scheme%20No%2054%2C%20Indore%2C%20Madhya%20Pradesh%20452010!5e0!3m2!1sen!2sin!4v1773321741083!5m2!1sen!2sin"
                width="100%"
                height="420"
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