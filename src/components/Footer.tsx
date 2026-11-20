import { PROFILE } from '../data/portfolio';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center lg:px-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-600">
          <span className="font-display font-semibold text-zinc-900">
            {PROFILE.fullName}
          </span>
          <span aria-hidden="true" className="text-zinc-300">
            ·
          </span>
          <span>{PROFILE.location}</span>
          <span aria-hidden="true" className="text-zinc-300">
            ·
          </span>
          <span className="font-mono text-xs text-zinc-500 tabular-nums">© 2026</span>
        </div>

        <nav
          aria-label="Tautan Eksternal"
          className="flex flex-wrap items-center gap-6 text-sm font-medium text-zinc-600"
        >
          <a
            href="#beranda"
            className="hover:text-zinc-900 transition-colors whitespace-nowrap"
          >
            Kembali ke Atas
          </a>
          <a
            href="#karya"
            className="hover:text-zinc-900 transition-colors whitespace-nowrap"
          >
            Karya
          </a>
          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
