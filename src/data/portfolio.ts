import heroPortraitImg from '../assets/images/rizky_studio_hero_1795204305419.jpg';
import projectSmashArenaImg from '../assets/images/project_smash_arena_1795204997696.jpg';
import projectPortalSdmImg from '../assets/images/project_si_akademik_1795204305162.jpg';

export type ProjectCategory =
  | 'Semua'
  | 'Desain UI/UX'
  | 'Sistem & Operasional HR';

export type CertificateGroup =
  | 'Semua'
  | 'Sertifikasi Resmi'
  | 'Ijazah & Akademik';

export type SkillCategory = 'Semua' | 'HR' | 'UI/UX';

export type EndorsementCategory = 'Semua' | 'Human Resources' | 'Desain UI/UX';

export interface EndorsementItem {
  id: string;
  category: Exclude<EndorsementCategory, 'Semua'>;
  strengthTitle: string;
  quote: string;
  endorserRole: string;
  context: string;
  period: string;
  keyStrengths: string[];
}

export interface SkillItem {
  id: string;
  label: string;
  category: Exclude<SkillCategory, 'Semua'>;
  description: string;
  tools: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  year: string;
  category: Exclude<ProjectCategory, 'Semua'>;
  role: string;
  summary: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  stack: string[];
  challenge: string;
  solution: string;
  outcomes: {
    value: string;
    label: string;
  }[];
  liveUrl?: string;
}

export interface CapabilityItem {
  number: string;
  title: string;
  description: string;
  deliverables: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  highlight: string;
}

export interface CredentialItem {
  group: 'Ijazah & Akademik';
  title: string;
  issuer: string;
  period: string;
  detail: string;
}

export interface CertificateItem {
  id: string;
  group: 'Sertifikasi Resmi' | 'Ijazah & Akademik';
  title: string;
  nativeTitle: string;
  examName: string;
  issuer: string;
  verificationStatus: string;
  testDate: string;
  testLocation: string;
  validity: string;
  result: string;
  totalScore: string;
  assessmentSummary?: string;
  sections: {
    name: string;
    score: string;
  }[];
  privacyNote: string;
  sourceLabel: string;
}

export const PROFILE = {
  shortName: 'Rizky Kharis',
  fullName: 'Rizky Kharis Syamsuddin',
  headlineRole: 'Human Resources (HR) · Desain UI/UX',
  location: 'Magetan, Jawa Timur',
  email: 'Riskykharis00@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/rizky-kharis-syamsuddin-s-kom-b41056215',
  education: {
    degree: 'Strata Satu (S1) — Sistem Informasi',
    institution: 'Fakultas Teknik, Universitas Mulawarman',
    graduation: 'Lulus 2024',
  },
};

export const HERO_MEDIA = {
  src: heroPortraitImg,
  alt: 'Rizky Kharis Syamsuddin bekerja pada perancangan antarmuka UI/UX dan pengelolaan operasional HR',
};

