import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminCertificationFormData.module.css";
import { API_BASE_URL } from "../../config/api";

const AdminCertificationFormData = () => {
  const [applications, setApplications] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCert, setFilterCert] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Data
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

  // Search + Filter Logic
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

  if (loading) return <h2 className={styles.loading}>Loading...</h2>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Certification Applications</h2>

      {/* Top Controls */}
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by name, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        <select
          value={filterCert}
          onChange={(e) => setFilterCert(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Certifications</option>
          <option value="AWS Certification">AWS Certification</option>
          <option value="Microsoft Certification">Microsoft Certification</option>
          <option value="IBM Certification">IBM Certification</option>
          <option value="Red Hat Certification">Red Hat Certification</option>
          <option value="Custom Program">Custom Program</option>
        </select>
      </div>

      {/* Count */}
      <div className={styles.countBox}>
        Total Applications: <strong>{filteredData.length}</strong>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Certification</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item._id}>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.certification}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.noData}>
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCertificationFormData;