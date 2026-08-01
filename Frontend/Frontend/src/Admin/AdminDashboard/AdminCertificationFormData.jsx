import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminCertificationFormData.module.css";
import { API_BASE_URL } from "../../config/api";

const CERT_OPTIONS = [
  "AWS Certification",
  "Microsoft Certification",
  "IBM Certification",
  "Red Hat Certification",
  "Custom Program",
];

const AdminCertificationFormData = () => {
  const [applications, setApplications] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCert, setFilterCert] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/applications`);
        setApplications(res.data.data);
        setFilteredData(res.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  useEffect(() => {
    let data = applications;
    if (search) {
      data = data.filter(
        (item) =>
          item.fullName.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          item.certification.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterCert) {
      data = data.filter((item) => item.certification === filterCert);
    }
    setFilteredData(data);
  }, [search, filterCert, applications]);

  const certCounts = CERT_OPTIONS.reduce((acc, cert) => {
    acc[cert] = applications.filter((a) => a.certification === cert).length;
    return acc;
  }, {});

  const thisWeek = applications.filter((a) => {
    const d = new Date(a.createdAt);
    const now = new Date();
    return (now - d) / (1000 * 60 * 60 * 24) <= 7;
  }).length;

  const handleExport = () => {
    const headers = ["Name", "Email", "Phone", "Certification", "Date"];
    const rows = filteredData.map((item) => [
      item.fullName,
      item.email,
      item.phone,
      item.certification,
      new Date(item.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cert-applications-${Date.now()}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingOrb}></div>
        <p>Loading applications…</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
              <path d="M7 8h10M7 11h6" />
            </svg>
          </div>
          <div>
            <h1 className={styles.headerTitle}>Certification Applications</h1>
            <p className={styles.headerSub}>Track and manage all certification requests</p>
          </div>
        </div>
        <button className={styles.exportBtn} onClick={handleExport}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* ── Stats ── */}
      <div className={styles.statsRow}>
        {[
          { label: "Total", value: applications.length, accent: "#5b6cf9" },
          { label: "This Week", value: thisWeek, accent: "#10c98f" },
          { label: "Filtered", value: filteredData.length, accent: "#f59e42" },
          { label: "Cert Types", value: CERT_OPTIONS.length, accent: "#e05cad" },
        ].map((s) => (
          <div className={styles.statCard} key={s.label}>
            <span className={styles.statValue} style={{ color: s.accent }}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
            <div className={styles.statBar} style={{ background: s.accent + "22" }}>
              <div className={styles.statBarFill} style={{ background: s.accent, width: "60%" }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Controls ── */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search name, email, certification…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          {search && (
            <button className={styles.clearSearch} onClick={() => setSearch("")}>✕</button>
          )}
        </div>
        <div className={styles.filterWrap}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" className={styles.filterIcon}>
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <select
            value={filterCert}
            onChange={(e) => setFilterCert(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Certifications</option>
            {CERT_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        {(search || filterCert) && (
          <button className={styles.clearAll} onClick={() => { setSearch(""); setFilterCert(""); }}>
            Clear All
          </button>
        )}
      </div>

      {/* ── Table ── */}
      <div className={styles.tableCard}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Applicant</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Certification</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                  <tr
                    key={item._id}
                    className={selectedRow === item._id ? styles.rowSelected : ""}
                    onClick={() => setSelectedRow(selectedRow === item._id ? null : item._id)}
                  >
                    <td className={styles.serial}>{i + 1}</td>
                    <td>
                      <div className={styles.nameCell}>
                        <div className={styles.avatar}>{item.fullName?.charAt(0)}</div>
                        <span className={styles.nameText}>{item.fullName}</span>
                      </div>
                    </td>
                    <td><a href={`mailto:${item.email}`} className={styles.emailLink}>{item.email}</a></td>
                    <td className={styles.phone}>{item.phone}</td>
                    <td>
                      <span className={styles.certBadge}>{item.certification}</span>
                    </td>
                    <td className={styles.dateCell}>
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <div className={styles.empty}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                        <circle cx="12" cy="12" r="10" /><line x1="8" y1="15" x2="16" y2="15" />
                        <line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                      <p>No applications found</p>
                      <span>Try adjusting your search or filters</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.tableFooter}>
          Showing <strong>{filteredData.length}</strong> of <strong>{applications.length}</strong> applications
        </div>
      </div>
    </div>
  );
};

export default AdminCertificationFormData;