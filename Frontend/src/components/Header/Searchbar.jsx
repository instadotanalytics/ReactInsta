import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api.js";
import styles from "./Searchbar.module.css";
import { FiSearch, FiX } from "react-icons/fi";
import { FiBook, FiAward, FiBriefcase } from "react-icons/fi";

const STATIC_CERTIFICATIONS = [
  { id: "cert-ms",     title: "Microsoft Certification", path: "/certification/microsoft" },
  { id: "cert-ibm",    title: "IBM Certification",       path: "/certification/ibm"       },
  { id: "cert-aws",    title: "AWS Certification",       path: "/certification/aws"       },
  { id: "cert-rh",     title: "RedHat Certification",    path: "/certification/redhat"    },
  { id: "cert-custom", title: "Custom Certification",    path: "/certification/custom"    },
];

const STATIC_CAREERS = [
  { id: "career-int", title: "Internship",    path: "/career/internship" },
  { id: "career-pl",  title: "Placement",     path: "/career/placement"  },
  { id: "career-ft",  title: "Full Time Job", path: "/career/fulltime"   },
];

const searchAdapter = async (query, signal) => {
  const q = query.toLowerCase().trim();
  const certifications = STATIC_CERTIFICATIONS
    .filter((c) => c.title.toLowerCase().includes(q))
    .map((c) => ({ ...c, type: "certification" }));
  const careers = STATIC_CAREERS
    .filter((c) => c.title.toLowerCase().includes(q))
    .map((c) => ({ ...c, type: "career" }));
  let courses = [];
  try {
    const res = await fetch(`${API_BASE_URL}/courses`, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const list = Array.isArray(json) ? json : (json.courses ?? json.data ?? []);
    courses = list
      .filter((c) => c.title?.toLowerCase().includes(q))
      .slice(0, 6)
      .map((c) => ({
        id: c._id, title: c.title, type: "course", path: `/course/${c._id}`,
        category: c.category, level: c.level,
        discountedPrice: c.discountedPrice, thumbnail: c.thumbnail,
      }));
  } catch (err) {
    if (err.name !== "AbortError") console.warn("[SearchBar] Course API error:", err.message);
  }
  return { courses, certifications, careers };
};

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

const SECTION_CONFIG = {
  course:        { label: "Courses",        Icon: FiBook,      accent: "#2563EB" },
  certification: { label: "Certifications", Icon: FiAward,     accent: "#7C3AED" },
  career:        { label: "Careers",        Icon: FiBriefcase, accent: "#059669" },
};

function HighlightMatch({ text, query }) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className={styles.mark}>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

/* ── Search Overlay (opened from icon) ── */
const SearchOverlay = ({ onClose, maxResults = 10 }) => {
  const [query,     setQuery]     = useState("");
  const [results,   setResults]   = useState({ courses: [], certifications: [], careers: [] });
  const [loading,   setLoading]   = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [apiError,  setApiError]  = useState(false);

  const navigate   = useNavigate();
  const inputRef   = useRef(null);
  const abortRef   = useRef(null);
  const debouncedQ = useDebounce(query, 300);

  /* Auto-focus input when overlay opens */
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Run search */
  useEffect(() => {
    if (!debouncedQ.trim()) {
      setResults({ courses: [], certifications: [], careers: [] });
      setLoading(false);
      return;
    }
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLoading(true);
    setApiError(false);
    searchAdapter(debouncedQ, abortRef.current.signal).then((data) => {
      setResults(data);
      setLoading(false);
      setActiveIdx(-1);
    }).catch(() => {
      setLoading(false);
      setApiError(true);
    });
    return () => abortRef.current?.abort();
  }, [debouncedQ]);

  const flatResults = [
    ...results.courses.slice(0, maxResults),
    ...results.certifications,
    ...results.careers,
  ].slice(0, maxResults);

  const totalCount = flatResults.length;
  const hasAny     = totalCount > 0;

  const handleSelect = useCallback((item) => {
    onClose();
    navigate(item.path);
  }, [navigate, onClose]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, totalCount - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, -1));
        break;
      case "Enter":
        if (activeIdx >= 0 && flatResults[activeIdx]) {
          e.preventDefault();
          handleSelect(flatResults[activeIdx]);
        }
        break;
      default:
        break;
    }
  };

  const certStart   = results.courses.slice(0, maxResults).length;
  const careerStart = certStart + results.certifications.length;

  const renderSection = (items, type, startIdx) => {
    if (!items.length) return null;
    const { label, Icon, accent } = SECTION_CONFIG[type];
    return (
      <div className={styles.section} key={type}>
        <div className={styles.sectionLabel}>
          <span className={styles.sectionIcon} style={{ color: accent }}><Icon size={11} /></span>
          {label}
          <span className={styles.sectionCount}>{items.length}</span>
        </div>
        {items.map((item, i) => {
          const globalIdx = startIdx + i;
          const isActive  = activeIdx === globalIdx;
          return (
            <button
              key={item.id}
              className={`${styles.resultItem} ${isActive ? styles.resultItemActive : ""}`}
              onMouseEnter={() => setActiveIdx(globalIdx)}
              onMouseLeave={() => setActiveIdx(-1)}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(item); }}
              role="option"
              aria-selected={isActive}
            >
              <span className={styles.itemIcon} style={{ background: `${accent}15`, color: accent }}>
                <Icon size={13} />
              </span>
              <span className={styles.itemTitle}>
                <HighlightMatch text={item.title} query={query} />
              </span>
              {type === "course" && item.level && (
                <span className={styles.itemMeta}>{item.level}</span>
              )}
              <span className={styles.itemBadge} style={{ background: `${accent}12`, color: accent }}>
                {type === "course" ? "Course" : type === "certification" ? "Cert" : "Career"}
              </span>
              <span className={`${styles.itemArrow} ${isActive ? styles.itemArrowActive : ""}`}>→</span>
            </button>
          );
        })}
      </div>
    );
  };

  const showEmpty = query.trim() && !loading && !hasAny;

  return (
    <div className={styles.overlayBackdrop} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.overlayPanel}>
        {/* Input row */}
        <div className={styles.overlayInputRow}>
          <FiSearch size={18} className={`${styles.overlaySearchIcon} ${loading ? styles.searchIconSpin : ""}`} />
          <input
            ref={inputRef}
            type="text"
            className={styles.overlayInput}
            placeholder="Search courses, certifications, careers…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
            aria-label="Search"
          />
          {loading && <span className={styles.loadingDot} />}
          {query && !loading && (
            <button className={styles.clearBtn} onClick={() => setQuery("")} aria-label="Clear" tabIndex={-1}>
              <FiX size={13} />
            </button>
          )}
          <button className={styles.closeOverlayBtn} onClick={onClose} aria-label="Close search">
            <FiX size={15} />
          </button>
        </div>

        {/* Results */}
        {(hasAny || showEmpty || apiError) && (
          <div className={styles.overlayResults} role="listbox">
            {hasAny && (
              <>
                {renderSection(results.courses.slice(0, maxResults), "course", 0)}
                {renderSection(results.certifications, "certification", certStart)}
                {renderSection(results.careers, "career", careerStart)}
                <div className={styles.dropdownFooter}>
                  <span className={styles.footerCount}>{totalCount} result{totalCount !== 1 ? "s" : ""}</span>
                  <span className={styles.footerHint}>
                    <kbd>↑</kbd><kbd>↓</kbd> navigate &nbsp; <kbd>Esc</kbd> close
                  </span>
                </div>
              </>
            )}
            {showEmpty && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}><FiSearch size={20} /></div>
                <p className={styles.emptyTitle}>No results for <strong>"{query}"</strong></p>
                <p className={styles.emptySubtitle}>Try searching for courses, certifications, or careers</p>
              </div>
            )}
            {apiError && (
              <div className={styles.errorBanner}>⚠ Could not load courses — showing local results only</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Main SearchBar — renders just the icon button ── */
const SearchBar = ({ maxResults = 10 }) => {
  const [open, setOpen] = useState(false);

  /* Prevent body scroll when overlay is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        className={styles.searchIconBtn}
        onClick={() => setOpen(true)}
        aria-label="Open search"
        title="Search"
      >
        <FiSearch size={16} />
      </button>

      {open && <SearchOverlay onClose={() => setOpen(false)} maxResults={maxResults} />}
    </>
  );
};

export default SearchBar;