export const HERO_METRICS = [
  {
    value: 'Human Resources',
    label: 'Rekrutmen, Onboarding & Administrasi SDM',
  },
  {
    value: 'Desain UI/UX',
    label: 'Alur Pengguna, Wireframing & Antarmuka Web',
  },
  {
    value: 'ASAT & JFT-Basic',
    label: 'Sertifikasi Resmi & Bahasa Jepang Level A2',
  },
  {
    value: 'Magetan',
    label: 'Jawa Timur · Siap Kolaborasi On-Site & Remote',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'smash-arena-badminton',
    title: 'Smash Arena — Desain UI/UX & Alur Pemesanan',
    client: 'Aplikasi Web Produksi (Live Demo)',
    year: '2026',
    category: 'Desain UI/UX',
    role: 'UI/UX Designer & Frontend Developer',
    summary:
      'Merancang antarmuka pengguna (UI/UX) serta sistem jadwal pemesanan lapangan badminton secara real-time agar bebas bentrok dan mudah dipindai.',
    image: projectSmashArenaImg,
    imageAlt: 'Laptop menampilkan antarmuka UI/UX jadwal pemesanan lapangan Smash Arena',
    featured: true,
    liveUrl: 'https://smash-badminton-beta.vercel.app/',
    stack: ['UI/UX Design', 'User Flow', 'Wireframing', 'React & TypeScript', 'Tailwind CSS'],
    challenge:
      'Pemesanan jadwal secara manual sering memicu slot ganda dan menyulitkan pengguna melihat ketersediaan jam kosong dengan cepat.',
    solution:
      'Menyusun alur UX pemesanan tiga langkah yang ringkas, tabel jadwal per jam yang mudah dipindai, serta hierarki visual yang jelas di desktop maupun ponsel.',
    outcomes: [
      { value: 'Live App', label: 'Tayang publik di smash-badminton-beta.vercel.app' },
      { value: 'Alur 3 Langkah', label: 'Pencarian slot hingga konfirmasi jadwal instan' },
      { value: 'Responsif', label: 'Konsisten di layar seluler maupun desktop' },
    ],
  },
  {
    id: 'portal-sistem-sdm',
    title: 'Portal Tata Kelola Data SDM & Operasional HR',
    client: 'Studi Sistem Informasi HR',
    year: '2023—2024',
    category: 'Sistem & Operasional HR',
    role: 'HR Operations & UI/UX Designer',
    summary:
      'Perancangan antarmuka pengelolaan data karyawan, pencatatan dokumen kepegawaian, serta validasi kelengkapan berkas SDM untuk mendukung operasional HR harian.',
    image: projectPortalSdmImg,
    imageAlt: 'Antarmuka portal pengelolaan data SDM dan tabel pencatatan karyawan pada layar desktop',
    stack: ['Administrasi SDM', 'Tata Kelola Arsip HR', 'Basis Data Karyawan', 'Desain Tabel UI', 'Validasi Input'],
    challenge:
      'Catatan kepegawaian dan arsip kontrak yang tersebar di banyak berkas menyulitkan rekapitulasi absensi, cuti, dan verifikasi kelengkapan dokumen SDM.',
    solution:
      'Merancang struktur tabel HR yang bersih, pelacakan status dokumen karyawan yang mudah dipantau, serta alur formulir yang meminimalkan kesalahan entri.',
    outcomes: [
      { value: 'Terstruktur', label: 'Arsip karyawan dan pelacakan status lebih tertib' },
      { value: 'User-Friendly', label: 'Antarmuka mudah digunakan oleh staf HR' },
    ],
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    number: '01',
    title: 'Human Resources (HR) & Koordinasi Rekrutmen',
    description:
      'Mendukung proses rekrutmen mulai dari penyaringan berkas kandidat, penjadwalan wawancara bersama user dan tim HR, hingga koordinasi onboarding karyawan baru.',
    deliverables: 'Rekrutmen · Penjadwalan Wawancara · Onboarding Karyawan',
  },
  {
    number: '02',
    title: 'Administrasi Kepegawaian & Tata Kelola Dokumen SDM',
    description:
      'Mengelola data induk karyawan, rekapitulasi absensi dan cuti, pengarsipan kontrak serta sertifikasi kompetensi dengan ketelitian dan standar kerahasiaan data.',
    deliverables: 'Data Induk SDM · Rekap Absensi & Cuti · Arsip Kontrak',
  },
  {
    number: '03',
    title: 'Desain Antarmuka UI/UX & Wireframing',
    description:
      'Merancang wireframe, alur pengguna, dan antarmuka web yang bersih, responsif, dan mudah dipahami—mengutamakan hierarki informasi dan aksesibilitas.',
    deliverables: 'Wireframe & Prototyping · Desain UI Responsif · User Flow',
  },
  {
    number: '04',
    title: 'Sistem Informasi HR & Perbaikan Alur Kerja',
    description:
      'Memadukan pemahaman sistem informasi dan desain UI/UX untuk merapikan formulir internal, tabel pelaporan HR, dan dokumentasi alur kerja lintas tim.',
    deliverables: 'Sistem Data HR · Desain Tabel & Formulir · Dokumentasi SOP',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2019 — 2024',
    role: 'Strata Satu (S1) — Program Studi Sistem Informasi',
    company: 'Universitas Mulawarman (Fakultas Teknik)',
    location: 'Kalimantan Timur',
    highlight:
      'Menyelesaikan pendidikan Strata Satu Sistem Informasi dengan predikat Sangat Memuaskan, berfokus pada tata kelola sistem informasi, manajemen data operasional, dan perancangan antarmuka UI/UX.',
  },
];

