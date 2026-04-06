import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OurPremiumServices.module.css";

const OurPremiumServices = () => {

  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Internship",
      route: "/career/internship",
      image:
        "https://img.freepik.com/free-vector/internship-program-concept-illustration_114360-3327.jpg",
      features: [
        "Real-time project experience",
        "Industry expert mentorship",
        "Certificate of completion",
        "Flexible working hours",
      ],
    },
    {
      id: 2,
      title: "Full Time Job",
      route: "/career/fulltime",
      image:
        "https://img.freepik.com/free-vector/job-interview-concept-illustration_114360-2357.jpg",
      features: [
        "Full-time employment",
        "Health insurance benefits",
        "Paid leaves & holidays",
        "Professional development",
      ],
      popular: true,
    },
    {
      id: 3,
      title: "Placement",
      route: "/career/placement",
      image:
        "https://img.freepik.com/free-vector/career-path-concept-illustration_114360-3506.jpg",
      features: [
        "100% placement assistance",
        "Resume building workshop",
        "Mock interview sessions",
        "Company referrals",
      ],
    },
  ];

  return (
    <section className={styles.premiumSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Premium Services</h2>
          <p className={styles.subtitle}>
            Choose the best plan that suits your career goals
          </p>
        </div>

        <div className={styles.cardGrid}>
          {services.map((service) => (
            <div
              key={service.id}
              className={`${styles.card} ${
                service.popular ? styles.popularCard : ""
              }`}
            >
              {service.popular && (
                <div className={styles.popularBadge}>Popular</div>
              )}

              <div className={styles.imageContainer}>
                <img
                  src={service.image}
                  alt={service.title}
                  className={styles.cardImage}
                />
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                </div>

                <div className={styles.featuresList}>
                  {service.features.map((feature, index) => (
                    <div key={index} className={styles.featureItem}>
                      <svg
                        className={styles.checkIcon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={styles.detailsButton}
                  onClick={() => navigate(service.route)}
                >
                  View All Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPremiumServices;