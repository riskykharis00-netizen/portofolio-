import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Download, FileText, Printer, X } from 'lucide-react';
import {
  CERTIFICATES,
  CertificateItem,
  EXPERIENCES,
  IJAZAH_DOCUMENT,
  PROFILE,
} from '../data/portfolio';
import { triggerCvPdfDownload } from '../utils/downloadCv';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  onSelectCertificate: (certificate: CertificateItem) => void;
}

const CORE_STACK = [
  'Human Resources (HR) & Rekrutmen',
  'Administrasi Kepegawaian & Onboarding',
  'Perancangan Antarmuka UI/UX & Wireframing',
  'Sistem Informasi & Dokumentasi SDM',
  'Sertifikasi JFT-Basic Level A2 (205/250)',
  'Sertifikasi SSW Pertanian ASAT (77%)',
];

export function ResumeModal({ open, onClose, onSelectCertificate }: ResumeModalProps) {
  const [cvDownloaded, setCvDownloaded] = useState(false);

  const handleDownloadCv = () => {
    triggerCvPdfDownload();
    setCvDownloaded(true);
    setTimeout(() => setCvDownloaded(false), 2500);
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 p-4 backdrop-blur-xs sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 pb-5">
          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-500">Ringkasan CV &amp; Profil Profesional</p>
            <h2
              id="resume-modal-title"
              className="mt-1 font-display text-2xl font-semibold tracking-tight text-zinc-900"
            >
              {PROFILE.fullName}
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              {PROFILE.headlineRole} · {PROFILE.location}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup ringkasan CV"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-900 transition-colors hover:bg-zinc-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Dedicated CV Download & Print Action Bar */}
        <div className="mt-5 flex flex-col gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-900">
              Dokumen CV Siap Unduh (PDF)
            </p>
            <p className="mt-0.5 text-xs text-zinc-500">
              Format A4 ringkas · Tanpa data pribadi sensitif
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadCv}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white whitespace-nowrap transition-colors hover:bg-blue-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {cvDownloaded ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>CV Terunduh</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Unduh CV (PDF)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-800 whitespace-nowrap transition-colors hover:bg-zinc-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Printer className="h-4 w-4 text-zinc-600" aria-hidden="true" />
              <span>Cetak</span>
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-zinc-500">Profil Singkat</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">
              Lulusan Strata Satu (S1) Program Studi Sistem Informasi, Fakultas Teknik, Universitas Mulawarman (predikat Sangat Memuaskan, 2024) yang berdomisili di Magetan, Jawa Timur. Berfokus pada bidang Human Resources (HR) serta perancangan antarmuka UI/UX.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-zinc-500">Pendidikan</h3>
            <div className="mt-2 divide-y divide-zinc-200 border-y border-zinc-200">
              {EXPERIENCES.map((exp) => (
                <div key={exp.period} className="py-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display text-sm font-semibold text-zinc-900">
                      {exp.role}
                    </span>
                    <span className="font-mono text-xs text-zinc-500 tabular-nums">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-zinc-700">{exp.company}</p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-600">
                    {exp.highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-zinc-500">Ijazah &amp; Sertifikat Resmi</h3>
            <div className="mt-2 divide-y divide-zinc-200 border-y border-zinc-200">
              {[IJAZAH_DOCUMENT, ...CERTIFICATES].map((cert) => (
                <div key={cert.id} className="py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-sm font-semibold text-zinc-900">
                      {cert.title}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-600 tabular-nums">
                      {cert.issuer} · {cert.result}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectCertificate(cert);
                    }}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-100 cursor-pointer"
                  >
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Lihat Detail</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-zinc-500">Kompetensi Inti</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-800">
              {CORE_STACK.join(' · ')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-5">
            <div className="text-xs text-zinc-600">
              Email: <span className="font-medium text-zinc-900">{PROFILE.email}</span>
            </div>
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>Buka LinkedIn</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
