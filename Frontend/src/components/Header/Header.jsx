import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { IoBookSharp } from "react-icons/io5";
import { GiStairsGoal } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import {
  FaHome,
  FaBars,
  FaTimes,
  FaWhatsapp,
  FaPhoneAlt,
  FaUserPlus,
  FaBriefcase,
  FaLaptopCode,
  FaUserTie,
  FaGraduationCap,
  FaRocket,
  FaBuilding,
  FaMicrosoft,
  FaAws,
} from "react-icons/fa";
import { FaRedhat } from "react-icons/fa";
import { SiBmcsoftware } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { SiCoursera } from "react-icons/si";
import RegistrationPopUp from "./RegistrationPopUp";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [careerDropdownOpen, setCareerDropdownOpen] = useState(false);
  const [certificationDropdownOpen, setCertificationDropdownOpen] = useState(false);
  const [activeCareerItem, setActiveCareerItem] = useState("internship");
  const [activeCertificationItem, setActiveCertificationItem] = useState("microsoft");

  const navigate = useNavigate();
  const menuRef = useRef();
  const careerDropdownRef = useRef();
  const certificationDropdownRef = useRef();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        careerDropdownRef.current &&
        !careerDropdownRef.current.contains(event.target)
      ) {
        setCareerDropdownOpen(false);
      }
      if (
        certificationDropdownRef.current &&
        !certificationDropdownRef.current.contains(event.target)
      ) {
        setCertificationDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRegisterClick = () => {
    setShowRegistration(true);
    setMobileMenuOpen(false);
  };

  const handleCloseRegistration = () => setShowRegistration(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setCareerDropdownOpen(false);
    setCertificationDropdownOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    setCareerDropdownOpen(false);
    setCertificationDropdownOpen(false);
  };

  const careerItems = [
    {
      id: "internship",
      title: "Internship",
      desc: "Gain practical experience",
      icon: <FaLaptopCode />,
      path: "/career/internship",
      image:
        "https://i.pinimg.com/736x/f3/84/a6/f384a6683b3c91e409ca0b7b4df43173.jpg",
      features: ["Hands-on training", "Industry projects", "Mentorship"],
    },
    {
      id: "placement",
      title: "Placement",
      desc: "Get placed in top companies",
      icon: <FaBuilding />,
      path: "/career/placement",
      image:
        "https://i.pinimg.com/1200x/ab/44/70/ab44700476c8bf1332ec326d290e8ec7.jpg",
      features: ["100% placement support", "Top MNCs", "Interview prep"],
    },
    {
      id: "fulltime",
      title: "Full Time Job",
      desc: "Start your professional journey",
      icon: <FaUserTie />,
      path: "/career/fulltime",
      image:
        "https://i.pinimg.com/736x/45/a5/c6/45a5c66ba7c17cd03c0e7f833f547878.jpg",
      features: ["Dream company", "Growth opportunities", "Global exposure"],
    },
  ];

  const certificationItems = [
    {
      id: "microsoft",
      title: "Microsoft",
      desc: "Microsoft Certified Professional",
      icon: <FaMicrosoft />,
      path: "/certification/microsoft",
      image:
        "https://i.pinimg.com/1200x/81/23/cd/8123cdbabacaa7cd0748f2a45cd69c66.jpg",
      features: ["Azure certifications", "Microsoft 365", "Dynamics 365"],
    },
    {
      id: "ibm",
      title: "IBM",
      desc: "IBM Professional Certification",
      icon: <SiBmcsoftware />,
      path: "/certification/ibm",
      image:
        "https://i.pinimg.com/1200x/d5/2d/3c/d52d3cb8b9490cc38295052352da7cbd.jpg",
      features: ["Data Science", "Cloud Computing", "AI & ML"],
    },
    {
      id: "aws",
      title: "AWS",
      desc: "Amazon Web Services Certification",
      icon: <FaAws />,
      path: "/certification/aws",
      image:
        "https://i.pinimg.com/1200x/e8/96/25/e89625b8b225969fab294a3dda380399.jpg",
      features: ["Solutions Architect", "Developer", "DevOps Engineer"],
    },
    {
      id: "redhat",
      title: "RedHat",
      desc: "RedHat Certified Engineer",
      icon: <FaRedhat />,
      path: "/certification/redhat",
      image:
        "https://i.pinimg.com/736x/6e/18/05/6e18057e5050f4254b1e34e16f1ac4ac.jpg",
      features: ["RHCSA", "RHCE", "OpenShift"],
    },
    {
      id: "custom",
      title: "Custom",
      desc: "Custom Certification Programs",
      icon: <SiCoursera />,
      path: "/certification/custom",
      image:
        "https://i.pinimg.com/736x/4c/a4/73/4ca4732a3a3ba06a36bc8fea1aefad50.jpg",
      features: ["Tailored programs", "Industry specific", "Flexible learning"],
    },
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container} ref={menuRef}>
          {/* ── Logo ── */}
          <div className={styles.logo} onClick={() => handleNavigation("/")}>
            <img
              src="https://mllffozprx61.i.optimole.com/w:393/h:128/q:mauto/ig:avif/https://instadotanalytics.com/wp-content/uploads/2023/05/WhatsApp_Image_2024-07-11_at_15.57.22_70256fed-removebg-preview.png"
              alt="InstaDot Analytics"
            />
          </div>

          {/* ── Desktop Nav ── */}
          <nav className={styles.navDesktop}>
            <ul className={styles.navList}>
              {/* Home */}
              <li className={styles.navItem}>
                <Link to="/" onClick={handleLinkClick}>
                  <FaHome className={styles.navIcon} /> Home
                </Link>
              </li>

              {/* Courses — simple link, no dropdown */}
              <li className={styles.navItem}>
                <Link to="/courses" onClick={handleLinkClick}>
                  <IoBookSharp className={styles.navIcon} /> Courses
                </Link>
              </li>

              {/* ── Certification Dropdown ── */}
              <li
                className={`${styles.navItem} ${styles.dropdownContainer}`}
                onMouseEnter={() => {
                  setCertificationDropdownOpen(true);
                  setCareerDropdownOpen(false);
                }}
                onMouseLeave={() => setCertificationDropdownOpen(false)}
                ref={certificationDropdownRef}
              >
                <button className={styles.dropdownTrigger}>
                  <FaGraduationCap className={styles.navIcon} />
                  Certification
                  <span
                    className={`${styles.dropdownArrow} ${
                      certificationDropdownOpen ? styles.arrowOpen : ""
                    }`}
                  >
                    <IoIosArrowDown />
                  </span>
                </button>

                {/* Dropdown Panel — lives inside the li so position:absolute works correctly */}
                <div
                  className={`${styles.megaDropdown} ${
                    certificationDropdownOpen ? styles.megaDropdownOpen : ""
                  }`}
                >
                  <div className={styles.dropdownContent}>
                    {/* Left — category list */}
                    <div className={styles.dropdownCategories}>
                      <h3 className={styles.dropdownTitle}>
                        <FaGraduationCap className={styles.titleIcon} />
                        Certifications
                      </h3>
                      {certificationItems.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={handleLinkClick}
                          className={`${styles.dropdownCategoryItem} ${
                            activeCertificationItem === item.id
                              ? styles.activeItem
                              : ""
                          }`}
                          onMouseEnter={() =>
                            setActiveCertificationItem(item.id)
                          }
                        >
                          <span className={styles.categoryIcon}>
                            {item.icon}
                          </span>
                          <div className={styles.categoryText}>
                            <span className={styles.categoryTitle}>
                              {item.title}
                            </span>
                            <span className={styles.categoryDesc}>
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Right — preview */}
                    <div className={styles.dropdownPreview}>
                      {certificationItems.map(
                        (item) =>
                          activeCertificationItem === item.id && (
                            <div key={item.id} className={styles.previewContent}>
                              <div className={styles.previewImageContainer}>
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className={styles.previewImage}
                                />
                                <div className={styles.imageOverlay} />
                              </div>
                              <div className={styles.previewDetails}>
                                <h4 className={styles.previewTitle}>
                                  {item.title} Certification
                                </h4>
                                <p className={styles.previewDesc}>{item.desc}</p>
                                <ul className={styles.featureList}>
                                  {item.features.map((f, i) => (
                                    <li key={i} className={styles.featureItem}>
                                      <FaRocket className={styles.featureIcon} />
                                      {f}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </li>

              {/* ── Career Dropdown ── */}
              <li
                className={`${styles.navItem} ${styles.dropdownContainer}`}
                onMouseEnter={() => {
                  setCareerDropdownOpen(true);
                  setCertificationDropdownOpen(false);
                }}
                onMouseLeave={() => setCareerDropdownOpen(false)}
                ref={careerDropdownRef}
              >
                <button className={styles.dropdownTrigger}>
                  <GiStairsGoal className={styles.navIcon} />
                  Career
                  <span
                    className={`${styles.dropdownArrow} ${
                      careerDropdownOpen ? styles.arrowOpen : ""
                    }`}
                  >
                    <IoIosArrowDown />
                  </span>
                </button>

                <div
                  className={`${styles.megaDropdown} ${
                    careerDropdownOpen ? styles.megaDropdownOpen : ""
                  }`}
                >
                  <div className={styles.dropdownContent}>
                    {/* Left — category list */}
                    <div className={styles.dropdownCategories}>
                      <h3 className={styles.dropdownTitle}>
                        <FaGraduationCap className={styles.titleIcon} />
                        Career
                      </h3>
                      {careerItems.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={handleLinkClick}
                          className={`${styles.dropdownCategoryItem} ${
                            activeCareerItem === item.id
                              ? styles.activeItem
                              : ""
                          }`}
                          onMouseEnter={() => setActiveCareerItem(item.id)}
                        >
                          <span className={styles.categoryIcon}>
                            {item.icon}
                          </span>
                          <div className={styles.categoryText}>
                            <span className={styles.categoryTitle}>
                              {item.title}
                            </span>
                            <span className={styles.categoryDesc}>
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Right — preview */}
                    <div className={styles.dropdownPreview}>
                      {careerItems.map(
                        (item) =>
                          activeCareerItem === item.id && (
                            <div key={item.id} className={styles.previewContent}>
                              <div className={styles.previewImageContainer}>
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className={styles.previewImage}
                                />
                                <div className={styles.imageOverlay} />
                              </div>
                              <div className={styles.previewDetails}>
                                <h4 className={styles.previewTitle}>
                                  {item.title}
                                </h4>
                                <p className={styles.previewDesc}>{item.desc}</p>
                                <ul className={styles.featureList}>
                                  {item.features.map((f, i) => (
                                    <li key={i} className={styles.featureItem}>
                                      <FaRocket className={styles.featureIcon} />
                                      {f}
                                    </li>
                                  ))}
                                </ul>
                                <Link
                                  to={item.path}
                                  className={styles.previewBtn}
                                  onClick={handleLinkClick}
                                >
                                  Explore {item.title} <span>→</span>
                                </Link>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </li>

              {/* About */}
              <li className={styles.navItem}>
                <Link to="/about" onClick={handleLinkClick}>
                  <BsInfoCircle className={styles.navIcon} /> About Us
                </Link>
              </li>

              {/* Contact */}
              <li className={styles.navItem}>
                <Link to="/contact" onClick={handleLinkClick}>
                  <FaPhoneAlt className={styles.navIcon} /> Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* ── Auth Buttons ── */}
          <div className={styles.authButtons}>
            <a
              href="https://wa.link/dakfe1"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <FaWhatsapp /> <span>WhatsApp</span>
            </a>
            <button className={styles.signupBtn} onClick={handleRegisterClick}>
              <FaUserPlus /> <span>Register</span>
            </button>
          </div>

          {/* ── Hamburger ── */}
          <button
            className={`${styles.menuIcon} ${
              mobileMenuOpen ? styles.active : ""
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* ── Mobile Menu ── */}
          <div
            className={`${styles.mobileMenu} ${
              mobileMenuOpen ? styles.open : ""
            }`}
          >
            <nav className={styles.mobileNav}>
              <ul className={styles.mobileNavList}>
                <li className={styles.mobileNavItem}>
                  <Link to="/" onClick={handleLinkClick} className={styles.mobileLink}>
                    <FaHome /> Home
                  </Link>
                </li>
                <li className={styles.mobileNavItem}>
                  <Link to="/courses" onClick={handleLinkClick} className={styles.mobileLink}>
                    <IoBookSharp /> Courses
                  </Link>
                </li>
                <li className={styles.mobileNavItem}>
                  <Link to="/certification/microsoft" onClick={handleLinkClick} className={styles.mobileLink}>
                    <FaMicrosoft /> Microsoft Certification
                  </Link>
                </li>
                <li className={styles.mobileNavItem}>
                  <Link to="/certification/ibm" onClick={handleLinkClick} className={styles.mobileLink}>
                    <SiBmcsoftware /> IBM Certification
                  </Link>
                </li>
                <li className={styles.mobileNavItem}>
                  <Link to="/certification/aws" onClick={handleLinkClick} className={styles.mobileLink}>
                    <FaAws /> AWS Certification
                  </Link>
                </li>
                <li className={styles.mobileNavItem}>
                  <Link to="/certification/redhat" onClick={handleLinkClick} className={styles.mobileLink}>
                    <FaRedhat /> RedHat Certification
                  </Link>
                </li>
                <li className={styles.mobileNavItem}>
                  <Link to="/certification/custom" onClick={handleLinkClick} className={styles.mobileLink}>
                    <SiCoursera /> Custom Certification
                  </Link>
                </li>
                <li className={styles.mobileNavItem}>
                  <Link to="/career/internship" onClick={handleLinkClick} className={styles.mobileLink}>
                    <FaLaptopCode /> Internship
                  </Link>
                </li>
                <li className={styles.mobileNavItem}>
                  <Link to="/career/placement" onClick={handleLinkClick} className={styles.mobileLink}>
                    <FaBriefcase /> Placement
                  </Link>
                </li>
                <li className={styles.mobileNavItem}>
                  <Link to="/career/fulltime" onClick={handleLinkClick} className={styles.mobileLink}>
                    <FaUserTie /> Full Time Job
                  </Link>
                </li>
                <li className={styles.mobileNavItem}>
                  <Link to="/about" onClick={handleLinkClick} className={styles.mobileLink}>
                    <BsInfoCircle /> About Us
                  </Link>
                </li>
                <li className={styles.mobileNavItem}>
                  <Link to="/contact" onClick={handleLinkClick} className={styles.mobileLink}>
                    <FaPhoneAlt /> Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {showRegistration && (
        <RegistrationPopUp onClose={handleCloseRegistration} />
      )}
    </>
  );
};

export default Header;