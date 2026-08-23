import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { Terminal, Mail, Send, Check, Copy, User } from 'lucide-react';
import { GithubIcon } from './Icons';

const COMMANDS = {
  help:     () => 'Commands: whoami · skills · focus · github · linkedin · contact · frame · clear',
  whoami:   () => `${profileData.name} — ${profileData.role}.\n${profileData.tagline}`,
  skills:   () => 'CV: PyTorch · OpenCV · EfficientNet · YOLOv8 · ONNX · Edge AI · Jetson\nAI: LLMs · RAG · FAISS · BM25 · Sentence Transformers · Hybrid Retrieval\nSystems: WebRTC · Node.js · Docker · Streamlit · Git',
  focus:    () => `Currently: ${profileData.notebook.currently}`,
  github:   () => { window.open(profileData.github, '_blank'); return `→ Opening ${profileData.github}`; },
  linkedin: () => { window.open(profileData.linkedin, '_blank'); return `→ Opening ${profileData.linkedin}`; },
  contact:  () => `Email: ${profileData.email}\nGitHub: ${profileData.github}\nLinkedIn: ${profileData.linkedin}`,
  frame:    () => `System: ${profileData.telemetry.frameCounter} | Latency: ${profileData.telemetry.avgLatency} | Deployments: ${profileData.telemetry.visionPipelinesDeployed}`,
};

