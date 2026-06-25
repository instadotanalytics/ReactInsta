import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FaSearch, 
  FaSpinner,
  FaSync,
  FaTimes
} from 'react-icons/fa'
import { IoMdSchool } from 'react-icons/io'
import Header from '../../components/Header/Header'
import { API_BASE_URL, SERVER_BASE_URL } from '../../config/api'
import styles from './CoursePage.module.css'
import Companypartners from './Companypartners'
import WhyJoinUS from '../WhyJoinUS'
import ReviewSection from '../ReviewSection'
import FAQSection from '../FAQSection'
import Footer from '../../components/Footer/Footer'
import OurPremiumServices from '../OurPremiumServices'
import CoursesHome from './CoursesHome'
import CourseHero from './CourseHero'
import FontAnimation from './FontAnimation'
import WhyChooseUs from '../WhyChooseUs'

// Lazy loaded skeleton card component
const SkeletonCard = ({ delay = 0 }) => (
  <div 
    className={styles.skeletonCard}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={styles.skeletonImage} />
    <div className={styles.skeletonContent}>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonDescription} />
      <div className={styles.skeletonButton} />
    </div>
  </div>
);

// Optimized Course Card with animation
const CourseCard = React.memo(({ course, index, onViewMore }) => {
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/default-course-image.jpg'
    if (imagePath.startsWith('http')) return imagePath
    return `${SERVER_BASE_URL}/${imagePath}`
  }

  const handleClick = useCallback(() => {
    onViewMore(course)
  }, [course, onViewMore])

  return (
    <div
      className={`${styles.courseCard} ${styles.cardEntrance}`}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={handleClick}
    >
      <div className={styles.cardImageWrapper}>
        <div className={styles.cardImage}>
          <img
            src={getImageUrl(course.thumbnail)}
            alt={course.title || 'Course thumbnail'}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = '/default-course-image.jpg'
            }}
          />
        </div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.courseTitle}>{course.title || 'Untitled Course'}</h3>
        {course.shortDescription && (
          <p className={styles.courseDescription}>
            {course.shortDescription.length > 60
              ? `${course.shortDescription.substring(0, 60)}...`
              : course.shortDescription}
          </p>
        )}
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  return prevProps.course._id === nextProps.course._id
})

