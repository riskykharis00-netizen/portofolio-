import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { ProjectItem } from '../data/portfolio';
import { MediaFrame } from './MediaFrame';

interface ProjectLightboxProps {
  project: ProjectItem | null;
  projects: ProjectItem[];
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectLightbox({
  project,
  projects,
  onClose,
  onSelectProject,
}: ProjectLightboxProps) {
  useEffect(() => {
    if (!project) return;

    const currentIndex = projects.findIndex((p) => p.id === project.id);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && projects.length > 1) {
        const nextIndex = (currentIndex + 1) % projects.length;
        onSelectProject(projects[nextIndex]);
      } else if (event.key === 'ArrowLeft' && projects.length > 1) {
        const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
        onSelectProject(projects[prevIndex]);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, projects, onClose, onSelectProject]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-xs sm:p-6 lg:p-10"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar inside lightbox */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-zinc-200 bg-white/95 px-6 py-4 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500">
            <span>{project.category}</span>
            <span aria-hidden="true" className="text-zinc-300">
              ·
            </span>
            <span className="font-mono tabular-nums">{project.year}</span>
            <span aria-hidden="true" className="text-zinc-300">
              ·
            </span>
            <span>{project.client}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pratinjau studi kasus"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-900 transition-colors hover:bg-zinc-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 lg:p-8">
          <MediaFrame
            src={project.image}
            alt={project.imageAlt}
            title={project.title}
            priority
            className="aspect-[16/9] w-full rounded-xl border border-zinc-200"
          />

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2
                id="lightbox-title"
                className="font-display text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
              >
                {project.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600">
                {project.summary}
              </p>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <span>Buka Situs Langsung</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>

          {/* Structured metadata grid (unboxed, hairline separated) */}
          <div className="mt-8 grid grid-cols-1 gap-6 border-y border-zinc-200 py-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-zinc-500">Peran Utama</p>
              <p className="mt-1 text-sm font-medium text-zinc-900">{project.role}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Klien &amp; Tahun</p>
              <p className="mt-1 text-sm font-medium text-zinc-900 tabular-nums">
                {project.client} · {project.year}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Teknologi</p>
              <p className="mt-1 text-sm font-medium text-zinc-900">
                {project.stack.join(' · ')}
              </p>
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-display text-base font-semibold text-zinc-900">
                Tantangan Produk
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-600">
                {project.challenge}
              </p>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-zinc-900">
                Pendekatan &amp; Solusi
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-600">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Quantitative Outcomes */}
          <div className="mt-8 border-t border-zinc-200 pt-6">
            <h3 className="text-xs font-medium text-zinc-500">Dampak Terukur</h3>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {project.outcomes.map((outcome) => (
                <div key={outcome.label}>
                  <p className="font-display text-2xl font-semibold tracking-tight text-blue-600 tabular-nums">
                    {outcome.value}
                  </p>
                  <p className="mt-1 text-sm text-zinc-600">{outcome.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer navigation between projects */}
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-zinc-200 pt-6">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span className="truncate max-w-[140px] sm:max-w-xs">
                {prevProject.title.split('—')[0].trim()}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <span className="truncate max-w-[140px] sm:max-w-xs">
                {nextProject.title.split('—')[0].trim()}
              </span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
