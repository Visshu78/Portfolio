import React, { useState, useEffect, useRef } from 'react';
import { Eye, Sliders, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cvProjects } from '../data/projects';

/* Animated progress bar for metrics */
function MetricBar({ label, value, max, suffix = '%', color = 'var(--cyan)' }) {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const pct = Math.round((value / max) * 100);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-[0.68rem] text-[var(--text-secondary)]">{label}</span>
        <span className="font-mono text-xs font-bold" style={{ color }}>{value}{suffix}</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{
            '--w': `${pct}%`,
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            width: animated ? `${pct}%` : '0%',
            transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </div>
    </div>
  );
}

/* Animated number counter */
function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const dur = 1400;
        const step = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(e * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function SeeSection({ onOpenCaseStudy }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showBBox, setShowBBox] = useState(true);
  const [showPoints, setShowPoints] = useState(true);
  const [threshold, setThreshold] = useState(85);
  const [hoveredProject, setHoveredProject] = useState(null);

  const project = cvProjects[activeIdx];

  const prev = () => setActiveIdx(i => (i - 1 + cvProjects.length) % cvProjects.length);
  const next = () => setActiveIdx(i => (i + 1) % cvProjects.length);

  return (
    <section
      id="see"
      className="relative py-28 px-6 lg:px-10 border-t border-[var(--border-subtle)]"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="section-num">01</div>

      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="mb-16 reveal" data-delay="0">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 font-mono text-[0.7rem] text-[var(--cyan)]"
            style={{ background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.2)' }}
          >
            <Eye size={13} /> 01 / COMPUTER VISION & VISUAL INTELLIGENCE
          </div>
          <h2
            className="font-display font-extrabold text-[var(--text-main)] mb-4 reveal"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Teaching Machines<br />
            <span style={{ color: 'var(--cyan)' }}>to See</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl text-base leading-relaxed reveal" data-delay="100">
            High-precision photogrammetry, industrial anomaly detection, sub-pixel metrology and spatial clustering — designed for real-world reliability.
          </p>
        </div>

        {/* ── Main Inspection Lab ── */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* Left: Vision Canvas (8 cols) */}
          <div className="xl:col-span-8 card p-0 overflow-hidden reveal" data-delay="100">
            {/* Canvas Toolbar */}
            <div
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-[var(--border-subtle)]"
              style={{ background: 'rgba(0,0,0,0.3)' }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--cyan)] anim-pulse" />
                <span className="font-mono text-[0.68rem] text-[var(--cyan)]">INSPECTION_BUFFER // LIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBBox(v => !v)}
                  className="interactive font-mono text-[0.68rem] px-2.5 py-1 rounded transition-all"
                  style={{
                    background: showBBox ? 'rgba(0,240,255,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${showBBox ? 'rgba(0,240,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    color: showBBox ? 'var(--cyan)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  BBOX: {showBBox ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => setShowPoints(v => !v)}
                  className="interactive font-mono text-[0.68rem] px-2.5 py-1 rounded transition-all"
                  style={{
                    background: showPoints ? 'rgba(16,240,128,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${showPoints ? 'rgba(16,240,128,0.35)' : 'rgba(255,255,255,0.1)'}`,
                    color: showPoints ? 'var(--emerald)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  KPTS: {showPoints ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Vision Canvas with Background Feed & Reactive Thresholding */}
            <div
              className="relative bg-[#050608] overflow-hidden group select-none"
              style={{ aspectRatio: '16/9' }}
            >
              {/* Actual Computer Vision Sensor Feed Image */}
              {project.feedImage && (
                <img
                  src={project.feedImage}
                  alt={project.title}
                  key={project.id}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-65 mix-blend-luminosity brightness-110 contrast-125 transition-all duration-500 pointer-events-none"
                />
              )}

              {/* Seamless Dark Vignette / Contrast Overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(5,6,8,0.2) 0%, rgba(5,6,8,0.65) 70%, rgba(5,6,8,0.92) 100%)',
                }}
              />

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" />

              {/* Central crosshairs */}
              <div className="absolute inset-0 flex items-center pointer-events-none">
                <div style={{ width: '100%', height: 1, background: 'rgba(0,240,255,0.08)' }} />
              </div>
              <div className="absolute inset-0 flex justify-center pointer-events-none">
                <div style={{ width: 1, height: '100%', background: 'rgba(0,240,255,0.08)' }} />
              </div>

              {/* Detections — Dynamically Reacting to Threshold */}
              {showBBox && project.demoBoxes && project.demoBoxes.map((box, i) => {
                const confNum = box.confValue || parseFloat(box.confidence) || 90;
                const isPassed = confNum >= threshold;

                return (
                  <div
                    key={`${project.id}-box-${i}`}
                    className={`bbox transition-all duration-300 ${
                      box.status === 'REJECT' ? 'reject' : box.status === 'WARN' ? 'warn' : ''
                    }`}
                    style={{
                      top: box.top,
                      left: box.left,
                      width: box.width,
                      height: box.height,
                      opacity: isPassed ? 1 : 0.22,
                      transform: isPassed ? 'scale(1)' : 'scale(0.97)',
                      filter: isPassed ? 'none' : 'grayscale(100%)',
                      borderStyle: isPassed ? 'solid' : 'dashed',
                      pointerEvents: isPassed ? 'auto' : 'none',
                    }}
                  >
                    <div className="bbox-label flex items-center gap-1.5 whitespace-nowrap">
                      <span>{box.label}</span>
                      <span className="font-bold">[{box.confidence}]</span>
                      {!isPassed && (
                        <span className="text-[0.55rem] px-1 py-0.2 bg-black/60 rounded text-red-400">
                          SUPPRESSED
                        </span>
                      )}
                    </div>
                    {/* Corner accents on active bbox */}
                    {isPassed && (
                      <>
                        <div style={{ position: 'absolute', top: -1, left: -1, width: 6, height: 6, borderTop: '2px solid white', borderLeft: '2px solid white' }} />
                        <div style={{ position: 'absolute', bottom: -1, right: -1, width: 6, height: 6, borderBottom: '2px solid white', borderRight: '2px solid white' }} />
                      </>
                    )}
                  </div>
                );
              })}

              {/* Keypoints — Dynamically Reacting to Threshold */}
              {showPoints && project.keypoints && (
                <div className="absolute inset-0 pointer-events-none">
                  {project.keypoints.map((pt, i) => {
                    const isPassed = pt.conf >= threshold;
                    return (
                      <div
                        key={`${project.id}-pt-${i}`}
                        className="absolute transition-all duration-300"
                        style={{
                          top: pt.t,
                          left: pt.l,
                          transform: 'translate(-50%, -50%)',
                          opacity: isPassed ? 1 : 0.15,
                        }}
                      >
                        {isPassed && (
                          <div
                            className="absolute rounded-full"
                            style={{
                              width: 14,
                              height: 14,
                              top: -7,
                              left: -7,
                              background: 'rgba(16,240,128,0.25)',
                              animation: `pulseDot ${1.5 + i * 0.2}s ease-in-out infinite`,
                            }}
                          />
                        )}
                        <div
                          className="w-2 h-2 rounded-full transition-colors"
                          style={{
                            background: isPassed ? 'var(--emerald)' : 'rgba(255,255,255,0.3)',
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Top Sensor Telemetry */}
              <div className="absolute top-3 left-3 font-mono text-[0.6rem] text-[var(--cyan)] flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-[rgba(0,240,255,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] anim-pulse" />
                <span>{project.feedTitle || 'SENSOR_FEED // LIVE'}</span>
              </div>

              {/* Project label & Threshold State overlay */}
              <div
                className="absolute bottom-3 left-3 right-3 font-mono text-[0.62rem] text-[var(--text-muted)] flex items-center justify-between bg-black/65 backdrop-blur-md px-3 py-1.5 rounded border border-[var(--border-subtle)]"
              >
                <div className="flex items-center gap-3">
                  <span>FRAME_0{activeIdx + 1}_{(Math.floor(Math.random() * 9000) + 1000)} // FP16</span>
                  <span className="text-[var(--text-secondary)] hidden sm:inline">
                    FILTER: &gt;={threshold}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--emerald)]">
                    LOCKED: {project.demoBoxes?.filter(b => (b.confValue || parseFloat(b.confidence)) >= threshold).length || 0}/{project.demoBoxes?.length || 0}
                  </span>
                  <span className="text-[var(--cyan)] font-bold">{project.confidence} BASE</span>
                </div>
              </div>

              {/* Scan beam on canvas */}
              <div className="scan-beam" />
            </div>

            {/* Threshold Slider with Live Feedback */}
            <div
              className="flex items-center gap-4 px-5 py-3 border-t border-[var(--border-subtle)]"
              style={{ background: 'rgba(0,0,0,0.2)' }}
            >
              <Sliders size={13} className="text-[var(--cyan)] shrink-0" />
              <span className="font-mono text-[0.68rem] text-[var(--text-secondary)] whitespace-nowrap">
                CONF THRESHOLD:
              </span>
              <input
                type="range"
                min={50}
                max={99}
                value={threshold}
                onChange={e => setThreshold(+e.target.value)}
                className="flex-1 interactive"
                style={{ accentColor: 'var(--cyan)', cursor: 'pointer' }}
              />
              <span
                className="font-mono text-xs font-bold w-12 text-right px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.04)]"
                style={{ color: threshold > 90 ? 'var(--emerald)' : threshold > 75 ? 'var(--cyan)' : 'var(--amber)' }}
              >
                {threshold}%
              </span>
            </div>

            {/* Project Navigator */}
            <div className="flex items-center gap-2 px-5 py-3 border-t border-[var(--border-subtle)] overflow-x-auto no-scrollbar">
              {cvProjects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActiveIdx(i)}
                  className="interactive shrink-0 font-mono text-[0.65rem] px-3 py-1.5 rounded transition-all"
                  style={{
                    background: i === activeIdx ? 'rgba(0,240,255,0.12)' : 'transparent',
                    border: `1px solid ${i === activeIdx ? 'rgba(0,240,255,0.4)' : 'rgba(255,255,255,0.06)'}`,
                    color: i === activeIdx ? 'var(--cyan)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  0{i + 1} / {p.title.split(' ').slice(0, 2).join(' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Project Info (4 cols) */}
          <div className="xl:col-span-4 flex flex-col gap-4">
            <div className="card p-6 flex-1 reveal" data-delay="150">
              <div
                className="font-mono text-[0.68rem] mb-2 font-bold"
                style={{ color: 'var(--cyan)' }}
              >
                {project.category.toUpperCase()}
              </div>

              <h3 className="font-display font-bold text-xl text-[var(--text-main)] mb-2 leading-snug">
                {project.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-5">
                {project.subtitle}
              </p>

              {/* Metrics as animated bars */}
              <div className="space-y-4 mb-5">
                <MetricBar
                  label="Confidence"
                  value={parseFloat(String(project.confidence).replace(/[^0-9.]/g, '')) || 99.4}
                  max={100}
                  suffix="%"
                />
                {project.metrics.slice(0, 2).map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[0.68rem] font-mono mb-1.5">
                      <span className="text-[var(--text-secondary)]">{m.label}</span>
                      <span className="text-[var(--text-main)] font-bold">{m.value}</span>
                    </div>
                    <div className="text-[0.62rem] text-[var(--text-muted)]">{m.detail}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.slice(0, 4).map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              {/* Case Study Button */}
              <button
                id="inspect-case-study-btn"
                onClick={e => { e.stopPropagation(); onOpenCaseStudy(project); }}
                className="btn btn-cyan w-full justify-center interactive"
              >
                9-Step Case Study
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 reveal" data-delay="200">
              {[
                { label: 'Projects', val: 12, suffix: '+' },
                { label: 'Precision', val: 99, suffix: '%' },
                { label: 'FPS Target', val: 60, suffix: '' },
              ].map(s => (
                <div key={s.label} className="card p-4 text-center">
                  <div
                    className="font-display font-extrabold text-2xl text-[var(--text-main)] mb-1 counter"
                  >
                    <Counter target={s.val} suffix={s.suffix} />
                  </div>
                  <div className="label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Project Grid ── */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cvProjects.map((proj, i) => (
            <div
              key={proj.id}
              onClick={() => setActiveIdx(i)}
              onMouseEnter={() => setHoveredProject(proj.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="card p-5 cursor-pointer group reveal interactive"
              data-delay={i * 80}
              style={{
                borderColor: hoveredProject === proj.id ? 'rgba(0,240,255,0.3)' : undefined,
                transform: hoveredProject === proj.id ? 'translateY(-4px)' : undefined,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-[0.65rem] text-[var(--cyan)]">
                  CONF: {proj.confidence}
                </span>
                <span className="font-mono text-[0.62rem] text-[var(--text-muted)]">
                  0{i + 1}
                </span>
              </div>
              <h4
                className="font-display font-bold text-[var(--text-main)] mb-2 leading-snug transition-colors"
                style={{ fontSize: '1.05rem', color: hoveredProject === proj.id ? 'var(--cyan)' : undefined }}
              >
                {proj.title}
              </h4>
              <p className="text-[0.78rem] text-[var(--text-secondary)] line-clamp-2 mb-4">
                {proj.subtitle}
              </p>
              <div className="divider mb-3" />
              <div className="flex items-center justify-between text-[0.68rem] font-mono text-[var(--text-muted)]">
                <span>OPEN IN LAB</span>
                <ChevronRight
                  size={14}
                  style={{
                    color: hoveredProject === proj.id ? 'var(--cyan)' : undefined,
                    transform: hoveredProject === proj.id ? 'translateX(4px)' : undefined,
                    transition: 'all 0.2s',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
