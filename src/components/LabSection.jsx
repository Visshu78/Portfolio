import React, { useState } from 'react';
import { labExperiments } from '../data/labs';
import { Terminal, ExternalLink, Clock } from 'lucide-react';

const STATUS_STYLES = {
  EXPERIMENTING: { bg: 'rgba(0,240,255,0.08)', border: 'rgba(0,240,255,0.3)', color: 'var(--cyan)', dot: 'var(--cyan)' },
  IMPROVING:     { bg: 'rgba(16,240,128,0.08)', border: 'rgba(16,240,128,0.3)', color: 'var(--emerald)', dot: 'var(--emerald)' },
  BUILDING:      { bg: 'rgba(255,179,64,0.08)',  border: 'rgba(255,179,64,0.3)',  color: 'var(--amber)',  dot: 'var(--amber)' },
  ARCHIVED:      { bg: 'rgba(255,255,255,0.03)',  border: 'rgba(255,255,255,0.1)', color: 'var(--text-muted)', dot: '#3a3f50' },
};

export default function LabSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="lab"
      className="relative py-28 px-6 lg:px-10 border-t border-[var(--border-subtle)]"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="section-num">04</div>
      <div className="max-w-7xl mx-auto">

        <div className="mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 font-mono text-[0.7rem]"
            style={{ background: 'rgba(16,240,128,0.06)', border: '1px solid rgba(16,240,128,0.2)', color: 'var(--emerald)' }}
          >
            <Terminal size={13} /> 04 / LIVING EXPERIMENTS ARCHIVE
          </div>
          <h2
            className="font-display font-extrabold text-[var(--text-main)] mb-4 reveal"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            The Living<br />
            <span style={{ color: 'var(--emerald)' }}>Sandbox</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl text-base leading-relaxed reveal" data-delay="100">
            An intentionally unfinished archive of weekend prototypes, active ideas, and experiments-in-progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {labExperiments.map((lab, i) => {
            const s = STATUS_STYLES[lab.status] || STATUS_STYLES.ARCHIVED;
            const isHov = hovered === lab.id;

            return (
              <div
                key={lab.id}
                className="card p-6 relative interactive reveal"
                data-delay={i * 80}
                onMouseEnter={() => setHovered(lab.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderColor: isHov ? s.border : undefined,
                  transform: isHov ? 'translateY(-4px)' : undefined,
                  transition: 'all 0.3s var(--ease-expo)',
                }}
              >
                {/* HUD corners */}
                <div className="hud-corner hud-corner-tl" style={{ borderColor: s.color, width: 8, height: 8 }} />
                <div className="hud-corner hud-corner-br" style={{ borderColor: s.color, width: 8, height: 8 }} />

                {/* Header row */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[var(--text-muted)]">{lab.id}</span>
                    <div className="font-mono text-[0.65rem] flex items-center gap-1 text-[var(--text-muted)]">
                      <Clock size={10} /> {lab.timestamp}
                    </div>
                  </div>
                  <span
                    className="font-mono text-[0.65rem] font-bold px-2 py-0.5 rounded flex items-center gap-1.5"
                    style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full anim-pulse" style={{ background: s.dot }} />
                    {lab.status}
                  </span>
                </div>

                <h3
                  className="font-display font-bold text-lg mb-2 leading-snug transition-colors"
                  style={{ color: isHov ? s.color : 'var(--text-main)' }}
                >
                  {lab.name}
                </h3>
                <p className="text-[0.8rem] text-[var(--text-secondary)] leading-relaxed mb-4">
                  {lab.description}
                </p>

                {/* Tech */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {lab.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>

                {/* Note */}
                <div
                  className="p-3 rounded-lg font-mono text-[0.72rem] text-[var(--text-secondary)] mb-5"
                  style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border-subtle)' }}
                >
                  <span style={{ color: s.color }} className="mr-1.5">&gt;</span>
                  {lab.notes}
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-between items-center">
                  <span className="font-mono text-[0.65rem] text-[var(--text-muted)]">BRANCH: main</span>
                  <a
                    href={lab.github}
                    target="_blank" rel="noopener noreferrer"
                    className="interactive font-mono text-[0.7rem] flex items-center gap-1 transition-colors"
                    style={{ color: s.color }}
                  >
                    VIEW ON GITHUB <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
