const RIBBON_ITEMS = [
  'human resources',
  'rekrutmen & onboarding',
  'desain ui/ux',
  'wireframing & alur pengguna',
  'tata kelola sdm',
  'antarmuka responsif',
];

export function MarqueeRibbon() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-b border-zinc-200 bg-white py-3.5 select-none"
    >
      <div className="animate-marquee">
        {[0, 1].map((loopIndex) => (
          <div key={loopIndex} className="flex items-center gap-8 pr-8 text-sm font-medium text-zinc-500">
            {RIBBON_ITEMS.map((item) => (
              <span key={`${loopIndex}-${item}`} className="flex items-center gap-8 whitespace-nowrap">
                <span>{item}</span>
                <span className="text-zinc-300">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
