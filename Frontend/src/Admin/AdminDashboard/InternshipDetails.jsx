import React, { useEffect, useState } from "react";
import {
  FiUsers, FiDollarSign, FiHome, FiBriefcase,
  FiSearch, FiMail, FiEye, FiMapPin, FiBookOpen,
  FiCpu, FiCalendar, FiClock, FiAward
} from "react-icons/fi";
import {
  MdWork, MdSchool, MdLocationCity, MdEmail,
  MdPhone, MdMenuBook, MdScience
} from "react-icons/md";
import {
  FaGraduationCap, FaLaptopCode, FaRegBuilding,
  FaRegClock, FaMapMarkerAlt, FaTag
} from "react-icons/fa";
import { IoMdSchool, IoMdPeople } from "react-icons/io";
import { GiDuration } from "react-icons/gi";
import { BsFillBriefcaseFill, BsFillPersonFill } from "react-icons/bs";
import styles from "./InternshipDetails.module.css";
import { API_BASE_URL } from "../../config/api"; // apna path adjust karo

const InternshipDetails = () => {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    remote: 0,
    onsite: 0
  });

  useEffect(() => {
    fetchInternships();
  }, []);

  useEffect(() => {
    filterInternships();
  }, [searchTerm, filterType, internships]);

  const fetchInternships = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/internships`);
      const data = await res.json();
      setInternships(data);
      setFilteredInternships(data);
      calculateStats(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const paid = data.filter(item => item.internshipType !== "unpaid").length;
    const remote = data.filter(item => item.mode === "Remote").length;
    const onsite = data.filter(item => item.mode === "Onsite").length;

    setStats({
      total: data.length,
      paid,
      remote,
      onsite
    });
  };

  const filterInternships = () => {
    let filtered = [...internships];

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.skills.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      if (filterType === "paid") {
        filtered = filtered.filter(item => item.internshipType !== "unpaid");
      } else if (filterType === "unpaid") {
        filtered = filtered.filter(item => item.internshipType === "unpaid");
      } else if (filterType === "remote") {
        filtered = filtered.filter(item => item.mode === "Remote");
      } else if (filterType === "onsite") {
        filtered = filtered.filter(item => item.mode === "Onsite");
      }
    }

    setFilteredInternships(filtered);
  };

  const handleViewDetails = (internship) => {
    alert(`Viewing details for ${internship.fullName}`);
  };

  const handleContact = (internship) => {
    alert(`Contacting ${internship.fullName} at ${internship.email}`);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header with Stats */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Internship Applications</h2>

        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <IoMdPeople />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{stats.total}</span>
              <span className={styles.statLabel}>Total</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiDollarSign />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{stats.paid}</span>
              <span className={styles.statLabel}>Paid</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiHome />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{stats.remote}</span>
              <span className={styles.statLabel}>Remote</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiBriefcase />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{stats.onsite}</span>
              <span className={styles.statLabel}>Onsite</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by name, email, college, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterBtn} ${filterType === 'all' ? styles.active : ''}`}
            onClick={() => setFilterType('all')}
          >
            <FiUsers /> All
          </button>
          <button
            className={`${styles.filterBtn} ${filterType === 'paid' ? styles.active : ''}`}
            onClick={() => setFilterType('paid')}
          >
            <FiDollarSign /> Paid
          </button>
          <button
            className={`${styles.filterBtn} ${filterType === 'unpaid' ? styles.active : ''}`}
            onClick={() => setFilterType('unpaid')}
          >
            <FiAward /> Unpaid
          </button>
          <button
            className={`${styles.filterBtn} ${filterType === 'remote' ? styles.active : ''}`}
            onClick={() => setFilterType('remote')}
          >
            <FiHome /> Remote
          </button>
          <button
            className={`${styles.filterBtn} ${filterType === 'onsite' ? styles.active : ''}`}
            onClick={() => setFilterType('onsite')}
          >
            <FiBriefcase /> Onsite
          </button>
        </div>
      </div>

      {/* Cards Container */}
      <div className={styles.cardContainer}>
        {filteredInternships.length > 0 ? (
          filteredInternships.map((item) => (
            <div key={item._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{item.fullName}</h3>
                <span className={styles.badge}>
                  {item.internshipType === "paid" ? (
                    <><FiDollarSign /> Paid</>
                  ) : item.internshipType === "unpaid" ? (
                    <><FiAward /> Unpaid</>
                  ) : (
                    <><FiDollarSign /> Stipend</>
                  )}
                </span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      <MdEmail /> Email
                    </span>
                    <span className={styles.infoValue}>{item.email}</span>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      <MdPhone /> Mobile
                    </span>
                    <span className={styles.infoValue}>{item.mobile}</span>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      <FaMapMarkerAlt /> City
                    </span>
                    <span className={styles.infoValue}>{item.city}</span>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      <IoMdSchool /> College
                    </span>
                    <span className={styles.infoValue}>{item.college}</span>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      <MdMenuBook /> Course
                    </span>
                    <span className={styles.infoValue}>{item.course}</span>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      <MdScience /> Branch
                    </span>
                    <span className={styles.infoValue}>{item.branch}</span>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      <FaGraduationCap /> Year
                    </span>
                    <span className={styles.infoValue}>{item.currentYear}</span>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      <GiDuration /> Duration
                    </span>
                    <span className={styles.infoValue}>{item.duration}</span>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      <FiHome /> Mode
                    </span>
                    <span className={styles.infoValue}>
                      {item.mode === "Remote" ? "🏠 Remote" : "🏢 Onsite"}
                    </span>
                  </div>
                </div>

                {/* Skills Section */}
                <div className={styles.skillsSection}>
                  <div className={styles.skillsTitle}>
                    <FaLaptopCode /> Skills
                  </div>
                  <div className={styles.skillsTags}>
                    {item.skills.split(',').map((skill, index) => (
                      <span key={index} className={styles.skillTag}>
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stipend Display */}
                {item.internshipType !== "unpaid" && item.expectedStipend && (
                  <div className={styles.stipendBadge}>
                    <FiDollarSign />
                    <span>₹{item.expectedStipend}</span>
                  </div>
                )}
              </div>

              {/* Card Footer with Actions */}
              <div className={styles.cardFooter}>
                <button
                  className={`${styles.actionBtn} ${styles.viewBtn}`}
                  onClick={() => handleViewDetails(item)}
                >
                  <FiEye /> View
                </button>
                <button
                  className={`${styles.actionBtn} ${styles.contactBtn}`}
                  onClick={() => handleContact(item)}
                >
                  <FiMail /> Contact
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <FiSearch />
            </div>
            <h3 className={styles.emptyTitle}>No Applications Found</h3>
            <p className={styles.emptyText}>
              {searchTerm || filterType !== 'all'
                ? "Try adjusting your search or filters"
                : "No internship applications yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipDetails;