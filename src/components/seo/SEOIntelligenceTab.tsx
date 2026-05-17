'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, AlertCircle, RefreshCw, MapPin, Globe, Mic, Brain, Link, FileText, Code, BarChart2 } from 'lucide-react';
import type { BusinessIntake } from '@/types';
import type { SEOIntelligenceReport, SEOIntelligenceStatus } from '@/types/seo';
import SEOIntelligenceReport from './SEOIntelligenceReport';
import { useExport } from '@/lib/export/ExportContext';

const CATEGORIES = [
  { icon: Globe,    label: 'Google SEO',       desc: 'Page structure, keywords, metadata, schema' },
  { icon: MapPin,   label: 'Local & Maps',      desc: 'GMB, citations, neighborhood strategy' },
  { icon: Brain,    label: 'AI Search',         desc: 'Google AI Overviews, Perplexity, ChatGPT' },
  { icon: Mic,      label: 'Voice Search',      desc: 'Conversational queries, answer optimization' },
  { icon: FileText, label: 'Content Strategy',  desc: 'Blog pillars, authority plan, FAQ' },
  { icon: Code,     label: 'Schema Markup',     desc: 'LocalBusiness, FAQ, Service JSON-LD' },
  { icon: Link,     label: 'Internal Linking',  desc: 'Silo architecture, anchor text strategy' },
  { icon: BarChart2,label: 'Keyword Clusters',  desc: 'Semantic map, long-tail, intent mapping' },
];

const STEPS = [
  'Analyzing business and competitive landscape...',
  'Mapping primary keyword clusters...',
  'Building semantic keyword architecture...',
  'Planning page structure and URL hierarchy...',
  'Generating service page blueprints...',
  'Planning location page strategy...',
  'Building blog content pillars...',
  'Generating LocalBusiness schema JSON-LD...',
  'Writing FAQ and Service schema...',
  'Engineering internal linking architecture...',
  'Building AI search answer blocks...',
  'Optimizing for voice and answer engines...',
  'Planning Google Maps and local citations...',
  'Building 6-month SEO roadmap...',
];

export default function SEOIntelligenceTab({ intake }: { intake: BusinessIntake }) {
  const [status, setStatus]   = useState<SEOIntelligenceStatus>('idle');
  const [data, setData]       = useState<SEOIntelligenceReport | null>(null);
  const [error, setError]     = useState<string | null>(null);
  const [step, setStep]       = useState(0);
  const { registerAIData }    = useExport();

  const generate = async () => {
    setStatus('loading'); setError(null); setStep(0);
    const iv = setInterval(() => setStep(p => p < STEPS.length - 1 ? p + 1 : p), 1700);
    try {
      const res = await fetch('/api/seo-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intake),
      });
      clearInterval(iv);
      if (!res.ok) throw new Error();
      const report: SEOIntelligenceReport = await res.json();
      setData(report);
      setStatus('complete');
      registerAIData('seoIntelligence', report);
    } catch {
      clearInterval(iv);
      setError('Generation failed. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'idle') return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-green-500/20 text-green-400 flex-shrink-0"><Search className="w-6 h-6" /></div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">SEO / GEO / AEO Intelligence Engine</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Generate a complete search domination strategy for <strong className="text-white">{intake.businessName}</strong> — covering Google, local maps, AI search engines, voice queries, and answer engines. Includes schema markup, keyword clusters, and a 6-month roadmap.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CATEGORIES.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="glass rounded-xl p-4">
            <Icon className="w-5 h-5 text-green-400 mb-2" />
            <div className="text-white text-sm font-medium mb-1">{label}</div>
            <div className="text-gray-500 text-xs leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button onClick={generate} className="btn-primary px-10 py-4 text-base inline-flex items-center gap-3">
          <Search className="w-5 h-5" /> Generate SEO Intelligence
        </button>
        <p className="text-gray-500 text-xs mt-3">Powered by Claude Opus · ~45 seconds</p>
      </div>
    </div>
  );

  if (status === 'loading') return (
    <div className="glass rounded-2xl p-8">
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-full border-2 border-green-500/30 flex items-center justify-center">
            <Search className="w-8 h-8 text-green-400 animate-pulse" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-green-400 border-t-transparent animate-spin" />
        </div>
        <h3 className="text-white font-semibold text-lg">Building SEO Intelligence Report</h3>
        <p className="text-gray-400 text-sm mt-1">~45 seconds</p>
      </div>
      <div className="max-w-md mx-auto space-y-2">
        {STEPS.map((s, i) => (
          <motion.div key={s} initial={{ opacity: 0 }} animate={{ opacity: i <= step ? 1 : 0.25 }} transition={{ delay: i * 0.06 }}
            className={`flex items-center gap-3 text-sm py-1 ${ i < step ? 'text-gray-600' : i === step ? 'text-green-300 font-medium' : 'text-gray-700' }`}>
            {i < step ? <div className="w-4 h-4 rounded-full bg-green-500/40 flex items-center justify-center flex-shrink-0"><span className="text-[8px] text-green-300">✓</span></div>
              : i === step ? <Loader2 className="w-4 h-4 animate-spin flex-shrink-0 text-green-400" />
              : <div className="w-4 h-4 rounded-full bg-white/10 flex-shrink-0" />}
            {s}
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (status === 'error') return (
    <div className="glass rounded-2xl p-8 text-center">
      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
      <h3 className="text-white font-semibold mb-2">Generation Failed</h3>
      <p className="text-gray-400 text-sm mb-4">{error}</p>
      <button onClick={generate} className="btn-primary inline-flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Try Again</button>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2"><Search className="w-5 h-5 text-green-400" /><span className="text-white font-semibold">SEO Intelligence Complete</span></div>
        <button onClick={generate} className="btn-secondary flex items-center gap-2 text-sm"><RefreshCw className="w-4 h-4" /> Regenerate</button>
      </div>
      {data && <SEOIntelligenceReport data={data} />}
    </div>
  );
}
