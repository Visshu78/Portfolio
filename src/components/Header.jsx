import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { GithubIcon } from './Icons';
import { profileData } from '../data/profile';

const NAV = [
  { id: 'hero',       label: 'HOME' },
  { id: 'see',        label: 'SEE' },
  { id: 'build',      label: 'BUILD' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'lab',        label: 'LAB' },
  { id: 'write',      label: 'WRITE' },
  { id: 'about',      label: 'ABOUT' },
];

export default function Header({ activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'rgba(7,8,9,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : undefined,
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">

        {/* Brand */}
        <button
          onClick={() => onNavigate('hero')}
          className="interactive flex items-center gap-3 bg-transparent border-0 cursor-pointer group"
        >
          <div
            className="relative w-8 h-8 rounded flex items-center justify-center"
            style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.3)' }}
          >
            <div className="w-2 h-2 rounded-full bg-[var(--cyan)] anim-pulse" />
            <div
              className="absolute inset-0 rounded transition-all"
              style={{ background: 'transparent', border: '1px solid transparent' }}
            />
          </div>
          <div>
            <div className="font-display font-bold text-sm text-[var(--text-main)] group-hover:text-[var(--cyan)] transition-colors tracking-wider">
              VISHAL
            </div>
            <div className="font-mono text-[0.58rem] text-[var(--text-muted)] tracking-widest">
              CV & AI // FRAME_001
            </div>
          </div>
        </button>

        {/* Desktop Nav pill */}
        <nav
          className="hidden md:flex items-center gap-0.5 px-2 py-1.5 rounded-full"
          style={{ background: 'rgba(13,15,20,0.7)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}
        >
          {NAV.map(item => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="interactive px-3.5 py-1.5 rounded-full font-mono text-[0.7rem] tracking-wider transition-all"
                style={{
                  background: active ? 'rgba(0,240,255,0.1)' : 'transparent',
                  border: active ? '1px solid rgba(0,240,255,0.3)' : '1px solid transparent',
                  color: active ? 'var(--cyan)' : 'var(--text-secondary)',
                  boxShadow: active ? '0 0 12px rgba(0,240,255,0.12)' : undefined,
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded border font-mono text-[0.65rem]"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full anim-pulse" style={{ background: 'var(--emerald)' }} />
            <span className="text-[var(--cyan)]">ONLINE</span>
          </div>
          <a
            href={profileData.github}
            target="_blank" rel="noopener noreferrer"
            className="interactive flex items-center gap-1.5 font-mono text-[0.7rem] px-3 py-1.5 rounded transition-all text-[var(--text-secondary)] hover:text-[var(--cyan)]"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <GithubIcon size={13} /> GitHub
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="interactive md:hidden p-2 rounded border border-[rgba(255,255,255,0.1)] bg-transparent cursor-pointer text-[var(--text-secondary)]"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t border-[rgba(255,255,255,0.08)] mt-2"
          style={{ background: 'rgba(6,7,10,0.98)', backdropFilter: 'blur(20px)' }}
        >
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 gap-2">
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setOpen(false); }}
                className="interactive py-3 px-4 rounded font-mono text-sm text-left transition-all"
                style={{
                  background: activeSection === item.id ? 'rgba(0,240,255,0.08)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${activeSection === item.id ? 'rgba(0,240,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  color: activeSection === item.id ? 'var(--cyan)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
