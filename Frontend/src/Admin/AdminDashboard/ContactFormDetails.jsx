import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/api";

const ContactFormDetails = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterAndSearchMessages();
  }, [messages, searchTerm, filterBy, sortOrder]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`);
      const data = await response.json();

      if (response.ok) {
        setMessages(data.data);
      } else {
        setError("Failed to fetch messages");
      }
    } catch (err) {
      setError("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSearchMessages = () => {
    let filtered = [...messages];

    if (searchTerm) {
      filtered = filtered.filter(
        (msg) =>
          msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy !== "all") {
      filtered = filtered.filter((msg) => {
        switch (filterBy) {
          case "recent":
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return new Date(msg.createdAt) >= sevenDaysAgo;
          case "hasPhone":
            return msg.phone && msg.phone.trim() !== "";
          default:
            return true;
        }
      });
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    setFilteredMessages(filtered);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilterBy(e.target.value);
  const handleSortChange = () => setSortOrder(sortOrder === "desc" ? "asc" : "desc");

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Message", "Date"];
    const csvData = filteredMessages.map((msg) => [
      msg.name,
      msg.email,
      msg.phone,
      msg.message,
      new Date(msg.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact-messages.csv";
    a.click();
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <h2>Loading messages...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h2 style={{ color: "#f44336" }}>{error}</h2>
        <button onClick={fetchMessages} style={styles.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Contact Form Details</h1>
        <button onClick={exportToCSV} style={styles.exportButton}>
          Export to CSV
        </button>
      </div>

      <div style={styles.controls}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={searchTerm}
            onChange={handleSearch}
            style={styles.searchInput}
          />
          <span style={styles.searchIcon}>🔍</span>
        </div>

        <div style={styles.filterContainer}>
          <select
            value={filterBy}
            onChange={handleFilterChange}
            style={styles.filterSelect}
          >
            <option value="all">All Messages</option>
            <option value="recent">Last 7 Days</option>
            <option value="hasPhone">With Phone Number</option>
          </select>
        </div>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Total Messages</span>
          <span style={styles.statValue}>{filteredMessages.length}</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>With Phone</span>
          <span style={styles.statValue}>
            {filteredMessages.filter((m) => m.phone).length}
          </span>
        </div>
      </div>

      <div style={styles.tableContainer}>
        {filteredMessages.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Message</th>
                <th style={styles.th}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((msg, index) => (
                <tr key={msg._id} style={styles.tableRow}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>
                    <span style={styles.nameCell}>{msg.name}</span>
                  </td>
                  <td style={styles.td}>
                    <a href={`mailto:${msg.email}`} style={styles.emailLink}>
                      {msg.email}
                    </a>
                  </td>
                  <td style={styles.td}>
                    {msg.phone ? (
                      <a href={`tel:${msg.phone}`} style={styles.phoneLink}>
                        {msg.phone}
                      </a>
                    ) : (
                      <span style={styles.noData}>-</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.messageCell}>{msg.message}</div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.dateCell}>
                      {new Date(msg.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      <span style={styles.timeText}>
                        {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={styles.noDataContainer}>
            <p style={styles.noDataText}>No messages found</p>
            <button onClick={() => setSearchTerm("")} style={styles.clearButton}>
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1400px",
    margin: "0 auto",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "15px",
  },
  title: {
    fontSize: "2rem",
    color: "#2c3e50",
    margin: 0,
    fontWeight: "600",
    borderBottom: "4px solid #4CAF50",
    paddingBottom: "10px",
    display: "inline-block",
  },
  exportButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(76, 175, 80, 0.3)",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "15px",
  },
  searchContainer: {
    position: "relative",
    flex: "1",
    minWidth: "300px",
  },
  searchInput: {
    width: "100%",
    padding: "14px 20px 14px 45px",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    backgroundColor: "white",
    outline: "none",
  },
  searchIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "1.2rem",
    color: "#757575",
  },
  filterContainer: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  filterSelect: {
    padding: "12px 20px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "1rem",
    backgroundColor: "white",
    cursor: "pointer",
    outline: "none",
    minWidth: "180px",
  },
  statsContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  statCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    flex: "1",
    minWidth: "150px",
    textAlign: "center",
    transition: "transform 0.3s ease",
  },
  statLabel: {
    display: "block",
    color: "#666",
    fontSize: "0.9rem",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statValue: {
    display: "block",
    fontSize: "2rem",
    fontWeight: "700",
    color: "#2c3e50",
  },
  tableContainer: {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
  },
  tableHeader: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  th: {
    padding: "15px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "1rem",
    borderBottom: "3px solid #45a049",
  },
  tableRow: {
    transition: "background-color 0.3s ease",
    cursor: "pointer",
  },
  td: {
    padding: "15px",
    borderBottom: "1px solid #e0e0e0",
    fontSize: "0.95rem",
  },
  nameCell: {
    fontWeight: "500",
    color: "#2c3e50",
  },
  emailLink: {
    color: "#2196F3",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  phoneLink: {
    color: "#4CAF50",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  noData: {
    color: "#999",
    fontStyle: "italic",
  },
  messageCell: {
    maxWidth: "300px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#666",
  },
  dateCell: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  timeText: {
    fontSize: "0.85rem",
    color: "#999",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
    gap: "20px",
  },
  loadingSpinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #4CAF50",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
    gap: "20px",
  },
  retryButton: {
    padding: "12px 30px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  noDataContainer: {
    padding: "60px 20px",
    textAlign: "center",
  },
  noDataText: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "20px",
  },
  clearButton: {
    padding: "10px 25px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  tr:hover { background-color: #f5f5f5; }
  a:hover { text-decoration: underline; }
  button:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
  input:focus { border-color: #4CAF50; box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1); }
  select:focus { border-color: #4CAF50; box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1); }
`;
document.head.appendChild(styleSheet);

export default ContactFormDetails;