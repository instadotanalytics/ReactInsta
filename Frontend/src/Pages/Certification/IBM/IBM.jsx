import React from "react";
import styles from "./IBM.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import CertificationApplyForm from "../../CertificationApplyForm";
// import Companypartners from "../../Courses/Companypartners";
import InnovationShowcase from "../../InnovationShowcase";
import AboutIBM from "./AboutIBM";
// import ReviewSection from "../../ReviewSection";
import IBMValueProposition from "./IBMValueProposition";

import { FiArrowRight, FiClock, FiCheckCircle } from "react-icons/fi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import {
  MdOutlineCloud,
  MdOutlinePsychology,
  MdOutlineBarChart,
  MdOutlineShield,
} from "react-icons/md";
import {
  RiTrophyLine,
  RiRefreshLine,
  RiBriefcaseLine,
  RiGlobalLine,
} from "react-icons/ri";
import { TbCertificate } from "react-icons/tb";


const IBM = () => {
  const certifications = [
    { icon: <MdOutlineCloud size={22} />, title: "Cloud Computing", description: "AWS, Azure, hybrid cloud architecture" },
    { icon: <MdOutlinePsychology size={22} />, title: "Artificial Intelligence", description: "Watson, NLP, machine learning" },
    { icon: <MdOutlineBarChart size={22} />, title: "Data Science", description: "Analysis, visualization, Python" },
    { icon: <MdOutlineShield size={22} />, title: "Cybersecurity", description: "Threat management, compliance" },
  ];

 
  const features = [
    { icon: <RiTrophyLine size={28} />, title: "Industry Trust", desc: "Recognized by 90% of Fortune 500 companies" },
    { icon: <RiRefreshLine size={28} />, title: "Always Updated", desc: "Curriculum aligned with latest tech trends" },
    { icon: <RiBriefcaseLine size={28} />, title: "Career Boost", desc: "Average 35% salary increase after certification" },
    { icon: <RiGlobalLine size={28} />, title: "Global Community", desc: "Connect with IBM professionals worldwide" },
  ];

  const certTracks = [
    {
      icon: <MdOutlineCloud size={30} />,
      title: "Cloud Computing",
      desc: "Master AWS, Azure & hybrid cloud architecture for modern enterprises.",
      modules: "12 Modules",
      bg: "#EFF6FF",
      color: "#2563EB",
    },
    {
      icon: <MdOutlinePsychology size={30} />,
      title: "Artificial Intelligence",
      desc: "Watson AI, NLP systems, and machine learning model deployment.",
      modules: "16 Modules",
      bg: "#F5F3FF",
      color: "#7C3AED",
    },
    {
      icon: <MdOutlineBarChart size={30} />,
      title: "Data Science",
      desc: "Data analysis, visualization, Python, and statistical modeling.",
      modules: "14 Modules",
      bg: "#ECFDF5",
      color: "#059669",
    },
    {
      icon: <MdOutlineShield size={30} />,
      title: "Cybersecurity",
      desc: "Threat management, compliance frameworks, and risk assessment.",
      modules: "10 Modules",
      bg: "#FFF7ED",
      color: "#EA580C",
    },
  ];

  return (
    <>
      <Header />
      {/* ── HERO ── */}
      <section className={styles.heroSection}>

        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>

        <div className={styles.heroInner}>

          {/* LEFT */}
          <div className={styles.leftContent}>
            <div className={styles.eyebrow}>
              <TbCertificate size={14} />
              Globally Recognized Credentials
            </div>

            <h1 className={styles.title}>
              Advance Your Career with{" "}
              <span className={styles.highlight}>IBM Certifications</span>
            </h1>

            <p className={styles.description}>
              Gain industry-recognized credentials in Cloud Computing,
              Artificial Intelligence, Data Science, and Cybersecurity with
              professional IBM certification programs.
            </p>

            

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>500K+</span>
                <span className={styles.statLabel}>Certified Pros</span>
              </div>
              <div className={styles.statDiv} />
              <div className={styles.statItem}>
                <span className={styles.statNum}>87%</span>
                <span className={styles.statLabel}>Career Growth</span>
              </div>
              <div className={styles.statDiv} />
              <div className={styles.statItem}>
                <span className={styles.statNum}>150+</span>
                <span className={styles.statLabel}>Countries</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.rightContent}>
            <div className={styles.imgWrapper}>
              <img
                src="/ibmlogo.png"
                alt="IBM"
                className={styles.heroImg}
              />

            </div>

            <div className={styles.certGrid}>
              {certifications.map((cert, i) => (
                <div key={i} className={styles.certCard}>
                  <span className={styles.certIconWrap}>{cert.icon}</span>
                  <div>
                    <div className={styles.certTitle}>{cert.title}</div>
                    <div className={styles.certDesc}>{cert.description}</div>
                  </div>
                </div>
              ))}
            </div>

         
          </div>
        </div>
      </section>

      {/* ── FEATURES BAR ── */}
      <div className={styles.featuresBar}>
        <div className={styles.featuresInner}>
          {features.map((f, i) => (
            <div key={i} className={styles.feat}>
              <div className={styles.featIconWrap}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CERT TRACKS ── */}
      <section className={styles.certsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Choose Your Specialization</h2>
          <p className={styles.sectionSub}>
            From cloud to AI — find the track that accelerates your career
          </p>
        </div>
        <div className={styles.bigCertGrid}>
          {certTracks.map((track, i) => (
            <div key={i} className={styles.bigCertCard}>
              <div
                className={styles.bigCertIconWrap}
                style={{ background: track.bg, color: track.color }}
              >
                {track.icon}
              </div>
              <h3>{track.title}</h3>
              <p>{track.desc}</p>
              <span className={styles.certTag}>{track.modules}</span>
            </div>
          ))}
        </div>
      </section>

            {/* <Companypartners /> */}
      <InnovationShowcase/>
      <AboutIBM />
      {/* <ReviewSection /> */}
      <IBMValueProposition/>
      <CertificationApplyForm />
   

      <Footer />
    </>
  );
};

export default IBM;