const CoursePage = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState([])
  const [visibleCount, setVisibleCount] = useState(10)
  const [isRendering, setIsRendering] = useState(false)
  
  const renderTimerRef = useRef(null)

  // Progressive rendering of remaining courses
  const renderRemainingCourses = useCallback((filtered, startIndex) => {
    const remaining = filtered.slice(startIndex)
    let currentIndex = startIndex

    const renderNext = () => {
      if (currentIndex >= filtered.length) {
        setIsRendering(false)
        return
      }

      const batchSize = 2
      const endIndex = Math.min(currentIndex + batchSize, filtered.length)
      
      setVisibleCount(endIndex)
      currentIndex = endIndex

      if (currentIndex < filtered.length) {
        const delay = 80 + Math.random() * 70
        renderTimerRef.current = setTimeout(renderNext, delay)
      } else {
        setIsRendering(false)
      }
    }

    setIsRendering(true)
    renderTimerRef.current = setTimeout(renderNext, 100)
  }, [])

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_BASE_URL}/courses`)
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
        const result = await response.json()

        let coursesData = []
        if (result.success && Array.isArray(result.data)) {
          coursesData = result.data
        } else if (Array.isArray(result)) {
          coursesData = result
        }

        setCourses(coursesData)
        setFilteredCourses(coursesData)
        
        const uniqueCategories = ['All', ...new Set(coursesData.map((c) => c.category).filter(Boolean))]
        setCategories(uniqueCategories)
        setError(null)
        
        setVisibleCount(Math.min(10, coursesData.length))
        
        if (coursesData.length > 10) {
          renderRemainingCourses(coursesData, 10)
        }
      } catch (err) {
        setError('Failed to load courses. Please try again later.')
        setCourses([])
        setFilteredCourses([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()

    return () => {
      if (renderTimerRef.current) {
        clearTimeout(renderTimerRef.current)
      }
    }
  }, [renderRemainingCourses])

  // Handle filter changes with progressive rendering
  useEffect(() => {
    let filtered = courses
    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((c) => c.category === selectedCategory)
    }
    
    setFilteredCourses(filtered)
    
    if (filtered.length > 0) {
      if (renderTimerRef.current) {
        clearTimeout(renderTimerRef.current)
        renderTimerRef.current = null
      }
      
      const initialVisible = Math.min(10, filtered.length)
      setVisibleCount(initialVisible)
      
      if (filtered.length > 10) {
        renderRemainingCourses(filtered, 10)
      } else {
        setIsRendering(false)
      }
    } else {
      setVisibleCount(0)
      setIsRendering(false)
    }
  }, [searchTerm, selectedCategory, courses, renderRemainingCourses])

  const handleViewMore = useCallback((course) => {
    const identifier = course.slug || course._id || course.id
    navigate(`/course/${identifier}`)
  }, [navigate])

  const visibleCourses = useMemo(() => {
    return filteredCourses.slice(0, visibleCount)
  }, [filteredCourses, visibleCount])

  const skeletonCount = useMemo(() => {
    if (isLoading) return 10
    if (filteredCourses.length > visibleCount) {
      return Math.min(4, filteredCourses.length - visibleCount)
    }
    return 0
  }, [isLoading, filteredCourses.length, visibleCount])

  return (
    <div className={styles.coursePage}>
      <Header />
      <CoursesHome />

      <div className={styles.coursesSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>
            <IoMdSchool className={styles.eyebrowIcon} />
            What We Offer
          </p>
          <h2 className={styles.sectionTitle}>
            Our <span>Courses</span>
          </h2>
          <p className={styles.sectionSubtitle}>Explore our top-rated programs and kick-start your career</p>
        </div>

        {/* Search & Filter */}
        <div className={styles.searchFilterContainer}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by title, category, or description…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filterWrapper}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.categorySelect}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        {!isLoading && !error && (
          <div className={styles.resultsCount}>
            Showing {visibleCount} of {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
            {isRendering && <span className={styles.renderingIndicator}> • Loading more...</span>}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>
              <FaTimes className={styles.errorIcon} />
              {error}
            </p>
            <button onClick={() => window.location.reload()} className={styles.retryButton}>
              <FaSync className={styles.buttonIcon} />
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredCourses.length === 0 && (
          <div className={styles.emptyContainer}>
            <p>No courses match your search criteria.</p>
            {(searchTerm || selectedCategory !== 'All') && (
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All') }}
                className={styles.clearFiltersBtn}
              >
                <FaTimes className={styles.buttonIcon} />
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Course Grid */}
        {(visibleCourses.length > 0 || isLoading) && (
          <div className={styles.coursesGrid}>
            {/* Render actual courses */}
            {visibleCourses.map((course, index) => (
              <CourseCard
                key={course._id || course.id}
                course={course}
                index={index}
                onViewMore={handleViewMore}
              />
            ))}
            
            {/* Render skeleton cards for loading state */}
            {isLoading && (
              <>
                {[...Array(skeletonCount)].map((_, i) => (
                  <SkeletonCard key={`skeleton-${i}`} delay={i * 50} />
                ))}
              </>
            )}

            {/* Render skeleton cards for remaining courses being loaded */}
            {!isLoading && isRendering && skeletonCount > 0 && (
              <>
                {[...Array(skeletonCount)].map((_, i) => (
                  <SkeletonCard key={`loading-${i}`} delay={i * 50} />
                ))}
              </>
            )}
          </div>
        )}
      </div>

      <FontAnimation />
      <Companypartners />
      <WhyJoinUS />
      <OurPremiumServices />
      <CourseHero />
      <WhyChooseUs/>
      {/* <ReviewSection /> */}
      <FAQSection />
      <Footer />
    </div>
  )
}

export default CoursePage