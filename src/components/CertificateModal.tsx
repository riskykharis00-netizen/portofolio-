import { useEffect } from 'react';
import { FileCheck2, ShieldCheck, X } from 'lucide-react';
import { CertificateItem } from '../data/portfolio';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  useEffect(() => {
    if (!certificate) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-xs sm:p-6 lg:p-10"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200 bg-white px-6 py-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-500 truncate">
              {certificate.issuer} · {certificate.verificationStatus}
            </p>
            <h2
              id="certificate-modal-title"
              className="mt-0.5 font-display text-lg font-semibold tracking-tight text-zinc-900 truncate"
            >
              {certificate.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup pratinjau sertifikat"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-900 transition-colors hover:bg-zinc-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 lg:p-8 space-y-6">
          {/* Verified Metadata Summary */}
          <div className="grid grid-cols-2 gap-5 border-b border-zinc-200 pb-6 sm:grid-cols-4">
            <div>
              <p className="text-xs font-medium text-zinc-500">Status &amp; Capaian</p>
              <p className="mt-1 font-display text-base font-semibold text-blue-600 tabular-nums">
                {certificate.result} · {certificate.totalScore}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Institusi Penerbit</p>
              <p className="mt-1 text-sm font-medium text-zinc-900">
                {certificate.issuer}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Waktu &amp; Lokasi</p>
              <p className="mt-1 text-xs font-medium text-zinc-900 tabular-nums">
                {certificate.testDate} · {certificate.testLocation}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Keterangan Standar</p>
              <p className="mt-1 text-xs font-medium text-zinc-900">
                {certificate.validity}
              </p>
            </div>
          </div>

          {/* Section Breakdown */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-500">Rincian Informasi</h3>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {certificate.sections.map((section) => (
                <div
                  key={section.name}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <p className="text-xs text-zinc-500">{section.name}</p>
                  <p className="mt-1 font-display text-xl font-semibold text-zinc-900 tabular-nums">
                    {section.score}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Summary if present */}
          {certificate.assessmentSummary && (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <h3 className="text-xs font-semibold text-zinc-500">Ringkasan Penilaian</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                {certificate.assessmentSummary}
              </p>
            </div>
          )}

          {/* Public Portfolio Privacy Notice */}
          <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
            <div>
              <h3 className="text-xs font-semibold text-zinc-900">
                Perlindungan Data Pribadi Publik
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-600">
                {certificate.privacyNote}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-4 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <FileCheck2 className="h-4 w-4 text-zinc-600" aria-hidden="true" />
              <span>{certificate.sourceLabel}</span>
            </span>
            <span className="font-mono text-[11px] text-zinc-400">
              {certificate.nativeTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
