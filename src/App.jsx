import React, { useState, useEffect } from 'react';
import Cursor from './components/Cursor';
import Header from './components/Header';
import VisionHudOverlay from './components/VisionHudOverlay';
import Hero from './components/Hero';
import SeeSection from './components/SeeSection';
import BuildSection from './components/BuildSection';
import ExperienceSection from './components/ExperienceSection';
import LabSection from './components/LabSection';
import WriteSection from './components/WriteSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import CaseStudyModal from './components/CaseStudyModal';
import WritingArchiveModal from './components/WritingArchiveModal';
import { useScrollReveal, useCardGlow } from './hooks';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  // Navigation
  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Active section tracking
  useEffect(() => {
    const sections = ['hero', 'experience', 'see', 'build', 'lab', 'write', 'about'];
    const onScroll = () => {
      const pos = window.scrollY + 220;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal & card glow — run after every render
  useScrollReveal();
  useCardGlow();

  return (
    <div style={{ background: 'var(--bg-base)', color: 'var(--text-main)', minHeight: '100vh' }}>
      <Cursor />
      <VisionHudOverlay />
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      <main>
        <Hero onNavigate={handleNavigate} />
        <ExperienceSection />
        <SeeSection onOpenCaseStudy={(proj) => setSelectedProject(proj)} />
        <BuildSection />
        <LabSection />
        <WriteSection onOpenArchive={() => setIsArchiveOpen(true)} />
        <AboutSection />
      </main>

      <Footer />

      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <WritingArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
      />
    </div>
  );
}
