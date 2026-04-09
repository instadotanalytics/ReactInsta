import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';

import {
  BiLogOutCircle, BiUser, BiBell, BiSearch,
  BiDollar, BiCalendar, BiMessage,
  BiBriefcase, BiCodeAlt, BiCertification,
  BiGroup, BiTime, BiBarChartAlt, BiMenu,
  BiX, BiChevronRight, BiBuildings, BiTrendingUp,
  BiBookOpen, BiCalendarCheck, BiAward
} from "react-icons/bi";
import {
  FiUsers, FiBookOpen, FiClock, FiBarChart2,
  FiHome, FiSettings, FiCalendar, FiUserCheck,
  FiAward, FiTrendingUp, FiTarget, FiChevronDown,
  FiGrid, FiLayers, FiBriefcase
} from "react-icons/fi";
import {
  MdOutlineWorkspacePremium,
  MdOutlineComputer,
  MdOutlineEmojiEvents,
  MdOutlinePeopleAlt,
  MdOutlineAnalytics,
  MdSchool,
  MdOutlineAssessment,
  MdOutlineNotificationsActive
} from "react-icons/md";
import Courses from './Courses';
import PlacementForm from './PlacementForm';
import AdminRegistrationList from './AdminRegistrationList';
import InternshipDetails from './InternshipDetails';
import FullTimeJobList from './FullTimeJobList';
import ContactFormDetails from './ContactFormDetails';
import AdminCertificationFormData from './AdminCertificationFormData';


