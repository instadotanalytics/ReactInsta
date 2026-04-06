import React, { useState } from "react";
import styles from "./CounselorDashboard.module.css";

import {
  FaTachometerAlt,
  FaUserGraduate,
  FaCalendarCheck,
  FaBookOpen,
  FaChartBar,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaCertificate,
  FaBriefcase,
} from "react-icons/fa";
import AdminRegistrationList from "../../Admin/AdminDashboard/AdminRegistrationList";
import InternshipDetails from "../../Admin/AdminDashboard/InternshipDetails";
import FullTimeJobList from "../../Admin/AdminDashboard/FullTimeJobList";
import ContactFormDetails from "../../Admin/AdminDashboard/ContactFormDetails";

const CounselorDashboard = ({ user }) => {
  const [active, setActive]       = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return (
          <div className={styles.dashboardHome}>
            <h1>Welcome Back, {user?.name}! 👋</h1>
            <p>Hello {user?.name}, welcome to the Counselor Portal</p>
            <p className={styles.userEmail}>{user?.email}</p>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
              <div className={styles.card}>
                <FaUserGraduate className={styles.cardIcon} />
                <h3>85</h3>
                <p>Total Students</p>
              </div>

              <div className={styles.card}>
                <FaEnvelope className={styles.cardIcon} />
                <h3>32</h3>
                <p>Pending Inquiries</p>
              </div>

              <div className={styles.card}>
                <FaCalendarCheck className={styles.cardIcon} />
                <h3>14</h3>
                <p>Sessions Today</p>
              </div>

              <div className={styles.card}>
                <FaBookOpen className={styles.cardIcon} />
                <h3>50</h3>
                <p>Guidance Provided</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className={styles.recentActivity}>
              <h2>Recent Activity</h2>
              <ul>
                <li>📩 New student inquiry received</li>
                <li>🗓️ Counseling session scheduled with Rohan Mehta</li>
                <li>📚 Course guidance provided to Aisha Khan</li>
                <li>✅ Session with Aman Verma completed</li>
                <li>📝 New report generated for Q2 counseling</li>
              </ul>
            </div>
          </div>
        );

      case "inquiries":
      return <AdminRegistrationList/>;
      

      case "sessions":
      return <InternshipDetails/>;
      

      case "guidance":
      return <FullTimeJobList/>;
       

      case "reports":
      return <ContactFormDetails/>;
  
    }
  };

  return (
    <div className={styles.dashboard}>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>

        <div className={styles.sidebarHeader}>
          <h2 className={styles.logo}>
            Counselor<span>Panel</span>
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
            <p className={styles.userRole}>Counselor</p>
          </div>
        </div>

        {/* Menu */}
        <ul className={styles.menu}>
          <li
            className={active === "dashboard" ? styles.active : ""}
            onClick={() => { setActive("dashboard"); setSidebarOpen(false); }}
          >
            <FaTachometerAlt /> <span>Dashboard</span>
          </li>

          <li
            className={active === "inquiries" ? styles.active : ""}
            onClick={() => { setActive("inquiries"); setSidebarOpen(false); }}
          >
            <FaEnvelope /> <span>Registration</span>
          </li>

          <li
            className={active === "sessions" ? styles.active : ""}
            onClick={() => { setActive("sessions"); setSidebarOpen(false); }}
          >
            <FaCalendarCheck /> <span>Internship</span>
          </li>

          <li
            className={active === "guidance" ? styles.active : ""}
            onClick={() => { setActive("guidance"); setSidebarOpen(false); }}
          >
            <FaBookOpen /> <span>Full Time Job</span>
          </li>

          <li
            className={active === "reports" ? styles.active : ""}
            onClick={() => { setActive("reports"); setSidebarOpen(false); }}
          >
            <FaChartBar /> <span>Contact</span>
          </li>

         
        </ul>
      </div>

      {/* ── Main ── */}
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
            <h2>Counselor Dashboard</h2>
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

// ── Coming Soon Component ─────────────────────────────────────
const ComingSoonPage = ({ title }) => (
  <div className={styles.comingSoon}>
    <h2>{title}</h2>
    <div className={styles.comingSoonBox}>
      <h3>🚧 Coming Soon</h3>
      <p>This page is under development. Stay tuned!</p>
    </div>
  </div>
);

export default CounselorDashboard;