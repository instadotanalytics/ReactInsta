import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedinIn,
  FaPodcast,
  FaLink,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
  FaChevronRight,
} from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Internship", path: "/career/internship" },
    { label: "Full Time Jobs", path: "/career/fulltime" },
    { label: "Placements", path: "/career/placement" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const certifications = [
    { label: "AWS Certification", path: "/certification/aws" },
    { label: "Microsoft Certification", path: "/certification/microsoft" },
    { label: "IBM Certification", path: "/certification/ibm" },
    { label: "Red Hat Certification", path: "/certification/redhat" },
    { label: "Custom Program", path: "/certification/custom" },
  ];

  const socials = [
    { icon: <FaInstagram />, href: "https://www.instagram.com/instadotanalytics/", label: "Instagram" },
    { icon: <FaLinkedinIn />, href: "https://in.linkedin.com/company/instadotanalytics", label: "LinkedIn" },
   
  ];

  return (
    <footer className={styles.footer}>
      {/* Top glow bar */}
      <div className={styles.glowBar} />

      <div className={styles.container}>
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <div className={styles.logoWrapper}>
            <img
              src="https://mllffozprx61.i.optimole.com/w:393/h:128/q:mauto/ig:avif/https://instadotanalytics.com/wp-content/uploads/2023/05/WhatsApp_Image_2024-07-11_at_15.57.22_70256fed-removebg-preview.png"
              alt="Insta Dot Analytics"
              className={styles.logoImage}
            />
          </div>
          <p className={styles.brandDesc}>
            Empowering your digital journey with cutting-edge analytics and
            innovative solutions. We turn data into actionable insights.
          </p>

          {/* Contact Info */}
          <ul className={styles.contactList}>
            <li>
              <FaMapMarkerAlt className={styles.contactIcon} />
              <span>P13-14, Metro Tower, Vijay Nagar, Indore[M.P.]
              </span>
            </li>
            <li>
              <FaEnvelope className={styles.contactIcon} />
              <a href="mailto:info@instadotanalytics.com">info@instadotanalytics.com</a>
            </li>
            <li>
              <FaPhoneAlt className={styles.contactIcon} />
              <a href="tel:+911234567890">+916232685820</a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className={styles.linksCol}>
          <h3 className={styles.colHeading}>
            <span className={styles.headingAccent} />
            Quick Links
          </h3>
          <ul className={styles.linkList}>
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className={styles.navLink}>
                  <FaChevronRight className={styles.linkArrow} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div className={styles.linksCol}>
          <h3 className={styles.colHeading}>
            <span className={styles.headingAccent} />
            Certifications
          </h3>
          <ul className={styles.linkList}>
            {certifications.map((cert) => (
              <li key={cert.path}>
                <Link to={cert.path} className={styles.navLink}>
                  <FaChevronRight className={styles.linkArrow} />
                  {cert.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div className={styles.socialCol}>
          <h3 className={styles.colHeading}>
            <span className={styles.headingAccent} />
            Follow Us
          </h3>
          <p className={styles.socialDesc}>
            Stay connected for the latest updates, job alerts, and placement
            success stories.
          </p>

          <div className={styles.socialGrid}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label={s.label}
              >
                <span className={styles.socialIcon}>{s.icon}</span>
                <span className={styles.socialLabel}>{s.label}</span>
              </a>
            ))}
          </div>

          {/* Newsletter mini CTA */}
          <div className={styles.newsletter}>
            <p className={styles.newsletterText}>Get career tips in your inbox</p>
            <Link to="/contact" className={styles.newsletterBtn}>
              Contact Us <FaArrowRight className={styles.btnArrow} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © {currentYear} Insta Dot Analytics. All rights reserved.
        </p>
        <div className={styles.legalLinks}>
          <a href="/privacy">Privacy Policy</a>
          <span className={styles.dot}>·</span>
          <a href="/terms">Terms of Service</a>
          <span className={styles.dot}>·</span>
          <a href="/faqs">FAQs</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;