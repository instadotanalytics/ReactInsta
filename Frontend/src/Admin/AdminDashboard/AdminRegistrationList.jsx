import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/api";
import styles from "./AdminRegistrationList.module.css";
import { 
  FiUsers, 
  FiMail, 
  FiPhone, 
  FiBookOpen, 
  FiCalendar,
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiX,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiAward,
  FiMapPin,
  FiBriefcase
} from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";

const AdminRegistrationList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/registrations`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch data");
      }

      setRegistrations(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalRegistrations = registrations.length;
  
  const uniqueCourses = [...new Set(registrations.map(r => 
    r.course?.title || r.course?.name || 'Unknown'
  ).filter(Boolean))];
  
  const recentRegistrations = registrations.filter(r => {
    const date = new Date(r.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return date >= weekAgo;
  }).length;

  // Filter registrations
  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone?.includes(searchTerm) ||
      (reg.course?.title || reg.course?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = filterCourse ? 
      (reg.course?.title || reg.course?.name) === filterCourse : true;
    
    const matchesDate = filterDate ? 
      new Date(reg.createdAt).toISOString().split('T')[0] === filterDate : true;
    
    return matchesSearch && matchesCourse && matchesDate;
  });

  const handleViewDetails = (registration) => {
    setSelectedRegistration(registration);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRegistration(null);
  };

  const handleExport = () => {
    const headers = ['Name', 'Email', 'Phone', 'Course', 'Registration Date', 'Status'];
    const csvData = filteredRegistrations.map(reg => [
      reg.fullName,
      reg.email,
      reg.phone,
      reg.course?.title || reg.course?.name || 'N/A',
      new Date(reg.createdAt).toLocaleDateString(),
      'Active'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className={styles.container}>
      {/* Premium Header with Stats */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            <FiUsers />
          </div>
          <div>
            <h1 className={styles.headerTitle}>Registration Management</h1>
            <p className={styles.headerSubtitle}>Track and manage all course registrations</p>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{totalRegistrations}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{uniqueCourses.length}</span>
            <span className={styles.statLabel}>Courses</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{recentRegistrations}</span>
            <span className={styles.statLabel}>This Week</span>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className={styles.actionsSection}>
        <div className={styles.filtersGroup}>
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by name, email, phone, course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className={styles.filterBox}>
            <FiFilter className={styles.filterIcon} />
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="">All Courses</option>
              {uniqueCourses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterBox}>
            <FiCalendar className={styles.filterIcon} />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              placeholder="Filter by date"
            />
          </div>
        </div>

        <button className={styles.exportBtn} onClick={handleExport}>
          <FiDownload />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Results Summary */}
      <div className={styles.summary}>
        <p>Showing <strong>{filteredRegistrations.length}</strong> of <strong>{totalRegistrations}</strong> registrations</p>
        {searchTerm && <button className={styles.clearBtn} onClick={() => setSearchTerm('')}>Clear Search</button>}
        {filterCourse && <button className={styles.clearBtn} onClick={() => setFilterCourse('')}>Clear Course Filter</button>}
        {filterDate && <button className={styles.clearBtn} onClick={() => setFilterDate('')}>Clear Date Filter</button>}
      </div>

      {/* Main Content */}
      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading registrations...</p>
        </div>
      ) : error ? (
        <div className={styles.errorState}>
          <FiX className={styles.errorIcon} />
          <h3>Error Loading Data</h3>
          <p>{error}</p>
          <button onClick={fetchRegistrations} className={styles.retryBtn}>Try Again</button>
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <FiUsers />
          </div>
          <h3>No Registrations Found</h3>
          <p>
            {searchTerm || filterCourse || filterDate 
              ? 'Try adjusting your filters' 
              : 'No registrations have been submitted yet'}
          </p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Contact</th>
                <th>Course</th>
                <th>Registration Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((reg, index) => (
                <tr key={reg._id}>
                  <td className={styles.serialNo}>{index + 1}</td>
                  <td>
                    <div className={styles.studentInfo}>
                      <div className={styles.studentAvatar}>
                        {reg.fullName?.charAt(0) || '?'}
                      </div>
                      <div>
                        <div className={styles.studentName}>{reg.fullName}</div>
                        {reg.education && <small>{reg.education}</small>}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.contactInfo}>
                      <div className={styles.contactItem}>
                        <FiMail className={styles.contactIcon} />
                        <span>{reg.email}</span>
                      </div>
                      <div className={styles.contactItem}>
                        <FiPhone className={styles.contactIcon} />
                        <span>{reg.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.courseInfo}>
                      <FiBookOpen className={styles.courseIcon} />
                      <span className={styles.courseName}>
                        {reg.course?.title || reg.course?.name || 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.dateInfo}>
                      <FiCalendar className={styles.dateIcon} />
                      <span>{new Date(reg.createdAt).toLocaleDateString()}</span>
                      <small className={styles.timeAgo}>
                        {getTimeAgo(new Date(reg.createdAt))}
                      </small>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.active}`}>
                      <FiCheckCircle />
                      Active
                    </span>
                  </td>
                  <td>
                    <button 
                      className={styles.viewBtn}
                      onClick={() => handleViewDetails(reg)}
                      title="View Details"
                    >
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Registration Details Modal */}
      {showModal && selectedRegistration && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              <FiX />
            </button>
            
            <div className={styles.modalHeader}>
              <div className={styles.modalAvatar}>
                {selectedRegistration.fullName?.charAt(0) || '?'}
              </div>
              <div>
                <h2>{selectedRegistration.fullName}</h2>
                <p>Registration Details</p>
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailSection}>
                  <h4>
                    <FiUser />
                    Personal Information
                  </h4>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Full Name</span>
                    <span className={styles.detailValue}>{selectedRegistration.fullName}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Email</span>
                    <span className={styles.detailValue}>{selectedRegistration.email}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Phone</span>
                    <span className={styles.detailValue}>{selectedRegistration.phone}</span>
                  </div>
                  {selectedRegistration.alternatePhone && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Alternate Phone</span>
                      <span className={styles.detailValue}>{selectedRegistration.alternatePhone}</span>
                    </div>
                  )}
                </div>

                <div className={styles.detailSection}>
                  <h4>
                    <FiBookOpen />
                    Course Information
                  </h4>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Course</span>
                    <span className={styles.detailValue}>
                      {selectedRegistration.course?.title || selectedRegistration.course?.name || 'N/A'}
                    </span>
                  </div>
                  {selectedRegistration.course?.duration && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Duration</span>
                      <span className={styles.detailValue}>{selectedRegistration.course.duration}</span>
                    </div>
                  )}
                  {selectedRegistration.course?.level && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Level</span>
                      <span className={styles.detailValue}>{selectedRegistration.course.level}</span>
                    </div>
                  )}
                </div>

                <div className={styles.detailSection}>
                  <h4>
                    <FiAward />
                    Educational Background
                  </h4>
                  {selectedRegistration.education && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Education</span>
                      <span className={styles.detailValue}>{selectedRegistration.education}</span>
                    </div>
                  )}
                  {selectedRegistration.yearOfPassing && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Year of Passing</span>
                      <span className={styles.detailValue}>{selectedRegistration.yearOfPassing}</span>
                    </div>
                  )}
                  {selectedRegistration.skills && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Skills</span>
                      <span className={styles.detailValue}>{selectedRegistration.skills}</span>
                    </div>
                  )}
                </div>

                <div className={styles.detailSection}>
                  <h4>
                    <FiMapPin />
                    Additional Details
                  </h4>
                  {selectedRegistration.address && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Address</span>
                      <span className={styles.detailValue}>{selectedRegistration.address}</span>
                    </div>
                  )}
                  {selectedRegistration.city && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>City</span>
                      <span className={styles.detailValue}>{selectedRegistration.city}</span>
                    </div>
                  )}
                  {selectedRegistration.state && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>State</span>
                      <span className={styles.detailValue}>{selectedRegistration.state}</span>
                    </div>
                  )}
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Registered On</span>
                    <span className={styles.detailValue}>
                      {new Date(selectedRegistration.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {selectedRegistration.message && (
                  <div className={styles.detailSectionFull}>
                    <h4>Message</h4>
                    <p className={styles.messageText}>{selectedRegistration.message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function for time ago
const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'Just now';
};

export default AdminRegistrationList;