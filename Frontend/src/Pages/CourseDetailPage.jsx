// CourseDetailPage.jsx — Full Fixed Version with Skeleton Loading
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiClock, FiBookOpen, FiGlobe, FiGrid, FiAward, FiBriefcase,
  FiBarChart2, FiDownload, FiMonitor, FiSmartphone, FiCheckCircle,
  FiChevronRight, FiChevronDown, FiPlayCircle, FiStar, FiUsers,
  FiCalendar, FiShield
} from 'react-icons/fi';
import {
  FaGraduationCap, FaChalkboardTeacher, FaRegClock, FaRocket,
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

// ─── Skeleton Components ──────────────────────────────────────────
const SkeletonHero = () => (
  <div className={styles.skeletonHero}>
    <div className={styles.skeletonHeroBackground}>
      <div className={styles.skeletonHeroOverlay} />
    </div>
    <div className={styles.skeletonHeroContent}>
      <div className={styles.skeletonBreadcrumb} />
      <div className={styles.skeletonBadges}>
        <div className={styles.skeletonBadge} />
        <div className={styles.skeletonBadge} />
        <div className={styles.skeletonBadge} />
      </div>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonDescription}>
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
      </div>
      <div className={styles.skeletonMeta}>
        <div className={styles.skeletonMetaItem} />
        <div className={styles.skeletonMetaItem} />
        <div className={styles.skeletonMetaItem} />
      </div>
      <div className={styles.skeletonPrice}>
        <div className={styles.skeletonPriceAmount} />
        <div className={styles.skeletonButton} />
      </div>
    </div>
  </div>
);

