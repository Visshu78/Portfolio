import React, { useState } from 'react';
import { workExperience, educationHistory, certifications } from '../data/experience';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, ChevronRight, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

export default function ExperienceSection() {
  const [selectedExpId, setSelectedExpId] = useState(workExperience[0].id);
  const selectedExp = workExperience.find(e => e.id === selectedExpId) || workExperience[0];

  return (
    <section
      id="experience"
      className="relative py-28 px-6 lg:px-10 border-t border-[var(--border-subtle)]"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="section-num">01</div>
      <div className="max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <div className="mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 font-mono text-[0.7rem] text-[var(--cyan)]"
            style={{ background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.2)' }}
          >
            <Briefcase size={13} /> 01 / EXPERIENCE & EDUCATION
          </div>
          <h2
            className="font-display font-extrabold text-[var(--text-main)] mb-4 reveal"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Field Experience,<br />
            <span style={{ color: 'var(--cyan)' }}>Engineering & Education</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl text-base leading-relaxed reveal" data-delay="100">
            Applying machine learning and computer vision pipelines in production, leading technical campus initiatives, and building strong theoretical foundations in Computer Science.
          </p>
        </div>

        {/* ── WORK EXPERIENCE INTERACTIVE EXPLORER ── */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Interactive Timeline Selector (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              {workExperience.map((exp) => {
                const isSelected = selectedExpId === exp.id;
                return (
                  <div
                    key={exp.id}
                    onClick={() => setSelectedExpId(exp.id)}
                    className="interactive card p-5 cursor-pointer transition-all relative overflow-hidden"
                    style={{
                      background: isSelected ? 'rgba(0,240,255,0.06)' : 'rgba(11,13,19,0.6)',
                      borderColor: isSelected ? 'rgba(0,240,255,0.45)' : 'rgba(255,255,255,0.06)',
                      boxShadow: isSelected ? '0 0 25px rgba(0,240,255,0.08)' : undefined,
                      transform: isSelected ? 'translateX(4px)' : undefined,
                    }}
                  >
                    {isSelected && (
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--cyan)]"
                        style={{ boxShadow: '0 0 10px var(--cyan)' }}
                      />
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[0.62rem] px-2 py-0.5 rounded font-semibold" style={{ color: exp.badgeColor, background: `${exp.badgeColor}15`, border: `1px solid ${exp.badgeColor}30` }}>
                        {exp.badge}
                      </span>
                      <span className="font-mono text-[0.65rem] text-[var(--text-muted)] flex items-center gap-1">
                        <Calendar size={11} /> {exp.period.split('—')[0].trim()}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base text-[var(--text-main)] mb-1 leading-snug" style={{ color: isSelected ? 'var(--cyan)' : undefined }}>
                      {exp.role}
                    </h3>

                    <p className="text-xs text-[var(--text-secondary)] line-clamp-1 mb-2 font-medium">
                      {exp.organization}
                    </p>

                    <div className="flex items-center justify-between font-mono text-[0.62rem] text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
                      <span>{exp.location}</span>
                      <span className="text-[var(--cyan)] flex items-center gap-0.5">
                        Inspect Record <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Detailed Deep-Dive Card (7 cols) */}
            <div className="lg:col-span-7">
              <div
                className="card p-7 lg:p-9 relative overflow-hidden h-full flex flex-col justify-between"
                style={{
                  background: 'rgba(11,13,19,0.85)',
                  borderColor: 'rgba(0,240,255,0.25)',
                  boxShadow: '0 0 30px rgba(0,240,255,0.04)',
                }}
              >
                {/* Ambient glow */}
                <div
                  className="ambient-glow w-64 h-64 -top-20 -right-20 pointer-events-none"
                  style={{ background: 'rgba(0,240,255,0.04)', filter: 'blur(50px)' }}
                />

                <div>
                  {/* Role Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-6 mb-6 border-b border-[var(--border-subtle)]">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs text-[var(--cyan)] font-bold">
                          RECORD // {selectedExp.type.toUpperCase()}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                        <span className="font-mono text-xs text-[var(--text-muted)]">
                          {selectedExp.period}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-2xl text-[var(--text-main)] mb-1.5 leading-snug">
                        {selectedExp.role}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
                        <span className="flex items-center gap-1.5 font-medium text-white">
                          <Building2 size={14} className="text-[var(--cyan)]" /> {selectedExp.organization}
                        </span>
                        <span className="text-[var(--text-muted)]">•</span>
                        <span className="flex items-center gap-1 text-xs font-mono text-[var(--text-muted)]">
                          <MapPin size={12} /> {selectedExp.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key Deliverables & Responsibilities */}
                  <div className="mb-8">
                    <h4 className="font-mono text-[0.7rem] uppercase tracking-wider text-[var(--text-muted)] mb-4">
                      Key Impact & Technical Execution
                    </h4>

                    <ul className="space-y-3.5">
                      {selectedExp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                          <CheckCircle2 size={16} className="text-[var(--cyan)] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech & Capabilities Used */}
                <div className="pt-6 border-t border-[var(--border-subtle)]">
                  <h4 className="font-mono text-[0.7rem] uppercase tracking-wider text-[var(--text-muted)] mb-3">
                    Technologies & Methods Deployed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.tech.map(t => (
                      <span
                        key={t}
                        className="tag text-xs font-mono py-1 px-2.5"
                        style={{ background: 'rgba(0,240,255,0.06)', borderColor: 'rgba(0,240,255,0.25)', color: 'var(--text-main)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ── ACADEMIC BACKGROUND & CERTIFICATIONS ── */}
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--emerald)] uppercase tracking-wider mb-6 pb-2 border-b border-[var(--border-subtle)]">
            <GraduationCap size={15} />
            <span>Academic Background & Verified Certifications</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Degrees (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {educationHistory.map((edu) => (
                <div
                  key={edu.id}
                  className="card p-6 sm:p-7 relative overflow-hidden"
                  style={{ background: 'rgba(11,13,19,0.7)', borderColor: 'rgba(16,240,128,0.25)' }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-[var(--emerald)] font-bold">
                      {edu.period}
                    </span>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[rgba(16,240,128,0.1)] text-[var(--emerald)] border border-[rgba(16,240,128,0.3)]">
                      GPA: {edu.gpa}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[var(--text-main)] mb-1.5">
                    {edu.degree}
                  </h3>

                  <div className="text-sm font-medium text-[var(--text-secondary)] mb-4 flex items-center gap-1.5">
                    <Building2 size={14} className="text-[var(--emerald)]" />
                    <span>{edu.institution}</span>
                  </div>

                  <ul className="space-y-2 pt-3 border-t border-[var(--border-subtle)]">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-[var(--text-secondary)] leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--emerald)] shrink-0 mt-1.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Certifications (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--warm)] flex items-center gap-2">
                <Award size={14} /> Verified Certifications
              </h4>

              <div className="space-y-3">
                {certifications.map((c, i) => (
                  <div
                    key={i}
                    className="card p-5"
                    style={{ background: 'rgba(11,13,19,0.7)', borderColor: 'rgba(255,200,133,0.2)' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[0.65rem] text-[var(--warm)] font-bold">
                        VERIFIED CREDENTIAL
                      </span>
                      <span className="font-mono text-[0.65rem] text-[var(--text-muted)]">
                        {c.date}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base text-[var(--text-main)] mb-1">
                      {c.name}
                    </h4>

                    <div className="text-xs text-[var(--text-secondary)] font-mono">
                      Issuer: <span className="text-white font-medium">{c.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Research note */}
              <div
                className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)]"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--cyan)] mb-2 font-bold">
                  <Sparkles size={13} /> Continuous Technical Specialization
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Combining formal computer science coursework in algorithms, operating systems, and computer vision with practical edge AI experiments and real-world system deployments.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