export default function AboutSection() {
  const [history, setHistory] = useState([
    { t: 'sys', v: 'Vishal Dhawal // CV & Applied AI Shell v1.0' },
    { t: 'sys', v: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | sent | error

  const runCmd = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    const next = [...history, { t: 'in', v: `$ ${input}` }];

    if (cmd === 'clear') { setHistory([]); setInput(''); return; }

    const fn = COMMANDS[cmd];
    if (fn) {
      next.push({ t: 'out', v: fn() });
    } else {
      next.push({ t: 'err', v: `Command not found: "${cmd}". Type "help".` });
    }
    setHistory(next);
    setInput('');
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitForm = async (e) => {
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Notebook + Skills (7 cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Notebook */}
            <div className="card p-7 relative reveal">
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-br" />

              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border-subtle)]">
                <span className="font-mono text-[0.68rem] font-bold text-[var(--cyan)]">
                  ENGINEER_NOTEBOOK // {profileData.name.toUpperCase()}
                </span>
                <span className="font-mono text-[0.65rem] text-[var(--text-muted)]">OPEN</span>
              </div>

              <div className="space-y-5">
                {[
                  { key: 'CURRENTLY', val: profileData.notebook.currently, color: 'var(--cyan)' },
                  { key: 'USUALLY FOUND', val: profileData.notebook.usuallyFound, color: 'var(--emerald)' },
                  { key: 'INTERESTED IN', val: profileData.notebook.interestedIn, color: 'var(--cyan)' },
                  { key: 'OUTSIDE CODE', val: profileData.notebook.outsideCode, color: 'var(--warm)' },
                ].map(item => (
                  <div key={item.key}>
                    <span className="font-mono text-[0.65rem] font-bold block mb-1.5 uppercase" style={{ color: item.color }}>
                      [{item.key}]
                    </span>
                    <p className="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Matrix */}
            <div className="card p-6 reveal" data-delay="80">
              <span className="label block mb-5">TECHNICAL CAPABILITIES</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profileData.skillsMatrix.map((cat, i) => (
                  <div
                    key={i}
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

          {/* Right: Terminal + Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Terminal */}
            <div
              className="rounded-xl overflow-hidden reveal"
              style={{ border: '1px solid rgba(0,240,255,0.25)', background: '#06070a' }}
            >
              {/* Titlebar */}
              <div
                className="px-4 py-2.5 flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)]"
                style={{ background: '#0d1018' }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--rose)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--amber)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--emerald)]" />
                <span className="font-mono text-[0.65rem] text-[var(--text-muted)] ml-2">
                  vishal@vision — shell
                </span>
                <Terminal size={12} className="ml-auto" style={{ color: 'var(--cyan)' }} />
              </div>

              {/* Output */}
              <div
                className="p-4 font-mono text-xs space-y-1.5 overflow-y-auto"
                style={{ minHeight: 180, maxHeight: 240 }}
              >
                {history.map((item, idx) => (
                  <div key={idx}>
                    {item.t === 'sys' && <div style={{ color: 'var(--text-muted)' }}>{item.v}</div>}
                    {item.t === 'in'  && <div style={{ color: 'var(--cyan)' }}>{item.v}</div>}
                    {item.t === 'out' && (
                      <div style={{ color: 'var(--text-main)', borderLeft: '2px solid rgba(0,240,255,0.3)', paddingLeft: 8 }}>
                        {item.v.split('\n').map((line, li) => <div key={li}>{line}</div>)}
                      </div>
                    )}
                    {item.t === 'err' && <div style={{ color: 'var(--rose)' }}>{item.v}</div>}
                  </div>
                ))}
              </div>

              {/* Input */}
              <form
                onSubmit={runCmd}
                className="flex items-center gap-2 px-4 py-3 border-t border-[rgba(255,255,255,0.06)]"
                style={{ background: '#0a0c13' }}
              >
                <span className="font-mono text-xs text-[var(--cyan)]">$</span>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="help · skills · github · linkedin"
                  className="interactive w-full bg-transparent border-0 font-mono text-xs text-white focus:outline-none"
                  style={{ color: 'var(--text-main)', caretColor: 'var(--cyan)' }}
                />
              </form>
            </div>

            {/* Contact card */}
            <div className="card p-6 reveal" data-delay="80">
              <h3 className="font-display font-bold text-xl text-[var(--text-main)] mb-1">Initiate Contact</h3>
              <p className="text-[0.8rem] text-[var(--text-secondary)] mb-5">
                Open to CV/AI collaborations, research conversations, and engineering roles.
              </p>

              {/* GitHub */}
              <div
                className="flex items-center justify-between p-3 rounded-lg mb-3"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-3">
                  <GithubIcon size={18} style={{ color: 'var(--cyan)' }} />
                  <div>
                    <div className="label mb-0">GITHUB</div>
                    <a
                      href={profileData.github}
                      target="_blank" rel="noopener noreferrer"
                      className="interactive font-mono text-xs font-semibold text-white hover:text-[var(--cyan)] transition-colors"
                    >
                      github.com/Visshu78
                    </a>
                  </div>
                </div>
                <a
                  href={profileData.github}
                  target="_blank" rel="noopener noreferrer"
                  className="interactive btn btn-cyan text-[0.68rem] py-1.5 px-3"
                >
                  VISIT
                </a>
              </div>

              {/* Email */}
              <div
                className="flex items-center justify-between p-3 rounded-lg mb-5"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-3">
                  <Mail size={18} style={{ color: 'var(--cyan)' }} />
                  <div>
                    <div className="label mb-0">EMAIL</div>
                    <span className="font-mono text-xs text-white">{profileData.email}</span>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="interactive p-2 rounded border border-[var(--border-subtle)] bg-transparent"
                  style={{ cursor: 'pointer', color: copied ? 'var(--emerald)' : 'var(--text-secondary)' }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>

              {/* LinkedIn */}
              <div
                className="flex items-center justify-between p-3 rounded-lg mb-3"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-3">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <div>
                    <div className="label mb-0">LINKEDIN</div>
                    <a
                      href={profileData.linkedin}
                      target="_blank" rel="noopener noreferrer"
                      className="interactive font-mono text-xs font-semibold text-white hover:text-[var(--cyan)] transition-colors"
                    >
                      vishal-dhawal
                    </a>
                  </div>
                </div>
                <a
                  href={profileData.linkedin}
                  target="_blank" rel="noopener noreferrer"
                  className="interactive btn btn-ghost text-[0.68rem] py-1.5 px-3"
                >
                  VISIT
                </a>
              </div>

              {/* Form */}
              <form onSubmit={submitForm} className="space-y-3">
                {/* Helper text */}
                <p className="font-mono text-[0.65rem] text-[var(--text-muted)] leading-relaxed">
                  Message goes directly to my inbox — no email app needed.
                </p>
                {['name', 'email'].map(field => (
                  <input
                    key={field}
                    type={field}
                    placeholder={field === 'name' ? 'Your Name' : 'Your Email'}
                    value={formState[field]}
                    onChange={e => setFormState(s => ({ ...s, [field]: e.target.value }))}
                    required
                    className="interactive w-full bg-[rgba(0,0,0,0.3)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[rgba(0,240,255,0.4)] transition-colors"
                    style={{ fontFamily: 'var(--font-mono)', caretColor: 'var(--cyan)' }}
                  />
                ))}
                <textarea
                  rows={3}
                  placeholder="Your message or inquiry..."
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  required
                  className="interactive w-full bg-[rgba(0,0,0,0.3)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[rgba(0,240,255,0.4)] transition-colors resize-none"
                  style={{ fontFamily: 'var(--font-mono)', caretColor: 'var(--cyan)' }}
                />
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="interactive btn btn-cyan w-full justify-center"
                  style={{ opacity: formStatus === 'sending' ? 0.7 : 1, cursor: formStatus === 'sending' ? 'wait' : 'pointer' }}
                >
                  {formStatus === 'sending' && <><span style={{ display:'inline-block', width:12, height:12, border:'1.5px solid currentColor', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.7s linear infinite', marginRight:6 }} /> SENDING...</>}
                  {formStatus === 'sent'    && <><Check size={14} /> MESSAGE RECEIVED — I'LL BE IN TOUCH</>}
                  {formStatus === 'error'   && <><Send size={13} /> FAILED — TRY AGAIN</>}
                  {formStatus === 'idle'    && <><Send size={13} /> SEND MESSAGE</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
