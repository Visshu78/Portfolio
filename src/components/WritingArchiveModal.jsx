import React, { useState, useEffect } from 'react';
import { technicalNotes, poetryWritings } from '../data/writings';
import { 
  X, BookOpen, Feather, Code2, Clock, Search, 
  ArrowLeft, ExternalLink, Sparkles, SlidersHorizontal, Share2, Check
} from 'lucide-react';

export default function WritingArchiveModal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('all'); // all | technical | poetry | papers
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState('normal'); // normal | large

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedPiece) {
          setSelectedPiece(null);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, selectedPiece, onClose]);

  if (!isOpen) return null;

  // Combine items
  const allItems = [
    ...technicalNotes.map(n => ({ ...n, typeTag: 'technical', typeLabel: 'Technical Essay', color: 'var(--cyan)' })),
    ...poetryWritings.map(p => ({ ...p, typeTag: 'poetry', typeLabel: 'Poetry & Reflection', color: 'var(--warm)', summary: p.body.slice(0, 140) + '...' })),
    {
      id: 'paper-breakdowns',
      title: 'Deconstructing AI & CV Research Papers with Simple Intuitions',
      category: 'Research Paper Explanations · Code_happy',
      date: 'Ongoing Archive',
      readTime: 'Multi-part series',
      typeTag: 'papers',
      typeLabel: 'Paper Deconstruction',
      color: 'var(--emerald)',
      summary: 'Breaking down foundational Computer Vision and Deep Learning research papers into clear mental models, visual analogies, and practical code implementations.',
      isExternal: true,
      externalUrl: 'https://github.com/Visshu78/Research_Papers',
      body: `Research papers are often dense with notation, but the core intuitions behind breakthroughs (e.g. Residual connections, Spatial Attention, ViT Patch Tokenization, Contrastive Learning) are fundamentally simple and elegant.\n\n### The Philosophy\nIf you truly understand an architectural mechanism, you should be able to explain it using a basic physical analogy without hiding behind equations.\n\n### Explore the Archive\nExplore the open repository containing written breakdowns, visual diagrams, and intuitive mental models for core AI and Vision papers on GitHub.`
    }
  ];

  // Filter items
  const filtered = allItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.typeTag === activeCategory;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.summary && item.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-[#050608]/95 backdrop-blur-2xl animate-fadeIn overflow-hidden text-[var(--text-main)]">
      
      {/* ── Top Bar ── */}
      <header className="px-6 lg:px-12 py-4 border-b border-[var(--border-subtle)] bg-[#07080b]/90 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (selectedPiece) setSelectedPiece(null);
              else onClose();
            }}
            className="interactive flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)] hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>{selectedPiece ? 'Back to Index' : 'Return to Portfolio'}</span>
          </button>

          <span className="hidden sm:inline-block w-px h-4 bg-[var(--border-subtle)]" />

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[var(--warm)]">
            <BookOpen size={14} />
            <span>THE READING ROOM // NOTEBOOK ARCHIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {selectedPiece && (
            <button
              onClick={() => setFontSize(s => s === 'normal' ? 'large' : 'normal')}
              className="interactive btn btn-ghost text-[0.7rem] py-1 px-2.5 hidden sm:flex items-center gap-1.5"
              title="Toggle font size"
            >
              <SlidersHorizontal size={12} />
              <span>{fontSize === 'normal' ? 'Larger Text' : 'Standard Text'}</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="interactive btn btn-ghost text-[0.7rem] py-1 px-2.5 flex items-center gap-1.5"
          >
            {copied ? <Check size={12} className="text-[var(--emerald)]" /> : <Share2 size={12} />}
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </button>

          <button
            onClick={onClose}
            className="interactive p-2 rounded-full bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.1)] text-[var(--text-secondary)] hover:text-white border-0 cursor-pointer transition-colors"
            aria-label="Close reading room"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <div className="flex-1 overflow-y-auto">
        
        {selectedPiece ? (
          /* ── Full Reader View ── */
          <article className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-3" style={{ color: selectedPiece.color }}>
                <span>{selectedPiece.typeLabel.toUpperCase()}</span>
                <span className="text-[var(--text-muted)]">•</span>
                <span>{selectedPiece.date}</span>
                {selectedPiece.readTime && (
                  <>
                    <span className="text-[var(--text-muted)]">•</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {selectedPiece.readTime}</span>
                  </>
                )}
              </div>

              <h1 className={`font-serif italic font-normal text-[var(--text-main)] mb-6 leading-tight ${fontSize === 'large' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}>
                {selectedPiece.title}
              </h1>

              {selectedPiece.summary && (
                <p className="text-base text-[var(--text-secondary)] leading-relaxed border-l-2 border-[var(--cyan)] pl-4 py-1 italic mb-8">
                  {selectedPiece.summary}
                </p>
              )}

              <div className="w-full h-px bg-[var(--border-subtle)] my-8" />
            </div>

            {/* Body */}
            <div className={`font-serif leading-[2.1] text-[rgba(238,240,248,0.9)] space-y-6 ${fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>
              {selectedPiece.typeTag === 'poetry' ? (
                <div className="whitespace-pre-line pl-6 border-l-2 border-[rgba(255,200,133,0.3)] italic">
                  {selectedPiece.body}
                </div>
              ) : (
                selectedPiece.body.split('\n\n').map((para, i) => {
                  if (para.startsWith('### ')) {
                    return (
                      <h2 key={i} className="font-display font-bold text-2xl text-[var(--text-main)] pt-6 pb-2 not-italic">
                        {para.replace('### ', '')}
                      </h2>
                    );
                  }
                  return <p key={i}>{para}</p>;
                })
              )}
            </div>

            {selectedPiece.isExternal && (
              <div className="mt-12 p-6 rounded-xl bg-[rgba(0,240,255,0.04)] border border-[rgba(0,240,255,0.2)] flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-xs text-[var(--cyan)] font-bold mb-1">OPEN GITHUB REPOSITORY</div>
                  <div className="text-sm text-[var(--text-secondary)]">Read full deconstructions and analogies in the code repository.</div>
                </div>
                <a
                  href={selectedPiece.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive btn btn-cyan text-xs shrink-0"
                >
                  Explore on GitHub <ExternalLink size={12} />
                </a>
              </div>
            )}

            {/* Bottom nav inside reader */}
            <div className="mt-16 pt-8 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <button
                onClick={() => setSelectedPiece(null)}
                className="interactive btn btn-ghost text-xs"
              >
                ← Back to All Pieces
              </button>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="interactive text-xs font-mono text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors bg-transparent border-0 cursor-pointer"
              >
                ↑ Top of Page
              </button>
            </div>
          </article>
        ) : (
          /* ── Index / Catalog View ── */
          <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 font-mono text-[0.7rem] text-[var(--warm)] bg-[rgba(255,200,133,0.08)] border border-[rgba(255,200,133,0.2)]">
                <Sparkles size={12} /> COMPLETE WRITING ARCHIVE
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--text-main)] mb-3">
                The Notebook & Essays
              </h1>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-serif italic text-base">
                Technical thoughts on Computer Vision and AI systems, philosophical notes on perception, and poems written in quiet evenings.
              </p>
            </div>

            {/* Controls: Search + Filter Tabs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border-subtle)]">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Search articles, poems, topics..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[var(--border-subtle)] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--cyan)] transition-colors font-mono"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-white bg-transparent border-0 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {[
                  { id: 'all', label: 'All Works' },
                  { id: 'technical', label: 'Technical Essays' },
                  { id: 'poetry', label: 'Poetry' },
                  { id: 'papers', label: 'Paper Deconstructions' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="interactive px-3 py-1.5 rounded-lg font-mono text-[0.68rem] whitespace-nowrap transition-all border-0 cursor-pointer"
                    style={{
                      background: activeCategory === cat.id ? 'rgba(0,240,255,0.12)' : 'rgba(255,255,255,0.03)',
                      color: activeCategory === cat.id ? 'var(--cyan)' : 'var(--text-secondary)',
                      border: `1px solid ${activeCategory === cat.id ? 'rgba(0,240,255,0.3)' : 'transparent'}`,
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of articles & poems */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-[var(--text-muted)] font-mono text-sm">
                No writings matched "{searchQuery}". Try a different keyword.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.isExternal) {
                        window.open(item.externalUrl, '_blank');
                      } else {
                        setSelectedPiece(item);
                      }
                    }}
                    className="interactive card p-6 cursor-pointer group flex flex-col justify-between transition-all hover:scale-[1.01] hover:border-[rgba(0,240,255,0.3)]"
                    style={{ background: 'rgba(11,13,19,0.7)' }}
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[0.65rem] mb-3">
                        <span style={{ color: item.color }} className="font-bold">
                          {item.typeLabel.toUpperCase()}
                        </span>
                        <span className="text-[var(--text-muted)]">{item.date}</span>
                      </div>

                      <h3 className="font-display font-bold text-lg text-[var(--text-main)] group-hover:text-[var(--cyan)] transition-colors mb-2.5 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed mb-4">
                        {item.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[0.68rem] font-mono text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        {item.typeTag === 'poetry' ? <Feather size={12} /> : <Code2 size={12} />}
                        {item.readTime || 'Poem'}
                      </span>
                      <span className="text-[var(--cyan)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        {item.isExternal ? 'View on GitHub ↗' : 'Read Piece →'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
