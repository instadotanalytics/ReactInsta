// CourseDetailPage.jsx — Clean Compact Version (All sections visible, no tab clicks)
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiClock, FiBookOpen, FiGlobe, FiGrid, FiAward, FiBriefcase,
  FiBarChart2, FiDownload, FiMonitor, FiSmartphone, FiCheckCircle,
  FiChevronRight, FiChevronDown, FiPlayCircle, FiStar, FiUsers,
  FiCalendar, FiShield, FiChevronUp, FiArrowRight
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
import CourseMetaTags from '../components/SEO/CourseMetaTags';

// ─── Skeleton Components (Compact) ──────────────────────────────────
const SkeletonHero = () => (
  <div className={styles.skeletonHero}>
    <div className={styles.skeletonHeroOverlay} />
    <div className={styles.container}>
      <div className={styles.skeletonBreadcrumb} />
      <div className={styles.skeletonBadges}>
        <div className={styles.skeletonBadge} />
        <div className={styles.skeletonBadge} />
      </div>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonDesc}>
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLineShort} />
      </div>
      <div className={styles.skeletonMeta}>
        <div className={styles.skeletonMetaItem} />
        <div className={styles.skeletonMetaItem} />
        <div className={styles.skeletonMetaItem} />
      </div>
      <div className={styles.skeletonPriceRow}>
        <div className={styles.skeletonPrice} />
        <div className={styles.skeletonBtn} />
      </div>
    </div>
  </div>
);

const SkeletonContent = () => (
  <div className={styles.skeletonContent}>
    <div className={styles.skeletonSection}>
      <div className={styles.skeletonSectionTitle} />
      <div className={styles.skeletonParagraph}>
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLineShort} />
      </div>
    </div>
    <div className={styles.skeletonGrid}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className={styles.skeletonLearnItem}>
          <div className={styles.skeletonIcon} />
          <div className={styles.skeletonText} />
        </div>
      ))}
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
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonCardHeader} />
      {[...Array(6)].map((_, i) => (
        <div key={i} className={styles.skeletonSummaryItem} />
      ))}
      <div className={styles.skeletonDivider} />
      <div className={styles.skeletonPriceLarge} />
      <div className={styles.skeletonBtnFull} />
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

