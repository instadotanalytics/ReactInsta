import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api.js";
import styles from "./SearchBar.module.css";
import { FiSearch, FiX } from "react-icons/fi";
import { FiBook, FiAward, FiBriefcase } from "react-icons/fi";
import { MdOutlineTrendingUp } from "react-icons/md";

/* ═══════════════════════════════════════════════════════════════
   STATIC DATA SOURCES
   → To plug in ElasticSearch later: replace STATIC_* arrays
     with async calls inside searchAdapter()
═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   SEARCH ADAPTER
   → Single function to swap entire search engine (ElasticSearch,
     Algolia, etc.) without touching component logic
═══════════════════════════════════════════════════════════════ */
const searchAdapter = async (query, signal) => {
  const q = query.toLowerCase().trim();

  // 1. Filter static certifications
  const certifications = STATIC_CERTIFICATIONS
    .filter((c) => c.title.toLowerCase().includes(q))
    .map((c) => ({ ...c, type: "certification" }));

  // 2. Filter static careers
  const careers = STATIC_CAREERS
    .filter((c) => c.title.toLowerCase().includes(q))
    .map((c) => ({ ...c, type: "career" }));

  // 3. Fetch courses from API
  let courses = [];
  try {
    const res = await fetch(`${API_BASE_URL}/courses`, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    // Support both array response and { courses: [] } shape
    const list = Array.isArray(json) ? json : (json.courses ?? json.data ?? []);
    courses = list
      .filter((c) => c.title?.toLowerCase().includes(q))
      .slice(0, 6)
      .map((c) => ({
        id:    c._id,
        title: c.title,
        type:  "course",
        path:  `/course/${c._id}`,
        // Extra course fields available for richer UI later
        category:         c.category,
        level:            c.level,
        discountedPrice:  c.discountedPrice,
        thumbnail:        c.thumbnail,
      }));
  } catch (err) {
    if (err.name !== "AbortError") {
      console.warn("[SearchBar] Course API error:", err.message);
    }
  }

  return { courses, certifications, careers };
};

/* ═══════════════════════════════════════════════════════════════
   DEBOUNCE HOOK
═══════════════════════════════════════════════════════════════ */
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

/* ═══════════════════════════════════════════════════════════════
   SECTION CONFIG  (label, icon, accent)
   → Add new types here when extending search
═══════════════════════════════════════════════════════════════ */
const SECTION_CONFIG = {
  course:        { label: "Courses",        Icon: FiBook,      accent: "#2563EB" },
  certification: { label: "Certifications", Icon: FiAward,     accent: "#7C3AED" },
  career:        { label: "Careers",        Icon: FiBriefcase, accent: "#059669" },
};

/* ═══════════════════════════════════════════════════════════════
   HIGHLIGHT MATCH  — wraps matched text in <mark>
═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   SEARCH BAR COMPONENT
═══════════════════════════════════════════════════════════════ */
const SearchBar = ({
  placeholder = "Search courses, certifications…",
  maxResults  = 10,
}) => {
  const [query,       setQuery]       = useState("");
  const [results,     setResults]     = useState({ courses: [], certifications: [], careers: [] });
  const [loading,     setLoading]     = useState(false);
  const [open,        setOpen]        = useState(false);
  const [activeIdx,   setActiveIdx]   = useState(-1);
  const [apiError,    setApiError]    = useState(false);

  const navigate    = useNavigate();
  const inputRef    = useRef(null);
  const wrapperRef  = useRef(null);
  const abortRef    = useRef(null);
  const debouncedQ  = useDebounce(query, 300);

  /* ── Run search when debounced query changes ── */
  useEffect(() => {
    if (!debouncedQ.trim()) {
      setResults({ courses: [], certifications: [], careers: [] });
      setOpen(false);
      setLoading(false);
      return;
    }

    // Cancel previous in-flight request
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setApiError(false);

    searchAdapter(debouncedQ, abortRef.current.signal).then((data) => {
      setResults(data);
      setLoading(false);
      setOpen(true);
      setActiveIdx(-1);
    }).catch(() => {
      setLoading(false);
      setApiError(true);
    });

    return () => abortRef.current?.abort();
  }, [debouncedQ]);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Flatten results for keyboard navigation ── */
  const flatResults = [
    ...results.courses.slice(0, maxResults),
    ...results.certifications,
    ...results.careers,
  ].slice(0, maxResults);

  const totalCount = flatResults.length;
  const hasAny     = totalCount > 0;

  /* ── Keyboard navigation ── */
  const handleKeyDown = (e) => {
    if (!open) return;
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
      case "Escape":
        setOpen(false);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  /* ── Navigate to selected item ── */
  const handleSelect = useCallback((item) => {
    setQuery("");
    setOpen(false);
    setActiveIdx(-1);
    navigate(item.path);
  }, [navigate]);

  const handleClear = () => {
    setQuery("");
    setOpen(false);
    setActiveIdx(-1);
    inputRef.current?.focus();
  };

  /* ── Render one section (Courses / Certifications / Careers) ── */
  const renderSection = (items, type, startIdx) => {
    if (!items.length) return null;
    const { label, Icon, accent } = SECTION_CONFIG[type];
    return (
      <div className={styles.section} key={type}>
        {/* Section header */}
        <div className={styles.sectionLabel}>
          <span className={styles.sectionIcon} style={{ color: accent }}>
            <Icon size={11} />
          </span>
          {label}
          <span className={styles.sectionCount}>{items.length}</span>
        </div>

        {/* Items */}
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
              {/* Left icon bubble */}
              <span
                className={styles.itemIcon}
                style={{ background: `${accent}15`, color: accent }}
              >
                <Icon size={13} />
              </span>

              {/* Title with highlight */}
              <span className={styles.itemTitle}>
                <HighlightMatch text={item.title} query={query} />
              </span>

              {/* Extra meta for courses */}
              {type === "course" && item.level && (
                <span className={styles.itemMeta}>{item.level}</span>
              )}

              {/* Type badge */}
              <span
                className={styles.itemBadge}
                style={{ background: `${accent}12`, color: accent }}
              >
                {type === "course" ? "Course" : type === "certification" ? "Cert" : "Career"}
              </span>

              {/* Arrow shown on active */}
              <span className={`${styles.itemArrow} ${isActive ? styles.itemArrowActive : ""}`}>
                →
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  /* ── Section start indices for flat keyboard nav ── */
  const certStart   = results.courses.slice(0, maxResults).length;
  const careerStart = certStart + results.certifications.length;

  /* ── Trending / empty-state placeholder ── */
  const showTrending = open && query.trim() && !loading && !hasAny;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>

      {/* ── Input ── */}
      <div className={`${styles.inputWrap} ${open ? styles.inputWrapOpen : ""}`}>
        <FiSearch
          size={15}
          className={`${styles.searchIcon} ${loading ? styles.searchIconSpin : ""}`}
        />

        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim() && hasAny) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck="false"
          aria-label="Search"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-autocomplete="list"
        />

        {/* Loading pulse */}
        {loading && <span className={styles.loadingDot} />}

        {/* Clear button */}
        {query && !loading && (
          <button
            className={styles.clearBtn}
            onClick={handleClear}
            aria-label="Clear search"
            tabIndex={-1}
          >
            <FiX size={13} />
          </button>
        )}
      </div>

      {/* ── Dropdown ── */}
      {open && (
        <div
          className={styles.dropdown}
          role="listbox"
          aria-label="Search suggestions"
        >
          {/* Results */}
          {hasAny && (
            <>
              {renderSection(results.courses.slice(0, maxResults), "course", 0)}
              {renderSection(results.certifications, "certification", certStart)}
              {renderSection(results.careers, "career", careerStart)}

              {/* Footer */}
              <div className={styles.dropdownFooter}>
                <span className={styles.footerCount}>
                  {totalCount} result{totalCount !== 1 ? "s" : ""}
                </span>
                
              </div>
            </>
          )}

          {/* No results */}
          {showTrending && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <FiSearch size={20} />
              </div>
              <p className={styles.emptyTitle}>No results for <strong>"{query}"</strong></p>
              <p className={styles.emptySubtitle}>Try searching for courses, certifications, or careers</p>
            </div>
          )}

          {/* API error (courses only) */}
          {apiError && (
            <div className={styles.errorBanner}>
              ⚠ Could not load courses — showing local results only
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;