export const IJAZAH_DOCUMENT: CertificateItem = {
  id: 'ijazah-unmul-2024',
  group: 'Ijazah & Akademik',
  title: 'Lulusan Strata Satu (S1) — Sistem Informasi',
  nativeTitle: 'Kementerian Pendidikan Tinggi, Sains, dan Teknologi · Universitas Mulawarman',
  examName: 'Program Studi Sistem Informasi · Fakultas Teknik',
  issuer: 'Universitas Mulawarman',
  verificationStatus: 'Kredensial Terverifikasi · Data sensitif disembunyikan',
  testDate: 'Lulus 2024',
  testLocation: 'Indonesia',
  validity: 'Terakreditasi Baik Sekali (BAN-PT)',
  result: 'Predikat Sangat Memuaskan',
  totalScore: 'Strata Satu (S1)',
  assessmentSummary:
    'Telah menyelesaikan studi dan memenuhi syarat kelulusan Strata Satu pada Program Studi Sistem Informasi, Fakultas Teknik Universitas Mulawarman pada tahun 2024 dengan predikat Sangat Memuaskan.',
  sections: [
    { name: 'Program Studi', score: 'Sistem Informasi' },
    { name: 'Predikat Kelulusan', score: 'Sangat Memuaskan' },
    { name: 'Jenjang Pendidikan', score: 'Strata Satu (S1)' },
    { name: 'Privasi Dokumen', score: 'Tersedia saat Rekrutmen' },
  ],
  privacyNote:
    'Data pribadi sensitif seperti NIK, nomor ijazah, nomor pokok mahasiswa (NPM), tanggal lahir, tanda tangan pejabat, dan salinan pindai dokumen tidak dipublikasikan secara terbuka untuk mencegah penyalahgunaan. Dokumen resmi dapat ditunjukkan secara privat dalam proses rekrutmen.',
  sourceLabel: 'Universitas Mulawarman · Data identitas sensitif disembunyikan demi keamanan privasi',
};

export const CREDENTIALS: CredentialItem[] = [
  {
    group: 'Ijazah & Akademik',
    title: 'Perancangan UI/UX & Tata Kelola Sistem SDM',
    issuer: 'Proyek Desain UI/UX & HR',
    period: '2022 — 2026',
    detail:
      'Penerapan desain antarmuka web responsif, penyusunan alur pengguna yang ringkas, serta tata kelola data SDM terstruktur.',
  },
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'asat-ssw-pertanian-2026',
    group: 'Sertifikasi Resmi',
    title: 'Agriculture Skill Assessment Test (ASAT) — SSW Pertanian',
    nativeTitle: '農業技能測定試験結果通知書 (Notification of results for Agriculture skill assessment test)',
    examName: 'General crop farming (Indonesian)',
    issuer: 'National Chamber of Agriculture (Jepang)',
    verificationStatus: 'Lulus Resmi · Nomor registrasi disembunyikan',
    testDate: '2026',
    testLocation: 'Indonesia',
    validity: 'Berlaku 10 tahun sejak tanggal kelulusan',
    result: 'Pass (Lulus)',
    totalScore: '77%',
    sections: [
      { name: 'Japanese language Exam', score: '80%' },
      { name: 'Crop Farming Exam', score: '75%' },
    ],
    privacyNote:
      'Nomor registrasi peserta, tanggal lahir, foto identitas, dan dokumen asli tidak dipublikasikan secara terbuka guna melindungi privasi pemilik dari potensi penyalahgunaan. Salinan terverifikasi tersedia atas permintaan resmi tim HR.',
    sourceLabel: 'National Chamber of Agriculture · Salinan hasil ujian tersedia saat verifikasi HR',
  },
  {
    id: 'jft-basic-a2-2026',
    group: 'Sertifikasi Resmi',
    title: 'Japan Foundation Test for Basic Japanese (JFT-Basic) — Level A2',
    nativeTitle: '国際交流基金日本語基礎テスト 判定結果通知書',
    examName: 'JF Standard for Japanese-Language Education · CEFR Level A2',
    issuer: 'The Japan Foundation (国際交流基金)',
    verificationStatus: 'Lulus Resmi · Nomor registrasi disembunyikan',
    testDate: '2026',
    testLocation: 'Indonesia',
    validity: 'Memenuhi standar kemampuan bahasa Jepang Level A2 (batas lulus 200 poin)',
    result: 'Pass (Level A2)',
    totalScore: '205 / 250 poin',
    assessmentSummary:
      'Dinilai mampu berkomunikasi dalam percakapan sehari-hari pada tingkat dasar (JF Standard / CEFR A2) dan memahami ungkapan umum tanpa kendala berarti dalam lingkungan kerja maupun harian.',
    sections: [
      { name: 'Script & Vocabulary', score: '91%' },
      { name: 'Conversation & Expression', score: '66%' },
      { name: 'Listening Comprehension', score: '100%' },
      { name: 'Reading Comprehension', score: '66%' },
    ],
    privacyNote:
      'Nomor registrasi dan dokumen resmi hasil ujian disembunyikan dari tampilan publik untuk mencegah penyalahgunaan data pribadi, dan dapat dilampirkan langsung selama proses seleksi kerja.',
    sourceLabel: 'The Japan Foundation · Sertifikasi kemampuan bahasa Jepang terverifikasi',
  },
];

