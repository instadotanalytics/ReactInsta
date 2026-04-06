// CourseDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiClock, 
  FiBookOpen, 
  FiGlobe, 
  FiGrid, 
  FiAward, 
  FiBriefcase, 
  FiBarChart2,
  FiDownload,
  FiMonitor,
  FiSmartphone,
  FiCheckCircle,
  FiChevronRight,
  FiChevronDown,
  FiPlayCircle,
  FiStar,
  FiUsers,
  FiCalendar,
  FiZap
} from 'react-icons/fi';
import { 
  FaGraduationCap, 
  FaChalkboardTeacher,
  FaRegClock,
  FaRocket,
  FaShieldAlt,
  FaHeadset
} from 'react-icons/fa';
import { BsFillBriefcaseFill, BsTrophy } from 'react-icons/bs';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import RegistrationPopUp from '../components/Header/RegistrationPopUp';
import { API_BASE_URL, SERVER_BASE_URL } from '../config/api';
import styles from './CourseDetailPage.module.css';
import PlacementList from './PlacementList';
import Companypartners from './Courses/Companypartners';
import WhyJoinUS from './WhyJoinUS';
import ReviewSection from './ReviewSection';
import CareerSection from './CareerSection';
import FAQSection from './FAQSection';
import OurPremiumServices from './OurPremiumServices';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        console.log('Fetching course with ID:', id);
        const response = await fetch(`${API_BASE_URL}/courses/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Fetched course details:', result);
        
        if (result.success && result.data) {
          setCourse(result.data);
        } else if (result.data) {
          setCourse(result.data);
        } else {
          throw new Error('Course not found');
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching course details:', err);
        setError('Failed to load course details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseDetails();
    } else {
      console.error('No ID provided in URL');
      setError('No course ID provided');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (showRegistrationPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showRegistrationPopup]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/default-course-image.jpg';
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `${SERVER_BASE_URL}/${imagePath}`;
  };

  const handleEnrollNow = () => {
    setShowRegistrationPopup(true);
  };

  const handleClosePopup = () => {
    setShowRegistrationPopup(false);
  };

  const handleRegistrationSuccess = (data) => {
    console.log('Registration successful:', data);
  };

  const handleRegistrationError = (error) => {
    console.error('Registration error:', error);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.loadingContainer}>
          <div className={styles.loaderWrapper}>
            <div className={styles.loader}></div>
            <div className={styles.loaderGlow}></div>
          </div>
          <p>Loading your dream course...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !course) {
    return (
      <>
        <Header />
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <div className={styles.errorIcon}>😕</div>
            <h2>Oops! Course Not Found</h2>
            <p>{error || 'The course you\'re looking for doesn\'t exist or has been removed.'}</p>
            <button 
              onClick={() => navigate('/courses')} 
              className={styles.backButton}
            >
              <FiBookOpen className={styles.buttonIcon} />
              Browse Other Courses
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className={styles.courseDetailPage}>
      <Header />
      
      {/* Registration Popup */}
      {showRegistrationPopup && (
        <RegistrationPopUp 
          onClose={handleClosePopup}
          onSuccess={handleRegistrationSuccess}
          onError={handleRegistrationError}
        />
      )}
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroPattern}></div>
          <img 
            src={getImageUrl(course.thumbnail)} 
            alt={course.title}
            className={styles.heroImage}
          />
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.container}>
            <nav className={styles.breadcrumb}>
              <span onClick={() => navigate('/')}>Home</span>
              <FiChevronRight className={styles.breadcrumbIcon} />
              <span onClick={() => navigate('/courses')}>Courses</span>
              <FiChevronRight className={styles.breadcrumbIcon} />
              <span className={styles.current}>{course.title}</span>
            </nav>
            
            <div className={styles.courseInfo}>
              <div className={styles.badges}>
                <span className={styles.categoryBadge}>
                  <FiBookOpen className={styles.badgeIcon} />
                  {course.category || 'Programming'}
                </span>
                {course.level && (
                  <span className={`${styles.levelBadge} ${styles[course.level.toLowerCase()]}`}>
                    <FiBarChart2 className={styles.badgeIcon} />
                    {course.level}
                  </span>
                )}
                {course.liveOrRecorded && (
                  <span className={styles.liveBadge}>
                    <FiPlayCircle className={styles.badgeIcon} />
                    {course.liveOrRecorded}
                  </span>
                )}
                {course.popular && (
                  <span className={styles.popularBadge}>
                    <FiStar className={styles.badgeIcon} />
                    Most Popular
                  </span>
                )}
              </div>
              
              <h1 className={styles.courseTitle}>{course.title}</h1>
              
              {course.shortDescription && (
                <p className={styles.courseDescription}>{course.shortDescription}</p>
              )}
              
              <div className={styles.courseMeta}>
                {course.duration && (
                  <div className={styles.metaItem}>
                    <FiClock className={styles.metaIcon} />
                    <span>{course.duration}</span>
                  </div>
                )}
                {course.totalLectures && (
                  <div className={styles.metaItem}>
                    <FiPlayCircle className={styles.metaIcon} />
                    <span>{course.totalLectures} Lectures</span>
                  </div>
                )}
                {course.language && (
                  <div className={styles.metaItem}>
                    <FiGlobe className={styles.metaIcon} />
                    <span>{course.language}</span>
                  </div>
                )}
                {course.studentsEnrolled && (
                  <div className={styles.metaItem}>
                    <FiUsers className={styles.metaIcon} />
                    <span>{course.studentsEnrolled}+ Students</span>
                  </div>
                )}
              </div>
              
              <div className={styles.priceSection}>
                <div className={styles.priceWrapper}>
                  {course.discountedPrice ? (
                    <>
                      <span className={styles.discountedPrice}>
                        ₹{course.discountedPrice.toLocaleString()}
                      </span>
                      <span className={styles.originalPrice}>
                        ₹{course.originalPrice?.toLocaleString()}
                      </span>
                      {course.offerPercentage && (
                        <span className={styles.offerBadge}>
                          {course.offerPercentage}% OFF
                        </span>
                      )}
                    </>
                  ) : (
                    <span className={styles.price}>
                      ₹{course.originalPrice?.toLocaleString() || 'Contact for price'}
                    </span>
                  )}
                </div>
                
                <div className={styles.actionButtons}>
                  <button 
                    className={styles.enrollButton}
                    onClick={handleEnrollNow}
                  >
                    Enroll Now
                    <FiChevronRight className={styles.buttonIcon} />
                  </button>
                  
                </div>
              </div>

              
            </div>
          </div>
        </div>

        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.mainContent}>
          {/* Left Column - Course Details */}
          <div className={styles.leftColumn}>
            {/* Tabs Navigation */}
            <div className={styles.tabs}>
              <button 
                className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'curriculum' ? styles.active : ''}`}
                onClick={() => setActiveTab('curriculum')}
              >
                Curriculum
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'instructor' ? styles.active : ''}`}
                onClick={() => setActiveTab('instructor')}
              >
                Instructor
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'faq' ? styles.active : ''}`}
                onClick={() => setActiveTab('faq')}
              >
                FAQ
              </button>
            </div>

            {/* Tab Content */}
            <div className={styles.tabContent}>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className={styles.overviewTab}>
                  {course.fullDescription && (
                    <div className={styles.section}>
                      <h2 className={styles.sectionTitle}>About This Course</h2>
                      <div className={styles.fullDescription}>
                        {course.fullDescription.split('\n').map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
                    <div className={styles.section}>
                      <h2 className={styles.sectionTitle}>What You'll Learn</h2>
                      <div className={styles.learnGrid}>
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className={styles.learnItem}>
                            <div className={styles.learnItemIcon}>
                              <FiCheckCircle />
                            </div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Course Features</h2>
                    <div className={styles.featuresGrid}>
                      {course.certificateAvailable && (
                        <div className={styles.featureCard}>
                          <div className={styles.featureIconWrapper}>
                            <FaGraduationCap className={styles.featureIcon} />
                          </div>
                          <h3>Certificate</h3>
                          <p>Get certified upon completion</p>
                        </div>
                      )}
                      {course.placementAssistance && (
                        <div className={styles.featureCard}>
                          <div className={styles.featureIconWrapper}>
                            <BsFillBriefcaseFill className={styles.featureIcon} />
                          </div>
                          <h3>Placement Assistance</h3>
                          <p>Get help with job placement</p>
                        </div>
                      )}
                      {course.internshipIncluded && (
                        <div className={styles.featureCard}>
                          <div className={styles.featureIconWrapper}>
                            <FaRocket className={styles.featureIcon} />
                          </div>
                          <h3>Internship</h3>
                          <p>Practical industry experience</p>
                        </div>
                      )}
                      {course.downloadableResources && (
                        <div className={styles.featureCard}>
                          <div className={styles.featureIconWrapper}>
                            <FiDownload className={styles.featureIcon} />
                          </div>
                          <h3>Resources</h3>
                          <p>Downloadable study materials</p>
                        </div>
                      )}
                      <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                          <FaRegClock className={styles.featureIcon} />
                        </div>
                        <h3>Duration</h3>
                        <p>{course.duration || 'Flexible'}</p>
                      </div>
                      <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                          <FiMonitor className={styles.featureIcon} />
                        </div>
                        <h3>Format</h3>
                        <p>{course.liveOrRecorded || 'Self-paced'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Curriculum Tab */}
              {activeTab === 'curriculum' && (
                <div className={styles.curriculumTab}>
                  <h2 className={styles.sectionTitle}>Course Curriculum</h2>
                  <div className={styles.curriculumContent}>
                    <div className={styles.curriculumModule}>
                      <h3>Module 1: Introduction</h3>
                      <ul>
                        <li>Welcome to the Course</li>
                        <li>What You'll Learn</li>
                        <li>Prerequisites</li>
                      </ul>
                    </div>
                    <div className={styles.curriculumModule}>
                      <h3>Module 2: Core Concepts</h3>
                      <ul>
                        <li>Fundamentals</li>
                        <li>Advanced Topics</li>
                        <li>Practical Examples</li>
                      </ul>
                    </div>
                    <div className={styles.curriculumModule}>
                      <h3>Module 3: Projects</h3>
                      <ul>
                        <li>Hands-on Projects</li>
                        <li>Real-world Applications</li>
                        <li>Final Assessment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Instructor Tab */}
              {activeTab === 'instructor' && course.instructor && (
                <div className={styles.instructorTab}>
                  <h2 className={styles.sectionTitle}>Meet Your Instructor</h2>
                  <div className={styles.instructorCard}>
                    <div className={styles.instructorImageWrapper}>
                      {course.instructor.image ? (
                        <img 
                          src={getImageUrl(course.instructor.image)} 
                          alt={course.instructor.name}
                          className={styles.instructorImage}
                        />
                      ) : (
                        <div className={styles.instructorImagePlaceholder}>
                          <FaChalkboardTeacher />
                        </div>
                      )}
                    </div>
                    <div className={styles.instructorInfo}>
                      <h3 className={styles.instructorName}>
                        {course.instructor.name || 'Expert Instructor'}
                      </h3>
                      {course.instructor.experience && (
                        <p className={styles.instructorExperience}>
                          <FiBriefcase className={styles.infoIcon} />
                          {course.instructor.experience}
                        </p>
                      )}
                      {course.instructor.bio && (
                        <p className={styles.instructorBio}>
                          {course.instructor.bio}
                        </p>
                      )}
                      <div className={styles.instructorStats}>
                        <div className={styles.instructorStat}>
                          <FiStar />
                          <span>4.8 Rating</span>
                        </div>
                        <div className={styles.instructorStat}>
                          <FiUsers />
                          <span>10,000+ Students</span>
                        </div>
                        <div className={styles.instructorStat}>
                          <FiPlayCircle />
                          <span>15 Courses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ Tab */}
              {activeTab === 'faq' && (
                <div className={styles.faqTab}>
                  <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                  
                  <div className={styles.faqList}>
                    <div className={styles.faqItem}>
                      <button 
                        className={styles.faqQuestion}
                        onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
                      >
                        <span>What is the duration of this course?</span>
                        {expandedFaq === 1 ? <FiChevronDown /> : <FiChevronRight />}
                      </button>
                      {expandedFaq === 1 && (
                        <div className={styles.faqAnswer}>
                          <p>{course.duration || 'The course duration varies based on your learning pace and schedule.'}</p>
                        </div>
                      )}
                    </div>

                    <div className={styles.faqItem}>
                      <button 
                        className={styles.faqQuestion}
                        onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
                      >
                        <span>Is there any certification provided?</span>
                        {expandedFaq === 2 ? <FiChevronDown /> : <FiChevronRight />}
                      </button>
                      {expandedFaq === 2 && (
                        <div className={styles.faqAnswer}>
                          <p>{course.certificateAvailable ? 
                            'Yes, you will receive a verified certificate upon successful completion of the course.' : 
                            'Currently, this course does not include a certificate. However, you will gain valuable skills.'}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className={styles.faqItem}>
                      <button 
                        className={styles.faqQuestion}
                        onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
                      >
                        <span>Do you provide placement assistance?</span>
                        {expandedFaq === 3 ? <FiChevronDown /> : <FiChevronRight />}
                      </button>
                      {expandedFaq === 3 && (
                        <div className={styles.faqAnswer}>
                          <p>{course.placementAssistance ?
                            'Yes, we provide comprehensive placement assistance including resume building, interview preparation, and job referrals to our partner companies.' :
                            'Placement assistance is not included in this course, but we provide career guidance and support.'}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className={styles.faqItem}>
                      <button 
                        className={styles.faqQuestion}
                        onClick={() => setExpandedFaq(expandedFaq === 4 ? null : 4)}
                      >
                        <span>What is the refund policy?</span>
                        {expandedFaq === 4 ? <FiChevronDown /> : <FiChevronRight />}
                      </button>
                      {expandedFaq === 4 && (
                        <div className={styles.faqAnswer}>
                          <p>We offer a 30-day money-back guarantee. If you're not satisfied with the course, you can request a full refund within 30 days of purchase.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Course Summary Card */}
          <div className={styles.rightColumn}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryCardHeader}>
                <h3>This Course Includes:</h3>
              </div>
              
              <ul className={styles.summaryList}>
                {course.duration && (
                  <li className={styles.summaryItem}>
                    <FiClock className={styles.summaryIcon} />
                    <span>{course.duration} Duration</span>
                  </li>
                )}
                {course.totalLectures && (
                  <li className={styles.summaryItem}>
                    <FiPlayCircle className={styles.summaryIcon} />
                    <span>{course.totalLectures} Lectures</span>
                  </li>
                )}
                {course.totalModules && (
                  <li className={styles.summaryItem}>
                    <FiGrid className={styles.summaryIcon} />
                    <span>{course.totalModules} Modules</span>
                  </li>
                )}
                {course.language && (
                  <li className={styles.summaryItem}>
                    <FiGlobe className={styles.summaryIcon} />
                    <span>{course.language}</span>
                  </li>
                )}
                {course.level && (
                  <li className={styles.summaryItem}>
                    <FiBarChart2 className={styles.summaryIcon} />
                    <span>{course.level} Level</span>
                  </li>
                )}
                <li className={styles.summaryItem}>
                  <FiAward className={styles.summaryIcon} />
                  <span>Certificate of Completion</span>
                </li>
                <li className={styles.summaryItem}>
                  <FiDownload className={styles.summaryIcon} />
                  <span>Downloadable Resources</span>
                </li>
                <li className={styles.summaryItem}>
                  <FiSmartphone className={styles.summaryIcon} />
                  <span>Access on Mobile & TV</span>
                </li>
                <li className={styles.summaryItem}>
                  <FiUsers className={styles.summaryIcon} />
                  <span>Community Access</span>
                </li>
              </ul>

              <div className={styles.summaryPrice}>
                <div className={styles.priceDetails}>
                  {course.discountedPrice ? (
                    <>
                      <span className={styles.finalPrice}>
                        ₹{course.discountedPrice.toLocaleString()}
                      </span>
                      <span className={styles.originalPrice}>
                        ₹{course.originalPrice?.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span className={styles.finalPrice}>
                      ₹{course.originalPrice?.toLocaleString() || 'Contact for price'}
                    </span>
                  )}
                </div>
                
                <button 
                  className={styles.enrollNowBtn}
                  onClick={handleEnrollNow}
                >
                  Enroll Now
                  <FiChevronRight className={styles.btnIcon} />
                </button>

              
              </div>
            </div>

            {/* Related Stats */}
            <div className={styles.statsCard}>
              <div className={styles.statItem}>
                <BsTrophy className={styles.statIcon} />
                <div>
                  <h4>4.8</h4>
                  <p>Course Rating</p>
                </div>
              </div>
              <div className={styles.statItem}>
                <FiUsers className={styles.statIcon} />
                <div>
                  <h4>10k+</h4>
                  <p>Students Enrolled</p>
                </div>
              </div>
              <div className={styles.statItem}>
                <FiCalendar className={styles.statIcon} />
                <div>
                  <h4>2024</h4>
                  <p>Last Updated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     <PlacementList/>
     <Companypartners/>
     <WhyJoinUS/>
     <OurPremiumServices/>
     <CareerSection/>
     <ReviewSection/>
     <FAQSection/>
      <Footer />
    </div>
  );
};

export default CourseDetailPage;