import { ArrowUpRight } from 'lucide-react';
import { CAPABILITIES, EXPERIENCES, PROFILE } from '../data/portfolio';

export function CapabilitiesAndProof() {
  return (
    <section id="layanan" className="border-t border-zinc-200 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section 1: Numbered Capabilities */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm font-medium text-zinc-500">Bidang Keahlian</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-900 text-balance">
              Tata kelola HR yang tertib dan desain UI/UX yang jelas.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              Berbekal latar belakang Sistem Informasi dari Universitas Mulawarman, saya memadukan ketelitian pengelolaan sumber daya manusia (HR) dengan kejelasan perancangan antarmuka UI/UX.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-zinc-200 border-y border-zinc-200">
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.number}
                  className="grid grid-cols-1 gap-3 py-7 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="sm:col-span-2">
                    <span className="font-mono text-sm font-medium text-zinc-400 tabular-nums">
                      {cap.number}.
                    </span>
                  </div>
                  <div className="sm:col-span-10">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-900">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      {cap.description}
                    </p>
                    <p className="mt-3 text-xs font-medium text-zinc-500">
                      {cap.deliverables}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Education & Research Timeline */}
        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-zinc-200 pt-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm font-medium text-zinc-500">Pendidikan &amp; Akademik</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-zinc-900">
              Latar belakang pendidikan tinggi.
            </h3>
            <div className="mt-6">
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-300 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <span>Lihat Profil LinkedIn Lengkap</span>
                <ArrowUpRight className="h-4 w-4 text-zinc-600" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-zinc-200 border-y border-zinc-200">
              {EXPERIENCES.map((exp) => (
                <div key={`${exp.company}-${exp.period}`} className="py-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
                    <span className="font-mono tabular-nums">{exp.period}</span>
                    <span>{exp.location}</span>
                  </div>
                  <p className="mt-1.5 font-display text-lg font-semibold text-zinc-900">
                    {exp.role}
                  </p>
                  <p className="text-xs font-medium text-zinc-700">{exp.company}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {exp.highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
