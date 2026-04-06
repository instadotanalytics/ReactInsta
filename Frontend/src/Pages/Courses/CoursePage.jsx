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

  // Banner images
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
    'https://i.pinimg.com/1200x/1e/35/69/1e3569f36a9b5d2eada251ef4daec261.jpg'
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto slide every 3 seconds for banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [bannerImages.length])

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/courses`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('Fetched courses:', result)
        
        let coursesData = []
        if (result.success && Array.isArray(result.data)) {
          coursesData = result.data
        } else if (Array.isArray(result)) {
          coursesData = result
        } else {
          console.error('Unexpected response structure:', result)
          coursesData = []
        }
        
        setCourses(coursesData)
        setFilteredCourses(coursesData)
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(coursesData.map(course => course.category).filter(Boolean))]
        setCategories(uniqueCategories)
        
        setError(null)
      } catch (err) {
        console.error('Error fetching courses:', err)
        setError('Failed to load courses. Please try again later.')
        setCourses([])
        setFilteredCourses([])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // Filter courses based on search term and selected category
  useEffect(() => {
    let filtered = courses

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    setFilteredCourses(filtered)
  }, [searchTerm, selectedCategory, courses])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    )
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/default-course-image.jpg'
    if (imagePath.startsWith('http')) {
      return imagePath
    }
    return `${SERVER_BASE_URL}/${imagePath}`
  }

  const handleViewMore = (courseId) => {
    navigate(`/course/${courseId}`)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  return (
    <div className={styles.coursePage}>
      <Header/>
      <CoursesHome/>
      
      {/* Courses Section - Now at the top */}
      <div className={styles.coursesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Courses</h2>
          <p className={styles.sectionSubtitle}>Explore our top-rated programs</p>
        </div>

        {/* Search and Filter Section */}
        <div className={styles.searchFilterContainer}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search courses by title, category, or description..."
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>

          <div className={styles.filterWrapper}>
            <select 
              value={selectedCategory} 
              onChange={handleCategoryChange}
              className={styles.categorySelect}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        {!loading && !error && (
          <div className={styles.resultsCount}>
            Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
          </div>
        )}
        
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loader}></div>
            <p>Loading courses...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className={styles.retryButton}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (!filteredCourses || filteredCourses.length === 0) && (
          <div className={styles.emptyContainer}>
            <p>No courses match your search criteria.</p>
            {(searchTerm || selectedCategory !== 'All') && (
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className={styles.clearFiltersBtn}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Courses Grid */}
        {filteredCourses && filteredCourses.length > 0 && (
          <div className={styles.coursesGrid}>
            {filteredCourses.map((course) => (
              <div key={course._id || course.id} className={styles.courseCard}>
                {/* Card Image */}
                <div className={styles.cardImageWrapper}>
                  <div className={styles.cardImage}>
                    <img 
                      src={getImageUrl(course.thumbnail)} 
                      alt={course.title || 'Course thumbnail'}
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = '/default-course-image.jpg'
                      }}
                    />
                  </div>
                  {/* Category Badge */}
                  {course.category && (
                    <span className={styles.categoryBadge}>{course.category}</span>
                  )}
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.courseTitle}>
                    {course.title || 'Untitled Course'}
                  </h3>
                  
                  {/* Category (optional - can be removed if badge is enough) */}
                  {course.category && (
                    <div className={styles.categoryText}>{course.category}</div>
                  )}
                  
                  {/* Short Description */}
                  {course.shortDescription && (
                    <p className={styles.courseDescription}>
                      {course.shortDescription.length > 80 
                        ? `${course.shortDescription.substring(0, 80)}...` 
                        : course.shortDescription}
                    </p>
                  )}
                </div>

                {/* View More Button */}
                <button 
                  className={styles.viewMoreBtn}
                  onClick={() => handleViewMore(course._id || course.id)}
                >
                  View Details
                  <span className={styles.arrow}>→</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Banner Section - Now below courses */}
      <div className={styles.banner}>
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevSlide}
        >
          ❮
        </button>

        <div className={styles.imageContainer}>
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`${styles.slide} ${
                index === currentIndex ? styles.active : ''
              }`}
            >
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextSlide}
        >
          ❯
        </button>

        <div className={styles.dots}>
          {bannerImages.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                index === currentIndex ? styles.activeDot : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      <Companypartners/>
      <WhyJoinUS/>
      <OurPremiumServices/>
      <ReviewSection/>
      <FAQSection/>
      <Footer/>
    </div>
  )
}

export default CoursePage