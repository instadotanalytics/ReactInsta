import React, { useEffect, useState } from "react";
import styles from "./PlacementList.module.css";
import { API_BASE_URL } from "../config/api.js"; // ✅ Global API config

const PlacementList = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/placements`); // ✅ localhost hata diya
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
    return <div className={styles.center}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.center}>Failed to load placements</div>;
  }

  // Split into 2 rows
  const half = Math.ceil(placements.length / 2);
  const firstRow = placements.slice(0, half);
  const secondRow = placements.slice(half);


};

const Card = ({ item }) => (
  <div className={styles.card}>
    <div className={styles.imageWrapper}>
      <img src={item.profileImage} alt={item.fullName} loading="lazy" />
    </div>

    <h3 className={styles.name}>{item.fullName}</h3>
    <p className={styles.package}>{item.package}</p>

    <div className={styles.companyLogo}>
      <img src={item.companyLogo} alt="company logo" loading="lazy" />
    </div>
  </div>
);

export default PlacementList;