// Dashboard Home Component
const DashboardHome = ({ username }) => {
  const instituteStats = [
    {
      title: 'Active Students',
      value: '458',
      change: '+12%',
      icon: <FiUsers />,
      detail: 'vs last month',
      trend: 'up',
      color: '#4361ee'
    },
    {
      title: 'Placement Rate',
      value: '78%',
      change: '+5%',
      icon: <BiBriefcase />,
      detail: 'this quarter',
      trend: 'up',
      color: '#f72585'
    },
    {
      title: 'Avg Package',
      value: '₹6.8L',
      change: '+8%',
      icon: <FiTrendingUp />,
      detail: 'per annum',
      trend: 'up',
      color: '#4cc9f0'
    },
    {
      title: 'Live Batches',
      value: '12',
      change: '+3',
      icon: <BiGroup />,
      detail: 'this month',
      trend: 'up',
      color: '#f8961e'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New Placement',
      student: 'Rahul Sharma',
      company: 'Google',
      package: '₹12 LPA',
      time: '2 hours ago',
      type: 'placement'
    },
    {
      id: 2,
      action: 'Training Completed',
      batch: 'Full Stack Batch 5',
      students: '24 students',
      time: '5 hours ago',
      type: 'training'
    },
    {
      id: 3,
      action: 'Interview Scheduled',
      student: 'Priya Patel',
      company: 'Microsoft',
      time: 'Tomorrow',
      type: 'interview'
    },
    {
      id: 4,
      action: 'Certification Issued',
      batch: 'Data Science',
      count: '18 certifications',
      time: 'Yesterday',
      type: 'certification'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      event: 'Tech Interview Workshop',
      date: '25 Feb 2026',
      time: '10:00 AM',
      batch: 'All Batches',
      type: 'Workshop'
    },
    {
      id: 2,
      event: 'Mock Interviews - Day 1',
      date: '28 Feb 2026',
      time: '9:00 AM',
      batch: 'Final Year',
      type: 'Placement'
    }
  ];

  const batchPerformance = [
    {
      name: 'Full Stack Web Dev',
      code: 'FSD-101',
      performance: 92,
      students: 28,
      placement: 85,
      avgPackage: '₹7.2L'
    },
    {
      name: 'Data Science & AI',
      code: 'DSAI-202',
      performance: 88,
      students: 24,
      placement: 82,
      avgPackage: '₹8.5L'
    }
  ];

  return (
    <div className={styles.content}>
      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        <div className={styles.bannerContent}>
          <h2>Good to see you, {username}! 👋</h2>
          <p>Here's what's happening with your institute today.</p>
        </div>
        <div className={styles.bannerStats}>
          <div className={styles.bannerStat}>
            <span className={styles.bannerStatLabel}>Today's Attendance</span>
            <span className={styles.bannerStatValue}>92%</span>
          </div>
          <div className={styles.bannerStat}>
            <span className={styles.bannerStatLabel}>Placements This Week</span>
            <span className={styles.bannerStatValue}>8</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className={styles.statsGrid}>
        {instituteStats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}30)` }}>
              <span style={{ color: stat.color }}>{stat.icon}</span>
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statTitle}>{stat.title}</p>
              <h3>{stat.value}</h3>
              <div className={styles.statFooter}>
                <span className={`${styles.statChange} ${stat.trend === 'down' ? styles.negative : ''}`}>
                  {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
                </span>
                <span className={styles.statDetail}>{stat.detail}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className={styles.dashboardGrid}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Recent Activities */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2>
                <FiClock /> Recent Activities
              </h2>
              <button className={styles.viewAllBtn}>View All</button>
            </div>
            <div className={styles.activityList}>
              {recentActivities.map(activity => (
                <div key={activity.id} className={styles.activityItem}>
                  <div className={`${styles.activityIcon} ${styles[activity.type]}`}>
                    {activity.type === 'placement' && <BiBriefcase />}
                    {activity.type === 'training' && <MdOutlineComputer />}
                    {activity.type === 'interview' && <BiGroup />}
                    {activity.type === 'certification' && <FiAward />}
                  </div>
                  <div className={styles.activityDetails}>
                    <p className={styles.activityTitle}>
                      <strong>{activity.action}</strong>
                      {activity.student && ` - ${activity.student}`}
                    </p>
                    <div className={styles.activityMeta}>
                      <span className={styles.activityTime}>
                        <BiTime /> {activity.time}
                      </span>
                      {activity.company && (
                        <span className={styles.companyBadge}>
                          {activity.company}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2>
                <FiTarget /> Quick Actions
              </h2>
            </div>
            <div className={styles.quickActions}>
              <button className={styles.actionBtn}>
                <BiUser />
                <span>New Enrollment</span>
              </button>
              <button className={styles.actionBtn}>
                <BiCalendar />
                <span>Schedule Drive</span>
              </button>
              <button className={styles.actionBtn}>
                <BiAward />
                <span>Issue Certificate</span>
              </button>
              <button className={styles.actionBtn}>
                <BiMessage />
                <span>Send Notification</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Upcoming Events */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2>
                <FiCalendar /> Upcoming Events
              </h2>
              <button className={styles.viewAllBtn}>Calendar</button>
            </div>
            <div className={styles.eventsList}>
              {upcomingEvents.map(event => (
                <div key={event.id} className={styles.eventItem}>
                  <div className={styles.eventDate}>
                    <span className={styles.eventDay}>{event.date.split(' ')[0]}</span>
                    <span className={styles.eventMonth}>{event.date.split(' ')[1]}</span>
                  </div>
                  <div className={styles.eventDetails}>
                    <h4>{event.event}</h4>
                    <p>
                      <span className={styles.eventTime}>
                        <BiTime /> {event.time}
                      </span>
                      <span className={styles.eventType}>{event.type}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Batch Performance */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2>
                <FiTrendingUp /> Batch Performance
              </h2>
              <button className={styles.viewAllBtn}>Details</button>
            </div>
            <div className={styles.performanceList}>
              {batchPerformance.map((batch, index) => (
                <div key={index} className={styles.performanceItem}>
                  <div className={styles.performanceInfo}>
                    <div className={styles.batchNameInfo}>
                      <span className={styles.batchName}>{batch.name}</span>
                      <span className={styles.batchCode}>{batch.code}</span>
                    </div>
                    <span className={styles.studentCount}>{batch.students} students</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${batch.performance}%` }}></div>
                  </div>
                  <div className={styles.performanceFooter}>
                    <span className={styles.performancePercentage}>{batch.performance}% completion</span>
                    <span className={styles.placementInfo}>Placement: {batch.placement}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Common Component for all sections except Dashboard and Banners
const CommonSection = ({ title, icon, description }) => (
  <div className={styles.sectionView}>
    <div className={styles.sectionHeader}>
      <h1 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>{icon}</span>
        {title}
      </h1>
      <p className={styles.sectionDescription}>{description}</p>
    </div>
    <div className={styles.comingSoonCard}>
      <div className={styles.comingSoonContent}>
        <div className={styles.comingSoonIcon}>
          {icon}
        </div>
        <h2>{title} Section</h2>
        <p>This section is under development. Please check back later.</p>
        <div className={styles.comingSoonBadge}>
          Coming Soon
        </div>
      </div>
    </div>
  </div>
);

