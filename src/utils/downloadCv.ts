import {
  CERTIFICATES,
  EXPERIENCES,
  IJAZAH_DOCUMENT,
  PROFILE,
  PROJECTS,
  SKILLS,
} from '../data/portfolio';

function escapePdfText(text: string): string {
  return text
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= maxChars) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function buildCvPdfBlob(): Blob {
  // A4 page dimensions in PDF points: 595 x 842
  const pageWidth = 595;
  const pageHeight = 842;
  const marginX = 48;
  const rightX = pageWidth - marginX;

  const ops: string[] = [];

  // Top blue accent bar (4pt)
  ops.push('0.145 0.388 0.922 rg');
  ops.push(`0 ${pageHeight - 6} ${pageWidth} 6 re f`);

  let y = 796;

  const drawText = (
    text: string,
    x: number,
    yPos: number,
    size: number,
    bold = false,
    rgb: [number, number, number] = [0.094, 0.094, 0.106],
  ) => {
    ops.push(`${rgb[0]} ${rgb[1]} ${rgb[2]} rg`);
    ops.push('BT');
    ops.push(`${bold ? '/F2' : '/F1'} ${size} Tf`);
    ops.push(`1 0 0 1 ${x} ${yPos} Tm`);
    ops.push(`(${escapePdfText(text)}) Tj`);
    ops.push('ET');
  };

  const drawDivider = (yPos: number) => {
    ops.push('0.894 0.894 0.906 RG');
    ops.push('0.75 w');
    ops.push(`${marginX} ${yPos} m ${rightX} ${yPos} l S`);
  };

  const drawSectionHeading = (title: string) => {
    y -= 6;
    drawText(title, marginX, y, 10, true, [0.145, 0.388, 0.922]);
    y -= 6;
    drawDivider(y);
    y -= 15;
  };

  // Header Block
  drawText(PROFILE.fullName.toUpperCase(), marginX, y, 19, true, [0.094, 0.094, 0.106]);
  y -= 18;
  drawText(`${PROFILE.headlineRole}  |  ${PROFILE.location}`, marginX, y, 10, false, [0.247, 0.247, 0.275]);
  y -= 14;
  drawText(
    `Email: ${PROFILE.email}   |   LinkedIn: linkedin.com/in/rizky-kharis-syamsuddin-s-kom-b41056215`,
    marginX,
    y,
    8.5,
    false,
    [0.322, 0.322, 0.357],
  );
  y -= 12;
  drawDivider(y);
  y -= 16;

  // Profile Summary
  drawSectionHeading('PROFIL SINGKAT');
  const summaryLines = wrapText(
    'Lulusan Strata Satu (S1) Program Studi Sistem Informasi, Fakultas Teknik, Universitas Mulawarman (2024) dengan predikat Sangat Memuaskan. Berfokus pada bidang Human Resources (HR), pengelolaan operasional SDM, serta perancangan antarmuka UI/UX yang rapi dan mudah digunakan.',
    90,
  );
  for (const line of summaryLines) {
    drawText(line, marginX, y, 9.5, false, [0.247, 0.247, 0.275]);
    y -= 13.5;
  }
  y -= 6;

  // Core Competencies grouped strictly by HR & UI/UX
  drawSectionHeading('KOMPETENSI INTI');
  const categories: Array<{ title: string; items: string }> = [
    {
      title: 'Human Resources (HR)',
      items: SKILLS.filter((s) => s.category === 'HR')
        .map((s) => s.label)
        .join(' · '),
    },
    {
      title: 'Desain UI/UX',
      items: SKILLS.filter((s) => s.category === 'UI/UX')
        .map((s) => s.label)
        .join(' · '),
    },
  ];

  for (const group of categories) {
    drawText(group.title, marginX, y, 9.5, true, [0.094, 0.094, 0.106]);
    y -= 12.5;
    for (const line of wrapText(group.items, 92)) {
      drawText(line, marginX, y, 9, false, [0.322, 0.322, 0.357]);
      y -= 12.5;
    }
    y -= 3;
  }
  y -= 4;

  // Featured Projects
  drawSectionHeading('PROYEK PILIHAN');
  for (const project of PROJECTS) {
    drawText(`${project.title} (${project.year})`, marginX, y, 9.5, true, [0.094, 0.094, 0.106]);
    y -= 12.5;
    const metaLine = project.liveUrl
      ? `${project.role} · Live: ${project.liveUrl}`
      : `${project.role} · ${project.client}`;
    drawText(metaLine, marginX, y, 8.5, false, [0.145, 0.388, 0.922]);
    y -= 12;
    for (const line of wrapText(project.summary, 92)) {
      drawText(line, marginX, y, 9, false, [0.322, 0.322, 0.357]);
      y -= 12.5;
    }
    y -= 5;
  }

  // Education (sensitive numbers omitted)
  drawSectionHeading('PENDIDIKAN');
  for (const exp of EXPERIENCES) {
    drawText(`${exp.role}  (${exp.period})`, marginX, y, 9.5, true, [0.094, 0.094, 0.106]);
    y -= 12.5;
    drawText(`${exp.company} — ${exp.location}`, marginX, y, 9, false, [0.322, 0.322, 0.357]);
    y -= 12.5;
    drawText(
      `${IJAZAH_DOCUMENT.examName} · ${IJAZAH_DOCUMENT.result}`,
      marginX,
      y,
      9,
      false,
      [0.322, 0.322, 0.357],
    );
    y -= 14;
  }

  // Official Certifications (registration numbers omitted)
  drawSectionHeading('SERTIFIKASI RESMI');
  for (const cert of CERTIFICATES) {
    drawText(cert.title, marginX, y, 9.5, true, [0.094, 0.094, 0.106]);
    y -= 12.5;
    drawText(
      `${cert.issuer} · ${cert.result} (${cert.totalScore}) · ${cert.testDate}`,
      marginX,
      y,
      9,
      false,
      [0.322, 0.322, 0.357],
    );
    y -= 14;
  }

  // Privacy Footer
  drawDivider(56);
  drawText(
    'Ringkasan CV publik tanpa NIK, nomor ijazah, atau nomor registrasi pribadi. Dokumen asli tersedia saat proses rekrutmen.',
    marginX,
    40,
    8,
    false,
    [0.443, 0.443, 0.478],
  );

  const streamContent = ops.join('\n');

  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n`,
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    `6 0 obj\n<< /Length ${streamContent.length} >>\nstream\n${streamContent}\nendstream\nendobj\n`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

export function triggerCvPdfDownload(): void {
  const blob = buildCvPdfBlob();
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = 'CV_Rizky_Kharis_Syamsuddin.pdf';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 1000);
}
