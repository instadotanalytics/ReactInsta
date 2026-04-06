import React, { useEffect, useState } from "react";
import styles from "./FullTimeJobList.module.css";
import { API_BASE_URL } from "../../config/api"; // apna path adjust karo

const FullTimeJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    experience: "",
    position: "",
    skills: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    fresher: 0,
    experienced: 0
  });

  const positions = [...new Set(jobs.map(job => job.position))];

  useEffect(() => {
    fetch(`${API_BASE_URL}/fulltimejob/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJobs(data.data);
          setFilteredJobs(data.data);
          calculateStats(data.data);
        }
      });
  }, []);

  const calculateStats = (jobData) => {
    const total = jobData.length;
    const fresher = jobData.filter(job => job.experience === "Fresher").length;
    const experienced = total - fresher;
    setStats({ total, fresher, experienced });
  };

  useEffect(() => {
    let result = jobs;

    if (searchTerm) {
      result = result.filter(job =>
        job.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.experience) {
      result = result.filter(job => job.experience === filters.experience);
    }
    if (filters.position) {
      result = result.filter(job => job.position === filters.position);
    }
    if (filters.skills) {
      result = result.filter(job =>
        job.skills.toLowerCase().includes(filters.skills.toLowerCase())
      );
    }

    setFilteredJobs(result);
    calculateStats(result);
  }, [searchTerm, filters, jobs]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      experience: "",
      position: "",
      skills: ""
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.heading}>Job Applications</h2>
          <p className={styles.subheading}>Manage and review all candidate applications</p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{stats.total}</span>
            <span className={styles.statLabel}>Total Applications</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{stats.fresher}</span>
            <span className={styles.statLabel}>Freshers</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{stats.experienced}</span>
            <span className={styles.statLabel}>Experienced</span>
          </div>
        </div>
      </div>

      <div className={styles.searchSection}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search by name, email, skills or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button
            className={`${styles.filterToggle} ${showFilters ? styles.active : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <span>⚡</span>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && (
          <div className={styles.filtersPanel}>
            <div className={styles.filterGroup}>
              <label>Experience</label>
              <select
                value={filters.experience}
                onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                className={styles.filterSelect}
              >
                <option value="">All Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="1 Year">1 Year</option>
                <option value="2+ Years">2+ Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Position</label>
              <select
                value={filters.position}
                onChange={(e) => setFilters({ ...filters, position: e.target.value })}
                className={styles.filterSelect}
              >
                <option value="">All Positions</option>
                {positions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Skills</label>
              <input
                type="text"
                placeholder="e.g. React, Node"
                value={filters.skills}
                onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
                className={styles.filterInput}
              />
            </div>

            <button onClick={resetFilters} className={styles.resetButton}>
              Reset Filters
            </button>
          </div>
        )}

        <div className={styles.resultsCount}>
          Showing <span>{filteredJobs.length}</span> out of <span>{jobs.length}</span> applications
        </div>
      </div>

      <div className={styles.grid}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.userInfo}>
                  <div className={styles.avatar}>
                    {getInitials(job.fullName)}
                  </div>
                  <div className={styles.nameSection}>
                    <h3 className={styles.name}>{job.fullName}</h3>
                    <span className={`${styles.badge} ${styles[job.experience.toLowerCase().replace('+', 'plus').replace(' ', '')]}`}>
                      {job.experience}
                    </span>
                  </div>
                </div>
                <div className={styles.position}>
                  {job.position}
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.contactInfo}>
                  <div className={styles.contactRow}>
                    <span className={styles.contactIcon}>📧</span>
                    <span className={styles.contactText}>{job.email}</span>
                  </div>
                  <div className={styles.contactRow}>
                    <span className={styles.contactIcon}>📞</span>
                    <span className={styles.contactText}>{job.phone}</span>
                  </div>
                </div>

                <div className={styles.skillsSection}>
                  <div className={styles.skillsLabel}>Skills</div>
                  <div className={styles.skills}>
                    {job.skills.split(',').map((skill, index) => (
                      <span key={index} className={styles.skillTag}>
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.footer}>
                  {job.expectedSalary && (
                    <div className={styles.salary}>
                      <span>💰</span>
                      {job.expectedSalary} LPA
                    </div>
                  )}
                  {job.additionalInfo && (
                    <div className={styles.about} title={job.additionalInfo}>
                      <span>💬</span>
                      {job.additionalInfo.substring(0, 30)}
                      {job.additionalInfo.length > 30 && "..."}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>📭</div>
            <h3>No applications found</h3>
            <p>Try adjusting your search or filters</p>
            <button onClick={resetFilters} className={styles.resetButton}>
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullTimeJobList;