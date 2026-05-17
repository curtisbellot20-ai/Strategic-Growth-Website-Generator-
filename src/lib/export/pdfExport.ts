// PDF Export — Future Implementation
//
// Recommended approach: @react-pdf/renderer (client) or puppeteer (server)
// When ready, implement renderToPdfBlob(payload) and call downloadFile(blob, name, 'application/pdf')
//
// To enable PDF export:
//   1. npm install @react-pdf/renderer
//   2. Create src/components/export/PdfDocument.tsx with Document/Page/Text/View components
//   3. Call pdf(<PdfDocument payload={payload} />).toBlob() and download

import type { WebsiteBlueprint } from '@/types';
import type { AIExportData } from './ExportContext';

export type PdfExportType =
  | 'full-blueprint'
  | 'seo-report'
  | 'growth-report'
  | 'scoring-report'
  | 'copywriting-pack';

export interface PdfSection {
  id: string;
  title: string;
  markdownContent: string;
  pageBreakBefore?: boolean;
}

export interface PdfBranding {
  primaryColor: string;
  accentColor: string;
  businessName: string;
  tagline: string;
}

export interface PdfExportPayload {
  type: PdfExportType;
  title: string;
  subtitle: string;
  generatedAt: string;
  branding: PdfBranding;
  sections: PdfSection[];
}

export function buildPdfPayload(
  type: PdfExportType,
  bp: WebsiteBlueprint,
  sections: PdfSection[],
  _aiData?: AIExportData,
): PdfExportPayload {
  const b = bp.businessIntake;
  return {
    type,
    title: PDF_TITLES[type](b.businessName),
    subtitle: `${b.industry} · ${b.city}, ${b.state}`,
    generatedAt: new Date().toISOString(),
    branding: {
      primaryColor: bp.colorSystem?.primary?.hex ?? '#6366f1',
      accentColor:  bp.colorSystem?.accent?.hex  ?? '#8b5cf6',
      businessName: b.businessName,
      tagline: b.tagline,
    },
    sections,
  };
}

const PDF_TITLES: Record<PdfExportType, (name: string) => string> = {
  'full-blueprint':  name => `${name} — Full Website Blueprint`,
  'seo-report':      name => `${name} — SEO Strategy Report`,
  'growth-report':   name => `${name} — Business Growth Report`,
  'scoring-report':  name => `${name} — Website Scoring Report`,
  'copywriting-pack':name => `${name} — Copywriting Pack`,
};
