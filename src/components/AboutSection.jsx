import React, { useState, useRef, useEffect } from 'react';
import { profileData } from '../data/profile';
import { workExperience, educationHistory } from '../data/experience';
import { cvProjects, systemProjects } from '../data/projects';
import { Terminal, Mail, Send, Check, Copy, User, Sparkles, CornerDownLeft, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, MediumIcon, InstagramIcon } from './Icons';

const COMMANDS = {
  help: () => [
    'Available commands:',
    '  whoami      - Print identity, role, and focus',
    '  skills      - Categorized technical competencies',
    '  projects    - Flagship Computer Vision & AI systems',
    '  experience  - Work history & internships',
    '  education   - Academic degrees & universities',
    '  contact     - All direct contact and social channels',
    '  github      - Open GitHub profile in new tab',
    '  linkedin    - Open LinkedIn profile in new tab',
    '  medium      - Open Medium technical blog in new tab',
    '  instagram   - Open Instagram profile in new tab',
    '  sysinfo     - Vision pipeline & telemetry status',
    '  clear       - Clear terminal screen',
  ].join('\n'),

  whoami: () => `${profileData.name}\n${profileData.role}\nTagline: ${profileData.tagline}\nCurrently: ${profileData.notebook.currently}`,

  skills: () => [
    '=== COMPUTER VISION & EDGE ===',
    '  PyTorch · OpenCV · EfficientNet · YOLO · Keypoints · CUDA · Jetson · ONNX',
    '=== APPLIED AI & NLP ===',
    '  LLMs · RAG · FAISS · BM25 · Sentence-Transformers · Hybrid Retrieval · OCR',
    '=== SYSTEMS & ARCHITECTURE ===',
    '  FastAPI · WebRTC · Node.js · Docker · Streamlit · Linux · Git',
  ].join('\n'),

  projects: () => [
    '=== COMPUTER VISION ===',
    ...cvProjects.map(p => `  • ${p.title} [${p.confidence}]`),
    '=== APPLIED AI & SYSTEMS ===',
    ...systemProjects.map(p => `  • ${p.title} (${p.category})`),
  ].join('\n'),

  experience: () => [
    '=== WORK & INTERNSHIPS ===',
    ...workExperience.map(e => `  [${e.period}] ${e.role} @ ${e.organization}`),
  ].join('\n'),

  education: () => [
    '=== ACADEMIC FOUNDATIONS ===',
    ...educationHistory.map(e => `  • ${e.degree} — ${e.institution} (GPA: ${e.gpa})`),
  ].join('\n'),

  contact: () => [
    `Email:     ${profileData.email}`,
    `GitHub:    ${profileData.github}`,
    `LinkedIn:  ${profileData.linkedin}`,
    `Medium:    ${profileData.medium}`,
    `Instagram: ${profileData.instagram}`,
  ].join('\n'),

  github: () => {
    window.open(profileData.github, '_blank');
    return `→ Opened GitHub: ${profileData.github}`;
  },

  linkedin: () => {
    window.open(profileData.linkedin, '_blank');
    return `→ Opened LinkedIn: ${profileData.linkedin}`;
  },

  medium: () => {
    window.open(profileData.medium, '_blank');
    return `→ Opened Medium: ${profileData.medium}`;
  },

  instagram: () => {
    window.open(profileData.instagram, '_blank');
    return `→ Opened Instagram: ${profileData.instagram}`;
  },

  sysinfo: () => [
    `FRAME_ID:       ${profileData.frameId}`,
    `TELEMETRY:      ${profileData.telemetry.frameCounter}`,
    `AVG_LATENCY:    ${profileData.telemetry.avgLatency}`,
    `DETECTION_RATE: ${profileData.telemetry.detectionRate}`,
    `PIPELINES:      ${profileData.telemetry.visionPipelinesDeployed} Active Deployed`,
    `STATUS:         SYSTEM ONLINE // NORMAL`,
  ].join('\n'),

  sudo: () => 'vishal is not in the sudoers file. This incident will be logged.',
  ls: () => 'drwxr-xr-x  projects/   drwxr-xr-x  experience/   -rw-r--r--  notebook.txt   -rw-r--r--  skills.md',
  'cat notebook.txt': () => `[CURRENTLY]\n${profileData.notebook.currently}\n\n[USUALLY FOUND]\n${profileData.notebook.usuallyFound}`,
};

const SUGGESTIONS = ['help', 'whoami', 'skills', 'projects', 'experience', 'medium', 'contact', 'clear'];

