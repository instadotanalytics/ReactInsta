import React, { useEffect, useRef } from "react";
import styles from "./BenefitsRedhat.module.css";

const BenefitsRedhat = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animFrameId;
    let width, height;

    const blobs = [
      {
        x: 0.15,
        y: 0.2,
        r: 0.28,
        color: "rgba(147,197,253,0.18)",
        dx: 0.00012,
        dy: 0.00008,
      },
      {
        x: 0.82,
        y: 0.75,
        r: 0.24,
        color: "rgba(196,181,253,0.14)",
        dx: -0.0001,
        dy: 0.00009,
      },
      {
        x: 0.5,
        y: 0.5,
        r: 0.2,
        color: "rgba(186,230,253,0.13)",
        dx: 0.00007,
        dy: -0.00011,
      },
      {
        x: 0.75,
        y: 0.18,
        r: 0.18,
        color: "rgba(165,180,252,0.12)",
        dx: -0.00009,
        dy: 0.00007,
      },
      {
        x: 0.25,
        y: 0.8,
        r: 0.22,
        color: "rgba(147,197,253,0.15)",
        dx: 0.00011,
        dy: -0.00006,
      },
    ];

    function resize() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      blobs.forEach((b) => {
        b.x += b.dx;
        b.y += b.dy;
        if (b.x < 0 || b.x > 1) b.dx *= -1;
        if (b.y < 0 || b.y > 1) b.dy *= -1;
        const grd = ctx.createRadialGradient(
          b.x * width,
          b.y * height,
          0,
          b.x * width,
          b.y * height,
          b.r * Math.max(width, height),
        );
        grd.addColorStop(0, b.color);
        grd.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
      });
      animFrameId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className={styles.section}>
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className={styles.bgCanvas} aria-hidden="true" />

      {/* Subtle dot grid */}
      <div className={styles.dotGrid} aria-hidden="true" />

      <div className={styles.container}>
        {/* ── Top label ── */}
        {/* <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Why Choose Red Hat
        </div> */}

        {/* ══════════════════════════════════════════
            CONSTELLATION LAYOUT
        ══════════════════════════════════════════ */}
        <div className={styles.constellation}>
          {/* ── TOP CARD: Uptime ── */}
          <div className={styles.cardTop}>
            <div className={styles.floatCard} data-size="sm">
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </span>
                <span className={styles.cardLabel}>System Uptime</span>
              </div>
              <div className={styles.uptimeStat}>
                <span className={styles.uptimeNum}>
                  99.999<span className={styles.uptimePct}>%</span>
                </span>
                <span className={styles.uptimeSub}>5-nines availability</span>
              </div>
              <div className={styles.uptimeBar}>
                <div
                  className={styles.uptimeBarFill}
                  style={{ width: "99.999%" }}
                />
              </div>
              <div className={styles.uptimeFooter}>
                <span className={styles.greenDot} />
                Mission-critical · 10+ yr lifecycle
              </div>
            </div>
          </div>

          {/* ── LEFT CARD: Security ── */}
          <div className={styles.cardLeft}>
            <div
              className={`${styles.floatCard} ${styles.floatCardTall}`}
              data-size="md"
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <span className={styles.cardLabel}>Security Posture</span>
              </div>
              <div className={styles.securityRing}>
                <svg viewBox="0 0 80 80" className={styles.ringsvg}>
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="#E0EFFE"
                    strokeWidth="6"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="url(#secGrad)"
                    strokeWidth="6"
                    strokeDasharray="200.96"
                    strokeDashoffset="20"
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                  />
                  <defs>
                    <linearGradient
                      id="secGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#93C5FD" />
                      <stop offset="100%" stopColor="#A5B4FC" />
                    </linearGradient>
                  </defs>
                  <text
                    x="40"
                    y="37"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill="#3B82F6"
                  >
                    FIPS
                  </text>
                  <text
                    x="40"
                    y="51"
                    textAnchor="middle"
                    fontSize="9"
                    fill="#93BBDB"
                  >
                    140-2
                  </text>
                </svg>
              </div>
              <div className={styles.secBadges}>
                <span className={styles.secBadge}>FIPS 140-2</span>
                <span className={styles.secBadge}>CC Certified</span>
              </div>
              <div className={styles.secMonitor}>
                <span className={styles.pulseDot} />
                <span>24 / 7 Security Monitoring</span>
              </div>
            </div>
          </div>

          {/* ── CENTER HERO ── */}
          <div className={styles.centerHero}>
            <div className={styles.heroInner}>
              {/* <div className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} />
                Enterprise Open Source
              </div> */}
              <h2 className={styles.heroTitle}>
                Transform Your
                <br />
                <em className={styles.heroAccent}>Business</em> With
                <br />
                Open Source
              </h2>
              <p className={styles.heroSub}>
                Trusted by thousands of enterprises to power digital
                transformation with secure, scalable infrastructure.
              </p>
              <div className={styles.heroMetric}>
                <span className={styles.metricNum}>
                  2,000<span className={styles.metricPlus}>+</span>
                </span>
                <span className={styles.metricLabel}>
                  Certified Technology Partners
                </span>
              </div>
              {/* <div className={styles.heroActions}>
                <button className={styles.heroCta}>Get Started</button>
                <button className={styles.heroCtaGhost}>Learn More</button>
              </div> */}
            </div>
            {/* decorative inner glow */}
            <div className={styles.heroGlow} aria-hidden="true" />
          </div>

          {/* ── RIGHT CARD: Hybrid Cloud ── */}
          <div className={styles.cardRight}>
            <div
              className={`${styles.floatCard} ${styles.floatCardTall}`}
              data-size="md"
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </span>
                <span className={styles.cardLabel}>Hybrid Cloud</span>
              </div>
              <div className={styles.cloudChips}>
                {["On-Premise", "Multi-Cloud", "Edge", "Private Cloud"].map(
                  (env) => (
                    <div key={env} className={styles.cloudChip}>
                      <span className={styles.chipDot} />
                      {env}
                    </div>
                  ),
                )}
              </div>
              <div className={styles.deployMetric}>
                <span className={styles.deployNum}>
                  60<span className={styles.deployPct}>%</span>
                </span>
                <span className={styles.deploySub}>Faster deployment</span>
              </div>
              <div className={styles.partnerRow}>
                {["AWS", "GCP", "Azure", "IBM"].map((p) => (
                  <span key={p} className={styles.partnerChip}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── BOTTOM CARD: Cost ── */}
          <div className={styles.cardBottom}>
            <div className={styles.floatCard} data-size="sm">
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </span>
                <span className={styles.cardLabel}>Cost Optimization</span>
              </div>
              <div className={styles.costRow}>
                <div className={styles.costStat}>
                  <span className={styles.costNum}>40%</span>
                  <span className={styles.costSub}>Lower TCO</span>
                </div>
                <div className={styles.costDivider} />
                <div className={styles.costStat}>
                  <span className={styles.costNum}>0</span>
                  <span className={styles.costSub}>Vendor lock-in</span>
                </div>
              </div>
              <p className={styles.costCaption}>
                Open source eliminates proprietary dependencies
              </p>
            </div>
          </div>
        </div>
        {/* /constellation */}
      </div>
    </section>
  );
};

export default BenefitsRedhat;