// ─── Main Component ──────────────────────────────────────────────────
const CourseDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
  const [expandedFaqs, setExpandedFaqs] = useState(new Set());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const allRes = await fetch(`${API_BASE_URL}/courses`);
        const allContentType = allRes.headers.get('content-type');

        if (!allContentType || !allContentType.includes('application/json')) {
          throw new Error('Backend is returning HTML. Please check your server.');
        }

        const allData = await allRes.json();

        if (allData.success && Array.isArray(allData.data)) {
          let found = allData.data.find(c => c.slug === slug);
          if (!found && /^[0-9a-fA-F]{24}$/.test(slug)) {
            found = allData.data.find(c => c._id === slug);
          }
          if (found) {
            setCourse(found);
            return;
          }
        }

        // Try slug endpoint
        const slugRes = await fetch(`${API_BASE_URL}/courses/slug/${slug}`);
        const slugContentType = slugRes.headers.get('content-type');
        if (slugContentType && slugContentType.includes('application/json')) {
          const slugData = await slugRes.json();
          if (slugRes.ok && slugData.success && slugData.data) {
            setCourse(slugData.data);
            return;
          }
        }

        // Try ID endpoint
        if (/^[0-9a-fA-F]{24}$/.test(slug)) {
          const idRes = await fetch(`${API_BASE_URL}/courses/${slug}`);
          const idContentType = idRes.headers.get('content-type');
          if (idContentType && idContentType.includes('application/json')) {
            const idData = await idRes.json();
            if (idRes.ok && idData.success && idData.data) {
              setCourse(idData.data);
              return;
            }
          }
        }

        throw new Error('Course not found');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCourseDetails();
    else {
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
  const toggleFaq = useCallback((id) => {
    setExpandedFaqs(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const faqData = [
    { id: 1, q: 'What is the duration of this course?', a: course?.duration ? `This course runs for ${course.duration}.` : 'Duration varies based on your learning pace.' },
    { id: 2, q: 'Is there any certification provided?', a: course?.certificateAvailable ? 'Yes, a verified certificate is provided upon completion.' : 'No certificate, but you gain valuable hands-on skills.' },
    { id: 3, q: 'Do you provide placement assistance?', a: course?.placementAssistance ? 'Yes, including resume building, interview prep, and job referrals.' : 'Placement assistance not included, but career guidance is available.' },
    { id: 4, q: 'What is the refund policy?', a: '30-day money-back guarantee. Full refund if not satisfied within 30 days of purchase.' },
    { id: 5, q: 'Is internship included?', a: course?.internshipIncluded ? 'Yes! A real industry internship opportunity is included.' : 'Internship not included, but can be applied for separately.' },
    { id: 6, q: 'Are study materials downloadable?', a: course?.downloadableResources ? 'Yes, all materials are downloadable for offline access.' : 'Materials are available online within the course portal.' },
  ];

  // ─── Loading State ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.page}>
          <SkeletonHero />
          <div className={styles.container}>
            <div className={styles.mainLayout}>
              <div className={styles.contentArea}>
                <SkeletonContent />
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

  // ─── Error State ────────────────────────────────────────────────────────
  if (error || !course) {
    return (
      <>
        <Header />
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <span className={styles.errorIcon}>😕</span>
            <h2>Course Not Found</h2>
            <p>{error || "The course you're looking for doesn't exist or has been removed."}</p>
            <button onClick={() => navigate('/courses')} className={styles.backButton}>
              <FiBookOpen /> Browse Courses
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ─── Main Render (Compact, All Sections Visible) ──────────────────────
  return (
    <div className={styles.page}>
      <CourseMetaTags course={course} />
      <Header />

      {showRegistrationPopup && (
        <RegistrationPopUp
          onClose={handleClosePopup}
          onSuccess={(data) => console.log('Registration successful:', data)}
          onError={(error) => console.error('Registration error:', error)}
        />
      )}

      {/* ── Compact Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src={getImageUrl(course.thumbnail)} alt="" className={styles.heroImg} loading="lazy" />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.container}>
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb}>
              <span onClick={() => navigate('/')}>Home</span>
              <FiChevronRight className={styles.breadcrumbSep} />
              <span onClick={() => navigate('/courses')}>Courses</span>
              <FiChevronRight className={styles.breadcrumbSep} />
              <span className={styles.breadcrumbCurrent}>{course.title}</span>
            </nav>

            <div className={styles.heroBody}>
              <div className={styles.badges}>
                <span className={styles.badge}><FiBookOpen /> {course.category || 'Programming'}</span>
                {course.level && <span className={`${styles.badge} ${styles.badgeLevel}`}><FiBarChart2 /> {course.level}</span>}
                {course.liveOrRecorded && <span className={`${styles.badge} ${styles.badgeLive}`}><FiPlayCircle /> {course.liveOrRecorded}</span>}
              </div>

              <h1 className={styles.title}>{course.title}</h1>
              {course.shortDescription && <p className={styles.desc}>{course.shortDescription}</p>}

              <div className={styles.metaRow}>
                {course.duration && <span><FiClock /> {course.duration}</span>}
                {course.totalLectures && <span><FiPlayCircle /> {course.totalLectures} Lectures</span>}
                {course.language && <span><FiGlobe /> {course.language}</span>}
                {course.studentsEnrolled > 0 && <span><FiUsers /> {course.studentsEnrolled}+ Students</span>}
              </div>

              <div className={styles.priceRow}>
                <div className={styles.priceGroup}>
                  {course.discountedPrice ? (
                    <>
                      <span className={styles.priceFinal}>₹{course.discountedPrice.toLocaleString()}</span>
                      <span className={styles.priceOriginal}>₹{course.originalPrice?.toLocaleString()}</span>
                      {course.offerPercentage && <span className={styles.offerTag}>{course.offerPercentage}% OFF</span>}
                    </>
                  ) : (
                    <span className={styles.priceFinal}>₹{course.originalPrice?.toLocaleString() || 'Contact'}</span>
                  )}
                </div>
                <button className={styles.enrollBtn} onClick={handleEnrollNow}>
                  Enroll Now <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Layout (Content + Sidebar) ── */}
      <div className={styles.container}>
        <div className={styles.mainLayout}>
          {/* Content Area — All Sections Visible */}
          <div className={styles.contentArea}>
            {/* Overview */}
            {course.fullDescription && (
              <section className={styles.section}>
                <h2 className={styles.sectionHeading}>About This Course</h2>
                <div className={styles.prose}>
                  {course.fullDescription.split('\n').map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </section>
            )}

            {/* What You'll Learn */}
            {course.whatYouWillLearn?.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionHeading}>What You'll Learn</h2>
                <div className={styles.learnGrid}>
                  {course.whatYouWillLearn.map((item, i) => (
                    <div key={i} className={styles.learnItem}>
                      <FiCheckCircle className={styles.learnIcon} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Features */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Course Features</h2>
              <div className={styles.featureGrid}>
                {course.certificateAvailable && (
                  <div className={styles.featureCard}>
                    <FaGraduationCap className={styles.featureIcon} />
                    <h4>Certificate</h4>
                    <p>Verified on completion</p>
                  </div>
                )}
                {course.placementAssistance && (
                  <div className={styles.featureCard}>
                    <BsFillBriefcaseFill className={styles.featureIcon} />
                    <h4>Placement Help</h4>
                    <p>Resume & interview support</p>
                  </div>
                )}
                {course.internshipIncluded && (
                  <div className={styles.featureCard}>
                    <FaRocket className={styles.featureIcon} />
                    <h4>Internship</h4>
                    <p>Real industry experience</p>
                  </div>
                )}
                {course.downloadableResources && (
                  <div className={styles.featureCard}>
                    <FiDownload className={styles.featureIcon} />
                    <h4>Resources</h4>
                    <p>Downloadable materials</p>
                  </div>
                )}
                <div className={styles.featureCard}>
                  <FaRegClock className={styles.featureIcon} />
                  <h4>Duration</h4>
                  <p>{course.duration || 'Flexible pace'}</p>
                </div>
                <div className={styles.featureCard}>
                  <FiMonitor className={styles.featureIcon} />
                  <h4>Format</h4>
                  <p>{course.liveOrRecorded || 'Self-paced'}</p>
                </div>
              </div>
            </section>

            {/* Curriculum (All visible) */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Curriculum</h2>
              <div className={styles.curriculumList}>
                {[
                  { title: 'Module 1: Introduction', items: ['Welcome to the Course', "What You'll Learn", 'Prerequisites'] },
                  { title: 'Module 2: Core Concepts', items: ['Fundamentals', 'Advanced Topics', 'Practical Examples'] },
                  { title: 'Module 3: Projects', items: ['Hands-on Projects', 'Real-world Applications', 'Final Assessment'] },
                ].map((mod, i) => (
                  <div key={i} className={styles.curriculumModule}>
                    <h4 className={styles.moduleTitle}>{mod.title}</h4>
                    <ul className={styles.moduleList}>
                      {mod.items.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Instructor (All visible) */}
            {course.instructor && (
              <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Instructor</h2>
                <div className={styles.instructorCard}>
                  {course.instructor.image ? (
                    <img src={getImageUrl(course.instructor.image)} alt={course.instructor.name} className={styles.instructorImg} loading="lazy" />
                  ) : (
                    <div className={styles.instructorPlaceholder}><FaChalkboardTeacher /></div>
                  )}
                  <div className={styles.instructorInfo}>
                    <h3 className={styles.instructorName}>{course.instructor.name || 'Expert Instructor'}</h3>
                    {course.instructor.experience && (
                      <p className={styles.instructorExp}><FiBriefcase /> {course.instructor.experience}</p>
                    )}
                    {course.instructor.bio && <p className={styles.instructorBio}>{course.instructor.bio}</p>}
                    <div className={styles.instructorStats}>
                      <span><FiStar /> 4.8 Rating</span>
                      <span><FiUsers /> 10,000+ Students</span>
                      <span><FiPlayCircle /> 15 Courses</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* FAQ (All visible, toggle for answers) */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>FAQ</h2>
              <div className={styles.faqList}>
                {faqData.map(({ id, q, a }) => (
                  <div key={id} className={styles.faqItem}>
                    <button className={styles.faqQuestion} onClick={() => toggleFaq(id)}>
                      <span>{q}</span>
                      {expandedFaqs.has(id) ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                    {expandedFaqs.has(id) && (
                      <div className={styles.faqAnswer}><p>{a}</p></div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar (Compact, Sticky) */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarCardTitle}>This Course Includes</h3>
              <ul className={styles.sidebarList}>
                {course.duration && <li><FiClock /> {course.duration} Duration</li>}
                {course.totalLectures && <li><FiPlayCircle /> {course.totalLectures} Lectures</li>}
                {course.totalModules && <li><FiGrid /> {course.totalModules} Modules</li>}
                {course.language && <li><FiGlobe /> {course.language}</li>}
                {course.level && <li><FiBarChart2 /> {course.level} Level</li>}
                {course.certificateAvailable && <li><FiAward /> Certificate of Completion</li>}
                {course.downloadableResources && <li><FiDownload /> Downloadable Resources</li>}
                <li><FiSmartphone /> Mobile & TV Access</li>
                <li><FiUsers /> Community Access</li>
              </ul>
              <div className={styles.sidebarPrice}>
                <div className={styles.sidebarPriceRow}>
                  {course.discountedPrice ? (
                    <>
                      <span className={styles.sidebarPriceFinal}>₹{course.discountedPrice.toLocaleString()}</span>
                      <span className={styles.sidebarPriceOrig}>₹{course.originalPrice?.toLocaleString()}</span>
                      {course.offerPercentage && <span className={styles.offerTag}>{course.offerPercentage}% OFF</span>}
                    </>
                  ) : (
                    <span className={styles.sidebarPriceFinal}>₹{course.originalPrice?.toLocaleString() || 'Contact'}</span>
                  )}
                </div>
                <button className={styles.enrollBtnFull} onClick={handleEnrollNow}>
                  Enroll Now <FiArrowRight />
                </button>
                <p className={styles.guarantee}><FiShield /> 30-day money-back guarantee</p>
              </div>
            </div>

            <div className={styles.statsCard}>
              <div className={styles.statItem}>
                <BsTrophy className={styles.statIcon} />
                <div><strong>4.8</strong><span>Rating</span></div>
              </div>
              <div className={styles.statItem}>
                <FiUsers className={styles.statIcon} />
                <div><strong>{course.studentsEnrolled > 0 ? `${course.studentsEnrolled}+` : '10k+'}</strong><span>Enrolled</span></div>
              </div>
              <div className={styles.statItem}>
                <FiCalendar className={styles.statIcon} />
                <div><strong>{new Date(course.updatedAt || course.createdAt).getFullYear()}</strong><span>Updated</span></div>
              </div>
            </div>
          </aside>
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