export default function AboutSection() {
  const [history, setHistory] = useState([
    { t: 'sys', v: 'Vishal Dhawal // Interactive Terminal v2.4 [Online]' },
    { t: 'sys', v: 'Type a command or click any shortcut chip below to explore.' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistoryList, setCmdHistoryList] = useState([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom of terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdText) => {
    const rawCmd = (cmdText || '').trim();
    if (!rawCmd) return;

    const cmd = rawCmd.toLowerCase();
    const next = [...history, { t: 'in', v: `$ ${rawCmd}` }];

    setCmdHistoryList(prev => [...prev, rawCmd]);
    setHistIndex(-1);

    if (cmd === 'clear' || cmd === 'cls') {
      setHistory([]);
      setInput('');
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      next.push({ t: 'out', v: handler() });
    } else {
      next.push({ t: 'err', v: `zsh: command not found: "${cmd}". Type "help" for a list of commands.` });
    }

    setHistory(next);
    setInput('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeCommand(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistoryList.length === 0) return;
      const nextIdx = histIndex === -1 ? cmdHistoryList.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(nextIdx);
      setInput(cmdHistoryList[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIndex === -1) return;
      const nextIdx = histIndex + 1;
      if (nextIdx >= cmdHistoryList.length) {
        setHistIndex(-1);
        setInput('');
      } else {
        setHistIndex(nextIdx);
        setInput(cmdHistoryList[nextIdx]);
      }
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitContactForm = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setFormStatus('sending');

    try {
      const res = await fetch('https://formspree.io/f/xnpayvwz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      if (res.ok) {
        setFormStatus('sent');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 6000);
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <section
      id="about"
      className="relative py-28 px-6 lg:px-10 border-t border-[var(--border-subtle)]"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="section-num">06</div>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 font-mono text-[0.7rem] text-[var(--cyan)]"
            style={{ background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.2)' }}
          >
            <User size={13} /> 06 / SYSTEM SPEC & INITIATE CONTACT
          </div>
          <h2
            className="font-display font-extrabold text-[var(--text-main)] mb-4 reveal"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Who Is Behind<br />
            <span style={{ color: 'var(--cyan)' }}>The Work?</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl text-base leading-relaxed reveal" data-delay="100">
            {profileData.tagline}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Engineer's Notebook & Skills (7 cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Notebook Card */}
            <div className="card p-7 reveal">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-[var(--border-subtle)]">
                <span className="font-mono text-xs font-bold text-[var(--cyan)]">
                  ENGINEER_NOTEBOOK // {profileData.name.toUpperCase()}
                </span>
                <span className="font-mono text-[0.65rem] text-[var(--text-muted)]">OPEN</span>
              </div>

              <div className="space-y-4 font-mono text-xs text-[var(--text-secondary)] leading-relaxed">
                <div>
                  <div className="text-[var(--cyan)] mb-1 font-bold">[CURRENTLY]</div>
                  <p>{profileData.notebook.currently}</p>
                </div>
                <div>
                  <div className="text-[var(--emerald)] mb-1 font-bold">[USUALLY FOUND]</div>
                  <p>{profileData.notebook.usuallyFound}</p>
                </div>
                <div>
                  <div className="text-[var(--amber)] mb-1 font-bold">[INTERESTED IN]</div>
                  <p>{profileData.notebook.interestedIn}</p>
                </div>
                <div>
                  <div className="text-[var(--warm)] mb-1 font-bold">[OUTSIDE CODE]</div>
                  <p>{profileData.notebook.outsideCode}</p>
                </div>
              </div>
            </div>

            {/* Skills Matrix */}
            <div className="card p-7 reveal" data-delay="80">
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[var(--border-subtle)]">
                <span className="font-mono text-xs font-bold text-[var(--cyan)]">
                  SYSTEM_CAPABILITIES // SKILLS MATRIX
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profileData.skillsMatrix.map((cat, i) => (
                  <div
                    key={cat.category}
                    className="p-4 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}
                  >
                    <div
                      className="font-mono text-[0.65rem] font-bold mb-3"
                      style={{ color: ['var(--cyan)', 'var(--emerald)', 'var(--amber)', 'var(--warm)'][i] }}
                    >
                      {cat.category.toUpperCase()}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map(s => <span key={s} className="tag">{s}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Active Terminal + Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Active Developer Terminal */}
            <div
              onClick={() => inputRef.current?.focus()}
              className="rounded-xl overflow-hidden reveal cursor-text transition-all duration-300 group"
              style={{
                border: '1px solid rgba(0,240,255,0.3)',
                background: '#06070a',
                boxShadow: '0 0 35px rgba(0,240,255,0.06)',
              }}
            >
              {/* Titlebar */}
              <div
                className="px-4 py-2.5 flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] select-none"
                style={{ background: '#0c0f18' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--rose)] cursor-pointer" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--amber)] cursor-pointer" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--emerald)] cursor-pointer" />
                  <span className="font-mono text-[0.68rem] text-[var(--text-muted)] ml-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--emerald)] anim-pulse" />
                    vishal@vision — interactive shell
                  </span>
                </div>
                <span className="font-mono text-[0.6rem] text-[var(--cyan)] font-bold px-1.5 py-0.5 rounded bg-[rgba(0,240,255,0.1)]">
                  ACTIVE
                </span>
              </div>

              {/* Terminal Logs Viewport */}
              <div
                ref={terminalBodyRef}
                className="p-4 font-mono text-xs space-y-2 overflow-y-auto"
                style={{ minHeight: 220, maxHeight: 270 }}
              >
                {history.map((item, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {item.t === 'sys' && (
                      <div className="text-[var(--text-muted)] text-[0.72rem]">{item.v}</div>
                    )}
                    {item.t === 'in' && (
                      <div className="text-[var(--cyan)] font-bold flex items-center gap-1.5">
                        <span className="text-[var(--emerald)]">➜</span>
                        <span>{item.v}</span>
                      </div>
                    )}
                    {item.t === 'out' && (
                      <div className="text-[var(--text-main)] border-l-2 border-[var(--cyan)] pl-3 py-1 my-1 bg-[rgba(0,240,255,0.02)] rounded-r text-[0.75rem] whitespace-pre-wrap font-mono">
                        {item.v}
                      </div>
                    )}
                    {item.t === 'err' && (
                      <div className="text-[var(--rose)] border-l-2 border-[var(--rose)] pl-3 py-0.5 text-[0.75rem]">
                        {item.v}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Clickable Suggestions / Shortcuts */}
              <div
                className="px-4 py-2 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-1.5 overflow-x-auto no-scrollbar"
                style={{ background: 'rgba(0,0,0,0.5)' }}
              >
                <span className="font-mono text-[0.6rem] text-[var(--text-muted)] shrink-0">
                  SUGGEST:
                </span>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      executeCommand(s);
                    }}
                    className="interactive font-mono text-[0.62rem] px-2 py-0.5 rounded bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(0,240,255,0.15)] text-[var(--text-secondary)] hover:text-[var(--cyan)] transition-colors border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,240,255,0.3)] shrink-0 cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Real Input Line */}
              <form
                onSubmit={handleFormSubmit}
                className="flex items-center gap-2 px-4 py-3 border-t border-[rgba(255,255,255,0.08)]"
                style={{ background: '#090c14' }}
              >
                <span className="font-mono text-xs text-[var(--emerald)] font-bold">vishal@vision:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type a command (e.g. whoami, skills, medium)..."
                  className="interactive w-full bg-transparent border-0 font-mono text-xs text-white focus:outline-none placeholder:text-[var(--text-muted)] placeholder:text-[0.7rem]"
                  style={{ caretColor: 'var(--cyan)' }}
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  type="submit"
                  className="interactive font-mono text-[0.62rem] text-[var(--cyan)] px-2 py-1 rounded bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.3)] hover:bg-[rgba(0,240,255,0.2)] transition-all cursor-pointer flex items-center gap-1"
                >
                  RUN <CornerDownLeft size={10} />
                </button>
              </form>
            </div>

            {/* Social Channels & Contact Card */}
            <div className="card p-6 reveal" data-delay="80">
              <h3 className="font-display font-bold text-xl text-[var(--text-main)] mb-1">Initiate Contact</h3>
              <p className="text-[0.8rem] text-[var(--text-secondary)] mb-4">
                Open to CV/AI collaborations, research conversations, and engineering roles.
              </p>

              {/* Compact 4-Grid Social Hub */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                
                {/* GitHub */}
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(0,240,255,0.4)] hover:bg-[rgba(0,240,255,0.04)] transition-all flex items-center gap-2.5 group"
                  style={{ textDecoration: 'none' }}
                >
                  <GithubIcon size={16} className="text-[var(--cyan)] shrink-0" />
                  <div className="min-w-0">
                    <div className="font-mono text-[0.58rem] text-[var(--text-muted)] uppercase">GitHub</div>
                    <div className="font-mono text-xs text-white group-hover:text-[var(--cyan)] truncate font-semibold">@Visshu78</div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(0,240,255,0.4)] hover:bg-[rgba(0,240,255,0.04)] transition-all flex items-center gap-2.5 group"
                  style={{ textDecoration: 'none' }}
                >
                  <LinkedinIcon size={16} className="text-[var(--cyan)] shrink-0" />
                  <div className="min-w-0">
                    <div className="font-mono text-[0.58rem] text-[var(--text-muted)] uppercase">LinkedIn</div>
                    <div className="font-mono text-xs text-white group-hover:text-[var(--cyan)] truncate font-semibold">in/vishal-dhawal</div>
                  </div>
                </a>

                {/* Medium */}
                <a
                  href={profileData.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,200,133,0.4)] hover:bg-[rgba(255,200,133,0.04)] transition-all flex items-center gap-2.5 group"
                  style={{ textDecoration: 'none' }}
                >
                  <MediumIcon size={16} className="text-[var(--warm)] shrink-0" />
                  <div className="min-w-0">
                    <div className="font-mono text-[0.58rem] text-[var(--text-muted)] uppercase">Medium</div>
                    <div className="font-mono text-xs text-white group-hover:text-[var(--warm)] truncate font-semibold">@vishaldhawal</div>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href={profileData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(244,63,94,0.4)] hover:bg-[rgba(244,63,94,0.04)] transition-all flex items-center gap-2.5 group"
                  style={{ textDecoration: 'none' }}
                >
                  <InstagramIcon size={16} className="text-[#f43f5e] shrink-0" />
                  <div className="min-w-0">
                    <div className="font-mono text-[0.58rem] text-[var(--text-muted)] uppercase">Instagram</div>
                    <div className="font-mono text-xs text-white group-hover:text-[#f43f5e] truncate font-semibold">@vishaldhawal</div>
                  </div>
                </a>

              </div>

              {/* Email */}
              <div
                className="flex items-center justify-between p-3 rounded-lg mb-4"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-3">
                  <Mail size={16} style={{ color: 'var(--emerald)' }} />
                  <div>
                    <div className="label mb-0">DIRECT EMAIL</div>
                    <span className="font-mono text-xs text-white">
                      {profileData.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="interactive btn text-xs py-1.5 px-3"
                  style={{ color: copied ? 'var(--emerald)' : undefined }}
                >
                  {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                </button>
              </div>

              {/* Live Formspree Direct Message Form */}
              <form onSubmit={submitContactForm} className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
                <div className="font-mono text-[0.65rem] text-[var(--cyan)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] anim-pulse" />
                  <span>Direct Transmission Line</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={e => setFormState(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your Name"
                    className="interactive w-full font-mono text-xs p-3 rounded-lg border border-[var(--border-subtle)] bg-[rgba(0,0,0,0.3)] text-white focus:outline-none focus:border-[var(--cyan)] transition-colors"
                  />
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={e => setFormState(f => ({ ...f, email: e.target.value }))}
                    placeholder="Your Email"
                    className="interactive w-full font-mono text-xs p-3 rounded-lg border border-[var(--border-subtle)] bg-[rgba(0,0,0,0.3)] text-white focus:outline-none focus:border-[var(--cyan)] transition-colors"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  value={formState.message}
                  onChange={e => setFormState(f => ({ ...f, message: e.target.value }))}
                  placeholder="Transmission Payload / Message..."
                  className="interactive w-full font-mono text-xs p-3 rounded-lg border border-[var(--border-subtle)] bg-[rgba(0,0,0,0.3)] text-white focus:outline-none focus:border-[var(--cyan)] transition-colors resize-none"
                />

                <button
                  type="submit"
                  disabled={formStatus === 'sending' || formStatus === 'sent'}
                  className="interactive btn btn-primary w-full justify-center text-xs py-2.5 font-mono"
                  style={{
                    background: formStatus === 'sent' ? 'var(--emerald)' : undefined,
                    borderColor: formStatus === 'sent' ? 'var(--emerald)' : undefined,
                    color: formStatus === 'sent' ? '#000' : undefined,
                  }}
                >
                  {formStatus === 'sending' && <>Transmitting Payload...</>}
                  {formStatus === 'sent' && <><Check size={14} /> Message Received</>}
                  {formStatus === 'error' && <>Transmission Failed — Retrying...</>}
                  {formStatus === 'idle' && <><Send size={13} /> Transmit Message</>}
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
