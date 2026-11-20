import { useState } from 'react';
import { Eye, ShieldCheck } from 'lucide-react';
import {
  CERTIFICATES,
  CREDENTIALS,
  CertificateGroup,
  CertificateItem,
  IJAZAH_DOCUMENT,
} from '../data/portfolio';

interface CertificatesSectionProps {
  onSelectCertificate: (certificate: CertificateItem) => void;
}

const GROUPS: CertificateGroup[] = [
  'Semua',
  'Sertifikasi Resmi',
  'Ijazah & Akademik',
];

export function CertificatesSection({ onSelectCertificate }: CertificatesSectionProps) {
  const [activeGroup, setActiveGroup] = useState<CertificateGroup>('Semua');

  const counts: Record<CertificateGroup, number> = {
    Semua: CERTIFICATES.length + CREDENTIALS.length + 1,
    'Sertifikasi Resmi': CERTIFICATES.length,
    'Ijazah & Akademik': CREDENTIALS.length + 1,
  };

  const showOfficial = activeGroup === 'Semua' || activeGroup === 'Sertifikasi Resmi';
  const showAcademic = activeGroup === 'Semua' || activeGroup === 'Ijazah & Akademik';

  return (
    <section id="sertifikat" className="border-t border-zinc-200 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header & Group Filter Tabs */}
        <div className="flex flex-col gap-6 border-b border-zinc-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-zinc-500">Sertifikat, Ijazah &amp; Kredensial</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-900 text-balance lg:text-4xl">
              Sertifikasi kompetensi resmi, ijazah &amp; kredensial akademik.
            </h2>
            <p className="mt-3 inline-flex items-start gap-2 text-xs leading-relaxed text-zinc-500">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
              <span>
                Demi privasi publik, NIK, nomor ijazah, dan nomor registrasi pribadi disembunyikan. Dokumen asli tersedia saat proses verifikasi rekrutmen.
              </span>
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Kelompok sertifikat dan kredensial"
            className="flex flex-wrap items-center gap-1.5 rounded-xl bg-zinc-200/70 p-1.5"
          >
            {GROUPS.map((group) => {
              const isActive = activeGroup === group;
              return (
                <button
                  key={group}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveGroup(group)}
                  className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  <span>{group}</span>
                  <span className="font-mono text-[11px] text-zinc-400 tabular-nums">
                    {counts[group]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grouped Content */}
        <div className="mt-12 space-y-14">
          {/* Group 01: Official Competency Certificates */}
          {showOfficial && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="font-mono text-xs font-medium text-zinc-400 tabular-nums">
                  01.
                </span>
                <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-zinc-900">
                  Sertifikasi Kompetensi Resmi
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Ringkasan kelulusan ujian standar internasional (Jepang) beserta rincian skor per bagian. Data identitas sensitif sengaja disembunyikan pada halaman publik.
                </p>
              </div>

              <div className="lg:col-span-8 space-y-5">
                {CERTIFICATES.map((cert) => (
                  <article
                    key={cert.id}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 lg:p-7"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-medium text-zinc-500">
                        {cert.issuer} · {cert.verificationStatus}
                      </span>
                      <span className="font-mono font-semibold text-blue-600 tabular-nums">
                        {cert.result} · {cert.totalScore}
                      </span>
                    </div>

                    <h4 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-zinc-900">
                      {cert.title}
                    </h4>
                    <p className="mt-1 text-xs text-zinc-500">
                      {cert.examName} · {cert.testDate} · {cert.testLocation}
                    </p>

                    <div
                      className={`mt-5 grid grid-cols-2 gap-4 border-y border-zinc-200 py-4 ${
                        cert.sections.length >= 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'
                      }`}
                    >
                      {cert.sections.map((section) => (
                        <div key={section.name}>
                          <p className="text-xs text-zinc-500">{section.name}</p>
                          <p className="mt-0.5 font-display text-base font-semibold text-zinc-900 tabular-nums">
                            {section.score}
                          </p>
                        </div>
                      ))}
                      {cert.sections.length < 4 && (
                        <div>
                          <p className="text-xs text-zinc-500">Masa Berlaku</p>
                          <p className="mt-0.5 text-xs font-medium text-zinc-800">
                            10 Tahun (hingga 2036)
                          </p>
                        </div>
                      )}
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-zinc-600">
                      {cert.sourceLabel}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectCertificate(cert)}
                        className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white whitespace-nowrap transition-colors hover:bg-blue-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        <Eye className="h-4 w-4" aria-hidden="true" />
                        <span>Lihat Rincian Sertifikat</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Group 02: Diploma (Ijazah) & Academic Credentials */}
          {showAcademic && (
            <div
              className={`grid grid-cols-1 gap-8 lg:grid-cols-12 ${
                showOfficial ? 'border-t border-zinc-200 pt-12' : ''
              }`}
            >
              <div className="lg:col-span-4">
                <span className="font-mono text-xs font-medium text-zinc-400 tabular-nums">
                  {showOfficial ? '02.' : '01.'}
                </span>
                <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-zinc-900">
                  Ijazah &amp; Kredensial Akademik
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Ringkasan kelulusan Strata Satu Universitas Mulawarman serta proyek terapan sistem SDM dan desain UI/UX tanpa mempublikasikan data identitas sensitif.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Featured Academic Credential Card (Sensitive Identifiers Hidden) */}
                <article className="sm:col-span-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 lg:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-medium text-zinc-500">
                      {IJAZAH_DOCUMENT.issuer} · {IJAZAH_DOCUMENT.verificationStatus}
                    </span>
                    <span className="font-mono font-semibold text-blue-600 tabular-nums">
                      {IJAZAH_DOCUMENT.result}
                    </span>
                  </div>

                  <h4 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-zinc-900">
                    {IJAZAH_DOCUMENT.title}
                  </h4>
                  <p className="mt-1 text-xs text-zinc-500">
                    {IJAZAH_DOCUMENT.examName} · {IJAZAH_DOCUMENT.testDate}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-4 border-y border-zinc-200 py-4 sm:grid-cols-4">
                    {IJAZAH_DOCUMENT.sections.map((section) => (
                      <div key={section.name}>
                        <p className="text-xs text-zinc-500">{section.name}</p>
                        <p className="mt-0.5 font-display text-sm font-semibold text-zinc-900 tabular-nums">
                          {section.score}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-zinc-600">
                    {IJAZAH_DOCUMENT.sourceLabel}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectCertificate(IJAZAH_DOCUMENT)}
                      className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white whitespace-nowrap transition-colors hover:bg-blue-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                      <Eye className="h-4 w-4" aria-hidden="true" />
                      <span>Lihat Rincian Akademik</span>
                    </button>
                  </div>
                </article>

                {CREDENTIALS.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-medium text-zinc-500">
                        {item.issuer}
                      </span>
                      <span className="font-mono text-xs font-medium text-blue-600 tabular-nums">
                        {item.period}
                      </span>
                    </div>
                    <h4 className="mt-2 font-display text-lg font-semibold text-zinc-900">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      {item.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
