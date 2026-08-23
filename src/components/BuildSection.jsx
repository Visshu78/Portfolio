import React, { useState } from 'react';
import { systemProjects } from '../data/projects';
import { Cpu, Server, ExternalLink, Code2, ChevronRight } from 'lucide-react';

export default function BuildSection() {
  const [selectedSystem, setSelectedSystem] = useState(systemProjects[0]);
  const [activeNodeId, setActiveNodeId] = useState(systemProjects[0].architectureNodes[0].id);

  const activeNode = selectedSystem.architectureNodes.find(n => n.id === activeNodeId)
    || selectedSystem.architectureNodes[0];

  const handleSystemChange = (sys) => {
    setSelectedSystem(sys);
    setActiveNodeId(sys.architectureNodes[0].id);
  };

  return (
    <section
      id="build"
      className="relative py-28 px-6 lg:px-10 border-t border-[var(--border-subtle)]"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="section-num">02</div>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 font-mono text-[0.7rem] text-[var(--emerald)]"
            style={{ background: 'rgba(16,240,128,0.06)', border: '1px solid rgba(16,240,128,0.2)' }}
          >
            <Cpu size={13} /> 02 / SYSTEMS & APPLIED AI INFRASTRUCTURE
          </div>
          <h2
            className="font-display font-extrabold text-[var(--text-main)] mb-4 reveal"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            From Weights to<br />
            <span style={{ color: 'var(--emerald)' }}>Production Pipelines</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl text-base leading-relaxed reveal" data-delay="100">
            Models live in notebooks. Systems live in the world. Building ultra-low latency WebRTC bridges, containerized inference clusters, and reactive architectures.
          </p>
        </div>

        {/* System Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {systemProjects.map((sys, i) => {
            const active = selectedSystem.id === sys.id;
            return (
              <button
                key={sys.id}
                onClick={() => handleSystemChange(sys)}
                className="interactive card p-5 text-left transition-all reveal"
                data-delay={i * 80}
                style={{
                  borderColor: active ? 'rgba(16,240,128,0.4)' : undefined,
                  background: active ? 'rgba(16,240,128,0.05)' : undefined,
                  boxShadow: active ? '0 0 20px rgba(16,240,128,0.08)' : undefined,
                  cursor: 'pointer',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[0.65rem]" style={{ color: active ? 'var(--emerald)' : 'var(--text-muted)' }}>
                    {sys.category}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full transition-colors"
                    style={{ background: active ? 'var(--emerald)' : 'rgba(255,255,255,0.15)' }}
                  />
                </div>
                <h3 className="font-display font-bold text-base text-[var(--text-main)] mb-1.5 leading-snug">
                  {sys.title}
                </h3>
                <p className="text-[0.75rem] text-[var(--text-secondary)] line-clamp-2">
                  {sys.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Interactive Architecture Canvas */}
        <div className="card p-6 lg:p-8 reveal" data-delay="100">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[var(--border-subtle)]">
            <div>
              <span className="font-mono text-[0.68rem] text-[var(--emerald)] block mb-0.5">
                PIPELINE ARCHITECTURE // CLICK NODES TO INSPECT
              </span>
              <span className="font-display font-bold text-lg text-[var(--text-main)]">
                {selectedSystem.title}
              </span>
            </div>
            <a
              href={selectedSystem.github}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost text-xs interactive"
            >
              <Code2 size={13} />
              View Repo
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Node Pipeline */}
          <div className="relative mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {selectedSystem.architectureNodes.map((node, ni) => {
                const isActive = activeNodeId === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNodeId(node.id)}
                    className="interactive relative flex flex-col p-4 rounded-lg text-left transition-all"
                    style={{
                      background: isActive ? 'rgba(16,240,128,0.08)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isActive ? 'rgba(16,240,128,0.4)' : 'rgba(255,255,255,0.06)'}`,
                      boxShadow: isActive ? '0 0 20px rgba(16,240,128,0.15)' : undefined,
                      transform: isActive ? 'scale(1.03)' : undefined,
                      cursor: 'pointer',
                    }}
                  >
                    {isActive && (
                      <div
                        className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-lg pointer-events-none"
                        style={{ border: '1px solid rgba(16,240,128,0.2)', animation: 'glowPulse 2s ease-in-out infinite' }}
                      />
                    )}
                    <span className="font-mono text-[0.6rem] text-[var(--text-muted)] mb-1">
                      STAGE {String(ni + 1).padStart(2, '0')}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full mb-2 transition-colors"
                      style={{
                        background: isActive ? 'var(--emerald)' : 'rgba(255,255,255,0.2)',
                        animation: isActive ? 'pulseDot 1.5s ease-in-out infinite' : undefined,
                      }}
                    />
                    <span className="font-display font-bold text-sm text-[var(--text-main)] leading-snug mb-1">
                      {node.name}
                    </span>
                    <span className="font-mono text-[0.62rem]" style={{ color: isActive ? 'var(--emerald)' : 'var(--text-muted)' }}>
                      {node.tech.split('/')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Node Detail */}
          <div
            className="p-5 rounded-xl transition-all"
            style={{
              background: 'rgba(16,240,128,0.04)',
              border: '1px solid rgba(16,240,128,0.15)',
            }}
          >
            <div className="flex flex-wrap items-start gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(16,240,128,0.12)', border: '1px solid rgba(16,240,128,0.3)' }}
              >
                <Server size={18} style={{ color: 'var(--emerald)' }} />
              </div>
              <div className="flex-1">
                <div className="font-mono text-[0.65rem] text-[var(--emerald)] mb-0.5 uppercase">
                  Inspecting // {activeNode.name}
                </div>
                <div className="font-display font-bold text-[var(--text-main)] mb-1">
                  {activeNode.role}
                </div>
                <div className="font-mono text-xs text-[var(--text-secondary)]">
                  Stack: {activeNode.tech}
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {selectedSystem.highlights.map((h, i) => (
              <div
                key={i}
                className="flex gap-2.5 p-3 rounded-lg text-[0.78rem] text-[var(--text-secondary)]"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}
              >
                <span style={{ color: 'var(--emerald)' }} className="mt-0.5 shrink-0">•</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
