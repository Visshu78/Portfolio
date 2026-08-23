import React, { useState } from 'react';
import { technicalNotes, poetryWritings } from '../data/writings';
import { BookOpen, Feather, Code2, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export default function WriteSection({ onOpenArchive }) {
  const [tab, setTab] = useState('technical');
  const [expanded, setExpanded] = useState(null);

  return (
    <section
      id="write"
      className="relative py-28 px-6 lg:px-10 border-t border-[var(--border-subtle)]"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="section-num">05</div>
      <div className="max-w-4xl mx-auto">

        <div className="mb-14 reveal">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 font-mono text-[0.7rem]"
            style={{ background: 'rgba(255,200,133,0.06)', border: '1px solid rgba(255,200,133,0.2)', color: 'var(--warm)' }}
          >
            <BookOpen size={13} /> 05 / THE HUMAN LAYER & OBSERVATIONS
          </div>
          <h2
            className="font-display font-extrabold text-[var(--text-main)] mb-4 reveal"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Writing &<br />
            <span style={{ color: 'var(--warm)' }}>Observation</span>
          </h2>
          <p
            className="font-serif italic text-xl text-[var(--text-secondary)] leading-relaxed reveal"
            data-delay="100"
          >
            "I spend a lot of time teaching machines to see.<br />
            Sometimes, I write to understand what I see myself."
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10 pb-5 border-b border-[var(--border-subtle)] reveal">
          <div className="flex gap-2">
            {[
              { id: 'technical', label: 'Technical Essays', count: technicalNotes.length, icon: Code2, color: 'var(--cyan)' },
              { id: 'poetry', label: 'Poetry & Reflections', count: poetryWritings.length, icon: Feather, color: 'var(--warm)' },
            ].map(t => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="interactive btn transition-all text-xs"
                  style={{
                    background: active ? `${t.color}12` : 'transparent',
                    borderColor: active ? `${t.color}55` : 'rgba(255,255,255,0.1)',
                    color: active ? t.color : 'var(--text-secondary)',
                    boxShadow: active ? `0 0 20px ${t.color}18` : undefined,
                    cursor: 'pointer',
                  }}
                >
                  <Icon size={13} />
                  {t.label} ({t.count})
                </button>
              );
            })}
          </div>

          {/* Open full archive link */}
          <button
            onClick={onOpenArchive}
            className="interactive font-mono text-xs text-[var(--cyan)] hover:underline flex items-center gap-1.5 bg-transparent border-0 cursor-pointer"
          >
            <span>Open The Reading Room Archive</span>
            <span>→</span>
          </button>
        </div>

        {/* Technical Essays — accordion */}
        {tab === 'technical' && (
          <div className="space-y-4">
            {technicalNotes.map((note, i) => {
              const isOpen = expanded === note.id;
              return (
                <article
                  key={note.id}
                  className="card overflow-hidden reveal"
                  data-delay={i * 80}
                >
                  <button
                    className="interactive w-full flex items-start justify-between p-6 text-left"
                    style={{
                      background: isOpen ? 'rgba(0,240,255,0.03)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => setExpanded(isOpen ? null : note.id)}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex flex-wrap items-center gap-3 font-mono text-[0.65rem] text-[var(--text-muted)] mb-2">
                        <span style={{ color: 'var(--cyan)' }}>{note.category}</span>
                        <span>{note.date}</span>
                        <span className="flex items-center gap-1"><Clock size={10} />{note.readTime}</span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-[var(--text-main)] leading-snug mb-2">
                        {note.title}
                      </h3>
                      <p className="text-[0.8rem] text-[var(--text-secondary)]">{note.summary}</p>
                    </div>
                    {isOpen
                      ? <ChevronUp size={18} style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: 4 }} />
                      : <ChevronDown size={18} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 4 }} />}
                  </button>

                  {isOpen && (
                    <div
                      className="px-6 pb-8 text-[0.85rem] leading-loose space-y-4"
                      style={{ borderTop: '1px solid var(--border-subtle)' }}
                    >
                      {note.body.split('\n\n').map((para, pi) => {
                        if (para.startsWith('### ')) {
                          return (
                            <h4 key={pi} className="font-display font-bold text-lg text-[var(--text-main)] pt-3">
                              {para.replace('### ', '')}
                            </h4>
                          );
                        }
                        return (
                          <p key={pi} className="text-[var(--text-secondary)] leading-relaxed">
                            {para}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {/* Poetry — large editorial */}
        {tab === 'poetry' && (
          <div className="space-y-10">
            {poetryWritings.map((poem, i) => (
              <article
                key={poem.id}
                className="reveal"
                data-delay={i * 100}
              >
                <div
                  className="relative p-8 sm:p-12 rounded-2xl overflow-hidden"
                  style={{ background: 'rgba(18,21,31,0.5)', border: '1px solid rgba(255,200,133,0.12)' }}
                >
                  {/* Ambient warm glow */}
                  <div
                    className="ambient-glow w-48 h-48 -top-12 -right-12 pointer-events-none"
                    style={{ background: 'rgba(255,200,133,0.06)', filter: 'blur(40px)' }}
                  />

                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-[rgba(255,200,133,0.12)]">
                    <span className="font-mono text-[0.65rem]" style={{ color: 'var(--warm)' }}>
                      {poem.type.toUpperCase()} // {poem.date.toUpperCase()}
                    </span>
                    <Feather size={14} style={{ color: 'rgba(255,200,133,0.4)' }} />
                  </div>

                  <h3
                    className="font-serif italic text-2xl sm:text-3xl text-[var(--text-main)] mb-8"
                  >
                    {poem.title}
                  </h3>

                  <div
                    className="font-serif text-base sm:text-lg leading-[2] whitespace-pre-line pl-5"
                    style={{
                      color: 'rgba(238,240,248,0.85)',
                      borderLeft: '2px solid rgba(255,200,133,0.25)',
                    }}
                  >
                    {poem.body}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom CTA for Full Archive */}
        <div className="mt-14 pt-8 border-t border-[var(--border-subtle)] text-center reveal">
          <button
            onClick={onOpenArchive}
            className="interactive btn btn-cyan text-xs py-3 px-6 inline-flex items-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.12)]"
          >
            <BookOpen size={14} />
            <span>Explore All Writings & The Full Reading Room</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </section>
  );
}
