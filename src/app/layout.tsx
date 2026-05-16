import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Strategic Growth Website Generator | AI-Powered Business Growth System',
  description:
    'Generate premium, conversion-optimized websites with AI-powered SEO, GEO, AEO, persuasion, and growth strategy — all in minutes.',
  keywords: 'website generator, AI website builder, SEO, GEO, AEO, business growth, conversion optimization',
  openGraph: {
    title: 'Strategic Growth Website Generator',
    description: 'AI-Powered Business Growth System',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-gray-950">
        {children}
      </body>
    </html>
  );
}
