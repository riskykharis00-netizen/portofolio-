import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

const PROJECT_SCOPES = [
  'Posisi Human Resources (HR)',
  'Desain UI/UX',
  'Operasional & Rekrutmen SDM',
  'Kolaborasi Proyek Web',
];

interface SubmittedInquiry {
  name: string;
  email: string;
  scope: string;
  message: string;
  mailtoUrl: string;
  formattedText: string;
}

export function AboutAndContact() {
  const [copied, setCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [scope, setScope] = useState(PROJECT_SCOPES[0]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submittedData, setSubmittedData] = useState<SubmittedInquiry | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyMessage = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setError('Mohon lengkapi nama, alamat email, dan ringkasan pesan Anda.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Format alamat email belum valid. Periksa kembali penulisan email Anda.');
      return;
    }

    const subject = `[Portofolio] ${scope} — ${cleanName}`;
    const body = [
      `Halo ${PROFILE.fullName},`,
      '',
      `Nama: ${cleanName}`,
      `Email Pengirim: ${cleanEmail}`,
      `Topik: ${scope}`,
      '',
      'Pesan:',
      cleanMessage,
    ].join('\n');

    const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    // Trigger default mail client without using window.open
    const mailAnchor = document.createElement('a');
    mailAnchor.href = mailtoUrl;
    mailAnchor.style.display = 'none';
    document.body.appendChild(mailAnchor);
    mailAnchor.click();
    document.body.removeChild(mailAnchor);

    setSubmittedData({
      name: cleanName,
      email: cleanEmail,
      scope,
      message: cleanMessage,
      mailtoUrl,
      formattedText: `Kepada: ${PROFILE.email}\nSubjek: ${subject}\n\n${body}`,
    });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="tentang" className="border-t border-zinc-200 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left column: About & Direct Contact */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-zinc-500">Tentang &amp; Kontak</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-900 text-balance">
              Siap berkontribusi di bidang HR dan Desain UI/UX.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              Saya <span className="font-medium text-zinc-900">{PROFILE.fullName}</span>, lulusan Sistem Informasi Universitas Mulawarman yang berdomisili di {PROFILE.location}. Saya berfokus pada pengelolaan operasional Human Resources (HR) yang terstruktur serta perancangan antarmuka UI/UX yang memudahkan pengguna.
            </p>

            <div className="mt-8 space-y-5 border-t border-zinc-200 pt-6">
              <div>
                <p className="text-xs font-medium text-zinc-500">Email Langsung</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="font-display text-lg font-semibold text-zinc-900 hover:text-blue-600 transition-colors"
                  >
                    {PROFILE.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Salin Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-zinc-500">Profil Profesional</p>
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <span>LinkedIn — Rizky Kharis Syamsuddin</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Right column: Interactive Inquiry Form */}
          <div id="kontak" className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              {submittedData ? (
                <div className="py-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Check className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-zinc-900">
                    Draf email Anda siap dikirim.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    Terima kasih, {submittedData.name}. Pesan untuk topik{' '}
                    <span className="font-medium text-zinc-900">{submittedData.scope}</span>{' '}
                    telah disiapkan menuju{' '}
                    <span className="font-medium text-zinc-900">{PROFILE.email}</span>. Jika aplikasi email belum terbuka otomatis, gunakan tombol di bawah ini.
                  </p>

                  <div className="mt-5 rounded-xl border border-zinc-200 bg-white p-4 text-xs leading-relaxed text-zinc-700 whitespace-pre-line">
                    {submittedData.message}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={submittedData.mailtoUrl}
                      className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white whitespace-nowrap transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>Buka Aplikasi Email</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopyMessage(submittedData.formattedText)}
                      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 whitespace-nowrap transition-colors hover:bg-zinc-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                      {copiedMessage ? (
                        <>
                          <Check className="h-4 w-4 text-blue-600" aria-hidden="true" />
                          <span>Isi Pesan Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" aria-hidden="true" />
                          <span>Salin Isi Pesan</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmittedData(null)}
                      className="inline-flex min-h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 whitespace-nowrap transition-colors hover:bg-zinc-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                      Kirim Pesan Baru
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-zinc-900">
                      Kirim Pesan ke Email Saya
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      Isi formulir ini untuk langsung menyiapkan dan mengirim pesan ke{' '}
                      <span className="font-medium text-zinc-700">{PROFILE.email}</span>.
                    </p>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-zinc-800"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama Anda"
                        className="mt-1.5 block min-h-11 w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-zinc-800"
                      >
                        Alamat Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@perusahaan.id"
                        className="mt-1.5 block min-h-11 w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-sm font-medium text-zinc-800">
                      Topik Kolaborasi
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {PROJECT_SCOPES.map((item) => {
                        const selected = scope === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setScope(item)}
                            className={`min-h-9 rounded-lg border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                              selected
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-zinc-800"
                    >
                      Pesan Singkat
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tuliskan detail peran, kebutuhan proyek, atau jadwal diskusi..."
                      className="mt-1.5 block w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    />
                  </div>

                  <div className="flex items-center justify-end pt-2">
                    <button
                      type="submit"
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-blue-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Kirim Pesan</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