// Main Dashboard Component
const Dashboard = ({ username, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(8);

  useEffect(() => {
    const timer = setTimeout(onLogout, 24 * 60 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [onLogout]);

  const sections = [
    { id: 'dashboard', name: 'Dashboard', icon: <FiHome />, component: <DashboardHome username={username} /> },

    {
      id: 'Registration',
      name: 'Registration',
      icon: <FiUsers />,
      badge: '6 Active',
      component: <AdminRegistrationList />
    },
    {
      id: 'Internship',
      name: 'Internship',
      icon: <MdOutlinePeopleAlt />,
      badge: '128',
      component: <InternshipDetails />
    },
    {
      id: 'Full Time Jobs',
      name: 'Full Time Jobs',
      icon: <FiUserCheck />,
      badge: '12',
      component: <FullTimeJobList />
    },
    {
      id: 'courses',
      name: 'Courses',
      icon: <FiBookOpen />,
      badge: '8',
      component: <Courses />
    },
    {
      id: 'placements',
      name: 'Placements',
      icon: <BiBriefcase />,
      badge: '45 Jobs',
      component: <PlacementForm />,
    },
    {
      id: 'certifications',
      name: 'Certifications',
      icon: <BiCertification />,
      component: <AdminCertificationFormData />
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: <FiBarChart2 />,
      component: <CommonSection title="Analytics" icon={<FiBarChart2 />} description="View insights and reports" />
    },
    {
      id: 'Contact Info',
      name: 'Contact',
      icon: <FiCalendar />,
      component: <ContactFormDetails />
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <FiSettings />,
      component: <CommonSection title="Settings" icon={<FiSettings />} description="Configure your preferences" />
    }
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getCurrentComponent = () => {
    const section = sections.find(s => s.id === activeSection);
    return section ? section.component : <DashboardHome username={username} />;
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Menu Toggle Button */}
      <button
        className={styles.mobileMenuToggle}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <BiX /> : <BiMenu />}
      </button>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.logoArea}>
          <div className={styles.logo}>
            {/* Logo Image - Using a placeholder div if image doesn't exist */}
            <div className={styles.logoPlaceholder}>TA</div>
          </div>
          <div className={styles.logoText}>
            <h2>InstaDotAnalytics</h2>
            <p className={styles.instituteName}>Training & Placement</p>
          </div>
        </div>

        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            {getInitials(username)}
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{username}</p>
            <p className={styles.userRole}>
              Training Head
              <span className={styles.roleBadge}>Admin</span>
            </p>
          </div>
        </div>

        <nav className={styles.navSection}>
          {sections.map(section => (
            <div
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setIsMobileMenuOpen(false);
              }}
              className={`${styles.navItem} ${activeSection === section.id ? styles.navItemActive : ''}`}
            >
              <span className={styles.navIcon}>{section.icon}</span>
              <span className={styles.navText}>{section.name}</span>
              {section.badge && <span className={styles.badge}>{section.badge}</span>}
              <BiChevronRight className={styles.navArrow} />
            </div>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.footerStats}>
            <div className={styles.footerStat}>
              <span className={styles.footerLabel}>Current Batch</span>
              <span className={styles.footerValue}>FSD-101</span>
            </div>
            <div className={styles.footerStat}>
              <span className={styles.footerLabel}>Placement Drive</span>
              <span className={styles.footerValue}>Tomorrow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.welcomeText}>
              <span className={styles.greetingEmoji}>🚀</span>
              Welcome back, {username}!
            </h1>
            <p className={styles.dateText}>
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div className={styles.headerActions}>
            <div className={styles.searchSection}>
              <BiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search students, batches, placements..."
                className={styles.searchInput}
              />
            </div>

            <button className={styles.notificationBtn}>
              <BiBell />
              {notifications > 0 && (
                <span className={styles.notificationBadge}>{notifications}</span>
              )}
            </button>

            <div className={styles.profileDropdown}>
              <button
                className={styles.profileBtn}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className={styles.headerAvatar}>
                  {getInitials(username)}
                </div>
                <span className={styles.profileName}>{username}</span>
                <FiChevronDown className={styles.profileArrow} />
              </button>

              {showProfileMenu && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownHeader}>
                    <h4>{username}</h4>
                    <p>Training Head · InstaDotAnalytics</p>
                  </div>

                  <hr className={styles.dropdownDivider} />

                  <button className={styles.dropdownItem}>
                    <BiUser /> My Profile
                  </button>
                  <button className={styles.dropdownItem}>
                    <FiSettings /> Settings
                  </button>

                  <hr className={styles.dropdownDivider} />

                  <button onClick={onLogout} className={styles.dropdownItem}>
                    <BiLogOutCircle /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className={styles.contentArea}>
          {getCurrentComponent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;