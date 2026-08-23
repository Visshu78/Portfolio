import React, { useEffect, useState, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { profileData } from '../data/profile';

/* Tiny canvas particle field */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles — Sprinkled starfield / sensor grid
    const NUM = 135;
    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.5 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      baseA: 0.15 + Math.random() * 0.55,
      pulseSpeed: 0.01 + Math.random() * 0.02,
      pulsePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.35 ? '0,240,255' : '165,243,252',
    }));

    let tick = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      tick++;

      // Connect nearby particles lightly
      for (let i = 0; i < NUM; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        for (let j = i + 1; j < NUM; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,240,255,${0.045 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.45;
            ctx.stroke();
          }
        }

        // Particle twinkle
        const alpha = p.baseA + Math.sin(tick * p.pulseSpeed + p.pulsePhase) * 0.18;
        const clampedAlpha = Math.max(0.08, Math.min(0.85, alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${clampedAlpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

/* Animated typing effect */
function TypeWriter({ phrases, className }) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), 55);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), 28);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
    }

    setText(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases]);

  return (
    <span className={className}>
      {text}<span className="terminal-caret" />
    </span>
  );
}

const flowNodes = [
  { id: 'see',        label: 'SEE',        sub: 'Computer Vision',      num: '01', color: '#00f0ff' },
  { id: 'build',      label: 'BUILD',      sub: 'AI Systems',           num: '02', color: '#10f080' },
  { id: 'experience', label: 'EXPERIENCE', sub: 'Roles & Education',    num: '03', color: '#38bdf8' },
  { id: 'lab',        label: 'LAB',        sub: 'Living Lab',           num: '04', color: '#ff7adf' },
  { id: 'write',      label: 'WRITE',      sub: 'Essays & Reflections', num: '05', color: '#ffc885' },
  { id: 'about',      label: 'ABOUT',      sub: 'System & Contact',     num: '06', color: '#a78bfa' },
];

