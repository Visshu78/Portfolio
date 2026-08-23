import React from 'react';
import { profileData } from '../data/profile';
import { ArrowUp } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Footer() {
  return (
    <footer
      className="relative py-10 px-6 lg:px-10 border-t border-[var(--border-subtle)]"
      style={{ background: '#050608' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3 font-mono text-[0.68rem] text-[var(--text-muted)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] anim-pulse" />
          <span className="text-[var(--text-main)] font-bold">VISHAL</span>
          <span>/</span>
          <span>THE WAY I SEE THINGS</span>
          <span>/</span>
          <span className="text-[var(--cyan)]">v2025</span>
        </div>

        <a
          href={profileData.github}
          target="_blank" rel="noopener noreferrer"
          className="interactive flex items-center gap-1.5 font-mono text-[0.7rem] text-[var(--text-secondary)] hover:text-[var(--cyan)] transition-colors"
        >
          <GithubIcon size={13} /> github.com/Visshu78
        </a>

        <div className="flex items-center gap-4 font-mono text-[0.65rem] text-[var(--text-muted)]">
          <span>LATENCY: &lt;12ms</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="interactive p-2 rounded border border-[var(--border-subtle)] bg-transparent text-[var(--text-secondary)] hover:text-[var(--cyan)] hover:border-[rgba(0,240,255,0.4)] transition-all cursor-pointer"
            title="Back to Frame 001"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
