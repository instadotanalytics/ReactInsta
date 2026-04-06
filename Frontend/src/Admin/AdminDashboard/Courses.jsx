import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config/api";
import style from "./Courses.module.css";

const Courses = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, courseId: null });
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
    whatYouWillLearn: [""],
    duration: "",
    totalModules: "",
    totalLectures: "",
    level: "Beginner",
    language: "",
    originalPrice: "",
    discountedPrice: "",
    paymentType: "One Time",
    instructor: { 
      name: "", 
      experience: "", 
      bio: "" 
    },
    certificateAvailable: false,
    liveOrRecorded: "Recorded",
    internshipIncluded: false,
    placementAssistance: false,
    downloadableResources: false,
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [instructorImageFile, setInstructorImageFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [instructorPreview, setInstructorPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setFetchLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE_URL}/courses`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        }
      });
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setFetchLoading(false);
    }
  };

  // Filter courses based on search and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? course.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = [...new Set(courses.map(c => c.category).filter(Boolean))];

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      shortDescription: "",
      fullDescription: "",
      whatYouWillLearn: [""],
      duration: "",
      totalModules: "",
      totalLectures: "",
      level: "Beginner",
      language: "",
      originalPrice: "",
      discountedPrice: "",
      paymentType: "One Time",
      instructor: { name: "", experience: "", bio: "" },
      certificateAvailable: false,
      liveOrRecorded: "Recorded",
      internshipIncluded: false,
      placementAssistance: false,
      downloadableResources: false,
    });
    setThumbnailFile(null);
    setInstructorImageFile(null);
    setThumbnailPreview(null);
    setInstructorPreview(null);
    setCurrentStep(1);
    setErrors({});
    setEditingCourse(null);
  };

  // Handle edit course
  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title || "",
      category: course.category || "",
      shortDescription: course.shortDescription || "",
      fullDescription: course.fullDescription || "",
      whatYouWillLearn: course.whatYouWillLearn?.length ? course.whatYouWillLearn : [""],
      duration: course.duration || "",
      totalModules: course.totalModules || "",
      totalLectures: course.totalLectures || "",
      level: course.level || "Beginner",
      language: course.language || "",
      originalPrice: course.originalPrice || "",
      discountedPrice: course.discountedPrice || "",
      paymentType: course.paymentType || "One Time",
      instructor: { 
        name: course.instructor?.name || "", 
        experience: course.instructor?.experience || "", 
        bio: course.instructor?.bio || "" 
      },
      certificateAvailable: course.certificateAvailable || false,
      liveOrRecorded: course.liveOrRecorded || "Recorded",
      internshipIncluded: course.internshipIncluded || false,
      placementAssistance: course.placementAssistance || false,
      downloadableResources: course.downloadableResources || false,
    });
    setThumbnailPreview(course.thumbnail || null);
    setInstructorPreview(course.instructor?.image || null);
    setShowForm(true);
  };

  // Handle delete confirmation
  const handleDeleteClick = (courseId) => {
    setDeleteModal({ show: true, courseId });
  };

  // Handle delete course
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE_URL}/courses/${deleteModal.courseId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await res.json();
      
      if (data.success) {
        setCourses(courses.filter(c => c._id !== deleteModal.courseId));
        setDeleteModal({ show: false, courseId: null });
      } else {
        alert("Failed to delete course");
      }
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Error deleting course");
    }
  };

  // Input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    
    if (name.includes("instructor.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        instructor: { ...prev.instructor, [key]: value },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // File handlers
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, thumbnail: "File size should be less than 5MB" }));
        e.target.value = '';
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, thumbnail: "Please select an image file" }));
        e.target.value = '';
        return;
      }
      
      setErrors(prev => ({ ...prev, thumbnail: null }));
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInstructorImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, instructorImage: "File size should be less than 5MB" }));
        e.target.value = '';
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, instructorImage: "Please select an image file" }));
        e.target.value = '';
        return;
      }
      
      setErrors(prev => ({ ...prev, instructorImage: null }));
      setInstructorImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setInstructorPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // WhatYouWillLearn handlers
  const handleLearnChange = (index, value) => {
    const newArray = [...formData.whatYouWillLearn];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, whatYouWillLearn: newArray }));
  };
  
  const addLearnField = () => {
    setFormData((prev) => ({
      ...prev,
      whatYouWillLearn: [...prev.whatYouWillLearn, ""],
    }));
  };
  
  const removeLearnField = (index) => {
    const newArray = formData.whatYouWillLearn.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, whatYouWillLearn: newArray }));
  };

  // Navigation
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const goToStep = (step) => {
    if (step < currentStep) {
      setCurrentStep(step);
      window.scrollTo(0, 0);
    }
  };

  // Validate current step
  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!editingCourse && !thumbnailFile && !thumbnailPreview) {
          newErrors.thumbnail = "Thumbnail image is required";
        }
        if (!formData.title.trim()) newErrors.title = "Course title is required";
        if (!formData.category.trim()) newErrors.category = "Category is required";
        break;
      
      case 2:
        if (!formData.shortDescription.trim()) newErrors.shortDescription = "Short description is required";
        if (!formData.fullDescription.trim()) newErrors.fullDescription = "Full description is required";
        if (formData.whatYouWillLearn.some(item => !item.trim())) {
          newErrors.whatYouWillLearn = "All learning points must be filled";
        }
        break;
      
      case 3:
        if (!formData.duration.trim()) newErrors.duration = "Duration is required";
        if (!formData.totalModules || formData.totalModules <= 0) newErrors.totalModules = "Valid number of modules is required";
        if (!formData.totalLectures || formData.totalLectures <= 0) newErrors.totalLectures = "Valid number of lectures is required";
        if (!formData.language.trim()) newErrors.language = "Language is required";
        break;
      
      case 4:
        if (!formData.originalPrice || formData.originalPrice <= 0) {
          newErrors.originalPrice = "Valid original price is required";
        }
        if (formData.discountedPrice && Number(formData.discountedPrice) >= Number(formData.originalPrice)) {
          newErrors.discountedPrice = "Discounted price must be less than original price";
        }
        break;
      
      case 5:
        if (!editingCourse && !instructorImageFile && !instructorPreview) {
          newErrors.instructorImage = "Instructor image is required";
        }
        if (!formData.instructor.name.trim()) newErrors["instructor.name"] = "Instructor name is required";
        if (!formData.instructor.experience.trim()) newErrors["instructor.experience"] = "Instructor experience is required";
        if (!formData.instructor.bio.trim()) newErrors["instructor.bio"] = "Instructor bio is required";
        break;
      
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form (create or update)
  const handleSubmit = async () => {
    if (validateStep(6)) {
      setLoading(true);
      
      try {
        const token = localStorage.getItem("adminToken");
        
        if (!token) {
          alert("You must be logged in as admin");
          setLoading(false);
          return;
        }
        
        const formDataToSend = new FormData();
        formDataToSend.append('courseData', JSON.stringify(formData));
        
        if (thumbnailFile) {
          formDataToSend.append('thumbnail', thumbnailFile);
        }
        
        if (instructorImageFile) {
          formDataToSend.append('instructorImage', instructorImageFile);
        }

        const url = editingCourse 
          ? `${API_BASE_URL}/courses/${editingCourse._id}`
          : `${API_BASE_URL}/courses`;
        
        const method = editingCourse ? "PUT" : "POST";

        const res = await fetch(url, {
          method: method,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formDataToSend,
        });

        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || `Failed to ${editingCourse ? 'update' : 'add'} course`);
        }

        alert(`✅ Course ${editingCourse ? 'updated' : 'added'} successfully!`);
        
        resetForm();
        setShowForm(false);
        fetchCourses();
        
      } catch (err) {
        console.error("Error details:", err);
        alert(`❌ Error ${editingCourse ? 'updating' : 'adding'} course: ` + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Cancel form
  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  return (
    <div className={style.container}>
      {/* Header with Add Button */}
      <div className={style.header}>
        <div>
          <h2>Course Management</h2>
          <p className={style.subtitle}>Manage your courses - add, edit, or delete</p>
        </div>
        {!showForm && (
          <button 
            className={style.addButton}
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            + Add New Course
          </button>
        )}
      </div>

      {/* Course Form */}
      {showForm && (
        <div className={style.formSection}>
          <div className={style.formHeader}>
            <h3>{editingCourse ? 'Edit Course' : 'Create New Course'}</h3>
            <button className={style.closeFormBtn} onClick={handleCancel}>×</button>
          </div>

          {/* Progress Steps */}
          <div className={style.progressContainer}>
            <div className={style.progressBar}>
              <div 
                className={style.progressFill} 
                style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
              ></div>
            </div>
            <div className={style.steps}>
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div 
                  key={step}
                  className={`${style.step} ${currentStep >= step ? style.active : ''} ${currentStep > step ? style.completed : ''}`}
                  onClick={() => goToStep(step)}
                >
                  <div className={style.stepNumber}>
                    {currentStep > step ? '✓' : step}
                  </div>
                  <div className={style.stepLabel}>
                    {step === 1 && 'Basic'}
                    {step === 2 && 'Description'}
                    {step === 3 && 'Details'}
                    {step === 4 && 'Pricing'}
                    {step === 5 && 'Instructor'}
                    {step === 6 && 'Extras'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={style.formCard}>
            <div className={style.stepHeader}>
              <h3>
                {currentStep === 1 && '📋 Basic Information'}
                {currentStep === 2 && '📝 Course Description'}
                {currentStep === 3 && '🔧 Course Details'}
                {currentStep === 4 && '💰 Pricing'}
                {currentStep === 5 && '👨‍🏫 Instructor Details'}
                {currentStep === 6 && '✨ Additional Features'}
              </h3>
              <span className={style.stepIndicator}>Step {currentStep} of 6</span>
            </div>

            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className={style.stepContent}>
                <div className={style.formGroup}>
                  <label>Course Title <span className={style.required}>*</span></label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Complete Web Development Bootcamp"
                    className={errors.title ? style.error : ''}
                  />
                  {errors.title && <span className={style.errorMsg}>{errors.title}</span>}
                </div>
                
                <div className={style.formGroup}>
                  <label>Category <span className={style.required}>*</span></label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g., Web Development, Data Science"
                    className={errors.category ? style.error : ''}
                  />
                  {errors.category && <span className={style.errorMsg}>{errors.category}</span>}
                </div>
                
                <div className={style.formGroup}>
                  <label>Thumbnail Image {!editingCourse && <span className={style.required}>*</span>}</label>
                  <div className={style.fileInputWrapper}>
                    <input
                      id="thumbnail-input"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleThumbnailChange}
                      className={errors.thumbnail ? style.error : ''}
                    />
                    <div className={style.fileInputPlaceholder}>
                      {thumbnailPreview ? 'Change image' : 'Choose file...'}
                    </div>
                  </div>
                  <small className={style.hint}>Max size: 5MB. Recommended: 800x450 pixels</small>
                  {errors.thumbnail && <span className={style.errorMsg}>{errors.thumbnail}</span>}
                  
                  {thumbnailPreview && (
                    <div className={style.previewContainer}>
                      <img src={thumbnailPreview} alt="Thumbnail preview" />
                      <button 
                        type="button" 
                        onClick={() => {
                          setThumbnailFile(null);
                          setThumbnailPreview(null);
                          document.getElementById('thumbnail-input').value = '';
                        }}
                        className={style.removeBtn}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Description */}
            {currentStep === 2 && (
              <div className={style.stepContent}>
                <div className={style.formGroup}>
                  <label>Short Description <span className={style.required}>*</span></label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Brief overview of the course (max 200 characters)"
                    maxLength="200"
                    className={errors.shortDescription ? style.error : ''}
                  />
                  <small className={style.hint}>{formData.shortDescription.length}/200 characters</small>
                  {errors.shortDescription && <span className={style.errorMsg}>{errors.shortDescription}</span>}
                </div>
                
                <div className={style.formGroup}>
                  <label>Full Description <span className={style.required}>*</span></label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Detailed description of the course content"
                    className={errors.fullDescription ? style.error : ''}
                  />
                  {errors.fullDescription && <span className={style.errorMsg}>{errors.fullDescription}</span>}
                </div>

                <div className={style.formGroup}>
                  <label>What You Will Learn <span className={style.required}>*</span></label>
                  {formData.whatYouWillLearn.map((item, i) => (
                    <div key={i} className={style.learnRow}>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleLearnChange(i, e.target.value)}
                        placeholder={`Learning point ${i + 1}`}
                      />
                      {formData.whatYouWillLearn.length > 1 && (
                        <button type="button" onClick={() => removeLearnField(i)} className={style.removeSmallBtn}>
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addLearnField} className={style.addBtn}>
                    + Add Another Point
                  </button>
                  {errors.whatYouWillLearn && <span className={style.errorMsg}>{errors.whatYouWillLearn}</span>}
                </div>
              </div>
            )}

            {/* Step 3: Course Details */}
            {currentStep === 3 && (
              <div className={style.stepContent}>
                <div className={style.formRow}>
                  <div className={style.formGroup}>
                    <label>Duration <span className={style.required}>*</span></label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="e.g., 6 weeks"
                      className={errors.duration ? style.error : ''}
                    />
                    {errors.duration && <span className={style.errorMsg}>{errors.duration}</span>}
                  </div>
                  
                  <div className={style.formGroup}>
                    <label>Language <span className={style.required}>*</span></label>
                    <input
                      type="text"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      placeholder="e.g., English"
                      className={errors.language ? style.error : ''}
                    />
                    {errors.language && <span className={style.errorMsg}>{errors.language}</span>}
                  </div>
                </div>
                
                <div className={style.formRow}>
                  <div className={style.formGroup}>
                    <label>Total Modules <span className={style.required}>*</span></label>
                    <input
                      type="number"
                      name="totalModules"
                      value={formData.totalModules}
                      onChange={handleChange}
                      min="1"
                      className={errors.totalModules ? style.error : ''}
                    />
                    {errors.totalModules && <span className={style.errorMsg}>{errors.totalModules}</span>}
                  </div>
                  
                  <div className={style.formGroup}>
                    <label>Total Lectures <span className={style.required}>*</span></label>
                    <input
                      type="number"
                      name="totalLectures"
                      value={formData.totalLectures}
                      onChange={handleChange}
                      min="1"
                      className={errors.totalLectures ? style.error : ''}
                    />
                    {errors.totalLectures && <span className={style.errorMsg}>{errors.totalLectures}</span>}
                  </div>
                </div>
                
                <div className={style.formGroup}>
                  <label>Level <span className={style.required}>*</span></label>
                  <select name="level" value={formData.level} onChange={handleChange}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Pricing */}
            {currentStep === 4 && (
              <div className={style.stepContent}>
                <div className={style.formRow}>
                  <div className={style.formGroup}>
                    <label>Original Price (₹) <span className={style.required}>*</span></label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      placeholder="1999"
                      className={errors.originalPrice ? style.error : ''}
                    />
                    {errors.originalPrice && <span className={style.errorMsg}>{errors.originalPrice}</span>}
                  </div>
                  
                  <div className={style.formGroup}>
                    <label>Discounted Price (₹)</label>
                    <input
                      type="number"
                      name="discountedPrice"
                      value={formData.discountedPrice}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      placeholder="999"
                      className={errors.discountedPrice ? style.error : ''}
                    />
                    {errors.discountedPrice && <span className={style.errorMsg}>{errors.discountedPrice}</span>}
                  </div>
                </div>
                
                <div className={style.formGroup}>
                  <label>Payment Type <span className={style.required}>*</span></label>
                  <select
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleChange}
                  >
                    <option value="One Time">One Time Payment</option>
                    <option value="EMI">EMI Available</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 5: Instructor */}
            {currentStep === 5 && (
              <div className={style.stepContent}>
                <div className={style.formGroup}>
                  <label>Instructor Name <span className={style.required}>*</span></label>
                  <input
                    type="text"
                    name="instructor.name"
                    value={formData.instructor.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className={errors["instructor.name"] ? style.error : ''}
                  />
                  {errors["instructor.name"] && <span className={style.errorMsg}>{errors["instructor.name"]}</span>}
                </div>
                
                <div className={style.formGroup}>
                  <label>Instructor Image {!editingCourse && <span className={style.required}>*</span>}</label>
                  <div className={style.fileInputWrapper}>
                    <input
                      id="instructor-image-input"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleInstructorImageChange}
                      className={errors.instructorImage ? style.error : ''}
                    />
                    <div className={style.fileInputPlaceholder}>
                      {instructorPreview ? 'Change image' : 'Choose file...'}
                    </div>
                  </div>
                  <small className={style.hint}>Max size: 5MB. Recommended: 400x400 pixels</small>
                  {errors.instructorImage && <span className={style.errorMsg}>{errors.instructorImage}</span>}
                  
                  {instructorPreview && (
                    <div className={style.previewContainer}>
                      <img src={instructorPreview} alt="Instructor preview" />
                      <button 
                        type="button" 
                        onClick={() => {
                          setInstructorImageFile(null);
                          setInstructorPreview(null);
                          document.getElementById('instructor-image-input').value = '';
                        }}
                        className={style.removeBtn}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
                
                <div className={style.formGroup}>
                  <label>Experience <span className={style.required}>*</span></label>
                  <input
                    type="text"
                    name="instructor.experience"
                    value={formData.instructor.experience}
                    onChange={handleChange}
                    placeholder="e.g., 10+ years in Web Development"
                    className={errors["instructor.experience"] ? style.error : ''}
                  />
                  {errors["instructor.experience"] && <span className={style.errorMsg}>{errors["instructor.experience"]}</span>}
                </div>
                
                <div className={style.formGroup}>
                  <label>Bio <span className={style.required}>*</span></label>
                  <textarea
                    name="instructor.bio"
                    value={formData.instructor.bio}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Brief biography"
                    className={errors["instructor.bio"] ? style.error : ''}
                  />
                  {errors["instructor.bio"] && <span className={style.errorMsg}>{errors["instructor.bio"]}</span>}
                </div>
              </div>
            )}

            {/* Step 6: Extras */}
            {currentStep === 6 && (
              <div className={style.stepContent}>
                <div className={style.formGroup}>
                  <label>Course Type <span className={style.required}>*</span></label>
                  <select
                    name="liveOrRecorded"
                    value={formData.liveOrRecorded}
                    onChange={handleChange}
                  >
                    <option value="Live">Live Classes</option>
                    <option value="Recorded">Recorded Videos</option>
                  </select>
                </div>
                
                <div className={style.featuresGrid}>
                  <label className={style.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="certificateAvailable"
                      checked={formData.certificateAvailable}
                      onChange={handleChange}
                    />
                    <span>Certificate Available</span>
                  </label>
                  
                  <label className={style.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="internshipIncluded"
                      checked={formData.internshipIncluded}
                      onChange={handleChange}
                    />
                    <span>Internship Included</span>
                  </label>
                  
                  <label className={style.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="placementAssistance"
                      checked={formData.placementAssistance}
                      onChange={handleChange}
                    />
                    <span>Placement Assistance</span>
                  </label>
                  
                  <label className={style.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="downloadableResources"
                      checked={formData.downloadableResources}
                      onChange={handleChange}
                    />
                    <span>Downloadable Resources</span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className={style.navigation}>
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} className={style.prevBtn}>
                  ← Back
                </button>
              )}
              
              <div className={style.navRight}>
                {currentStep < 6 ? (
                  <button type="button" onClick={nextStep} className={style.nextBtn}>
                    Continue →
                  </button>
                ) : (
                  <div className={style.formActions}>
                    <button 
                      type="button" 
                      onClick={handleCancel}
                      className={style.cancelBtn}
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      onClick={handleSubmit}
                      disabled={loading} 
                      className={`${style.submitBtn} ${loading ? style.loading : ''}`}
                    >
                      {loading ? "Saving..." : (editingCourse ? "Update Course" : "Create Course")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Courses Table Section */}
      <div className={style.tableSection}>
        <div className={style.tableHeader}>
          <h3>All Courses ({filteredCourses.length})</h3>
          <div className={style.filters}>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={style.searchInput}
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={style.categoryFilter}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {fetchLoading ? (
          <div className={style.loadingState}>
            <div className={style.spinner}></div>
            <p>Loading courses...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className={style.emptyState}>
            <img src="/empty-courses.svg" alt="No courses" />
            <h4>No Courses Found</h4>
            <p>{searchTerm || filterCategory ? 'Try adjusting your filters' : 'Click "Add New Course" to create your first course'}</p>
          </div>
        ) : (
          <div className={style.tableWrapper}>
            <table className={style.coursesTable}>
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Instructor</th>
                  <th>Price</th>
                  <th>Level</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course._id}>
                    <td>
                      <img 
                        src={course.thumbnail || '/default-thumbnail.jpg'} 
                        alt={course.title}
                        className={style.tableThumbnail}
                      />
                    </td>
                    <td>
                      <div className={style.courseTitle}>
                        <strong>{course.title}</strong>
                        <small>{course.duration}</small>
                      </div>
                    </td>
                    <td>
                      <span className={style.categoryBadge}>{course.category}</span>
                    </td>
                    <td>
                      <div className={style.instructorInfo}>
                        <img 
                          src={course.instructor?.image || '/default-avatar.jpg'} 
                          alt={course.instructor?.name}
                          className={style.instructorAvatar}
                        />
                        <span>{course.instructor?.name || 'N/A'}</span>
                      </div>
                    </td>
                    <td>
                      <div className={style.priceInfo}>
                        <span className={style.discountedPrice}>₹{course.discountedPrice || course.originalPrice}</span>
                        {course.discountedPrice && (
                          <>
                            <span className={style.originalPrice}>₹{course.originalPrice}</span>
                            <span className={style.offerBadge}>{course.offerPercentage}% OFF</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`${style.levelBadge} ${style[course.level?.toLowerCase()]}`}>
                        {course.level}
                      </span>
                    </td>
                    <td>
                      <span className={`${style.statusBadge} ${style.active}`}>
                        Active
                      </span>
                    </td>
                    <td>
                      <div className={style.actionButtons}>
                        <button 
                          className={style.editBtn}
                          onClick={() => handleEdit(course)}
                          title="Edit course"
                        >
                          ✎
                        </button>
                        <button 
                          className={style.deleteBtn}
                          onClick={() => handleDeleteClick(course._id)}
                          title="Delete course"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <h3>Delete Course</h3>
            <p>Are you sure you want to delete this course? This action cannot be undone.</p>
            <div className={style.modalActions}>
              <button 
                className={style.modalCancelBtn}
                onClick={() => setDeleteModal({ show: false, courseId: null })}
              >
                Cancel
              </button>
              <button 
                className={style.modalDeleteBtn}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;