import { useState } from 'react';
import { AboutAndContact } from './components/AboutAndContact';
import { CapabilitiesAndProof } from './components/CapabilitiesAndProof';
import { CertificateModal } from './components/CertificateModal';
import { CertificatesSection } from './components/CertificatesSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarqueeRibbon } from './components/MarqueeRibbon';
import { ProjectLightbox } from './components/ProjectLightbox';
import { RecentEndorsements } from './components/RecentEndorsements';
import { ResumeModal } from './components/ResumeModal';
import { SkillsSection } from './components/SkillsSection';
import { WorkShowcase } from './components/WorkShowcase';
import { CertificateItem, PROJECTS, ProjectItem } from './data/portfolio';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header onStartProject={() => scrollToSection('kontak')} />

      <main>
        <Hero
          onExploreWork={() => scrollToSection('karya')}
          onOpenResume={() => setResumeOpen(true)}
        />
        <MarqueeRibbon />
        <WorkShowcase onSelectProject={(project) => setSelectedProject(project)} />
        <CapabilitiesAndProof />
        <SkillsSection />
        <CertificatesSection
          onSelectCertificate={(certificate) => setSelectedCertificate(certificate)}
        />
        <RecentEndorsements />
        <AboutAndContact />
      </main>

      <Footer />

      <ProjectLightbox
        project={selectedProject}
        projects={PROJECTS}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      <ResumeModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        onSelectCertificate={(certificate) => setSelectedCertificate(certificate)}
      />
    </div>
  );
}
