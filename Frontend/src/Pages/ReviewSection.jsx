import React, { useEffect, useRef } from "react";
import styles from "./ReviewSection.module.css";

const ReviewSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      rating: 5,
      text: "Amazing experience! Everything was delivered exactly as promised. The team guided me throughout the process.",
      avatar: "https://i.pinimg.com/1200x/5f/16/36/5f1636f3e4e6ea7f6d4e82d4124f6ef7.jpg",
    },
    {
      id: 2,
      name: "Aarav Mehta",
      location: "Ahmedabad, Gujarat",
      rating: 4,
      text: "Excellent quality and service. The pricing is slightly higher, but it's absolutely worth it. Highly recommended!",
      avatar: "https://i.pinimg.com/736x/be/33/94/be3394926d1990c9a15a040a8935288c.jpg",
    },
    {
      id: 3,
      name: "Ananya Desai",
      location: "Pune, Maharashtra",
      rating: 5,
      text: "I enrolled online and everything went smoothly. The course content was practical and well-structured.",
      avatar: "https://i.pinimg.com/736x/6b/10/36/6b1036e7ad1571dfc2bc1b1b0f0fa780.jpg",
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Jaipur, Rajasthan",
      rating: 5,
      text: "Outstanding training experience. The mentors were very supportive and knowledgeable.",
      avatar: "https://i.pinimg.com/736x/c5/99/c2/c599c21941513e9a1291954e03c6349d.jpg",
    },
    {
      id: 5,
      name: "Neha Gupta",
      location: "Delhi, NCR",
      rating: 4,
      text: "First time joining such a program and I'm impressed. Customer support responded quickly and professionally.",
      avatar: "https://i.pinimg.com/1200x/12/f8/3c/12f83c39423c893a8d354da3816e1905.jpg",
    },
    {
      id: 6,
      name: "Rohan Joshi",
      location: "Bengaluru, Karnataka",
      rating: 5,
      text: "Simply awesome! The learning environment and project-based approach made a huge difference.",
      avatar: "https://i.pinimg.com/736x/b9/df/17/b9df17513794e4de87e3c1c89f0e9e44.jpg",
    },
    {
      id: 7,
      name: "Sneha Patil",
      location: "Kolhapur, Maharashtra",
      rating: 5,
      text: "Fantastic experience! The instructors explained concepts clearly and provided real-world examples.",
      avatar: "https://i.pinimg.com/736x/02/c6/af/02c6aff0a1a6e49ee293f5faf1c2f4d2.jpg",
    },
    {
      id: 8,
      name: "Arjun Nair",
      location: "Kochi, Kerala",
      rating: 4,
      text: "Great learning platform with practical assignments. Slightly intensive, but very effective.",
      avatar: "https://i.pinimg.com/736x/f3/1a/e3/f31ae3ae1f5b8096e7131bdb173a2a56.jpg",
    },
    {
      id: 9,
      name: "Divya Reddy",
      location: "Hyderabad, Telangana",
      rating: 5,
      text: "Excellent support and well-designed curriculum. I gained confidence in my technical skills.",
      avatar: "https://i.pinimg.com/1200x/38/4f/46/384f468d1878a36b2ec12db76f91600a.jpg",
    },
    {
      id: 10,
      name: "Karan Malhotra",
      location: "Chandigarh, Punjab",
      rating: 5,
      text: "What an incredible experience! I didn't expect the training to be this structured and career-focused.",
      avatar: "https://i.pinimg.com/736x/dd/ab/ca/ddabca2153b7fcafb373d0fd17cd1391.jpg",
    },
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrame;
    let lastTimestamp;
    const scrollSpeed = 0.5;

    const scroll = (timestamp) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
        animationFrame = requestAnimationFrame(scroll);
        return;
      }
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => { if (animationFrame) cancelAnimationFrame(animationFrame); };
  }, []);

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={i < rating ? styles.starFilled : styles.starEmpty}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleBlock}>
          <p className={styles.eyebrow}>Student Reviews</p>
          <h2 className={styles.title}>
            What Our <span>Students Say</span>
          </h2>
          <p className={styles.subtitle}>
            Real feedback from real learners who transformed their careers with our training programs.
          </p>
        </div>

        <div ref={scrollRef} className={styles.scrollContainer}>
          {[...reviews, ...reviews].map((review, index) => (
            <div key={`${review.id}-${index}`} className={styles.card}>
              <div className={styles.avatarSection}>
                <div className={styles.avatarWrapper}>
                  <img src={review.avatar} alt={review.name} className={styles.avatarImage} />
                </div>
                <div>
                  <h3 className={styles.userName}>{review.name}</h3>
                  <p className={styles.userLocation}>{review.location}</p>
                </div>
              </div>

              <div className={styles.starContainer}>{renderStars(review.rating)}</div>

              <p className={styles.reviewText}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;