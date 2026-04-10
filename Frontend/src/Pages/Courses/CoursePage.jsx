import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

const CoursePage = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState([])

  const bannerImages = [
    'https://i.pinimg.com/1200x/73/5f/4b/735f4b0be1a783ac93ef3ec1a6fbaa0d.jpg',
    'https://i.pinimg.com/736x/6d/16/a3/6d16a301e656ab223942728e9e293e8b.jpg',
    'https://i.pinimg.com/1200x/c1/63/07/c16307103e86c604c6bc98c78aa84d4b.jpg',
    'https://i.pinimg.com/736x/7b/fd/87/7bfd875e85fbbed980e9df59bcde8579.jpg',
    'https://i.pinimg.com/1200x/b0/bf/7b/b0bf7b591bb0295c182c7992c65617f0.jpg',
    'https://i.pinimg.com/1200x/3f/bd/39/3fbd39179ec2be6cd25a41cfdfe94b9a.jpg',
    'https://i.pinimg.com/1200x/74/a7/b2/74a7b2d8f733bcc8c984685bca93f387.jpg',
    'https://i.pinimg.com/736x/bf/00/7a/bf007a1fb2c3fbc87e5679c4631d8513.jpg',
    'https://i.pinimg.com/736x/4c/29/6a/4c296a3cf88c70d4b62759ecb6ae4bd2.jpg',
    'https://i.pinimg.com/1200x/1e/35/69/1e3569f36a9b5d2eada251ef4daec261.jpg',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [bannerImages.length])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
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
      } catch (err) {
        setError('Failed to load courses. Please try again later.')
        setCourses([])
        setFilteredCourses([])
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

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
  }, [searchTerm, selectedCategory, courses])

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1))
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1))

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/default-course-image.jpg'
    if (imagePath.startsWith('http')) return imagePath
    return `${SERVER_BASE_URL}/${imagePath}`
  }

  const handleViewMore = (courseId) => navigate(`/course/${courseId}`)

  return (
    <div className={styles.coursePage}>
      <Header />
      <CoursesHome />

      {/* ── Courses Section ── */}
      <div className={styles.coursesSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>What We Offer</p>
          <h2 className={styles.sectionTitle}>
            Our <span>Courses</span>
          </h2>
          <p className={styles.sectionSubtitle}>Explore our top-rated programs and kick-start your career</p>
        </div>

        {/* Search & Filter */}
        <div className={styles.searchFilterContainer}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
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
        {!loading && !error && (
          <div className={styles.resultsCount}>
            Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loader} />
            <p>Loading courses…</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{error}</p>
            <button onClick={() => window.location.reload()} className={styles.retryButton}>
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredCourses.length === 0 && (
          <div className={styles.emptyContainer}>
            <p>No courses match your search criteria.</p>
            {(searchTerm || selectedCategory !== 'All') && (
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All') }}
                className={styles.clearFiltersBtn}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {filteredCourses.length > 0 && (
          <div className={styles.coursesGrid}>
            {filteredCourses.map((course) => (
              <div key={course._id || course.id} className={styles.courseCard}>
                <div className={styles.cardImageWrapper}>
                  <div className={styles.cardImage}>
                    <img
                      src={getImageUrl(course.thumbnail)}
                      alt={course.title || 'Course thumbnail'}
                      onError={(e) => { e.target.onerror = null; e.target.src = '/default-course-image.jpg' }}
                    />
                  </div>
                  {course.category && (
                    <span className={styles.categoryBadge}>{course.category}</span>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.courseTitle}>{course.title || 'Untitled Course'}</h3>
                  {course.category && (
                    <div className={styles.categoryText}>{course.category}</div>
                  )}
                  {course.shortDescription && (
                    <p className={styles.courseDescription}>
                      {course.shortDescription.length > 80
                        ? `${course.shortDescription.substring(0, 80)}…`
                        : course.shortDescription}
                    </p>
                  )}
                </div>

                <button
                  className={styles.viewMoreBtn}
                  onClick={() => handleViewMore(course._id || course.id)}
                >
                  View Details 
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Banner ── */}
      <div className={styles.banner}>
        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={prevSlide}>❮</button>
        <div className={styles.imageContainer}>
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
            >
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={nextSlide}>❯</button>
        <div className={styles.dots}>
          {bannerImages.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      <Companypartners />
      <WhyJoinUS />
      <OurPremiumServices />
      <ReviewSection />
      <FAQSection />
      <Footer />
    </div>
  )
}

export default CoursePage