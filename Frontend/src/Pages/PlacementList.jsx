import React, { useEffect, useState } from "react";
import styles from "./PlacementList.module.css";
import { API_BASE_URL } from "../config/api.js";
import { MdOutlineAttachMoney } from "react-icons/md";

const PlacementList = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/placements`);
      const data = await res.json();
      if (data.success) {
        setPlacements(data.data);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.center}>
          <div className={styles.spinner} />
          <p>Loading placements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.center}>Failed to load placements.</div>
      </div>
    );
  }

  const half = Math.ceil(placements.length / 2);
  const firstRow = placements.slice(0, half);
  const secondRow = placements.slice(half);

  // Minimum 8 cards chahiye smooth scroll ke liye — duplicate karo
  const padRow = (arr) => {
    if (arr.length === 0) return [];
    let result = [...arr];
    while (result.length < 8) result = [...result, ...arr];
    return [...result, ...result]; // double for seamless loop
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.sectionTag}>Placements</div>
        <h2 className={styles.heading}>Our Placement Success Stories</h2>
        <p className={styles.subText}>
          Our students are proudly placed at top companies across the country with outstanding packages.
        </p>

        <div className={styles.marqueeWrapper}>
          {/* Row 1 — Left to Right */}
          <div className={styles.trackLeft}>
            {padRow(firstRow).map((item, index) => (
              <Card key={`left-${index}`} item={item} />
            ))}
          </div>

          {/* Row 2 — Right to Left */}
          <div className={styles.trackRight}>
            {padRow(secondRow).map((item, index) => (
              <Card key={`right-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ item }) => {
  const date = item.placementDate
    ? new Date(item.placementDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
    : null;

  return (
    <div className={styles.card}>
      {/* Top: Avatar + Company Logo */}
      <div className={styles.cardTop}>
        <div className={styles.avatarWrap}>
          <img src={item.profileImage} alt={item.fullName} loading="lazy" />
        </div>
        <div className={styles.companyLogoWrap}>
          <img
            src={item.companyLogo}
            alt="company"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <span className={styles.logoFallback}>{item.designation || "Co"}</span>
        </div>
      </div>

      {/* Student Info */}
      <div className={styles.cardBody}>
        <h3 className={styles.name}>{item.fullName}</h3>
        <p className={styles.designation}>{item.designation || "Software Engineer"}</p>

        {item.description && (
          <p className={styles.description}>{item.description}</p>
        )}
      </div>

      {/* Tags */}
      <div className={styles.tagsRow}>
        <span className={styles.pkgTag}><MdOutlineAttachMoney /> {item.package} LPA</span>
        {item.location && <span className={styles.locTag}>📍 {item.location}</span>}
      </div>

      {/* Footer */}
      <div className={styles.cardFooter}>
        <div className={styles.footerLogo}>
          <img
            src={item.companyLogo}
            alt="company"
            loading="lazy"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
        <div className={styles.footerMeta}>
          {item.batch && <span className={styles.batch}>Batch {item.batch}</span>}
          {date && <span className={styles.date}>{date}</span>}
        </div>
      </div>
    </div>
  );
};

export default PlacementList;