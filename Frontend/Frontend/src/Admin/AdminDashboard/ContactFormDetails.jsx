import React, { useEffect, useState, useCallback } from "react";
import { API_BASE_URL } from "../../config/api";

const ContactFormDetails = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterAndSearchMessages();
  }, [messages, searchTerm, filterBy, sortOrder]);

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/contact`);
      const data = await response.json();

      if (response.ok && data.success) {
        setMessages(data.data);
      } else {
        setError("Failed to load messages. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSearchMessages = useCallback(() => {
    let filtered = [...messages];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (msg) =>
          msg.name.toLowerCase().includes(q) ||
          msg.email.toLowerCase().includes(q) ||
          msg.message.toLowerCase().includes(q) ||
          (msg.phone && msg.phone.includes(q))
      );
    }

    if (filterBy !== "all") {
      filtered = filtered.filter((msg) => {
        if (filterBy === "recent") {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return new Date(msg.createdAt) >= sevenDaysAgo;
        }
        if (filterBy === "hasPhone") {
          return msg.phone && msg.phone.trim() !== "";
        }
        return true;
      });
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    setFilteredMessages(filtered);
  }, [messages, searchTerm, filterBy, sortOrder]);

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        setDeleteId(null);
        if (selectedMsg && selectedMsg._id === id) setSelectedMsg(null);
      } else {
        alert("Failed to delete message. Please try again.");
      }
    } catch (err) {
      alert("Server error. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!filteredMessages.length) return;
    const headers = ["Name", "Email", "Phone", "Message", "Date"];
    const csvData = filteredMessages.map((msg) => [
      `"${msg.name}"`,
      `"${msg.email}"`,
      `"${msg.phone || ""}"`,
      `"${msg.message.replace(/"/g, '""')}"`,
      `"${new Date(msg.createdAt).toLocaleDateString("en-IN")}"`,
    ]);
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-messages-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const thisWeekCount = messages.filter((m) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(m.createdAt) >= sevenDaysAgo;
  }).length;

  // ── Loading ──
  if (loading) {
    return (
      <div style={s.centered}>
        <div style={s.bigSpinner} />
        <p style={{ color: "#6b7280", marginTop: 16, fontSize: 15 }}>
          Loading messages...
        </p>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div style={s.centered}>
        <div style={s.errorIcon}>!</div>
        <p style={{ color: "#dc2626", fontSize: 16, marginBottom: 16 }}>{error}</p>
        <button onClick={fetchMessages} style={s.btnPrimary}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* ── Header ── */}
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Contact Messages</h1>
          <p style={s.pageSubtitle}>All user enquiries will appear here</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={fetchMessages} style={s.btnOutline}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Refresh
          </button>
          <button
            onClick={exportToCSV}
            disabled={!filteredMessages.length}
            style={
              filteredMessages.length
                ? s.btnPrimary
                : { ...s.btnPrimary, opacity: 0.5, cursor: "not-allowed" }
            }
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={s.statsGrid}>
        {[
          { label: "Total Messages", value: messages.length, color: "#6366f1" },
          { label: "This Week", value: thisWeekCount, color: "#10b981" },
          { label: "With Phone", value: messages.filter((m) => m.phone).length, color: "#f59e0b" },
          { label: "Filtered Results", value: filteredMessages.length, color: "#3b82f6" },
        ].map((stat, i) => (
          <div key={i} style={s.statCard}>
            <div style={{ ...s.statDot, background: stat.color }} />
            <div style={s.statValue}>{stat.value}</div>
            <div style={s.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── Controls ── */}
      <div style={s.controls}>
        <div style={s.searchWrap}>
          <svg
            style={s.searchIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={s.searchInput}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} style={s.clearBtn}>
              ✕
            </button>
          )}
        </div>
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          style={s.select}
        >
          <option value="all">All Messages</option>
          <option value="recent">Last 7 Days</option>
          <option value="hasPhone">With Phone Number</option>
        </select>
        <button
          onClick={() => setSortOrder((o) => (o === "desc" ? "asc" : "desc"))}
          style={s.btnOutline}
          title="Sort by date"
        >
          {sortOrder === "desc" ? "↓ Newest First" : "↑ Oldest First"}
        </button>
      </div>

      {/* ── Table ── */}
      <div style={s.tableCard}>
        {filteredMessages.length === 0 ? (
          <div style={s.empty}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="1.5"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <p style={{ color: "#9ca3af", marginTop: 12, fontSize: 15 }}>
              {searchTerm ? "No results found." : "No messages yet."}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                style={{ ...s.btnPrimary, marginTop: 12 }}
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={s.table}>
              <thead>
                <tr>
                  {["#", "Name", "Email", "Phone", "Message", "Date", "Action"].map((h) => (
                    <th key={h} style={s.th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((msg, index) => (
                  <tr
                    key={msg._id}
                    style={s.tr}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ ...s.td, color: "#9ca3af", fontSize: 13 }}>{index + 1}</td>
                    <td style={s.td}>
                      <div style={s.nameCell}>
                        <div style={s.avatar}>{msg.name.charAt(0).toUpperCase()}</div>
                        <span style={{ fontWeight: 500, color: "#111827" }}>{msg.name}</span>
                      </div>
                    </td>
                    <td style={s.td}>
                      <a href={`mailto:${msg.email}`} style={s.emailLink}>
                        {msg.email}
                      </a>
                    </td>
                    <td style={s.td}>
                      {msg.phone ? (
                        <a href={`tel:${msg.phone}`} style={s.phoneLink}>
                          {msg.phone}
                        </a>
                      ) : (
                        <span style={{ color: "#d1d5db" }}>—</span>
                      )}
                    </td>
                    <td style={s.td}>
                      <div
                        style={s.msgPreview}
                        title={msg.message}
                        onClick={() => setSelectedMsg(msg)}
                      >
                        {msg.message}
                      </div>
                    </td>
                    <td style={s.td}>
                      <div style={{ fontSize: 13, color: "#374151" }}>
                        {formatDate(msg.createdAt)}
                      </div>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>
                        {formatTime(msg.createdAt)}
                      </div>
                    </td>
                    <td style={s.td}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          onClick={() => setSelectedMsg(msg)}
                          style={s.actionBtn}
                          title="View full message"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteId(msg._id)}
                          style={{ ...s.actionBtn, color: "#ef4444", borderColor: "#fca5a5" }}
                          title="Delete message"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Message Detail Modal ── */}
      {selectedMsg && (
        <div style={s.modalOverlay} onClick={() => setSelectedMsg(null)}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <div style={s.modalAvatar}>
                {selectedMsg.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#111827", marginBottom: 4 }}>
                  {selectedMsg.name}
                </h3>
                <p style={{ fontSize: 13, color: "#6b7280" }}>
                  {formatDate(selectedMsg.createdAt)} · {formatTime(selectedMsg.createdAt)}
                </p>
              </div>
              <button onClick={() => setSelectedMsg(null)} style={s.closeBtn}>
                ✕
              </button>
            </div>
            <div style={s.modalBody}>
              <div style={s.modalRow}>
                <span style={s.modalLabel}>Email</span>
                <a href={`mailto:${selectedMsg.email}`} style={s.emailLink}>
                  {selectedMsg.email}
                </a>
              </div>
              <div style={s.modalRow}>
                <span style={s.modalLabel}>Phone</span>
                <span style={{ color: "#374151" }}>{selectedMsg.phone || "—"}</span>
              </div>
              <div style={{ marginTop: 20 }}>
                <span style={s.modalLabel}>Message</span>
                <div style={s.fullMessage}>{selectedMsg.message}</div>
              </div>
            </div>
            <div style={s.modalFooter}>
              <a href={`mailto:${selectedMsg.email}`} style={s.btnPrimary}>
                Reply
              </a>
              <button
                onClick={() => {
                  setDeleteId(selectedMsg._id);
                  setSelectedMsg(null);
                }}
                style={{ ...s.btnOutline, color: "#ef4444", borderColor: "#fca5a5" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteId && (
        <div style={s.modalOverlay} onClick={() => setDeleteId(null)}>
          <div
            style={{ ...s.modal, maxWidth: 400 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: "center", padding: "24px 24px 0" }}>
              <div style={s.deleteIcon}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
              </div>
              <h3
                style={{ fontSize: 18, fontWeight: 600, color: "#111827", marginBottom: 8 }}
              >
                Delete Message?
              </h3>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
                This message will be permanently deleted. This action cannot be undone.
              </p>
            </div>
            <div style={{ ...s.modalFooter, justifyContent: "center" }}>
              <button
                onClick={() => setDeleteId(null)}
                style={s.btnOutline}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleteLoading}
                style={{
                  ...s.btnPrimary,
                  background: "#dc2626",
                  opacity: deleteLoading ? 0.7 : 1,
                }}
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Inline Styles ─────────────────────────────── */
const s = {
  page: {
    padding: "32px",
    maxWidth: 1300,
    margin: "0 auto",
    backgroundColor: "#f7f6f3",
    minHeight: "100vh",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  centered: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: 16,
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
    flexWrap: "wrap",
    gap: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: "#0f0f1a",
    marginBottom: 4,
    letterSpacing: "-0.02em",
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    background: "#fff",
    border: "1.5px solid #f3f4f6",
    borderRadius: 16,
    padding: "20px 24px",
    position: "relative",
    overflow: "hidden",
  },
  statDot: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: "16px 16px 0 0",
  },
  statValue: {
    fontSize: 32,
    fontWeight: 700,
    color: "#111827",
    lineHeight: 1,
    marginBottom: 6,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontWeight: 500,
  },
  controls: {
    display: "flex",
    gap: 12,
    marginBottom: 20,
    flexWrap: "wrap",
    alignItems: "center",
  },
  searchWrap: {
    position: "relative",
    flex: 1,
    minWidth: 240,
  },
  searchIcon: {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "11px 40px 11px 42px",
    border: "1.5px solid #e5e7eb",
    borderRadius: 12,
    fontSize: 14,
    color: "#111827",
    background: "#fff",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border 0.2s",
  },
  clearBtn: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#9ca3af",
    fontSize: 14,
    padding: "2px 6px",
  },
  select: {
    padding: "11px 16px",
    border: "1.5px solid #e5e7eb",
    borderRadius: 12,
    fontSize: 14,
    color: "#374151",
    background: "#fff",
    cursor: "pointer",
    outline: "none",
    fontFamily: "inherit",
    minWidth: 180,
  },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 20px",
    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    textDecoration: "none",
    transition: "all 0.2s",
  },
  btnOutline: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 18px",
    background: "#fff",
    color: "#374151",
    border: "1.5px solid #e5e7eb",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  actionBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    background: "#fff",
    border: "1.5px solid #e5e7eb",
    borderRadius: 8,
    cursor: "pointer",
    color: "#6b7280",
    transition: "all 0.2s",
  },
  tableCard: {
    background: "#fff",
    borderRadius: 20,
    border: "1.5px solid #f3f4f6",
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
  },
  th: {
    padding: "14px 16px",
    textAlign: "left",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#9ca3af",
    background: "#fafafa",
    borderBottom: "1.5px solid #f3f4f6",
  },
  tr: {
    transition: "background 0.15s",
    cursor: "default",
  },
  td: {
    padding: "14px 16px",
    borderBottom: "1px solid #f9fafb",
    verticalAlign: "middle",
  },
  nameCell: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 700,
    flexShrink: 0,
  },
  emailLink: {
    color: "#6366f1",
    textDecoration: "none",
    fontSize: 13,
  },
  phoneLink: {
    color: "#10b981",
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 500,
  },
  msgPreview: {
    maxWidth: 240,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#6b7280",
    fontSize: 13,
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: 6,
    transition: "background 0.15s",
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  bigSpinner: {
    width: 44,
    height: 44,
    border: "3px solid #f3f4f6",
    borderTop: "3px solid #6366f1",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  errorIcon: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#fef2f2",
    border: "2px solid #fca5a5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: 700,
    color: "#dc2626",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 20,
  },
  modal: {
    background: "#fff",
    borderRadius: 20,
    width: "100%",
    maxWidth: 560,
    boxShadow: "0 25px 80px rgba(0,0,0,0.2)",
    overflow: "hidden",
    animation: "fadeUp 0.3s ease",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "24px 24px 20px",
    borderBottom: "1.5px solid #f3f4f6",
    position: "relative",
  },
  modalAvatar: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 700,
    flexShrink: 0,
  },
  closeBtn: {
    marginLeft: "auto",
    background: "#f3f4f6",
    border: "none",
    width: 32,
    height: 32,
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: 13,
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBody: {
    padding: "20px 24px",
  },
  modalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #f9fafb",
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#9ca3af",
  },
  fullMessage: {
    marginTop: 10,
    background: "#f9fafb",
    border: "1.5px solid #f3f4f6",
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 14,
    color: "#374151",
    lineHeight: 1.7,
    whiteSpace: "pre-wrap",
  },
  modalFooter: {
    display: "flex",
    gap: 10,
    padding: "16px 24px 24px",
    justifyContent: "flex-end",
  },
  deleteIcon: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "#fef2f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
  },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
`;
if (!document.head.querySelector("[data-contact-admin]")) {
  styleSheet.setAttribute("data-contact-admin", "true");
  document.head.appendChild(styleSheet);
}

export default ContactFormDetails;