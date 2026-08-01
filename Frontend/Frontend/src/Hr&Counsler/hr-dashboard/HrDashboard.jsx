import React, { useState } from "react";
import styles from "./HrDashboard.module.css";

import InternshipDetails from "../../Admin/AdminDashboard/InternshipDetails";
import PlacementForm from "../../Admin/AdminDashboard/PlacementForm";
import AdminCertificationFormData from "../../Admin/AdminDashboard/AdminCertificationFormData";
import ContactFormDetails from "../../Admin/AdminDashboard/ContactFormDetails";
import AdminRegistrationList from "../../Admin/AdminDashboard/AdminRegistrationList";
import FullTimeJobList from "../../Admin/AdminDashboard/FullTimeJobList";

import {
  FaUserGraduate,
  FaBriefcase,
  FaChalkboardTeacher,
  FaCertificate,
  FaEnvelope,
  FaBars,
  FaTachometerAlt,
  FaTimes
} from "react-icons/fa";

const HrDashboard = ({ user }) => {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return (
          <div className={styles.dashboardHome}>
            <h1>Welcome Back, {user?.name}! 👋</h1>
            <p>Hello {user?.name}, welcome to InstaDotAnalytics HR Portal</p>
            <p className={styles.userEmail}>{user?.email}</p>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
              <div className={styles.card}>
                <FaUserGraduate className={styles.cardIcon} />
                <h3>120</h3>
                <p>Total Registrations</p>
              </div>

              <div className={styles.card}>
                <FaChalkboardTeacher className={styles.cardIcon} />
                <h3>45</h3>
                <p>Internship Applications</p>
              </div>

              <div className={styles.card}>
                <FaBriefcase className={styles.cardIcon} />
                <h3>18</h3>
                <p>Full Time Jobs</p>
              </div>

              <div className={styles.card}>
                <FaCertificate className={styles.cardIcon} />
                <h3>60</h3>
                <p>Certifications Issued</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className={styles.recentActivity}>
              <h2>Recent Activity</h2>
              <ul>
                <li>✅ applied for Internship</li>
                <li>📄 New Registration </li>
                <li>💼 Full Time Job posted for React Developer</li>
                <li>🏆 Certificate issued</li>
              </ul>
            </div>
          </div>
        );

      case "registration":
        return <AdminRegistrationList />;

      case "internship":
        return <InternshipDetails />;

      case "jobs":
        return <FullTimeJobList />;

      case "placement":
        return <PlacementForm />;

      case "certification":
        return <AdminCertificationFormData />;

      case "contact":
        return <ContactFormDetails />;

      default:
        return (
          <div className={styles.comingSoon}>
            <h2>{active.charAt(0).toUpperCase() + active.slice(1)} Page</h2>
            <div className={styles.comingSoonBox}>
              <h3>🚧 Coming Soon</h3>
              <p>This page is under development. Stay tuned!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.logo}>
            Insta<span>Dot</span>Analytics
          </h2>
          <button
            className={styles.closeBtn}
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* User Info */}
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userDetails}>
            <p className={styles.userName}>{user?.name}</p>
            <p className={styles.userRole}>HR Administrator</p>
          </div>
        </div>

        {/* Menu */}
        <ul className={styles.menu}>
          <li
            className={active === "dashboard" ? styles.active : ""}
            onClick={() => {
              setActive("dashboard");
              setSidebarOpen(false);
            }}
          >
            <FaTachometerAlt /> <span>Dashboard</span>
          </li>

          <li
            className={active === "registration" ? styles.active : ""}
            onClick={() => {
              setActive("registration");
              setSidebarOpen(false);
            }}
          >
            <FaUserGraduate /> <span>Registration</span>
          </li>

          <li
            className={active === "internship" ? styles.active : ""}
            onClick={() => {
              setActive("internship");
              setSidebarOpen(false);
            }}
          >
            <FaChalkboardTeacher /> <span>Internship</span>
          </li>

          <li
            className={active === "jobs" ? styles.active : ""}
            onClick={() => {
              setActive("jobs");
              setSidebarOpen(false);
            }}
          >
            <FaBriefcase /> <span>Full Time Job</span>
          </li>

          <li
            className={active === "placement" ? styles.active : ""}
            onClick={() => {
              setActive("placement");
              setSidebarOpen(false);
            }}
          >
            <FaBriefcase /> <span>Placement</span>
          </li>

          <li
            className={active === "certification" ? styles.active : ""}
            onClick={() => {
              setActive("certification");
              setSidebarOpen(false);
            }}
          >
            <FaCertificate /> <span>Certification</span>
          </li>

          <li
            className={active === "contact" ? styles.active : ""}
            onClick={() => {
              setActive("contact");
              setSidebarOpen(false);
            }}
          >
            <FaEnvelope /> <span>Contact</span>
          </li>
        </ul>
      </div>

      {/* Main */}
      <div className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <button
              className={styles.menuIcon}
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars />
            </button>
            <h2>HR Dashboard</h2>
          </div>

          <div className={styles.headerUser}>
            <div className={styles.headerAvatar}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className={styles.headerName}>{user?.name}</p>
              <p className={styles.headerEmail}>{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default HrDashboard;