export default function Hero({ onNavigate }) {
  const [confidence, setConfidence] = useState(99.4);
  const [frameCount, setFrameCount] = useState(9482);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    const ci = setInterval(() => setConfidence(+(99.1 + Math.random() * 0.8).toFixed(1)), 2800);
    const fi = setInterval(() => setFrameCount(n => n + Math.floor(Math.random() * 3)), 400);
    return () => { clearInterval(ci); clearInterval(fi); };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <ParticleCanvas />

      {/* Ambient glows */}
      <div className="ambient-glow w-[600px] h-[600px] bg-cyan-500/5 -top-32 -left-32" />
      <div className="ambient-glow w-[400px] h-[400px] bg-purple-500/5 top-1/2 right-0" />

      {/* Scan beam */}
      <div className="scan-beam" style={{ top: '20%' }} />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Text column */}
          <div>
            {/* Frame badge */}
            <div
              className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full mb-8 anim-fade-up"
              style={{
                background: 'rgba(0,240,255,0.06)',
                border: '1px solid rgba(0,240,255,0.2)',
              }}
            >
              <span className="anim-pulse w-2 h-2 rounded-full bg-[var(--cyan)]" />
              <span className="font-mono text-[0.68rem] tracking-widest text-[var(--cyan)]">
                OBSERVATION // FRAME {frameCount.toLocaleString()}
              </span>
              <span className="font-mono text-[0.62rem] text-[var(--text-muted)] hidden sm:block">
                CONF: {confidence}%
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="font-display font-extrabold leading-[1.04] mb-6 anim-fade-up delay-100"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
            >
              <span style={{ color: 'var(--text-main)' }}>A WAY</span>
              <br />
              <span className="text-shimmer">TO SEE THINGS</span>
            </h1>

            {/* Typewriter tagline */}
            <p
              className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8 anim-fade-up delay-200"
              style={{ maxWidth: '520px' }}
            >
              I build intelligent systems that{' '}
              <TypeWriter
                phrases={['see in real time.', 'understand the world visually.', 'run at the edge.', 'ground AI in real data.', 'bridge research and production.']}
                className="text-[var(--cyan)] font-medium"
              />
            </p>

            {/* Spec pills */}
            <div className="flex flex-wrap gap-2 mb-10 anim-fade-up delay-300">
              {['CV Engineer', 'Deep Learning', 'Applied AI', 'RAG Systems', 'Edge AI'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            {/* CTA Row */}
            <div className="flex flex-wrap gap-3 anim-fade-up delay-400">
              <button
                className="btn btn-cyan"
                onClick={() => onNavigate('see')}
              >
                Explore My Work
                <ArrowDown size={14} />
              </button>
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                github.com/Visshu78 ↗
              </a>
            </div>
          </div>

          {/* Right — Interactive Vision HUD with CV Background Image */}
          <div className="hidden lg:flex items-center justify-center anim-fade-up delay-300">
            <div
              className="relative w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden group shadow-[0_0_50px_rgba(0,240,255,0.08)]"
            >
              {/* Computer Vision Neural Perception Image (Blended) */}
              <img
                src="/vision_feed.jpg"
                alt="Computer Vision Neural Perception Feed"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-70 mix-blend-luminosity brightness-110 contrast-125 transition-all duration-700 group-hover:opacity-90 group-hover:scale-105 pointer-events-none"
              />

              {/* Seamless Dark Vignette / Gradient Overlay to blend with #070809 background */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(7,8,9,0.3) 0%, rgba(7,8,9,0.65) 65%, rgba(7,8,9,0.92) 100%)',
                }}
              />

              {/* Cyan ambient tint layer */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-color"
                style={{
                  background: 'radial-gradient(circle at 50% 40%, rgba(0,240,255,0.3) 0%, transparent 70%)',
                }}
              />

              {/* HUD Outer Frame */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  border: '1px solid rgba(0,240,255,0.25)',
                  boxShadow: 'inset 0 0 25px rgba(0,240,255,0.06)',
                }}
              />

              {/* Corner brackets */}
              <div className="hud-corner hud-corner-tl" style={{ width: 20, height: 20 }} />
              <div className="hud-corner hud-corner-tr" style={{ width: 20, height: 20 }} />
              <div className="hud-corner hud-corner-bl" style={{ width: 20, height: 20 }} />
              <div className="hud-corner hud-corner-br" style={{ width: 20, height: 20 }} />

              {/* Central visual targeting element */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  {/* Rotating ring */}
                  <div
                    className="absolute inset-0 rounded-full border border-[rgba(0,240,255,0.25)] anim-spin"
                    style={{ width: 200, height: 200, top: -100, left: -100 }}
                  />
                  {/* Inner ring */}
                  <div
                    className="absolute inset-0 rounded-full border border-dashed border-[rgba(0,240,255,0.2)]"
                    style={{ width: 150, height: 150, top: -75, left: -75, animation: 'rotate360 12s linear infinite reverse' }}
                  />

                  {/* Center target */}
                  <div className="relative w-16 h-16 rounded-full bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.45)] anim-glow flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-2 h-2 rounded-full bg-[var(--cyan)] anim-pulse" />
                  </div>

                  {/* Crosshair lines */}
                  <div className="absolute" style={{ top: -40, left: 28, width: 1, height: 30, background: 'rgba(0,240,255,0.4)' }} />
                  <div className="absolute" style={{ top: 42, left: 28, width: 1, height: 30, background: 'rgba(0,240,255,0.4)' }} />
                  <div className="absolute" style={{ top: 28, left: -40, height: 1, width: 30, background: 'rgba(0,240,255,0.4)' }} />
                  <div className="absolute" style={{ top: 28, left: 42, height: 1, width: 30, background: 'rgba(0,240,255,0.4)' }} />
                </div>

                {/* Floating detection bounding boxes (Layered on top of image) */}
                <div className="bbox" style={{ top: '16%', left: '18%', width: '38%', height: '30%', animationDelay: '0s' }}>
                  <div className="bbox-label">NEURAL_MAP [99.4%]</div>
                </div>
                <div className="bbox reject" style={{ top: '56%', right: '16%', width: '30%', height: '24%', animationDelay: '0.3s' }}>
                  <div className="bbox-label">EDGE_DETECT [97.2%]</div>
                </div>
                <div className="bbox warn" style={{ bottom: '12%', left: '14%', width: '26%', height: '20%', animationDelay: '0.6s' }}>
                  <div className="bbox-label">POINT_CLOUD_001</div>
                </div>
              </div>

              {/* Telemetry overlays */}
              <div
                className="absolute top-3 left-3 font-mono text-[0.6rem] text-[var(--cyan)] leading-5 space-y-0.5 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] anim-pulse"></span>
                  <span>VISION_FEED // 1080p@60</span>
                </div>
                <div className="text-[var(--text-muted)]">LATENCY: 11.2ms</div>
              </div>

              <div
                className="absolute bottom-3 right-3 font-mono text-[0.6rem] text-right text-[var(--text-muted)] leading-5 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                <div className="text-[var(--cyan)]">FP16 // TensorRT</div>
                <div>FRAME: {frameCount.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Navigation Flowchart ── */}
        <div className="mt-20">
          <div className="label text-center mb-6">NAVIGATE THE SPECTRUM</div>

          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-0">
            {flowNodes.map((node, idx) => (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => onNavigate(node.id)}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  className="interactive group relative flex-1 flex flex-col items-center py-4 px-2 transition-all duration-300"
                  style={{
                    background: activeNode === node.id ? `${node.color}0d` : 'transparent',
                    border: `1px solid ${activeNode === node.id ? node.color + '40' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    className="font-mono text-[0.6rem] mb-1 transition-colors"
                    style={{ color: activeNode === node.id ? node.color : 'var(--text-muted)' }}
                  >
                    {node.num}
                  </span>
                  <span
                    className="font-display font-bold text-sm transition-colors"
                    style={{ color: activeNode === node.id ? node.color : 'var(--text-main)' }}
                  >
                    {node.label}
                  </span>
                  <span className="font-mono text-[0.62rem] text-[var(--text-muted)] mt-0.5">
                    {node.sub}
                  </span>

                  {activeNode === node.id && (
                    <div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                      style={{ background: node.color }}
                    />
                  )}
                </button>

                {idx < flowNodes.length - 1 && (
                  <div className="hidden sm:flex items-center justify-center w-6 shrink-0">
                    <div className="font-mono text-xs text-[var(--text-muted)]">→</div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => onNavigate('see')}
            className="interactive flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors bg-transparent border-0 cursor-pointer group"
          >
            <span className="label group-hover:text-[var(--cyan)] transition-colors">ENTER OBSERVATION</span>
            <div
              className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.12)] flex items-center justify-center group-hover:border-[rgba(0,240,255,0.5)] transition-colors"
              style={{ animation: 'float 2.5s ease-in-out infinite' }}
            >
              <ArrowDown size={14} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
