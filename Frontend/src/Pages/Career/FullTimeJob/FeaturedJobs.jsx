// FeaturedJobs.jsx
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Briefcase,
  Users,
  CheckCircle,
  Globe,
  Sparkles,
  ChevronDown,
  Building2,
  Award,
  TrendingUp,
  Zap,
  Clock,
  Star,
  ThumbsUp,
} from "lucide-react";
import styles from "./FeaturedJobs.module.css";

const FeaturedJobs = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  // Featured Companies Data
  const featuredCompanies = [
    {
      name: "Google",
      logo: "G",
      role: "Software Engineer",
      type: "Remote",
      salary: "₹28 LPA",
      experience: "3-5 Years",
      applicants: "2.4K",
      rating: "4.8",
      posted: "2 days ago",
      color: "blue",
      bgColor: "blue",
    },
    {
      name: "Microsoft",
      logo: "M",
      role: "Frontend Engineer",
      type: "Hybrid",
      salary: "₹22 LPA",
      experience: "2-4 Years",
      applicants: "1.8K",
      rating: "4.7",
      posted: "3 days ago",
      color: "purple",
      bgColor: "purple",
    },
    {
      name: "Amazon",
      logo: "A",
      role: "Backend Engineer",
      type: "On-site",
      salary: "₹25 LPA",
      experience: "4-6 Years",
      applicants: "3.1K",
      rating: "4.6",
      posted: "1 day ago",
      color: "orange",
      bgColor: "orange",
    },
  ];

  // Stats Data for floating cards
  const floatingStats = [
    { number: "12K+", label: "Active Jobs", icon: Briefcase, color: "blue" },
    { number: "850+", label: "Hiring Companies", icon: Building2, color: "purple" },
    { number: "95%", label: "Verified Listings", icon: CheckCircle, color: "green" },
    { number: "2300+", label: "Remote Jobs", icon: Globe, color: "orange" },
  ];

  return (
    <section ref={ref} className={styles.section}>
      {/* Background Decorative Elements */}
      <div className={styles.backgroundDecorations}>
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgOrb3} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className={styles.container}
      >
        {/* Top Center Badge */}
        <motion.div variants={itemVariants} className={styles.badgeWrapper}>
          <div className={styles.badgeContainer}>
            <div className={styles.badgeGlow} />
            <div className={styles.badge}>
              <div className={styles.badgeIcon}>
                <Sparkles className={styles.iconSmall} />
              </div>
              <div className={styles.badgeText}>
                <span className={styles.badgeHighlight}>🔥 1000+</span>
                <span className={styles.badgeLabel}>Companies Hiring</span>
              </div>
              <div className={styles.badgeDivider} />
              <div className={styles.badgeVerified}>
                <Award className={styles.iconTiny} />
                <span className={styles.badgeVerifiedText}>Verified Jobs</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center Hero */}
        <motion.div variants={itemVariants} className={styles.heroSection}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", damping: 15 }}
            className={styles.trendingBadge}
          >
            <TrendingUp className={styles.iconTiny} />
            <span className={styles.trendingText}>Top companies are hiring now</span>
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className={styles.heroTitleDark}>Land Your</span>
            <br />
            <span className={styles.heroTitleGradient}>Dream Job</span>
          </motion.h1>

          <motion.p
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Discover thousands of verified full-time opportunities from the
            world's best companies.
          </motion.p>

          <motion.div
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.primaryBtn}
            >
              <span className={styles.primaryBtnContent}>
                Explore Jobs
                <ArrowRight className={styles.iconMedium} />
              </span>
              <div className={styles.primaryBtnGlow} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.secondaryBtn}
            >
              Browse Companies
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Three Feature Cards - Pattern Style */}
        <motion.div
          variants={containerVariants}
          className={styles.cardsGrid}
        >
          {featuredCompanies.map((company, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className={`${styles.featureCard} ${styles[`featureCard${company.color}`]}`}
            >
              <div className={styles.featureCardPattern} />
              <div className={styles.featureCardGlow} />
              
              <div className={styles.featureCardContent}>
                {/* Company Header */}
                <div className={styles.featureCardHeader}>
                  <div className={styles.featureCardLogo}>
                    <div className={`${styles.logoContainer} ${styles[`logoContainer${company.color}`]}`}>
                      {company.logo}
                    </div>
                    <div>
                      <h3 className={styles.companyName}>{company.name}</h3>
                      <p className={styles.companyTag}>Featured Company</p>
                    </div>
                  </div>
                  <div className={styles.featuredBadge}>
                    <Star className={styles.iconTiny} />
                    {company.rating}
                  </div>
                </div>

                {/* Role */}
                <h4 className={styles.roleTitle}>{company.role}</h4>

                {/* Tags */}
                <div className={styles.tagsContainer}>
                  <div className={styles.tag}>
                    <MapPin className={styles.iconTiny} />
                    {company.type}
                  </div>
                  <div className={styles.tag}>
                    <Briefcase className={styles.iconTiny} />
                    {company.experience}
                  </div>
                  <div className={styles.tag}>
                    <Clock className={styles.iconTiny} />
                    {company.posted}
                  </div>
                </div>

                {/* Footer with Salary and Apply */}
                <div className={styles.cardFooter}>
                  <div className={styles.salarySection}>
                    <span className={styles.salary}>{company.salary}</span>
                    <span className={styles.applicants}>
                      <Users className={styles.iconTiny} />
                      {company.applicants} applied
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className={styles.cardAction}
                  >
                    Apply Now →
                  </motion.button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className={`${styles.featureCardDeco} ${styles[`featureCardDeco${company.color}`]}`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Floating Stats */}
        <motion.div
          variants={containerVariants}
          className={styles.statsGrid}
        >
          {floatingStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className={`${styles.statCard} ${styles[`statCard${stat.color}`]}`}
              >
                <div className={`${styles.statCardGlow} ${styles[`statCardGlow${stat.color}`]}`} />
                
                <div className={styles.statCardContent}>
                  <div className={`${styles.statIcon} ${styles[`statIcon${stat.color}`]}`}>
                    <Icon className={styles.iconMedium} />
                  </div>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>

                <div className={`${styles.statCardDeco} ${styles[`statCardDeco${stat.color}`]}`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className={styles.scrollIndicator}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={styles.scrollContent}
          >
            <span>Scroll to explore</span>
            <ChevronDown className={styles.iconTiny} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturedJobs;