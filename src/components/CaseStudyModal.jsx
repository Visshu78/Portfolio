import React, { useEffect } from 'react';
import { X, ExternalLink, GitBranch, AlertOctagon, CheckCircle2, Lightbulb, Activity } from 'lucide-react';

export default function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project || !project.caseStudy) return null;
  const cs = project.caseStudy;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-[rgba(4,5,8,0.92)] backdrop-blur-xl animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--bg-card)] border border-[rgba(0,240,255,0.4)] rounded-2xl flex flex-col overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
        
        {/* Modal Corner Accents */}
        <div className="hud-corner hud-corner-tl"></div>
        <div className="hud-corner hud-corner-tr"></div>
        <div className="hud-corner hud-corner-bl"></div>
        <div className="hud-corner hud-corner-br"></div>

        {/* Modal Header */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(10,12,18,0.9)] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded bg-[rgba(0,240,255,0.1)] text-[var(--cyan)] font-mono text-[0.65rem] font-bold">
                9-STEP CASE STUDY
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {project.category}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-main)]">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-[var(--text-secondary)] hover:text-white cursor-pointer border-0 transition-colors"
            aria-label="Close Case Study"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body: 9 Steps Breakdown */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-sm">
          
          {/* 01 & 02: Problem & Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
              <div className="font-mono text-xs text-[var(--cyan)] uppercase mb-2 font-bold flex items-center gap-1.5">
                <span>01 — THE QUESTION</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {cs.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
              <div className="font-mono text-xs text-[var(--cyan)] uppercase mb-2 font-bold flex items-center gap-1.5">
                <span>02 — CONTEXT & CONSTRAINTS</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {cs.context}
              </p>
            </div>
          </div>

          {/* 03: The Approach */}
          <div className="p-5 rounded-xl bg-[rgba(0,240,255,0.03)] border border-[rgba(0,240,255,0.15)]">
            <div className="font-mono text-xs text-[var(--cyan)] uppercase mb-2 font-bold">
              03 — THE APPROACH & IDEA
            </div>
            <p className="text-[var(--text-main)] leading-relaxed">
              {cs.approach}
            </p>
          </div>

          {/* 04: Architecture Pipeline */}
          <div>
            <div className="font-mono text-xs text-[var(--text-muted)] uppercase mb-3 font-bold">
              04 — SYSTEM & INFERENCE ARCHITECTURE
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {cs.architecture.map((stage, idx) => (
                <React.Fragment key={idx}>
                  <div className="px-3.5 py-2 rounded-lg bg-[rgba(18,21,31,0.9)] border border-[rgba(255,255,255,0.08)] font-mono text-xs text-white">
                    <span className="text-[var(--accent-cyan)] mr-1.5">[{idx + 1}]</span>
                    {stage}
                  </div>
                  {idx < cs.architecture.length - 1 && (
                    <span className="text-[var(--text-muted)] font-mono">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 05 & 06: Experiment & Result */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
              <div className="font-mono text-xs text-[var(--emerald)] uppercase mb-2 font-bold flex items-center gap-1.5">
                <Activity size={14} />
                <span>05 — EXPERIMENT & EVALUATION</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {cs.experiment}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)]">
              <div className="font-mono text-xs text-[var(--emerald)] uppercase mb-2 font-bold flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>06 — MEASURED OUTCOMES</span>
              </div>
              <p className="text-[var(--text-main)] leading-relaxed">
                {cs.result}
              </p>
            </div>
          </div>

          {/* 07 & 08: Failure & The Lesson */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-[rgba(244,63,94,0.05)] border border-[rgba(244,63,94,0.2)]">
              <div className="font-mono text-xs text-[var(--rose)] uppercase mb-2 font-bold flex items-center gap-1.5">
                <AlertOctagon size={14} />
                <span>07 — WHAT FAILED FIRST</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {cs.failure}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[rgba(243,194,131,0.05)] border border-[rgba(243,194,131,0.2)]">
              <div className="font-mono text-xs text-[var(--warm)] uppercase mb-2 font-bold flex items-center gap-1.5">
                <Lightbulb size={14} />
                <span>08 — THE LESSON LEARNED</span>
              </div>
              <p className="text-[var(--text-main)] leading-relaxed">
                {cs.lesson}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer: 09 — The Artifact */}
        <div className="p-6 border-t border-[rgba(255,255,255,0.08)] bg-[rgba(10,12,18,0.9)] flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-xs text-[var(--text-muted)]">
            09 — ARTIFACT: REPOSITORY & DOCUMENTATION
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="btn btn-ghost text-xs"
              style={{ cursor: 'pointer' }}
            >
              CLOSE CASE STUDY
            </button>
            <a
              href={cs.artifactUrl || 'https://github.com/Visshu78'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-cyan text-xs"
            >
              <GitBranch size={13} />
              <span>EXPLORE ON GITHUB (Visshu78)</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
