import { useMemo, useState } from 'react';
import { Quote } from 'lucide-react';
import { ENDORSEMENTS, EndorsementCategory } from '../data/portfolio';

const ENDORSEMENT_CATEGORIES: EndorsementCategory[] = [
  'Semua',
  'Human Resources',
  'Desain UI/UX',
];

export function RecentEndorsements() {
  const [activeCategory, setActiveCategory] = useState<EndorsementCategory>('Semua');

  const counts = useMemo(() => {
    const result: Record<EndorsementCategory, number> = {
      Semua: ENDORSEMENTS.length,
      'Human Resources': 0,
      'Desain UI/UX': 0,
    };
    for (const item of ENDORSEMENTS) {
      result[item.category] += 1;
    }
    return result;
  }, []);

  const filteredEndorsements = useMemo(() => {
    if (activeCategory === 'Semua') {
      return ENDORSEMENTS;
    }
    return ENDORSEMENTS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="endorsements"
      className="border-t border-zinc-200 bg-zinc-50 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header & Interactive Category Filter */}
        <div className="flex flex-col gap-6 border-b border-zinc-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-zinc-500">Recent Endorsements</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-900 text-balance lg:text-4xl">
              Apresiasi &amp; kekuatan utama di bidang HR dan Desain UI/UX.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter kategori umpan balik profesional"
            className="flex flex-wrap items-center gap-1.5 rounded-xl bg-zinc-200/70 p-1.5"
          >
            {ENDORSEMENT_CATEGORIES.map((category) => {
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
                    {counts[category]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Balanced 2-column grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredEndorsements.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 lg:p-7"
            >
              <div>
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-semibold text-blue-600">{item.category}</span>
                  <span className="font-mono text-zinc-400 tabular-nums">
                    {item.period}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-zinc-900">
                  {item.strengthTitle}
                </h3>

                <blockquote className="mt-3 flex items-start gap-2.5 text-sm leading-relaxed text-zinc-600">
                  <Quote
                    className="mt-0.5 h-4 w-4 shrink-0 text-zinc-300"
                    aria-hidden="true"
                  />
                  <p>{item.quote}</p>
                </blockquote>
              </div>

              <div className="mt-6 border-t border-zinc-100 pt-4">
                <p className="text-xs font-medium text-zinc-800">
                  {item.keyStrengths.join(' · ')}
                </p>
                <p className="mt-1.5 text-xs text-zinc-500">
                  {item.endorserRole} · {item.context}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