export const SKILLS: SkillItem[] = [
  {
    id: 'hr-administrasi-kepegawaian',
    label: 'Administrasi Kepegawaian',
    category: 'HR',
    description:
      'Mengelola data induk karyawan, memperbarui status kepegawaian, serta memastikan kelengkapan dokumen personalia tersusun rapi dan aman.',
    tools: ['Google Workspace', 'Microsoft Excel', 'Basis Data SDM'],
  },
  {
    id: 'hr-rekrutmen',
    label: 'Koordinasi Rekrutmen & Wawancara',
    category: 'HR',
    description:
      'Membantu penyaringan berkas pelamar, menjadwalkan sesi wawancara bersama user dan HR, serta menyampaikan pembaruan status kandidat secara tepat waktu.',
    tools: ['Penjadwalan Kalender', 'Pelacakan Kandidat', 'Komunikasi Kandidat'],
  },
  {
    id: 'hr-onboarding',
    label: 'Onboarding & Orientasi Karyawan',
    category: 'HR',
    description:
      'Menyiapkan daftar periksa dokumen masuk, pengenalan alur kerja tim, dan koordinasi kebutuhan awal bagi karyawan baru agar proses adaptasi berjalan lancar.',
    tools: ['Checklist Onboarding', 'Dokumentasi SOP', 'Koordinasi Tim'],
  },
  {
    id: 'hr-absensi-cuti',
    label: 'Pencatatan Kehadiran & Cuti',
    category: 'HR',
    description:
      'Merekap data absensi bulanan, saldo cuti tahunan, serta pengajuan izin dan lembur dengan akurasi tinggi untuk mendukung operasional HR.',
    tools: ['Rekapitulasi Absensi', 'Spreadsheet Formula', 'Validasi Data'],
  },
  {
    id: 'hr-sertifikasi',
    label: 'Arsip Kontrak & Sertifikasi SDM',
    category: 'HR',
    description:
      'Memantau masa berlaku kontrak kerja dan dokumen sertifikasi kompetensi karyawan agar pembaruan administrasi dilakukan sebelum tenggat waktu.',
    tools: ['Pengingat Tenggat', 'Pengarsipan Digital', 'Kontrol Dokumen'],
  },
  {
    id: 'hr-pelaporan',
    label: 'Pelaporan Data & Dokumentasi HR',
    category: 'HR',
    description:
      'Menyusun ringkasan laporan kepegawaian, notulensi rapat tim, serta SOP operasional SDM yang mudah dipahami oleh manajemen.',
    tools: ['Google Sheets', 'Google Docs', 'Microsoft Office'],
  },
  {
    id: 'uiux-wireframing',
    label: 'Wireframing & Alur Pengguna',
    category: 'UI/UX',
    description:
      'Memetakan langkah interaksi pengguna dari awal hingga selesai dan menyusun sketsa struktur layar sebelum memasuki tahap desain visual.',
    tools: ['Figma', 'User Flow', 'Information Architecture'],
  },
  {
    id: 'uiux-desain-responsif',
    label: 'Desain Antarmuka Responsif',
    category: 'UI/UX',
    description:
      'Merancang tampilan aplikasi web yang seimbang dan mudah dibaca di layar desktop maupun perangkat seluler dengan kontras serta hierarki tipografi terjaga.',
    tools: ['Figma', 'Tailwind CSS', 'Responsive Grid'],
  },
  {
    id: 'uiux-prototyping',
    label: 'Prototyping Interaktif',
    category: 'UI/UX',
    description:
      'Membangun purwarupa klik-melalui maupun komponen React interaktif untuk menyimulasikan alur formulir, navigasi, dan status antarmuka secara nyata.',
    tools: ['Figma Prototype', 'React & TypeScript', 'Interaksi Mikro'],
  },
  {
    id: 'uiux-komponen-grid',
    label: 'Komponen UI & Sistem Grid',
    category: 'UI/UX',
    description:
      'Menyusun pustaka tombol, formulir, dan tata letak berbasis grid konsisten sehingga antarmuka tetap seragam dan mudah dikembangkan lebih lanjut.',
    tools: ['Design Tokens', 'Component Library', 'WCAG AA Contrast'],
  },
  {
    id: 'uiux-formulir-tabel',
    label: 'Desain Formulir & Tabel Data',
    category: 'UI/UX',
    description:
      'Menyederhanakan pengisian formulir berstruktur serta penyajian tabel jadwal atau data karyawan agar cepat dipindai dan bebas kesalahan entri.',
    tools: ['Form UX', 'Data Table Layout', 'Validasi Visual'],
  },
];

