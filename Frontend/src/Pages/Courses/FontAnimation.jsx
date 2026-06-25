import { useEffect, useRef } from "react";
import styles from "./FontAnimation.module.css";

/* ─── Shadow-circle canvas animation ─────────────────────── */
function ShadowCircle() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H, animId;
    let t = 0;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* Three concentric pulsing rings with a radial glow core */
    const rings = [
      { baseR: 0.38, speed: 0.0004, phase: 0,    alpha: 0.18, width: 1.2 },
      { baseR: 0.28, speed: 0.0006, phase: 1.0,  alpha: 0.28, width: 0.8 },
      { baseR: 0.18, speed: 0.0009, phase: 2.1,  alpha: 0.40, width: 0.6 },
    ];

    const draw = (ts) => {
      t = ts;
      ctx.clearRect(0, 0, W, H);

      /* anchor the composition to the left — circle centre roughly 1/3 from left */
      const cx = W * 0.28;
      const cy = H * 0.52;
      const baseUnit = Math.min(W, H) * 0.42;

      /* radial glow core */
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseUnit * 0.55);
      grd.addColorStop(0,   "rgba(30, 60, 120, 0.22)");
      grd.addColorStop(0.5, "rgba(15, 35,  80, 0.10)");
      grd.addColorStop(1,   "rgba(8,  14,  30, 0.00)");
      ctx.beginPath();
      ctx.arc(cx, cy, baseUnit * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      /* pulsing rings */
      rings.forEach(({ baseR, speed, phase, alpha, width }) => {
        const pulse = 1 + 0.04 * Math.sin(t * speed * 1000 + phase);
        const r = baseUnit * baseR * pulse;

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(80, 140, 220, ${alpha})`;
        ctx.lineWidth = width;
        ctx.stroke();
      });

      /* subtle rotating arc accent */
      const arcAngle = (t * 0.0004) % (Math.PI * 2);
      ctx.beginPath();
      ctx.arc(cx, cy, baseUnit * 0.34, arcAngle, arcAngle + Math.PI * 0.7);
      ctx.strokeStyle = "rgba(100, 160, 255, 0.12)";
      ctx.lineWidth = 6;
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.shadowCanvas} aria-hidden="true" />;
}

/* ─── Main component ──────────────────────────────────────── */
function FontAnimation({
  tagline = "The best time to start learning was yesterday. The next best time is now.",
  theme = {},
}) {
  const inlineStyle = Object.keys(theme).length ? { ...theme } : undefined;

  /*
    Lowercase "e" — correct anatomy:
      Circle centre:  cx=307, cy=172   radius outer=85, inner=71
      Mid-bar:        x from (222,172) to (392,172)  — full diameter
      Arc:            starts at LEFT point (222,172)
                      sweeps CLOCKWISE (sweep=1) going UP first
                      stops at a point in the LOWER-RIGHT area
                      leaving the opening/gap on the lower-right
                      End point: roughly (355, 248) = about 4-o'clock position
      SVG arc syntax: A rx ry rot large-arc sweep ex ey
        large-arc=1 because we travel >180° (about 300°)
        sweep=1     = clockwise
  */
  /* e geometry constants */
  const ECX = 307, ECY = 172;
  const EOR = 85,  EIR = 71;          /* outer / inner radius */
  const ELX = ECX - EOR;              /* left point  x = 222 */
  const ERX = ECX + EOR;              /* right point x = 392 */
  /* arc end = ~4 o'clock = 120° from top = 30° past 3-o'clock */
  /* angle from positive-x: 4-o'clock ≈ 120° → x=cx+r*cos120, y=cy+r*sin120 */
  const eEndAngleDeg = 115;           /* degrees from +x axis, CW from right */
  const eEndRad = (eEndAngleDeg * Math.PI) / 180;
  const eEndX_o  = Math.round(ECX + EOR * Math.cos(eEndRad));   /* ≈ 344 */
  const eEndY_o  = Math.round(ECY + EOR * Math.sin(eEndRad));   /* ≈ 249 */
  const eEndX_i  = Math.round(ECX + EIR * Math.cos(eEndRad));   /* ≈ 338 */
  const eEndY_i  = Math.round(ECY + EIR * Math.sin(eEndRad));   /* ≈ 236 */

  return (
    <section className={styles.blueprint} style={inlineStyle}>

      {/* Fine squared grid */}
      <div className={styles.grid} aria-hidden="true" />

      {/* Horizontal typographic construction lines */}
      <div className={styles.guides} aria-hidden="true">
        <span className={`${styles.gh} ${styles.gh1}`} />
        <span className={`${styles.gh} ${styles.gh2}`} />
        <span className={`${styles.gh} ${styles.gh3}`} />
        <span className={`${styles.gh} ${styles.gh4}`} />
      </div>

      {/* Shadow circle canvas — bottom-left */}
      {/* <ShadowCircle /> */}

      {/* Centred content */}
      <div className={styles.centerBlock}>
        <div className={styles.wordWrapper}>
          <svg
            className={styles.learnSvg}
            viewBox="0 0 1060 290"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Learn"
          >
            <g stroke="var(--bp-stroke)" strokeLinecap="round" strokeLinejoin="round">

              {/* ══ L  x:44–190  y:25–255 ══ */}
              <path strokeWidth="3"   d="M 44 25  L 44 255 L 190 255" />
              <path strokeWidth="1.5" d="M 56 37  L 56 243 L 178 243" />

              {/* ══ e  cx=307 cy=172  x:222–392  y:87–257
                  Arc starts at LEFT (222,172), sweeps CLOCKWISE (up first),
                  travels ~300°, ends at ~4-o'clock (lower-right), leaving
                  the gap opening on the lower-right.
              ══ */}
              {/* outer arc: large-arc=1, sweep=1 (CW) */}
              <path strokeWidth="3"
                d={`M ${ELX} ${ECY} A ${EOR} ${EOR} 0 1 1 ${eEndX_o} ${eEndY_o}`} />
              {/* inner arc */}
              <path strokeWidth="1.5"
                d={`M ${ELX + 14} ${ECY} A ${EIR} ${EIR} 0 1 1 ${eEndX_i} ${eEndY_i}`} />
              {/* mid-bar */}
              <path strokeWidth="3"   d={`M ${ELX} ${ECY} L ${ERX} ${ECY}`} />
              <path strokeWidth="1.5" d={`M ${ELX+14} ${ECY} L ${ERX-14} ${ECY}`} />

              {/* ══ a  cx=510 cy=170  x:435–585  y:90–255 ══ */}
              <path strokeWidth="3"
                d="M 510 90 C 552 90,585 123,585 170 C 585 217,552 250,510 250
                   C 468 250,435 217,435 170 C 435 123,468 90,510 90 Z" />
              <path strokeWidth="1.5"
                d="M 510 104 C 545 104,571 130,571 170 C 571 210,545 236,510 236
                   C 475 236,449 210,449 170 C 449 130,475 104,510 104 Z" />
              <path strokeWidth="3"   d="M 585 90  L 585 255" />
              <path strokeWidth="1.5" d="M 571 102 L 571 243" />

              {/* ══ r  x:615–738  y:90–255 ══ */}
              <path strokeWidth="3"   d="M 623 255 L 623 90" />
              <path strokeWidth="1.5" d="M 637 243 L 637 104" />
              <path strokeWidth="3"
                d="M 623 90 C 645 90,728 100,728 158" />
              <path strokeWidth="1.5"
                d="M 637 104 C 656 104,714 114,714 158" />

              {/* ══ n  x:758–950  y:90–255 ══ */}
              <path strokeWidth="3"   d="M 766 255 L 766 90" />
              <path strokeWidth="1.5" d="M 780 243 L 780 104" />
              <path strokeWidth="3"
                d="M 766 126 C 766 102,788 90,828 90
                   C 888 90,938 120,938 174 L 938 255" />
              <path strokeWidth="1.5"
                d="M 780 138 C 780 116,798 104,830 104
                   C 884 104,924 131,924 174 L 924 243" />

            </g>

            {/* ── Anchor dots ── */}
            <g fill="var(--bp-accent)">
              {/* L */}
              <circle cx="44"  cy="25"  r="4.5"/>
              <circle cx="44"  cy="255" r="4.5"/>
              <circle cx="190" cy="255" r="4.5"/>

              {/* e */}
              <circle cx={ELX}     cy={ECY}     r="4.5"/>
              <circle cx={ECX}     cy={ECY-EOR} r="4.5"/>   {/* top */}
              <circle cx={ERX}     cy={ECY}     r="4.5"/>   {/* right */}
              <circle cx={eEndX_o} cy={eEndY_o} r="4.5"/>   {/* tail end */}
              <circle cx={ECX-40}  cy={ECY-EOR} r="3" opacity="0.6"/>
              <circle cx={ECX+40}  cy={ECY-EOR} r="3" opacity="0.6"/>

              {/* a */}
              <circle cx="510" cy="90"  r="4.5"/>
              <circle cx="585" cy="170" r="4.5"/>
              <circle cx="510" cy="250" r="4.5"/>
              <circle cx="435" cy="170" r="4.5"/>
              <circle cx="585" cy="90"  r="4.5"/>
              <circle cx="585" cy="255" r="4.5"/>
              <circle cx="475" cy="90"  r="3" opacity="0.6"/>
              <circle cx="545" cy="90"  r="3" opacity="0.6"/>
              <circle cx="475" cy="250" r="3" opacity="0.6"/>
              <circle cx="545" cy="250" r="3" opacity="0.6"/>

              {/* r */}
              <circle cx="623" cy="90"  r="4.5"/>
              <circle cx="623" cy="255" r="4.5"/>
              <circle cx="728" cy="158" r="4.5"/>
              <circle cx="645" cy="90"  r="3" opacity="0.6"/>
              <circle cx="728" cy="100" r="3" opacity="0.6"/>

              {/* n */}
              <circle cx="766" cy="90"  r="4.5"/>
              <circle cx="766" cy="255" r="4.5"/>
              <circle cx="828" cy="90"  r="4.5"/>
              <circle cx="938" cy="174" r="4.5"/>
              <circle cx="938" cy="255" r="4.5"/>
              <circle cx="766" cy="126" r="3" opacity="0.6"/>
              <circle cx="828" cy="100" r="3" opacity="0.6"/>
              <circle cx="888" cy="120" r="3" opacity="0.6"/>
            </g>

            {/* ── Bezier handle lines ── */}
            <g stroke="var(--bp-handle)" strokeWidth="0.9">
              {/* e */}
              <line x1={ELX} y1={ECY} x2={ECX-40} y2={ECY-EOR}/>
              <line x1={ECX} y1={ECY-EOR} x2={ECX+40} y2={ECY-EOR}/>
              {/* a */}
              <line x1="510" y1="90"  x2="475" y2="90"/>
              <line x1="510" y1="90"  x2="545" y2="90"/>
              <line x1="510" y1="250" x2="475" y2="250"/>
              <line x1="510" y1="250" x2="545" y2="250"/>
              {/* r */}
              <line x1="623" y1="90"  x2="645" y2="90"/>
              <line x1="728" y1="158" x2="728" y2="100"/>
              {/* n */}
              <line x1="766" y1="126" x2="766" y2="90"/>
              <line x1="828" y1="90"  x2="828" y2="100"/>
              <line x1="938" y1="174" x2="888" y2="120"/>
            </g>

            {/* ── Vertical construction lines ── */}
            <g stroke="var(--bp-guide)" strokeWidth="0.75">
              <line x1="44"  y1="0" x2="44"  y2="290"/>
              <line x1="190" y1="0" x2="190" y2="290"/>
              <line x1="222" y1="0" x2="222" y2="290"/>
              <line x1="392" y1="0" x2="392" y2="290"/>
              <line x1="435" y1="0" x2="435" y2="290"/>
              <line x1="585" y1="0" x2="585" y2="290"/>
              <line x1="623" y1="0" x2="623" y2="290"/>
              <line x1="728" y1="0" x2="728" y2="290"/>
              <line x1="766" y1="0" x2="766" y2="290"/>
              <line x1="938" y1="0" x2="938" y2="290"/>
            </g>

          </svg>
        </div>

        {tagline && <p className={styles.tagline}>{tagline}</p>}
      </div>

      {/* Gradient fade into next section */}
      <div className={styles.fadeOut} aria-hidden="true" />
    </section>
  );
}

export default FontAnimation;