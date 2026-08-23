import React from 'react';
import { profileData } from '../data/profile';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, MediumIcon, InstagramIcon } from './Icons';

export default function Footer() {
  return (
    <footer
      className="relative py-12 px-6 lg:px-10 border-t border-[var(--border-subtle)]"
      style={{ background: '#050608' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand spec */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 font-mono text-[0.72rem] text-[var(--text-muted)] text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--cyan)] anim-pulse" />
            <span className="text-[var(--text-main)] font-bold tracking-wider">VISHAL DHAWAL</span>
          </div>
          <span className="hidden sm:inline text-[var(--border-subtle)]">|</span>
          <span>A WAY TO SEE THINGS</span>
          <span className="hidden sm:inline text-[var(--border-subtle)]">|</span>
          <span className="text-[var(--cyan)]">COMPUTER VISION & APPLIED AI</span>
        </div>

        {/* Prominent Social Channels Icon Hub */}
        <div className="flex items-center gap-3">
          
          {/* GitHub */}
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive w-10 h-10 rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)] hover:text-[var(--cyan)] hover:border-[rgba(0,240,255,0.4)] hover:bg-[rgba(0,240,255,0.08)] hover:scale-110 transition-all duration-300 shadow-sm group"
            title="GitHub: @Visshu78"
          >
            <GithubIcon size={20} className="transition-transform group-hover:scale-105" />
          </a>

          {/* LinkedIn */}
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive w-10 h-10 rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)] hover:text-[var(--cyan)] hover:border-[rgba(0,240,255,0.4)] hover:bg-[rgba(0,240,255,0.08)] hover:scale-110 transition-all duration-300 shadow-sm group"
            title="LinkedIn: Vishal Dhawal"
          >
            <LinkedinIcon size={20} className="transition-transform group-hover:scale-105" />
          </a>

          {/* Medium */}
          <a
            href={profileData.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive w-10 h-10 rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)] hover:text-[var(--warm)] hover:border-[rgba(255,200,133,0.4)] hover:bg-[rgba(255,200,133,0.08)] hover:scale-110 transition-all duration-300 shadow-sm group"
            title="Medium: @visshu78"
          >
            <MediumIcon size={20} className="transition-transform group-hover:scale-105" />
          </a>

          {/* Instagram */}
          <a
            href={profileData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive w-10 h-10 rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)] hover:text-[#f43f5e] hover:border-[rgba(244,63,94,0.4)] hover:bg-[rgba(244,63,94,0.08)] hover:scale-110 transition-all duration-300 shadow-sm group"
            title="Instagram: @visshu_7880"
          >
            <InstagramIcon size={20} className="transition-transform group-hover:scale-105" />
          </a>

          {/* Direct Email */}
          <a
            href={`mailto:${profileData.email}`}
            className="interactive w-10 h-10 rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)] hover:text-[var(--emerald)] hover:border-[rgba(16,240,128,0.4)] hover:bg-[rgba(16,240,128,0.08)] hover:scale-110 transition-all duration-300 shadow-sm group"
            title={`Direct Email: ${profileData.email}`}
          >
            <Mail size={20} className="transition-transform group-hover:scale-105" />
          </a>

        </div>

        {/* Telemetry & Back to top */}
        <div className="flex items-center gap-4 font-mono text-[0.68rem] text-[var(--text-muted)]">
          <span className="hidden sm:inline">FRAME_9482_ACTIVE</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="interactive p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)] hover:text-[var(--cyan)] hover:border-[rgba(0,240,255,0.4)] hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5"
            title="Back to Top"
          >
            <ArrowUp size={15} />
            <span className="text-[0.65rem] font-bold">TOP</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
