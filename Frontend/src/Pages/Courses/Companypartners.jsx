// Companypartners.jsx
import React from "react";
import styles from "./Companypartners.module.css";

const Companypartners = () => {
  // Partner logos (PNG images with colors)
  const partners = [
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
  ];

  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [
    ...partners,
    ...partners,
    ...partners,
    ...partners,
  ];

  return (
    <div className={styles.companyPartners}>
      <div className={styles.container}>
        <h2 className={styles.title}>Our Trusted Partners</h2>
        <p className={styles.subtitle}>
          We collaborate with industry-leading companies to provide the best
          learning experience
        </p>

        <div className={styles.sliderWrapper}>
          {/* Left smoke effect - more subtle */}
          <div className={`${styles.smoke} ${styles.smokeLeft}`}>
            <div className={styles.smokeGradient}></div>
          </div>

          {/* Right smoke effect - more subtle */}
          <div className={`${styles.smoke} ${styles.smokeRight}`}>
            <div className={styles.smokeGradient}></div>
          </div>

          {/* Scrolling logos container */}
          <div className={styles.slider}>
            <div className={styles.slideTrack}>
              {duplicatedPartners.map((partner, index) => (
                <div key={`${partner.id}-${index}`} className={styles.slide}>
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={styles.partnerLogo}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/120x50?text=Partner";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companypartners;
