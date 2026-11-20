import { useMemo, useState } from 'react';
import { SKILLS, SkillCategory, SkillItem } from '../data/portfolio';

const SKILL_CATEGORIES: SkillCategory[] = ['Semua', 'HR', 'UI/UX'];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('Semua');
  const [selectedSkillId, setSelectedSkillId] = useState<string>(SKILLS[0].id);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'Semua') {
      return SKILLS;
    }
    return SKILLS.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<SkillCategory, number> = {
      Semua: SKILLS.length,
      HR: 0,
      'UI/UX': 0,
    };
    for (const skill of SKILLS) {
      counts[skill.category] += 1;
    }
    return counts;
  }, []);

  const activeSkill: SkillItem = useMemo(() => {
    const foundInFiltered = filteredSkills.find((item) => item.id === selectedSkillId);
    return foundInFiltered || filteredSkills[0];
  }, [filteredSkills, selectedSkillId]);

  const handleCategoryChange = (category: SkillCategory) => {
    setActiveCategory(category);
    const nextList =
      category === 'Semua'
        ? SKILLS
        : SKILLS.filter((skill) => skill.category === category);
    if (nextList.length > 0 && !nextList.some((s) => s.id === selectedSkillId)) {
      setSelectedSkillId(nextList[0].id);
    }
  };

  return (
    <section id="kompetensi" className="border-t border-zinc-200 bg-zinc-50 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-zinc-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-zinc-500">Skills &amp; Kompetensi</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-900 text-balance lg:text-4xl">
              Kompetensi inti di bidang Human Resources (HR) dan Desain UI/UX.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter kategori keahlian"
            className="flex flex-wrap items-center gap-1.5 rounded-xl bg-zinc-200/70 p-1.5"
          >
            {SKILL_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(category)}
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

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Interactive Pill-Shaped Skill Tags */}
          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-zinc-500">
              Pilih keahlian untuk melihat detail penerapan dan perangkat kerja
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {filteredSkills.map((skill) => {
                const isSelected = activeSkill.id === skill.id;
                return (
                  <button
                    key={skill.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedSkillId(skill.id)}
                    className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-100'
                    }`}
                  >
                    <span>{skill.label}</span>
                    {activeCategory === 'Semua' && (
                      <span
                        className={`text-xs ${
                          isSelected ? 'text-blue-100' : 'text-zinc-400'
                        }`}
                      >
                        · {skill.category}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Skill Detail Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 lg:p-7">
              <div className="flex items-center justify-between gap-3 text-xs font-medium text-zinc-500">
                <span>Kategori: {activeSkill.category}</span>
                <span className="font-mono text-zinc-400 tabular-nums">
                  {String(
                    filteredSkills.findIndex((s) => s.id === activeSkill.id) + 1,
                  ).padStart(2, '0')}
                  /{String(filteredSkills.length).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-zinc-900">
                {activeSkill.label}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                {activeSkill.description}
              </p>

              <div className="mt-5 border-t border-zinc-100 pt-4">
                <p className="text-xs font-medium text-zinc-500">Perangkat &amp; Fokus</p>
                <p className="mt-1.5 text-sm font-medium text-zinc-800">
                  {activeSkill.tools.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
