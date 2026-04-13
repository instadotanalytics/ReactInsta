import React, { useEffect, useState } from "react";
import styles from "./PlacementList.module.css";
import { API_BASE_URL } from "../config/api.js";

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
      if (data.success) setPlacements(data.data);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className={styles.mainContainer}>
        <div className={styles.center}>
          <div className={styles.spinner} />
          <p>Loading placements...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className={styles.mainContainer}>
        <div className={styles.center}>Failed to load placements.</div>
      </div>
    );

  const half = Math.ceil(placements.length / 2);

  const padRow = (arr) => {
    if (!arr.length) return [];
    let result = [...arr];
    while (result.length < 8) result = [...result, ...arr];
    return [...result, ...result];
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <span className={styles.badge}>★ Placements ★</span>
        <h2 className={styles.heading}>Our Placement Success Stories</h2>
        <p className={styles.subText}>
          Congratulations to all our students placed at top companies across India.
        </p>

        <div className={styles.marqueeWrapper}>
          <div className={styles.trackLeft}>
            {padRow(placements.slice(0, half)).map((item, i) => (
              <Card key={`L-${i}`} item={item} />
            ))}
          </div>
          <div className={styles.trackRight}>
            {padRow(placements.slice(half)).map((item, i) => (
              <Card key={`R-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ item }) => {
  const date = item.placementDate
    ? new Date(item.placementDate).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className={styles.card}>

      {/* ── Top Gold Ribbon ── */}
      <div className={styles.ribbonTop} />

      {/* ── Congratulations Label ── */}
      <div className={styles.congratsLabel}>★ Congratulations ★</div>

      {/* ── Avatar ── */}
      <div className={styles.avatarWrap}>
        <img src={item.profileImage} alt={item.fullName} loading="lazy" />
      </div>

      {/* ── Star + Ribbon Row ── */}
      <div className={styles.starRow}>
        <div className={styles.ribbonLeft} />
        <span className={styles.star}>⭐</span>
        <div className={styles.ribbonRight} />
      </div>

      {/* ── Name & Designation ── */}
      <h3 className={styles.name}>{item.fullName}</h3>
      <p className={styles.designation}>{item.designation}</p>

      {/* ── Gold Divider ── */}
      <div className={styles.dividerGold} />

      {/* ── Description ── */}
      {item.description && (
        <p className={styles.description}>{item.description}</p>
      )}

      {/* ── Tags ── */}
      <div className={styles.tagsRow}>
        {item.package && (
          <span className={styles.pkgTag}>◆ {item.package} LPA</span>
        )}
        {item.location && (
          <span className={styles.locTag}>◎ {item.location}</span>
        )}
        {item.batch && (
          <span className={styles.batchTag}>Batch {item.batch}</span>
        )}
      </div>

      {/* ── Company Logo Box ── */}
      <div className={styles.logoBox}>
       
        <img
          src={item.companyLogo}
          alt={item.companyName || "company logo"}
          loading="lazy"
          className={styles.logoImg}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }}
        />
        <span className={styles.logoFallback}>
          {item.companyName || item.designation || "Company"}
        </span>
      </div>

      {/* ── Placed Date ── */}
      {date && (
        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <span className={styles.metaLabel}>Placed: </span>
            {date}
          </span>
        </div>
      )}

      {/* ── Spacer pushes ribbon to bottom ── */}
      <div className={styles.spacer} />

      {/* ── Bottom Gold Ribbon ── */}
      <div className={styles.ribbonBottom} />

    </div>
  );
};

export default PlacementList;