const SkeletonTabContent = () => (
  <div className={styles.skeletonTabContent}>
    <div className={styles.skeletonSection}>
      <div className={styles.skeletonSectionTitle} />
      <div className={styles.skeletonParagraph}>
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
      </div>
    </div>
    <div className={styles.skeletonSection}>
      <div className={styles.skeletonSectionTitle} />
      <div className={styles.skeletonGrid}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.skeletonLearnItem}>
            <div className={styles.skeletonLearnIcon} />
            <div className={styles.skeletonLearnText} />
          </div>
        ))}
      </div>
    </div>
    <div className={styles.skeletonSection}>
      <div className={styles.skeletonSectionTitle} />
      <div className={styles.skeletonFeatureGrid}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.skeletonFeatureCard}>
            <div className={styles.skeletonFeatureIcon} />
            <div className={styles.skeletonFeatureTitle} />
            <div className={styles.skeletonFeatureDesc} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SkeletonSidebar = () => (
  <div className={styles.skeletonSidebar}>
    <div className={styles.skeletonSummaryCard}>
      <div className={styles.skeletonSummaryHeader} />
      {[...Array(7)].map((_, i) => (
        <div key={i} className={styles.skeletonSummaryItem} />
      ))}
      <div className={styles.skeletonSummaryDivider} />
      <div className={styles.skeletonSummaryPrice} />
      <div className={styles.skeletonSummaryButton} />
    </div>
    <div className={styles.skeletonStatsCard}>
      {[...Array(3)].map((_, i) => (
        <div key={i} className={styles.skeletonStatItem}>
          <div className={styles.skeletonStatIcon} />
          <div className={styles.skeletonStatText} />
        </div>
      ))}
    </div>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────
const CourseDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // ─── Fetch Course ────────────────────────────────────────────────
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🚀 Course fetch start');
        console.log('📌 slug:', slug);
        console.log('🌐 API_BASE_URL:', API_BASE_URL);

        // ── Step 1: Fetch all courses ──
        console.log('📡 Step 1: Fetching all courses...');
        const allRes = await fetch(`${API_BASE_URL}/courses`);
        console.log('📥 All courses status:', allRes.status);

        const allContentType = allRes.headers.get('content-type');
        console.log('📄 Content-Type:', allContentType);

        if (!allContentType || !allContentType.includes('application/json')) {
          const htmlSnippet = await allRes.text();
          console.error('❌ HTML mila JSON nahi:', htmlSnippet.substring(0, 200));
          throw new Error(
            `Backend se HTML aa raha hai JSON nahi.\n` +
            `API_BASE_URL: ${API_BASE_URL}\n` +
            `Backend chal raha hai? Check: ${API_BASE_URL}/courses`
          );
        }

        const allData = await allRes.json();
        console.log('✅ All courses response:', allData);
        console.log('📊 Total courses:', allData?.data?.length);

        if (allData.success && Array.isArray(allData.data)) {
          // Slug se match karo
          let found = allData.data.find(c => c.slug === slug);
          console.log('🔍 Slug match:', found ? `✅ ${found.title}` : '❌ Not found');

          // ObjectId se match karo (purane URLs ke liye)
          if (!found && /^[0-9a-fA-F]{24}$/.test(slug)) {
            found = allData.data.find(c => c._id === slug);
            console.log('🔍 ID match:', found ? `✅ ${found.title}` : '❌ Not found');
          }

          if (found) {
            console.log('🎉 Course found:', found.title, '| slug:', found.slug);
            setCourse(found);
            return;
          }
        }

        // ── Step 2: Direct slug endpoint ──
        console.log('📡 Step 2: Trying slug endpoint...');
        const slugUrl = `${API_BASE_URL}/courses/slug/${slug}`;
        console.log('🔗 Slug URL:', slugUrl);

        const slugRes = await fetch(slugUrl);
        console.log('📥 Slug endpoint status:', slugRes.status);

        const slugContentType = slugRes.headers.get('content-type');
        console.log('📄 Slug Content-Type:', slugContentType);

        if (slugContentType && slugContentType.includes('application/json')) {
          const slugData = await slugRes.json();
          console.log('✅ Slug endpoint data:', slugData);

          if (slugRes.ok && slugData.success && slugData.data) {
            console.log('🎉 Course found via slug endpoint:', slugData.data.title);
            setCourse(slugData.data);
            return;
          }
        } else {
          console.warn('⚠️ Slug endpoint HTML return kar raha hai — route missing hoga');
        }

        // ── Step 3: Direct ID endpoint ──
        if (/^[0-9a-fA-F]{24}$/.test(slug)) {
          console.log('📡 Step 3: Trying ID endpoint...');
          const idUrl = `${API_BASE_URL}/courses/${slug}`;
          console.log('🔗 ID URL:', idUrl);

          const idRes = await fetch(idUrl);
          console.log('📥 ID endpoint status:', idRes.status);

          const idContentType = idRes.headers.get('content-type');
          if (idContentType && idContentType.includes('application/json')) {
            const idData = await idRes.json();
            console.log('✅ ID endpoint data:', idData);

            if (idRes.ok && idData.success && idData.data) {
              console.log('🎉 Course found via ID:', idData.data.title);
              setCourse(idData.data);
              return;
            }
          } else {
            console.error('❌ ID endpoint bhi HTML return kar raha hai');
          }
        }

        console.error('❌ Course not found after all attempts');
        console.error('💡 Debug info:');
        console.error('   - slug:', slug);
        console.error('   - API_BASE_URL:', API_BASE_URL);
        console.error('   - Backend pe yeh URL check karo:', `${API_BASE_URL}/courses`);
        throw new Error('Course not found');

      } catch (err) {
        console.error('❌ fetchCourseDetails final error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log('🏁 Fetch complete');
      }
    };

    if (slug) {
      fetchCourseDetails();
    } else {
      console.error('❌ slug is undefined/null');
      setError('No course slug provided');
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    document.body.style.overflow = showRegistrationPopup ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [showRegistrationPopup]);

  const getImageUrl = useCallback((imagePath) => {
    if (!imagePath) return '/default-course-image.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `${SERVER_BASE_URL}/${imagePath}`;
  }, []);

  const handleEnrollNow = useCallback(() => setShowRegistrationPopup(true), []);
  const handleClosePopup = useCallback(() => setShowRegistrationPopup(false), []);
  const handleRegistrationSuccess = useCallback((data) => console.log('Registration successful:', data), []);
  const handleRegistrationError = useCallback((error) => console.error('Registration error:', error), []);

  // ─── Loading State ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.courseDetailPage}>
          <SkeletonHero />
          <div className={styles.container}>
            <div className={styles.mainContent}>
              <div className={styles.leftColumn}>
                <div className={styles.tabs}>
                  {['overview', 'curriculum', 'instructor', 'faq'].map((tab) => (
                    <div key={tab} className={styles.skeletonTab}>
                      <div className={styles.skeletonTabText} />
                    </div>
                  ))}
                </div>
                <SkeletonTabContent />
              </div>
              <SkeletonSidebar />
            </div>
          </div>
          <PlacementList />
          <Companypartners />
          <WhyJoinUS />
          <OurPremiumServices />
          <CareerSection />
          <ReviewSection />
          <FAQSection />
          <Footer />
        </div>
      </>
    );
  }

  // ─── Error ───────────────────────────────────────────────────────
  if (error || !course) {
    return (
      <>
        <Header />
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <span className={styles.errorIcon}>😕</span>
            <h2>Course Not Found</h2>
            <p>
              {error?.includes('HTML aa raha')
                ? '⚠️ Backend server se connection nahi ho raha. Please check your server.'
                : error || "The course you're looking for doesn't exist or has been removed."}
            </p>
            <button onClick={() => navigate('/courses')} className={styles.backButton}>
              <FiBookOpen className={styles.buttonIcon} />
              Browse Courses
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ─── Main Render ─────────────────────────────────────────────────
  return (
    <div className={styles.courseDetailPage}>
      <Header />

      {showRegistrationPopup && (
        <RegistrationPopUp
          onClose={handleClosePopup}
          onSuccess={handleRegistrationSuccess}
          onError={handleRegistrationError}
        />
      )}

      {/* ── Hero Section ── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroPattern} />
          <img
            src={getImageUrl(course.thumbnail)}
            alt={course.title}
            className={styles.heroImage}
            loading="lazy"
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
                {course.studentsEnrolled > 0 && (
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
                  <button className={styles.enrollButton} onClick={handleEnrollNow}>
                    Enroll Now
                    <FiChevronRight className={styles.buttonIcon} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path
              d="M0 90L60 78C120 66 240 42 360 33C480 24 600 30 720 36C840 42 960 48 1080 45C1200 42 1320 30 1380 24L1440 18V90H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className={styles.container}>
        <div className={styles.mainContent}>

          {/* Left Column */}
          <div className={styles.leftColumn}>
            <div className={styles.tabs}>
              {['overview', 'curriculum', 'instructor', 'faq'].map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className={styles.tabContent}>

              {/* Overview */}
              {activeTab === 'overview' && (
                <div className={styles.overviewTab}>
                  {course.fullDescription && (
                    <div className={styles.section}>
                      <h2 className={styles.sectionTitle}>About This Course</h2>
                      <div className={styles.fullDescription}>
                        {course.fullDescription.split('\n').map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {course.whatYouWillLearn?.length > 0 && (
                    <div className={styles.section}>
                      <h2 className={styles.sectionTitle}>What You'll Learn</h2>
                      <div className={styles.learnGrid}>
                        {course.whatYouWillLearn.map((item, i) => (
                          <div key={i} className={styles.learnItem}>
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
                          <p>Verified on completion</p>
                        </div>
                      )}
                      {course.placementAssistance && (
                        <div className={styles.featureCard}>
                          <div className={styles.featureIconWrapper}>
                            <BsFillBriefcaseFill className={styles.featureIcon} />
                          </div>
                          <h3>Placement Help</h3>
                          <p>Resume & interview support</p>
                        </div>
                      )}
                      {course.internshipIncluded && (
                        <div className={styles.featureCard}>
                          <div className={styles.featureIconWrapper}>
                            <FaRocket className={styles.featureIcon} />
                          </div>
                          <h3>Internship</h3>
                          <p>Real industry experience</p>
                        </div>
                      )}
                      {course.downloadableResources && (
                        <div className={styles.featureCard}>
                          <div className={styles.featureIconWrapper}>
                            <FiDownload className={styles.featureIcon} />
                          </div>
                          <h3>Resources</h3>
                          <p>Downloadable materials</p>
                        </div>
                      )}
                      <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                          <FaRegClock className={styles.featureIcon} />
                        </div>
                        <h3>Duration</h3>
                        <p>{course.duration || 'Flexible pace'}</p>
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

              {/* Curriculum */}
              {activeTab === 'curriculum' && (
                <div className={styles.curriculumTab}>
                  <h2 className={styles.sectionTitle}>Course Curriculum</h2>
                  <div className={styles.curriculumContent}>
                    {[
                      { title: 'Module 1: Introduction', items: ['Welcome to the Course', "What You'll Learn", 'Prerequisites'] },
                      { title: 'Module 2: Core Concepts', items: ['Fundamentals', 'Advanced Topics', 'Practical Examples'] },
                      { title: 'Module 3: Projects', items: ['Hands-on Projects', 'Real-world Applications', 'Final Assessment'] },
                    ].map((mod, i) => (
                      <div key={i} className={styles.curriculumModule}>
                        <h3>{mod.title}</h3>
                        <ul>
                          {mod.items.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructor */}
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
                          loading="lazy"
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
                        <p className={styles.instructorBio}>{course.instructor.bio}</p>
                      )}
                      <div className={styles.instructorStats}>
                        <div className={styles.instructorStat}>
                          <FiStar /><span>4.8 Rating</span>
                        </div>
                        <div className={styles.instructorStat}>
                          <FiUsers /><span>10,000+ Students</span>
                        </div>
                        <div className={styles.instructorStat}>
                          <FiPlayCircle /><span>15 Courses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ */}
              {activeTab === 'faq' && (
                <div className={styles.faqTab}>
                  <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                  <div className={styles.faqList}>
                    {[
                      {
                        id: 1,
                        q: 'What is the duration of this course?',
                        a: course.duration ? `This course runs for ${course.duration}.` : 'The course duration varies based on your learning pace.',
                      },
                      {
                        id: 2,
                        q: 'Is there any certification provided?',
                        a: course.certificateAvailable
                          ? 'Yes, you will receive a verified certificate upon successful completion.'
                          : 'This course does not include a certificate, but you will gain valuable hands-on skills.',
                      },
                      {
                        id: 3,
                        q: 'Do you provide placement assistance?',
                        a: course.placementAssistance
                          ? 'Yes, we provide comprehensive placement assistance including resume building, interview preparation, and job referrals.'
                          : 'Placement assistance is not included, but we provide career guidance and support throughout.',
                      },
                      {
                        id: 4,
                        q: 'What is the refund policy?',
                        a: 'We offer a 30-day money-back guarantee. If you are not satisfied, request a full refund within 30 days of purchase.',
                      },
                      {
                        id: 5,
                        q: 'Is internship included in this course?',
                        a: course.internshipIncluded
                          ? 'Yes! This course includes a real industry internship opportunity.'
                          : 'Internship is not part of this course, but you can apply separately.',
                      },
                      {
                        id: 6,
                        q: 'Are study materials downloadable?',
                        a: course.downloadableResources
                          ? 'Yes, all study materials and resources are downloadable for offline access.'
                          : 'Study materials are available online within the course portal.',
                      },
                    ].map(({ id, q, a }) => (
                      <div key={id} className={styles.faqItem}>
                        <button
                          className={styles.faqQuestion}
                          onClick={() => setExpandedFaq(expandedFaq === id ? null : id)}
                        >
                          <span>{q}</span>
                          {expandedFaq === id ? <FiChevronDown /> : <FiChevronRight />}
                        </button>
                        {expandedFaq === id && (
                          <div className={styles.faqAnswer}><p>{a}</p></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryCardHeader}>
                <h3>This Course Includes</h3>
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
                {course.certificateAvailable && (
                  <li className={styles.summaryItem}>
                    <FiAward className={styles.summaryIcon} />
                    <span>Certificate of Completion</span>
                  </li>
                )}
                {course.downloadableResources && (
                  <li className={styles.summaryItem}>
                    <FiDownload className={styles.summaryIcon} />
                    <span>Downloadable Resources</span>
                  </li>
                )}
                <li className={styles.summaryItem}>
                  <FiSmartphone className={styles.summaryIcon} />
                  <span>Mobile & TV Access</span>
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
                        ₹{course.discountedPrice?.toLocaleString()}
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
                    <span className={styles.finalPrice}>
                      ₹{course.originalPrice?.toLocaleString() || 'Contact for price'}
                    </span>
                  )}
                </div>
                <button className={styles.enrollNowBtn} onClick={handleEnrollNow}>
                  Enroll Now
                  <FiChevronRight className={styles.btnIcon} />
                </button>
                <div className={styles.moneyBackGuarantee}>
                  <FiShield />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>

            <div className={styles.statsCard}>
              <div className={styles.statItem}>
                <BsTrophy className={styles.statIcon} />
                <div>
                  <h4>4.8</h4>
                  <p>Rating</p>
                </div>
              </div>
              <div className={styles.statItem}>
                <FiUsers className={styles.statIcon} />
                <div>
                  <h4>{course.studentsEnrolled > 0 ? `${course.studentsEnrolled}+` : '10k+'}</h4>
                  <p>Enrolled</p>
                </div>
              </div>
              <div className={styles.statItem}>
                <FiCalendar className={styles.statIcon} />
                <div>
                  <h4>{new Date(course.updatedAt || course.createdAt).getFullYear()}</h4>
                  <p>Updated</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <PlacementList />
      <Companypartners />
      <WhyJoinUS />
      <OurPremiumServices />
      <CareerSection />
      <ReviewSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default CourseDetailPage;