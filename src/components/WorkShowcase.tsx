import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, ProjectCategory, ProjectItem } from '../data/portfolio';
import { MediaFrame } from './MediaFrame';

interface WorkShowcaseProps {
  onSelectProject: (project: ProjectItem) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'Semua',
  'Desain UI/UX',
  'Sistem & Operasional HR',
];

export function WorkShowcase({ onSelectProject }: WorkShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Semua');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Semua') {
      return PROJECTS;
    }
    return PROJECTS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      Semua: PROJECTS.length,
      'Desain UI/UX': 0,
      'Sistem & Operasional HR': 0,
    };
    for (const p of PROJECTS) {
      counts[p.category] += 1;
    }
    return counts;
  }, []);

  return (
    <section id="karya" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-zinc-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-zinc-500">Karya Pilihan</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-900 text-balance lg:text-4xl">
              Rekam karya desain UI/UX dan sistem operasional HR.
            </h2>
          </div>

          {/* Interactive segmented filter tabs */}
          <div
            role="tablist"
            aria-label="Filter kategori karya"
            className="flex flex-wrap items-center gap-1.5 rounded-xl bg-zinc-100 p-1.5"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  <span>{category}</span>
                  <span className="font-mono text-[11px] text-zinc-400 tabular-nums">
                    {categoryCounts[category]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Balanced Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {filteredProjects.map((project, index) => {
            const isFeaturedGrid =
              activeCategory === 'Semua' && project.featured && index === 0;

            const spanClass = isFeaturedGrid ? 'md:col-span-2' : 'md:col-span-1';

            const mediaAspectClass = isFeaturedGrid
              ? 'aspect-[16/9]'
              : 'aspect-[4/3]';

            return (
              <article
                key={project.id}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors duration-200 hover:border-zinc-300 ${spanClass}`}
              >
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  aria-label={`Buka detail ${project.title}`}
                  className="flex flex-1 w-full flex-col text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
                >
                  <div className="w-full overflow-hidden">
                    <MediaFrame
                      src={project.image}
                      alt={project.imageAlt}
                      title={project.title}
                      className={`w-full ${mediaAspectClass}`}
                      imgClassName="transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-start p-6 pb-4 lg:p-7 lg:pb-4">
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

                    <h3
                      className={`mt-2.5 font-display font-semibold tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors duration-150 ${
                        isFeaturedGrid ? 'text-2xl lg:text-[28px] leading-snug' : 'text-xl leading-snug'
                      }`}
                    >
                      {project.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 line-clamp-3">
                      {project.summary}
                    </p>
                  </div>
                </button>

                <div className="flex items-center justify-between gap-3 border-t border-zinc-100 px-6 py-4 lg:px-7">
                  <span className="text-xs font-medium text-zinc-500 truncate">
                    {project.outcomes[0]?.value} · {project.outcomes[0]?.label}
                  </span>
                  <div className="flex items-center gap-3 shrink-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 whitespace-nowrap hover:text-blue-700 transition-colors"
                      >
                        <span>Kunjungi Situs</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 whitespace-nowrap hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      <span>Detail</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
