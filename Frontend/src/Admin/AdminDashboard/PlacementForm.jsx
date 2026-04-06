import React, { useState, useEffect } from "react";
import styles from "./Placements.module.css";
import {
  FiUser,
  FiBriefcase,
  FiCamera,
  FiX,
  FiSave,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiCheckCircle,
  FiAlertCircle,
  FiDollarSign,
  FiAward,
  FiSearch,
  FiFilter
} from "react-icons/fi";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { BsGraphUp, BsCalendar3 } from "react-icons/bs";
import { API_BASE_URL } from "../../config/api"; // apna path adjust karo

const PlacementForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [editingPlacement, setEditingPlacement] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, placementId: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPackage, setFilterPackage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    package: "",
    profileImage: null,
    companyLogo: null,
    placementDate: "",
    designation: "",
    location: "",
    batch: "",
    id: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    setFetchLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/placements`);
      const data = await response.json();
      if (data.success) {
        setPlacements(data.data);
      }
    } catch (error) {
      console.error("Error fetching placements:", error);
    } finally {
      setFetchLoading(false);
      setLoading(false);
    }
  };

  // Filter placements
  const filteredPlacements = placements.filter(placement => {
    const matchesSearch = placement.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      placement.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      placement.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPackage = filterPackage ?
      (parseFloat(placement.package) >= parseFloat(filterPackage)) : true;
    return matchesSearch && matchesPackage;
  });

  // Calculate stats
  const averagePackage = placements.length > 0
    ? (placements.reduce((sum, p) => sum + parseFloat(p.package || 0), 0) / placements.length).toFixed(1)
    : 0;

  const highestPackage = placements.length > 0
    ? Math.max(...placements.map(p => parseFloat(p.package || 0))).toFixed(1)
    : 0;

  const resetForm = () => {
    setFormData({
      fullName: "",
      package: "",
      profileImage: null,
      companyLogo: null,
      placementDate: "",
      designation: "",
      location: "",
      batch: "",
      id: null
    });
    setThumbnailPreview(null);
    setLogoPreview(null);
    setCurrentStep(1);
    setErrors({});
    setEditingPlacement(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [name]: "File size should be less than 5MB" }));
        e.target.value = '';
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, [name]: "Please select an image file" }));
        e.target.value = '';
        return;
      }

      setErrors(prev => ({ ...prev, [name]: null }));
      setFormData(prev => ({ ...prev, [name]: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === 'profileImage') {
          setThumbnailPreview(reader.result);
        } else {
          setLogoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (placement) => {
    setEditingPlacement(placement);
    setFormData({
      fullName: placement.fullName || "",
      package: placement.package || "",
      profileImage: null,
      companyLogo: null,
      placementDate: placement.placementDate || "",
      designation: placement.designation || "",
      location: placement.location || "",
      batch: placement.batch || "",
      id: placement._id
    });
    setThumbnailPreview(placement.profileImage || null);
    setLogoPreview(placement.companyLogo || null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (placementId) => {
    setDeleteModal({ show: true, placementId });
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE_URL}/placements/${deleteModal.placementId}`, {
        method: "DELETE",
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        }
      });

      const result = await response.json();

      if (response.ok) {
        setPlacements(placements.filter(p => p._id !== deleteModal.placementId));
        setDeleteModal({ show: false, placementId: null });
        setSubmitStatus({
          type: 'success',
          message: 'Placement deleted successfully'
        });
        setTimeout(() => setSubmitStatus(null), 3000);
      } else {
        alert(result.message || 'Failed to delete placement');
      }
    } catch (error) {
      console.error("Error deleting placement:", error);
      alert("Error deleting placement");
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!editingPlacement && !thumbnailPreview) {
          newErrors.profileImage = "Student photo is required";
        }
        if (!formData.fullName.trim()) newErrors.fullName = "Student name is required";
        if (!formData.designation.trim()) newErrors.designation = "Designation is required";
        break;

      case 2:
        if (!editingPlacement && !logoPreview) {
          newErrors.companyLogo = "Company logo is required";
        }
        if (!formData.package || formData.package <= 0) {
          newErrors.package = "Valid package is required";
        }
        if (!formData.location.trim()) newErrors.location = "Location is required";
        break;

      case 3:
        if (!formData.batch.trim()) newErrors.batch = "Batch is required";
        if (!formData.placementDate) newErrors.placementDate = "Placement date is required";
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = async () => {
    if (validateStep(3)) {
      setIsSubmitting(true);
      setSubmitStatus(null);

      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("package", formData.package);
      data.append("designation", formData.designation);
      data.append("location", formData.location);
      data.append("batch", formData.batch);
      data.append("placementDate", formData.placementDate);

      if (formData.profileImage instanceof File) {
        data.append("profileImage", formData.profileImage);
      }
      if (formData.companyLogo instanceof File) {
        data.append("companyLogo", formData.companyLogo);
      }

      try {
        const token = localStorage.getItem("adminToken");
        let url = `${API_BASE_URL}/placements/add`;
        let method = "POST";

        if (editingPlacement && formData.id) {
          url = `${API_BASE_URL}/placements/${formData.id}`;
          method = "PUT";
        }

        const response = await fetch(url, {
          method: method,
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
          },
          body: data
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitStatus({
            type: 'success',
            message: editingPlacement ? 'Placement updated successfully' : 'Placement added successfully'
          });
          setTimeout(() => setSubmitStatus(null), 3000);
          resetForm();
          setShowForm(false);
          fetchPlacements();
        } else {
          setSubmitStatus({
            type: 'error',
            message: result.message || `Failed to ${editingPlacement ? 'update' : 'add'} placement`
          });
        }
      } catch (error) {
        setSubmitStatus({
          type: 'error',
          message: 'Network error. Please check your connection.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Premium Header with Stats */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            <BsGraphUp />
          </div>
          <div>
            <h1 className={styles.headerTitle}>Placement Gallery</h1>
            <p className={styles.headerSubtitle}>Manage student placements and achievements</p>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{placements.length}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{averagePackage} LPA</span>
            <span className={styles.statLabel}>Average</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{highestPackage} LPA</span>
            <span className={styles.statLabel}>Highest</span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className={styles.formSection}>
        <button
          className={`${styles.toggleButton} ${showForm ? styles.toggleButtonActive : ''}`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <FiMinus /> : <FiPlus />}
          <span>{showForm ? 'Hide Form' : 'Add New Placement'}</span>
          {editingPlacement && <span className={styles.editingBadge}>Editing Mode</span>}
        </button>

        {showForm && (
          <div className={styles.formWrapper}>
            {submitStatus && (
              <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
                {submitStatus.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                <span>{submitStatus.message}</span>
              </div>
            )}

            {/* Progress Steps */}
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                ></div>
              </div>
              <div className={styles.steps}>
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`${styles.step} ${currentStep >= step ? styles.active : ''} ${currentStep > step ? styles.completed : ''}`}
                    onClick={() => goToStep(step)}
                  >
                    <div className={styles.stepNumber}>
                      {currentStep > step ? '✓' : step}
                    </div>
                    <div className={styles.stepLabel}>
                      {step === 1 && 'Student'}
                      {step === 2 && 'Company'}
                      {step === 3 && 'Details'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Student Information */}
            {currentStep === 1 && (
              <div className={styles.stepContent}>
                <div className={styles.formGroup}>
                  <label>
                    <FiUser className={styles.inputIcon} />
                    Student Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter student's full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? styles.error : ''}
                  />
                  {errors.fullName && <span className={styles.errorMsg}>{errors.fullName}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>
                    <FiBriefcase className={styles.inputIcon} />
                    Designation <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="designation"
                    placeholder="e.g., Software Engineer"
                    value={formData.designation}
                    onChange={handleChange}
                    className={errors.designation ? styles.error : ''}
                  />
                  {errors.designation && <span className={styles.errorMsg}>{errors.designation}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Student Photo {!editingPlacement && <span className={styles.required}>*</span>}</label>
                  <div className={styles.fileUploadArea}>
                    <input
                      type="file"
                      name="profileImage"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={styles.fileInput}
                    />
                    <label htmlFor="profileImage" className={styles.fileUploadLabel}>
                      <FiCamera className={styles.uploadIcon} />
                      <span>
                        {thumbnailPreview ? 'Change Photo' : 'Upload Student Photo'}
                      </span>
                    </label>
                    {errors.profileImage && <span className={styles.errorMsg}>{errors.profileImage}</span>}
                  </div>

                  {thumbnailPreview && (
                    <div className={styles.previewContainer}>
                      <img src={thumbnailPreview} alt="Student preview" />
                      <button
                        type="button"
                        onClick={() => {
                          setThumbnailPreview(null);
                          setFormData(prev => ({ ...prev, profileImage: null }));
                        }}
                        className={styles.removeBtn}
                      >
                        <FiX />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Company Information */}
            {currentStep === 2 && (
              <div className={styles.stepContent}>
                <div className={styles.formGroup}>
                  <label>
                    <HiOutlineBuildingOffice className={styles.inputIcon} />
                    Location <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g., Bangalore, India"
                    value={formData.location}
                    onChange={handleChange}
                    className={errors.location ? styles.error : ''}
                  />
                  {errors.location && <span className={styles.errorMsg}>{errors.location}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>
                    <FiDollarSign className={styles.inputIcon} />
                    Package (LPA) <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.inputWithSuffix}>
                    <input
                      type="number"
                      name="package"
                      placeholder="12.5"
                      step="0.1"
                      min="0"
                      value={formData.package}
                      onChange={handleChange}
                      className={errors.package ? styles.error : ''}
                    />
                    <span className={styles.inputSuffix}>LPA</span>
                  </div>
                  {errors.package && <span className={styles.errorMsg}>{errors.package}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Company Logo {!editingPlacement && <span className={styles.required}>*</span>}</label>
                  <div className={styles.fileUploadArea}>
                    <input
                      type="file"
                      name="companyLogo"
                      id="companyLogo"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={styles.fileInput}
                    />
                    <label htmlFor="companyLogo" className={styles.fileUploadLabel}>
                      <HiOutlineBuildingOffice className={styles.uploadIcon} />
                      <span>
                        {logoPreview ? 'Change Logo' : 'Upload Company Logo'}
                      </span>
                    </label>
                    {errors.companyLogo && <span className={styles.errorMsg}>{errors.companyLogo}</span>}
                  </div>

                  {logoPreview && (
                    <div className={styles.previewContainer}>
                      <img src={logoPreview} alt="Company logo preview" />
                      <button
                        type="button"
                        onClick={() => {
                          setLogoPreview(null);
                          setFormData(prev => ({ ...prev, companyLogo: null }));
                        }}
                        className={styles.removeBtn}
                      >
                        <FiX />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Additional Details */}
            {currentStep === 3 && (
              <div className={styles.stepContent}>
                <div className={styles.formGroup}>
                  <label>
                    <FiAward className={styles.inputIcon} />
                    Batch <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="batch"
                    placeholder="e.g., 2024"
                    value={formData.batch}
                    onChange={handleChange}
                    className={errors.batch ? styles.error : ''}
                  />
                  {errors.batch && <span className={styles.errorMsg}>{errors.batch}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>
                    <BsCalendar3 className={styles.inputIcon} />
                    Placement Date <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    name="placementDate"
                    value={formData.placementDate}
                    onChange={handleChange}
                    className={errors.placementDate ? styles.error : ''}
                  />
                  {errors.placementDate && <span className={styles.errorMsg}>{errors.placementDate}</span>}
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`${styles.submitBtn} ${isSubmitting ? styles.loading : ''}`}
                  >
                    <FiSave />
                    <span>{isSubmitting ? 'Saving...' : (editingPlacement ? 'Update Placement' : 'Save Placement')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons for Steps 1 & 2 */}
            {currentStep < 3 && (
              <div className={styles.navigation}>
                {currentStep > 1 && (
                  <button type="button" onClick={prevStep} className={styles.prevBtn}>
                    ← Back
                  </button>
                )}

                <div className={styles.navRight}>
                  <button type="button" onClick={nextStep} className={styles.nextBtn}>
                    Continue →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filters and Search */}
      <div className={styles.filtersSection}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name, designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filterBox}>
          <FiFilter className={styles.filterIcon} />
          <select
            value={filterPackage}
            onChange={(e) => setFilterPackage(e.target.value)}
          >
            <option value="">All Packages</option>
            <option value="5">5 LPA & above</option>
            <option value="10">10 LPA & above</option>
            <option value="15">15 LPA & above</option>
            <option value="20">20 LPA & above</option>
          </select>
        </div>
      </div>

      {/* Placements Grid */}
      <div className={styles.cardsGrid}>
        {fetchLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading placements...</p>
          </div>
        ) : filteredPlacements.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <FiBriefcase />
            </div>
            <h3>No Placements Found</h3>
            <p>
              {searchTerm || filterPackage
                ? 'Try adjusting your filters'
                : 'Click "Add New Placement" to add your first placement'}
            </p>
          </div>
        ) : (
          filteredPlacements.map((placement) => (
            <div key={placement._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.avatarGroup}>
                  <div className={styles.studentAvatar}>
                    {placement.profileImage ? (
                      <img
                        src={placement.profileImage}
                        alt={placement.fullName}
                      />
                    ) : (
                      <span>{placement.fullName?.charAt(0)}</span>
                    )}
                  </div>
                  <div className={styles.companyLogo}>
                    {placement.companyLogo ? (
                      <img
                        src={placement.companyLogo}
                        alt="Company"
                      />
                    ) : (
                      <HiOutlineBuildingOffice />
                    )}
                  </div>
                </div>
                <div className={styles.cardActions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(placement)}
                    title="Edit"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteClick(placement._id)}
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.studentName}>{placement.fullName}</h3>
                <p className={styles.designation}>{placement.designation || 'Software Engineer'}</p>

                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <FiDollarSign />
                    <span className={styles.packageValue}>{placement.package} LPA</span>
                  </div>

                  {placement.location && (
                    <div className={styles.detailItem}>
                      <HiOutlineBuildingOffice />
                      <span>{placement.location}</span>
                    </div>
                  )}

                  {placement.batch && (
                    <div className={styles.detailItem}>
                      <FiAward />
                      <span>Batch {placement.batch}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.cardFooter}>
                <FiCheckCircle className={styles.footerIcon} />
                <span>Placed at {placement.designation || 'Company'}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalIcon}>
              <FiAlertCircle />
            </div>
            <h3>Delete Placement</h3>
            <p>Are you sure you want to delete this placement record? This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button
                className={styles.modalCancelBtn}
                onClick={() => setDeleteModal({ show: false, placementId: null })}
              >
                Cancel
              </button>
              <button
                className={styles.modalDeleteBtn}
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

export default PlacementForm;