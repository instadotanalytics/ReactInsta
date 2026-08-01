// FAQSection.jsx
import React, { useState } from "react";
import styles from "./FAQSection.module.css";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What courses do you offer for IT training?",
      answer: "We offer Full Stack Development (MERN, MEAN), Python, Data Science, Cloud Computing (AWS, Azure), DevOps, Cybersecurity, UI/UX Design, and Mobile App Development."
    },
    {
      question: "Are these courses suitable for beginners?",
      answer: "Yes! We have courses for all skill levels - from complete beginners to advanced professionals. Each course starts with basics and progresses to advanced topics."
    },
    {
      question: "What is the duration of the training programs?",
      answer: "Certificate courses: 3-6 months, Diploma programs: 6-12 months, Intensive bootcamps: 8-16 weeks. Weekend batches also available for working professionals."
    },
    {
      question: "Do you provide placement assistance?",
      answer: "Yes, we provide comprehensive placement assistance including resume building, interview preparation, mock interviews, and connections with 500+ hiring partners."
    },
    {
      question: "What is the fee structure?",
      answer: "Fees range from ₹15,000 to ₹85,000 depending on the course. We offer EMI options, early bird discounts, group discounts, and scholarships for meritorious students."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        
        <div className={styles.faqGrid}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqCard} ${openIndex === index ? styles.active : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className={styles.faqQuestion}>
                <h3>{faq.question}</h3>
                <span className={styles.icon}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
              
              <div className={`${styles.faqAnswer} ${openIndex === index ? styles.showAnswer : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;