export const ENDORSEMENTS: EndorsementItem[] = [
  {
    id: 'endorse-hr-arsip',
    category: 'Human Resources',
    strengthTitle: 'Ketelitian Administrasi SDM & Tata Kelola Dokumen',
    quote:
      'Rizky menjaga struktur data kepegawaian dan jadwal koordinasi tetap rapi sejak hari pertama. Pemeriksaan kelengkapan berkas dilakukan teliti dan menjaga kerahasiaan data pribadi dengan sangat baik.',
    endorserRole: 'Koordinator Operasional & SDM',
    context: 'Kolaborasi Pengelolaan Dokumen HR',
    period: '2024—2025',
    keyStrengths: ['Administrasi Kepegawaian', 'Verifikasi Berkas', 'Kerahasiaan Data'],
  },
  {
    id: 'endorse-uiux-smash',
    category: 'Desain UI/UX',
    strengthTitle: 'Perancangan Alur Pengguna & Antarmuka Bebas Bentrok',
    quote:
      'Rancangan antarmuka pemesanan pada Smash Arena langsung memecahkan masalah jadwal ganda. Pengunjung mudah memahami slot kosong dalam tiga langkah baik dari ponsel maupun desktop.',
    endorserRole: 'Pengelola Operasional Lapangan',
    context: 'Aplikasi Web Smash Arena',
    period: '2026',
    keyStrengths: ['Alur Reservasi UX', 'Hierarki Visual', 'Desain Responsif'],
  },
  {
    id: 'endorse-hr-pelaporan',
    category: 'Human Resources',
    strengthTitle: 'Koordinasi Tim & Dokumentasi Operasional HR',
    quote:
      'Ringkasan data operasional, jadwal pertemuan, dan dokumentasi SOP yang disusun Rizky selalu jelas dibaca. Komunikasi jadwal antaranggota tim berjalan tertib tanpa miskomunikasi.',
    endorserRole: 'Koordinator Proyek Sistem Informasi',
    context: 'Dokumentasi & Manajemen Tim',
    period: '2023—2024',
    keyStrengths: ['Koordinasi Jadwal', 'Dokumentasi SOP', 'Pelaporan Terstruktur'],
  },
  {
    id: 'endorse-uiux-komponen',
    category: 'Desain UI/UX',
    strengthTitle: 'Konsistensi Komponen UI & Kemudahan Navigasi',
    quote:
      'Struktur wireframe hingga komponen UI yang dibuat sangat teratur—mulai dari tata letak grid, kontras teks yang nyaman dibaca, hingga umpan balik formulir yang memudahkan proses implementasi.',
    endorserRole: 'Rekan Pengembang Antarmuka Web',
    context: 'Kolaborasi Desain & Implementasi Frontend',
    period: '2025—2026',
    keyStrengths: ['Wireframing', 'Sistem Komponen UI', 'Kejelasan Formulir'],
  },
];
