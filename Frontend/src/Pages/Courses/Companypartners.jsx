// Companypartners.jsx
import React from "react";
import styles from "./Companypartners.module.css";

const Companypartners = ({ partners: customPartners }) => {
  const defaultPartners = [
    {
      id: 1,
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    },
    {
      id: 2,
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      id: 3,
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      id: 4,
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      id: 5,
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    },
    {
      id: 6,
      name: "IBM",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    },
    {
      id: 7,
      name: "Intel",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg",
    },
    {
      id: 8,
      name: "Cisco",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
    },
    {
      id: 9,
      name: "Oracle",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    },
    {
      id: 10,
      name: "Salesforce",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    },
    {
      id: 11,
      name: "Adobe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png",
    },
    {
      id: 12,
      name: "NVIDIA",
      logo: "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg",
    },
  ];

  const partners = customPartners || defaultPartners;

  const chunk = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const rows = chunk(partners, Math.ceil(partners.length / 3));
  while (rows.length < 3) rows.push(rows[0] || []);

  // 6x repeat for seamless infinite scroll
  const makeRow = (row) => [...row, ...row, ...row, ...row, ...row, ...row];

  return (
    <div className={styles.outerContainer}>
      <section className={styles.companyPartners}>
        {/* LEFT: Big heading */}
        <div className={styles.textBlock}>
          <h2 className={styles.title}>
            Trusted by<br />
            Dreamers,
            Doers and<br />
            Leaders
          </h2>
          <p className={styles.subtitle}>
            We collaborate with industry-leading companies to provide
            the best learning experience
          </p>
        </div>

        {/* RIGHT: Diagonal scrolling logos — pushed to corner */}
        <div className={styles.diagonalWrapper}>
          <div className={styles.diagonalInner}>

            {/* Row 1 — scrolls left */}
            <div className={styles.scrollRow}>
              <div className={`${styles.track} ${styles.trackLeft}`}>
                {makeRow(rows[0]).map((p, i) => (
                  <LogoCard key={`r1-${p.id}-${i}`} partner={p} />
                ))}
              </div>
            </div>

            {/* Row 2 — scrolls right */}
            <div className={styles.scrollRow}>
              <div className={`${styles.track} ${styles.trackRight}`}>
                {makeRow(rows[1]).map((p, i) => (
                  <LogoCard key={`r2-${p.id}-${i}`} partner={p} />
                ))}
              </div>
            </div>

            {/* Row 3 — scrolls left */}
            <div className={styles.scrollRow}>
              <div className={`${styles.track} ${styles.trackLeft}`}>
                {makeRow(rows[2]).map((p, i) => (
                  <LogoCard key={`r3-${p.id}-${i}`} partner={p} />
                ))}
              </div>
            </div>

          </div>

          {/* Fade masks — left fades into black, top & bottom clean */}
          <div className={`${styles.mask} ${styles.maskTop}`} />
          <div className={`${styles.mask} ${styles.maskBottom}`} />
          <div className={`${styles.mask} ${styles.maskLeft}`} />
          <div className={`${styles.mask} ${styles.maskRight}`} />
        </div>
      </section>
    </div>
  );
};

const LogoCard = ({ partner }) => (
  <div className={styles.card}>
    <img
      src={partner.logo}
      alt={partner.name}
      className={styles.logo}
      loading="lazy"
      onError={(e) => {
        e.target.onerror = null;
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "block";
      }}
    />
    <span className={styles.fallbackName}>{partner.name}</span>
  </div>
);

export default Companypartners;