import React, { useState, useEffect } from "react";
import styles from "./Placements.module.css";
import {
  FiUser, FiBriefcase, FiCamera, FiX, FiSave, FiEdit2,
  FiTrash2, FiPlus, FiMinus, FiCheckCircle, FiAlertCircle,
  FiDollarSign, FiAward, FiSearch, FiFilter, FiMapPin,
  FiCalendar, FiAlignLeft
} from "react-icons/fi";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { BsGraphUp } from "react-icons/bs";
import { API_BASE_URL } from "../../config/api";

const PlacementForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [placements, setPlacements] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [editingPlacement, setEditingPlacement] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, placementId: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPackage, setFilterPackage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "", designation: "", description: "",
    package: "", location: "", batch: "", placementDate: "",
    profileImage: null, companyLogo: null, id: null,
  });

  useEffect(() => { fetchPlacements(); }, []);

  const fetchPlacements = async () => {
    setFetchLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/placements`);
      const data = await res.json();
      if (data.success) setPlacements(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchLoading(false);
    }
  };

  const filteredPlacements = placements.filter((p) => {
    const matchSearch =
      p.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPkg = filterPackage ? parseFloat(p.package) >= parseFloat(filterPackage) : true;
    return matchSearch && matchPkg;
  });

  const averagePackage =
    placements.length > 0
      ? (placements.reduce((s, p) => s + parseFloat(p.package || 0), 0) / placements.length).toFixed(1)
      : 0;
  const highestPackage =
    placements.length > 0
      ? Math.max(...placements.map((p) => parseFloat(p.package || 0))).toFixed(1)
      : 0;

  const resetForm = () => {
    setFormData({
      fullName: "", designation: "", description: "",
      package: "", location: "", batch: "", placementDate: "",
      profileImage: null, companyLogo: null, id: null,
    });
    setThumbnailPreview(null);
    setLogoPreview(null);
    setCurrentStep(1);
    setErrors({});
    setEditingPlacement(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [name]: "Max 5MB allowed" }));
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, [name]: "Image files only" }));
      return;
    }
    setErrors((prev) => ({ ...prev, [name]: null }));
    setFormData((prev) => ({ ...prev, [name]: file }));
    const reader = new FileReader();
    reader.onloadend = () => {
      if (name === "profileImage") setThumbnailPreview(reader.result);
      else setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (placement) => {
    setEditingPlacement(placement);
    setFormData({
      fullName: placement.fullName || "",
      designation: placement.designation || "",
      description: placement.description || "",
      package: placement.package || "",
      location: placement.location || "",
      batch: placement.batch || "",
      placementDate: placement.placementDate?.split("T")[0] || "",
      profileImage: null,
      companyLogo: null,
      id: placement._id,
    });
    setThumbnailPreview(placement.profileImage || null);
    setLogoPreview(placement.companyLogo || null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateStep = (step) => {
    const e = {};
    if (step === 1) {
      if (!formData.fullName.trim()) e.fullName = "Student name is required";
      if (!formData.designation.trim()) e.designation = "Designation is required";
      if (!editingPlacement && !thumbnailPreview) e.profileImage = "Student photo is required";
    }
    if (step === 2) {
      if (!formData.package || parseFloat(formData.package) <= 0) e.package = "Valid package is required";
      if (!formData.location.trim()) e.location = "Location is required";
      if (!editingPlacement && !logoPreview) e.companyLogo = "Company logo is required";
    }
    if (step === 3) {
      if (!formData.batch.trim()) e.batch = "Batch is required";
      if (!formData.placementDate) e.placementDate = "Date is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => { if (validateStep(currentStep)) setCurrentStep((s) => s + 1); };
  const prevStep = () => setCurrentStep((s) => s - 1);
  const goToStep = (step) => { if (step < currentStep) setCurrentStep(step); };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setIsSubmitting(true);
    setSubmitStatus(null);

    const data = new FormData();
    ["fullName", "designation", "description", "package", "location", "batch", "placementDate"].forEach(
      (key) => data.append(key, formData[key])
    );
    if (formData.profileImage instanceof File) data.append("profileImage", formData.profileImage);
    if (formData.companyLogo instanceof File) data.append("companyLogo", formData.companyLogo);

    try {
      const token = localStorage.getItem("adminToken");
      const url = editingPlacement ? `${API_BASE_URL}/placements/${formData.id}` : `${API_BASE_URL}/placements/add`;
      const method = editingPlacement ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        body: data,
      });
      const result = await res.json();

      if (res.ok) {
        setSubmitStatus({ type: "success", message: editingPlacement ? "Updated successfully!" : "Placement added!" });
        setTimeout(() => setSubmitStatus(null), 3000);
        resetForm();
        setShowForm(false);
        fetchPlacements();
      } else {
        setSubmitStatus({ type: "error", message: result.message || "Something went wrong" });
      }
    } catch {
      setSubmitStatus({ type: "error", message: "Network error. Try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE_URL}/placements/${deleteModal.placementId}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (res.ok) {
        setPlacements((prev) => prev.filter((p) => p._id !== deleteModal.placementId));
        setDeleteModal({ show: false, placementId: null });
        setSubmitStatus({ type: "success", message: "Placement deleted" });
        setTimeout(() => setSubmitStatus(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}><BsGraphUp /></div>
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
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>{averagePackage} LPA</span>
            <span className={styles.statLabel}>Average</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>{highestPackage} LPA</span>
            <span className={styles.statLabel}>Highest</span>
          </div>
        </div>
      </div>

      {/* ── Global status toast ── */}
      {submitStatus && !showForm && (
        <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
          {submitStatus.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
          <span>{submitStatus.message}</span>
        </div>
      )}

      {/* ── Toggle Form ── */}
      <div className={styles.formSection}>
        <button
          className={`${styles.toggleButton} ${showForm ? styles.toggleButtonActive : ""}`}
          onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); }}
        >
          {showForm ? <FiMinus /> : <FiPlus />}
          <span>{showForm ? "Hide Form" : "Add New Placement"}</span>
          {editingPlacement && <span className={styles.editingBadge}>Editing Mode</span>}
        </button>

        {showForm && (
          <div className={styles.formWrapper}>
            {submitStatus && (
              <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
                {submitStatus.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
                <span>{submitStatus.message}</span>
              </div>
            )}

            {/* Progress Steps */}
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${((currentStep - 1) / 2) * 100}%` }} />
              </div>
              <div className={styles.steps}>
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`${styles.step} ${currentStep >= step ? styles.active : ""} ${currentStep > step ? styles.completed : ""}`}
                    onClick={() => goToStep(step)}
                  >
                    <div className={styles.stepNumber}>{currentStep > step ? "✓" : step}</div>
                    <div className={styles.stepLabel}>
                      {step === 1 && "Student"}{step === 2 && "Company"}{step === 3 && "Details"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Step 1: Student Info ── */}
            {currentStep === 1 && (
              <div className={styles.stepContent}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label><FiUser className={styles.inputIcon} />Student Name <span className={styles.required}>*</span></label>
                    <input type="text" name="fullName" placeholder="Full name" value={formData.fullName} onChange={handleChange} className={errors.fullName ? styles.errorInput : ""} />
                    {errors.fullName && <span className={styles.errorMsg}>{errors.fullName}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label><FiBriefcase className={styles.inputIcon} />Designation <span className={styles.required}>*</span></label>
                    <input type="text" name="designation" placeholder="e.g. Software Engineer" value={formData.designation} onChange={handleChange} className={errors.designation ? styles.errorInput : ""} />
                    {errors.designation && <span className={styles.errorMsg}>{errors.designation}</span>}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label><FiAlignLeft className={styles.inputIcon} />Short Description</label>
                  <textarea name="description" placeholder="Brief about student's achievement..." value={formData.description} onChange={handleChange} rows={3} className={styles.textarea} />
                </div>

                <div className={styles.formGroup}>
                  <label><FiCamera className={styles.inputIcon} />Student Photo {!editingPlacement && <span className={styles.required}>*</span>}</label>
                  <div className={styles.fileUploadArea}>
                    <input type="file" name="profileImage" id="profileImage" accept="image/*" onChange={handleFileChange} className={styles.fileInput} />
                    <label htmlFor="profileImage" className={styles.fileUploadLabel}>
                      <FiCamera className={styles.uploadIcon} />
                      <span>{thumbnailPreview ? "Change Photo" : "Upload Student Photo"}</span>
                      <small>PNG, JPG up to 5MB</small>
                    </label>
                    {errors.profileImage && <span className={styles.errorMsg}>{errors.profileImage}</span>}
                  </div>
                  {thumbnailPreview && (
                    <div className={styles.previewContainer}>
                      <img src={thumbnailPreview} alt="preview" />
                      <button type="button" onClick={() => { setThumbnailPreview(null); setFormData((p) => ({ ...p, profileImage: null })); }} className={styles.removeBtn}><FiX /></button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Step 2: Company Info ── */}
            {currentStep === 2 && (
              <div className={styles.stepContent}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label><FiDollarSign className={styles.inputIcon} />Package (LPA) <span className={styles.required}>*</span></label>
                    <div className={styles.inputWithSuffix}>
                      <input type="number" name="package" placeholder="12.5" step="0.1" min="0" value={formData.package} onChange={handleChange} className={errors.package ? styles.errorInput : ""} />
                      <span className={styles.inputSuffix}>LPA</span>
                    </div>
                    {errors.package && <span className={styles.errorMsg}>{errors.package}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label><FiMapPin className={styles.inputIcon} />Location <span className={styles.required}>*</span></label>
                    <input type="text" name="location" placeholder="e.g. Bangalore, India" value={formData.location} onChange={handleChange} className={errors.location ? styles.errorInput : ""} />
                    {errors.location && <span className={styles.errorMsg}>{errors.location}</span>}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label><HiOutlineBuildingOffice className={styles.inputIcon} />Company Logo {!editingPlacement && <span className={styles.required}>*</span>}</label>
                  <div className={styles.fileUploadArea}>
                    <input type="file" name="companyLogo" id="companyLogo" accept="image/*" onChange={handleFileChange} className={styles.fileInput} />
                    <label htmlFor="companyLogo" className={styles.fileUploadLabel}>
                      <HiOutlineBuildingOffice className={styles.uploadIcon} />
                      <span>{logoPreview ? "Change Logo" : "Upload Company Logo"}</span>
                      <small>PNG, JPG up to 5MB</small>
                    </label>
                    {errors.companyLogo && <span className={styles.errorMsg}>{errors.companyLogo}</span>}
                  </div>
                  {logoPreview && (
                    <div className={styles.previewContainer}>
                      <img src={logoPreview} alt="logo preview" className={styles.logoPreviewImg} />
                      <button type="button" onClick={() => { setLogoPreview(null); setFormData((p) => ({ ...p, companyLogo: null })); }} className={styles.removeBtn}><FiX /></button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Step 3: Details ── */}
            {currentStep === 3 && (
              <div className={styles.stepContent}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label><FiAward className={styles.inputIcon} />Batch <span className={styles.required}>*</span></label>
                    <input type="text" name="batch" placeholder="e.g. 2024" value={formData.batch} onChange={handleChange} className={errors.batch ? styles.errorInput : ""} />
                    {errors.batch && <span className={styles.errorMsg}>{errors.batch}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label><FiCalendar className={styles.inputIcon} />Placement Date <span className={styles.required}>*</span></label>
                    <input type="date" name="placementDate" value={formData.placementDate} onChange={handleChange} className={errors.placementDate ? styles.errorInput : ""} />
                    {errors.placementDate && <span className={styles.errorMsg}>{errors.placementDate}</span>}
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.cancelBtn} onClick={() => { resetForm(); setShowForm(false); }}>Cancel</button>
                  <button type="button" onClick={handleSubmit} disabled={isSubmitting} className={`${styles.submitBtn} ${isSubmitting ? styles.loading : ""}`}>
                    <FiSave />
                    <span>{isSubmitting ? "Saving..." : editingPlacement ? "Update Placement" : "Save Placement"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Nav buttons */}
            {currentStep < 3 && (
              <div className={styles.navigation}>
                {currentStep > 1 && <button type="button" onClick={prevStep} className={styles.prevBtn}>← Back</button>}
                <div className={styles.navRight}>
                  <button type="button" onClick={nextStep} className={styles.nextBtn}>Continue →</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Filters ── */}
      <div className={styles.filtersSection}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input type="text" placeholder="Search by name, designation, location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className={styles.filterBox}>
          <FiFilter className={styles.filterIcon} />
          <select value={filterPackage} onChange={(e) => setFilterPackage(e.target.value)}>
            <option value="">All Packages</option>
            <option value="5">5 LPA & above</option>
            <option value="10">10 LPA & above</option>
            <option value="15">15 LPA & above</option>
            <option value="20">20 LPA & above</option>
          </select>
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <div className={styles.cardsGrid}>
        {fetchLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <p>Loading placements...</p>
          </div>
        ) : filteredPlacements.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><FiBriefcase /></div>
            <h3>No Placements Found</h3>
            <p>{searchTerm || filterPackage ? "Try adjusting your filters" : 'Click "Add New Placement" to get started'}</p>
          </div>
        ) : (
          filteredPlacements.map((placement) => (
            <PlacementCard
              key={placement._id}
              placement={placement}
              onEdit={handleEdit}
              onDelete={(id) => setDeleteModal({ show: true, placementId: id })}
            />
          ))
        )}
      </div>

      {/* ── Delete Modal ── */}
      {deleteModal.show && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalIcon}><FiAlertCircle /></div>
            <h3>Delete Placement</h3>
            <p>Are you sure? This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancelBtn} onClick={() => setDeleteModal({ show: false, placementId: null })}>Cancel</button>
              <button className={styles.modalDeleteBtn} onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Placement Card ── */
const PlacementCard = ({ placement, onEdit, onDelete }) => {
  const date = placement.placementDate
    ? new Date(placement.placementDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
    : null;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.avatarGroup}>
          <div className={styles.studentAvatar}>
            {placement.profileImage
              ? <img src={placement.profileImage} alt={placement.fullName} />
              : <span>{placement.fullName?.charAt(0)}</span>}
          </div>
          <div className={styles.companyLogoSmall}>
            {placement.companyLogo
              ? <img src={placement.companyLogo} alt="company" />
              : <HiOutlineBuildingOffice />}
          </div>
        </div>
        <div className={styles.cardActions}>
          <button className={styles.editBtn} onClick={() => onEdit(placement)} title="Edit"><FiEdit2 /></button>
          <button className={styles.deleteBtn} onClick={() => onDelete(placement._id)} title="Delete"><FiTrash2 /></button>
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.studentName}>{placement.fullName}</h3>
        <p className={styles.designation}>{placement.designation}</p>
        {placement.description && <p className={styles.description}>{placement.description}</p>}

        <div className={styles.tagsRow}>
          <span className={styles.packageTag}><FiDollarSign />{placement.package} LPA</span>
          {placement.location && <span className={styles.locationTag}><FiMapPin />{placement.location}</span>}
        </div>

        <div className={styles.metaRow}>
          {placement.batch && (
            <span className={styles.metaItem}><FiAward className={styles.metaIcon} />Batch {placement.batch}</span>
          )}
          {date && (
            <span className={styles.metaItem}><FiCalendar className={styles.metaIcon} />{date}</span>
          )}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.companyLogoFull}>
          {placement.companyLogo
            ? <img src={placement.companyLogo} alt="company logo" />
            : <span>{placement.designation}</span>}
        </div>
        <span className={styles.placedBadge}><FiCheckCircle /> Placed</span>
      </div>
    </div>
  );
};

export default PlacementForm;