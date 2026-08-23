import React, { useState } from 'react';
import { technicalNotes, paperDeconstructions, poetryWritings } from '../data/writings';
import { BookOpen, Feather, Code2, Clock, ChevronDown, ChevronUp, FileText, Download, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

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

        {/* Section Header */}
        <div className="mb-14 reveal">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 font-mono text-[0.7rem]"
            style={{ background: 'rgba(255,200,133,0.06)', border: '1px solid rgba(255,200,133,0.2)', color: 'var(--warm)' }}
          >
            <BookOpen size={13} /> 05 / THE HUMAN LAYER & RESEARCH DECONSTRUCTIONS
          </div>
          <h2
            className="font-display font-extrabold text-[var(--text-main)] mb-4 reveal"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Writing, Papers &<br />
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

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10 pb-5 border-b border-[var(--border-subtle)] reveal">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'technical', label: 'Technical Essays', count: technicalNotes.length, icon: Code2, color: 'var(--cyan)' },
              { id: 'papers',    label: 'Paper Deconstructions', count: paperDeconstructions.length, icon: FileText, color: 'var(--emerald)' },
              { id: 'poetry',   label: 'Poetry & Reflections', count: poetryWritings.length, icon: Feather, color: 'var(--warm)' },
            ].map(t => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTab(t.id);
                    setExpanded(null);
                  }}
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

        {/* ── TAB 1: Technical Essays ── */}
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
                      <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-[0.68rem] text-[var(--text-muted)]">
                        <span className="text-[var(--cyan)] font-bold">{note.category}</span>
                        <span>•</span>
                        <span>{note.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> {note.readTime}</span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-[var(--text-main)] mb-2">
                        {note.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 font-mono">
                        {note.summary}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg text-[var(--cyan)] shrink-0 mt-1" style={{ background: 'rgba(0,240,255,0.06)' }}>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      className="px-6 pb-7 pt-2 border-t border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] space-y-4 leading-relaxed font-mono"
                      style={{ background: 'rgba(0,0,0,0.2)' }}
                    >
                      {note.body.split('\n\n').map((para, pIdx) => {
                        if (para.startsWith('### ')) {
                          return (
                            <h4 key={pIdx} className="font-display font-bold text-base text-[var(--text-main)] pt-2 text-[var(--cyan)]">
                              {para.replace('### ', '')}
                            </h4>
                          );
                        }
                        if (para.startsWith('- ')) {
                          return (
                            <ul key={pIdx} className="list-disc pl-5 space-y-1 text-xs">
                              {para.split('\n').map((li, liIdx) => (
                                <li key={liIdx}>{li.replace('- ', '')}</li>
                              ))}
                            </ul>
                          );
                        }
                        return <p key={pIdx} className="text-xs leading-relaxed text-[var(--text-secondary)]">{para}</p>;
                      })}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {/* ── TAB 2: Paper Deconstructions ── */}
        {tab === 'papers' && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl border border-[rgba(16,240,128,0.2)] bg-[rgba(16,240,128,0.03)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-[var(--emerald)]">
                <Sparkles size={15} />
                <span>Foundational AI Research broken down with intuitive analogies & mental models.</span>
              </div>
              <a
                href="https://github.com/Visshu78/Research_Papers"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive text-white hover:text-[var(--emerald)] flex items-center gap-1.5 shrink-0 font-bold"
              >
                <GithubIcon size={14} /> <span>All Research Breakdowns ↗</span>
              </a>
            </div>

            {paperDeconstructions.map((paper, i) => {
              const isOpen = expanded === paper.id;
              return (
                <article
                  key={paper.id}
                  className="card overflow-hidden reveal transition-all"
                  style={{
                    borderColor: isOpen ? 'rgba(16,240,128,0.4)' : undefined,
                    boxShadow: isOpen ? '0 0 25px rgba(16,240,128,0.06)' : undefined,
                  }}
                  data-delay={i * 80}
                >
                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[0.68rem] text-[var(--text-muted)]">
                        <span className="text-[var(--emerald)] font-bold px-2 py-0.5 rounded bg-[rgba(16,240,128,0.08)] border border-[rgba(16,240,128,0.2)]">
                          PAPER DECONSTRUCTION
                        </span>
                        <span>•</span>
                        <span>{paper.originalPaper}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> {paper.readTime}</span>
                      </div>

                      {/* Direct PDF Link */}
                      <a
                        href={paper.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="interactive font-mono text-[0.7rem] px-3 py-1 rounded bg-[rgba(16,240,128,0.1)] border border-[rgba(16,240,128,0.3)] text-[var(--emerald)] hover:bg-[rgba(16,240,128,0.2)] flex items-center gap-1.5 font-semibold transition-all"
                        style={{ textDecoration: 'none' }}
                      >
                        <Download size={12} />
                        <span>View PDF Document</span>
                      </a>
                    </div>

                    <h3 className="font-display font-bold text-xl text-[var(--text-main)] mb-2">
                      {paper.title}
                    </h3>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-mono mb-4">
                      {paper.summary}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-subtle)]">
                      <button
                        onClick={() => setExpanded(isOpen ? null : paper.id)}
                        className="interactive font-mono text-xs text-[var(--emerald)] hover:underline flex items-center gap-1 bg-transparent border-0 cursor-pointer font-bold"
                      >
                        <span>{isOpen ? 'Collapse Breakdown' : 'Read Full Analogy Breakdown'}</span>
                        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      <div className="flex items-center gap-3 font-mono text-[0.68rem] text-[var(--text-muted)]">
                        <a
                          href={paper.originalPaperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white flex items-center gap-1 transition-colors"
                        >
                          Original Paper <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {isOpen && (
                    <div
                      className="px-6 pb-7 pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] space-y-4 leading-relaxed font-mono"
                      style={{ background: 'rgba(0,0,0,0.25)' }}
                    >
                      {paper.body.split('\n\n').map((para, pIdx) => {
                        if (para.startsWith('### ')) {
                          return (
                            <h4 key={pIdx} className="font-display font-bold text-sm text-[var(--emerald)] pt-2 border-b border-[rgba(16,240,128,0.15)] pb-1">
                              {para.replace('### ', '')}
                            </h4>
                          );
                        }
                        if (para.startsWith('---')) {
                          return <hr key={pIdx} className="border-[var(--border-subtle)] my-2" />;
                        }
                        if (para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ') || para.startsWith('4. ')) {
                          return (
                            <div key={pIdx} className="p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{para}</p>
                            </div>
                          );
                        }
                        return <p key={pIdx} className="text-xs leading-relaxed text-[var(--text-secondary)]">{para}</p>;
                      })}

                      <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)]">
                        <span className="text-[0.68rem] text-[var(--text-muted)]">
                          Explained with beginner-friendly analogies by Vishal Dhawal.
                        </span>
                        <a
                          href={paper.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="interactive btn btn-primary text-xs py-1.5 px-3 font-mono"
                        >
                          <Download size={13} /> Open Complete PDF Breakdown
                        </a>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {/* ── TAB 3: Poetry & Reflections ── */}
        {tab === 'poetry' && (
          <div className="space-y-4">
            {poetryWritings.map((poem, i) => {
              const isOpen = expanded === poem.id;
              return (
                <article
                  key={poem.id}
                  className="card overflow-hidden reveal"
                  data-delay={i * 80}
                >
                  <button
                    className="interactive w-full flex items-start justify-between p-6 text-left"
                    style={{
                      background: isOpen ? 'rgba(255,200,133,0.03)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => setExpanded(isOpen ? null : poem.id)}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 font-mono text-[0.68rem] text-[var(--text-muted)]">
                        <span className="text-[var(--warm)]">{poem.type}</span>
                        <span>•</span>
                        <span>{poem.date}</span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-[var(--text-main)]">
                        {poem.title}
                      </h3>
                    </div>
                    <div className="p-2 rounded-lg text-[var(--warm)] shrink-0 mt-1" style={{ background: 'rgba(255,200,133,0.06)' }}>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      className="px-6 pb-7 pt-2 border-t border-[var(--border-subtle)]"
                      style={{ background: 'rgba(0,0,0,0.2)' }}
                    >
                      <pre className="font-serif italic text-base leading-relaxed text-[var(--text-secondary)] whitespace-pre-wrap">
                        {poem.body}
                      </pre>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
