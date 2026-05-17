'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Download, FileText, Search, TrendingUp, Code,
  PenTool, Layout, Gauge, FileJson, Sparkles, CheckCircle2,
  Clock, ChevronDown, ChevronUp,
} from 'lucide-react';
import type { WebsiteBlueprint } from '@/types';
import { useExport } from '@/lib/export/ExportContext';
import { downloadFile, slugify } from '@/lib/export/downloadUtils';
import {
  blueprintToMarkdown,
  seoStrategyToMarkdown,
  seoIntelligenceToMarkdown,
  growthReportToMarkdown,
  copywritingToMarkdown,
  pageStructureToMarkdown,
  scoringReportToMarkdown,
  acquisitionReportToMarkdown,
  retentionReportToMarkdown,
} from '@/lib/export/markdownExport';
import { strategyToJSON } from '@/lib/export/jsonExport';

interface Props {
  blueprint: WebsiteBlueprint;
  onClose: () => void;
}

interface ExportItem {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  formats: ('MD' | 'JSON')[];
  color: string;
  available: boolean;
  availableNote?: string;
  onDownload: (format: 'MD' | 'JSON') => void;
}

export default function ExportPanel({ blueprint, onClose }: Props) {
  const { aiData } = useExport();
  const b    = blueprint.businessIntake;
  const slug = slugify(b.businessName);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  const flash = (id: string) => {
    setDownloaded(prev => new Set(prev).add(id));
    setTimeout(() => setDownloaded(prev => { const s = new Set(prev); s.delete(id); return s; }), 2000);
  };

  const dl = (content: string, filename: string, mime: string, id: string) => {
    downloadFile(content, filename, mime);
    flash(id);
  };

  const exports: ExportItem[] = [
    {
      id: 'blueprint',
      icon: FileText,
      label: 'Full Website Blueprint',
      description: 'Complete blueprint including strategy, pages, conversion engine, acquisition, retention, referral, and improvement checklist.',
      formats: ['MD'],
      color: 'text-white',
      available: true,
      onDownload: () => dl(blueprintToMarkdown(blueprint), `${slug}-full-blueprint.md`, 'text/markdown', 'blueprint'),
    },
    {
      id: 'seo',
      icon: Search,
      label: 'SEO Strategy',
      description: aiData.seoIntelligence
        ? 'Full AI-generated SEO Intelligence Report — keyword clusters, schema markup, 6-month roadmap, AI answer blocks, and local strategy.'
        : 'Blueprint-level SEO strategy — primary keywords, GEO/AEO tactics, content calendar, technical SEO checklist.',
      formats: ['MD'],
      color: 'text-green-400',
      available: true,
      availableNote: aiData.seoIntelligence ? 'AI Intelligence Report (full)' : 'Blueprint SEO (run SEO Engine for full report)',
      onDownload: () => {
        const content = aiData.seoIntelligence
          ? seoIntelligenceToMarkdown(aiData.seoIntelligence)
          : seoStrategyToMarkdown(blueprint);
        dl(content, `${slug}-seo-strategy.md`, 'text/markdown', 'seo');
      },
    },
    {
      id: 'growth',
      icon: TrendingUp,
      label: 'Business Growth Report',
      description: 'Acquisition channels, paid & organic strategy, retention sequences, loyalty mechanics, referral program, and KPI dashboard.',
      formats: ['MD'],
      color: 'text-emerald-400',
      available: true,
      onDownload: () => dl(growthReportToMarkdown(blueprint), `${slug}-growth-report.md`, 'text/markdown', 'growth'),
    },
    {
      id: 'json',
      icon: FileJson,
      label: 'Full Strategy JSON',
      description: 'Complete machine-readable export of the blueprint and all generated AI reports — useful for integrations, backups, or feeding into other tools.',
      formats: ['JSON'],
      color: 'text-yellow-400',
      available: true,
      availableNote: Object.keys(aiData).length > 0
        ? `Blueprint + ${Object.keys(aiData).length} AI report${Object.keys(aiData).length > 1 ? 's' : ''}`
        : 'Blueprint only (run AI engines to enrich)',
      onDownload: () => dl(strategyToJSON(blueprint, aiData), `${slug}-strategy.json`, 'application/json', 'json'),
    },
    {
      id: 'copy',
      icon: PenTool,
      label: 'Copywriting Sections',
      description: 'All publish-ready copy: persuasion framework, brand/founder story, CTAs, objection handling, and full page copy blocks.',
      formats: ['MD'],
      color: 'text-rose-400',
      available: true,
      onDownload: () => dl(copywritingToMarkdown(blueprint), `${slug}-copywriting.md`, 'text/markdown', 'copy'),
    },
    {
      id: 'pages',
      icon: Layout,
      label: 'Page Structure',
      description: `All ${blueprint.pageBlueprints.length} page blueprints with H1, meta description, section-by-section content, CTAs, and SEO keywords.`,
      formats: ['MD'],
      color: 'text-sky-400',
      available: true,
      onDownload: () => dl(pageStructureToMarkdown(blueprint), `${slug}-page-structure.md`, 'text/markdown', 'pages'),
    },
    {
      id: 'scoring',
      icon: Gauge,
      label: 'Scoring Report',
      description: aiData.scoring
        ? 'Full AI scoring report — 17 dimensions, each scored 1–10 with grade, why, what\'s missing, and how to reach 10/10.'
        : 'Blueprint-level scoring — category scores, strengths, weaknesses, quick wins, priority actions.',
      formats: ['MD'],
      color: 'text-sky-400',
      available: true,
      availableNote: aiData.scoring ? 'AI Score Report — 17 dimensions (full)' : 'Blueprint scoring (run Score Engine for full report)',
      onDownload: () => dl(scoringReportToMarkdown(blueprint, aiData.scoring), `${slug}-scoring-report.md`, 'text/markdown', 'scoring'),
    },
  ];

  const aiEnhanced: ExportItem[] = [
    ...(aiData.acquisition ? [{
      id: 'acquisition',
      icon: Code,
      label: 'Acquisition Plan (AI)',
      description: 'Hero CTA system, trust bar, lead magnets, consultation funnel, email/SMS capture, retargeting plan, and 30-day playbook.',
      formats: ['MD'] as ('MD' | 'JSON')[],
      color: 'text-amber-400',
      available: true,
      onDownload: () => dl(acquisitionReportToMarkdown(aiData.acquisition!), `${slug}-acquisition-plan.md`, 'text/markdown', 'acquisition'),
    }] : []),
    ...(aiData.retention ? [{
      id: 'retention',
      icon: Sparkles,
      label: 'Retention & Referral Plan (AI)',
      description: 'Follow-up sequence (Day 1/3/5/7/14), loyalty program, VIP offers, reactivation campaign, anniversary touches, review flow, and referral system.',
      formats: ['MD'] as ('MD' | 'JSON')[],
      color: 'text-indigo-400',
      available: true,
      onDownload: () => dl(retentionReportToMarkdown(aiData.retention!), `${slug}-retention-plan.md`, 'text/markdown', 'retention'),
    }] : []),
  ];

  const exportAll = () => {
    exports.forEach(e => e.onDownload('MD'));
    aiEnhanced.forEach(e => e.onDownload('MD'));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 32 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] flex flex-col
                     bg-gray-950 border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center">
                <Download className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Export Reports</p>
                <p className="text-gray-500 text-xs">{b.businessName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={exportAll}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/8 hover:bg-white/12
                           text-white text-xs font-medium rounded-lg border border-white/10 transition-all">
                <Download className="w-3 h-3" /> Export All
              </button>
              <button onClick={onClose} className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/8 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">

            {/* Blueprint Exports */}
            <div className="px-5 pt-4 pb-2">
              <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-[0.15em] mb-3">
                Blueprint Exports — Always Available
              </p>
              <div className="space-y-2">
                {exports.map(item => (
                  <ExportCard
                    key={item.id}
                    item={item}
                    isExpanded={expanded === item.id}
                    onToggle={() => setExpanded(expanded === item.id ? null : item.id)}
                    downloaded={downloaded.has(item.id)}
                  />
                ))}
              </div>
            </div>

            {/* AI Engine Exports */}
            {aiEnhanced.length > 0 && (
              <div className="px-5 pt-4 pb-2">
                <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-[0.15em] mb-3">
                  AI Engine Exports
                </p>
                <div className="space-y-2">
                  {aiEnhanced.map(item => (
                    <ExportCard
                      key={item.id}
                      item={item}
                      isExpanded={expanded === item.id}
                      onToggle={() => setExpanded(expanded === item.id ? null : item.id)}
                      downloaded={downloaded.has(item.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Locked AI Exports hint */}
            {(aiEnhanced.length < 2) && (
              <div className="px-5 pt-2 pb-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/6">
                  <Sparkles className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {aiData.acquisition && !aiData.retention
                      ? 'Run the Retention Engine to unlock the Retention & Referral Plan export.'
                      : !aiData.acquisition && aiData.retention
                        ? 'Run the Acquisition Engine to unlock the Acquisition Plan export.'
                        : 'Run the Acquisition and Retention engines to unlock richer AI-powered exports.'}
                  </p>
                </div>
              </div>
            )}

            {/* PDF Coming Soon */}
            <div className="px-5 pt-2 pb-5">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-500/8 to-indigo-500/8 border border-purple-500/15">
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold">PDF Export — Coming Soon</p>
                  <p className="text-gray-500 text-[11px] mt-0.5 leading-relaxed">
                    Branded PDF reports with your color system, cover page, and print-ready layout.
                    System is already structured and ready for PDF rendering integration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile footer */}
          <div className="sm:hidden px-5 py-3 border-t border-white/8 flex-shrink-0">
            <button onClick={exportAll}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white/8 hover:bg-white/12
                         text-white text-sm font-medium rounded-xl border border-white/10 transition-all">
              <Download className="w-4 h-4" /> Export All Files
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Export Card ────────────────────────────────────────────────────────────

function ExportCard({
  item,
  isExpanded,
  onToggle,
  downloaded,
}: {
  item: ExportItem;
  isExpanded: boolean;
  onToggle: () => void;
  downloaded: boolean;
}) {
  const Icon = item.icon;
  const done = downloaded;

  return (
    <div className="bg-white/4 border border-white/8 rounded-xl overflow-hidden transition-all hover:border-white/12">
      {/* Row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <Icon className={`w-4 h-4 flex-shrink-0 ${item.color}`} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white text-xs font-semibold">{item.label}</span>
            {item.formats.map(f => (
              <span key={f} className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-white/8 text-gray-400">{f}</span>
            ))}
          </div>
          {item.availableNote && (
            <p className="text-[10px] text-gray-600 mt-0.5 truncate">{item.availableNote}</p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={onToggle} className="p-1 text-gray-600 hover:text-gray-400 transition-colors">
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {item.available ? (
            <button
              onClick={() => item.onDownload(item.formats[0])}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                done
                  ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                  : 'bg-white/8 hover:bg-white/14 text-white border border-white/10'
              }`}
            >
              {done ? (
                <><CheckCircle2 className="w-3 h-3" /> Saved</>
              ) : (
                <><Download className="w-3 h-3" /> .{item.formats[0].toLowerCase()}</>
              )}
            </button>
          ) : (
            <span className="px-3 py-1.5 text-[10px] text-gray-600 bg-white/4 rounded-lg border border-white/6">
              Run engine first
            </span>
          )}
        </div>
      </div>

      {/* Expanded description */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 pt-0 border-t border-white/6">
              <p className="text-gray-400 text-xs leading-relaxed mt-2">{item.description}</p>
              {item.formats.length > 1 && (
                <div className="flex gap-2 mt-3">
                  {item.formats.map(f => (
                    <button
                      key={f}
                      onClick={() => item.onDownload(f)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/6 hover:bg-white/10
                                 text-gray-300 text-xs font-medium rounded-lg border border-white/10 transition-all"
                    >
                      <Download className="w-3 h-3" /> Download .{f.toLowerCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
