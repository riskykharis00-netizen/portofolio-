import { useState } from 'react';
import { ArrowUpRight, Check, Download, FileText } from 'lucide-react';
import { HERO_MEDIA, HERO_METRICS, PROFILE } from '../data/portfolio';
import { triggerCvPdfDownload } from '../utils/downloadCv';
import { MediaFrame } from './MediaFrame';

interface HeroProps {
  onExploreWork: () => void;
  onOpenResume: () => void;
}

export function Hero({ onExploreWork, onOpenResume }: HeroProps) {
  const [cvDownloaded, setCvDownloaded] = useState(false);

  const handleDownloadCv = () => {
    triggerCvPdfDownload();
    setCvDownloaded(true);
    setTimeout(() => setCvDownloaded(false), 2500);
  };

  return (
    <section id="beranda" className="pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* 2-column Split Hero with items-stretch for balanced height */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-6 py-2">
            <div>
              <p className="text-sm font-medium text-zinc-500">
                {PROFILE.fullName}
                <span aria-hidden="true" className="mx-2 text-zinc-300">
                  ·
                </span>
                {PROFILE.location}
              </p>

              <h1
                className="mt-5 font-display font-semibold tracking-tight text-zinc-900 text-balance"
                style={{
                  fontSize: 'clamp(2.15rem, 3.8vw, 3.45rem)',
                  lineHeight: 1.08,
                }}
              >
                Menggabungkan tata kelola Human Resources (HR) dengan desain antarmuka UI/UX.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 lg:text-lg">
                Lulusan Sistem Informasi Universitas Mulawarman (2024) yang berfokus pada pengelolaan sumber daya manusia (HR), koordinasi rekrutmen serta operasional karyawan, dan perancangan antarmuka UI/UX yang rapi serta mudah digunakan.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreWork}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 cursor-pointer"
              >
                <span>Lihat Karya Pilihan</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <div
                role="group"
                aria-label="Aksi CV"
                className="inline-flex min-h-11 items-stretch divide-x divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200 bg-white"
              >
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-800 whitespace-nowrap transition-colors duration-150 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600 cursor-pointer"
                >
                  <FileText className="h-4 w-4 text-zinc-500" aria-hidden="true" />
                  <span>Ringkasan CV</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadCv}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 whitespace-nowrap transition-colors duration-150 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600 cursor-pointer"
                >
                  {cvDownloaded ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                      <span className="text-emerald-700">CV Terunduh</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" aria-hidden="true" />
                      <span>Unduh PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <MediaFrame
              src={HERO_MEDIA.src}
              alt={HERO_MEDIA.alt}
              title={PROFILE.fullName}
              priority
              className="aspect-[4/3] w-full rounded-2xl border border-zinc-200 lg:aspect-auto lg:h-full lg:min-h-[440px]"
            />
          </div>
        </div>

        {/* Full-width 4-column KPI / credential strip below the Hero Split */}
        <div className="mt-14 grid grid-cols-2 gap-6 border-y border-zinc-200 py-8 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {HERO_METRICS.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1.5">
              <span className="font-display text-2xl font-semibold tracking-tight text-zinc-900 tabular-nums lg:text-3xl">
                {metric.value}
              </span>
              <span className="text-sm text-zinc-600">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
