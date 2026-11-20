import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

interface HeaderProps {
  onStartProject: () => void;
}

const NAV_LINKS = [
  { href: '#karya', label: 'Karya' },
  { href: '#layanan', label: 'Keahlian' },
  { href: '#sertifikat', label: 'Sertifikat' },
  { href: '#kontak', label: 'Kontak' },
];

export function Header({ onStartProject }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-zinc-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6 lg:px-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#beranda"
          className="font-display text-lg font-semibold tracking-tight text-zinc-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm"
        >
          {PROFILE.shortName}
        </a>

        {/* Zone 2: 4 single-line text nav links */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-zinc-900 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-zinc-900 after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onStartProject}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 cursor-pointer"
          >
            Hubungi Saya
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-900 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-zinc-200 bg-white px-6 py-4 md:hidden">
          <nav aria-label="Navigasi Seluler" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-zinc-800 hover:bg-zinc-100"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartProject();
              }}
              className="mt-2 flex min-h-11 w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-600"
            >
              Hubungi Saya
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
