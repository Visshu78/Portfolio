import React from 'react';
import { profileData } from '../data/profile';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, MediumIcon, InstagramIcon } from './Icons';

export default function Footer() {
  return (
    <footer
      className="relative py-10 px-6 lg:px-10 border-t border-[var(--border-subtle)]"
      style={{ background: '#050608' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand spec */}
        <div className="flex items-center gap-3 font-mono text-[0.68rem] text-[var(--text-muted)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] anim-pulse" />
          <span className="text-[var(--text-main)] font-bold">VISHAL DHAWAL</span>
          <span>/</span>
          <span>A WAY TO SEE THINGS</span>
          <span>/</span>
          <span className="text-[var(--cyan)]">CV & AI</span>
        </div>

        {/* Social channels pill list */}
        <div className="flex items-center gap-4 text-xs">
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive flex items-center gap-1.5 font-mono text-[0.68rem] text-[var(--text-secondary)] hover:text-[var(--cyan)] transition-colors"
            title="GitHub"
          >
            <GithubIcon size={14} /> <span>GitHub</span>
          </a>

          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive flex items-center gap-1.5 font-mono text-[0.68rem] text-[var(--text-secondary)] hover:text-[var(--cyan)] transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon size={14} /> <span>LinkedIn</span>
          </a>

          <a
            href={profileData.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive flex items-center gap-1.5 font-mono text-[0.68rem] text-[var(--text-secondary)] hover:text-[var(--warm)] transition-colors"
            title="Medium"
          >
            <MediumIcon size={14} /> <span>Medium</span>
          </a>

          <a
            href={profileData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive flex items-center gap-1.5 font-mono text-[0.68rem] text-[var(--text-secondary)] hover:text-[#f43f5e] transition-colors"
            title="Instagram"
          >
            <InstagramIcon size={14} /> <span>Instagram</span>
          </a>
        </div>

        {/* Telemetry & Back to top */}
        <div className="flex items-center gap-4 font-mono text-[0.65rem] text-[var(--text-muted)]">
          <span>FRAME_9482_ACTIVE</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="interactive p-2 rounded border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)] hover:text-[var(--cyan)] hover:border-[rgba(0,240,255,0.4)] transition-all cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
