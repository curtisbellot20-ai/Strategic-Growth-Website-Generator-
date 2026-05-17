'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gauge, Loader2, CheckCircle2, AlertCircle,
  Tag, Search, MapPin, Bot, Mic, Zap, Smartphone,
  Eye, MousePointerClick, ShieldCheck, BookOpen,
  Wind, Sparkles, Target, Gem, Share2, BarChart2,
} from 'lucide-react';
import type { BusinessIntake } from '@/types';
import type { ScoringState, WebsiteScoreReport } from '@/types/scoring';
import ScoringReport from './ScoringReport';
import { useExport } from '@/lib/export/ExportContext';

const SCORE_CATEGORIES = [
  { icon: Tag,              category: 'Branding',             desc: 'Identity clarity, differentiation, visual voice' },
  { icon: Search,           category: 'SEO',                  desc: 'On-page optimization, keyword strategy, content architecture' },
  { icon: MapPin,           category: 'Local SEO',            desc: 'Local search dominance, GMB, citations' },
  { icon: Bot,              category: 'GEO',                  desc: 'Generative engine visibility (ChatGPT, Perplexity, Claude)' },
  { icon: Mic,              category: 'AEO',                  desc: 'FAQ structure, featured snippets, voice search' },
  { icon: Zap,              category: 'Speed',                desc: 'Performance optimization readiness' },
  { icon: Smartphone,       category: 'Mobile UX',            desc: 'Mobile experience, thumb-friendly CTAs, sticky elements' },
  { icon: Eye,              category: 'Accessibility',        desc: 'WCAG compliance, alt text, contrast, navigation' },
  { icon: MousePointerClick,category: 'Conversion',           desc: 'CRO strength, funnel clarity, objection handling' },
  { icon: ShieldCheck,      category: 'Trust',                desc: 'Testimonials, credentials, guarantees, transparency' },
  { icon: BookOpen,         category: 'Storytelling',         desc: 'Narrative power, transformation clarity, emotional depth' },
  { icon: Wind,             category: 'Atmosphere',           desc: 'Emotional immersion, sensory design, brand feeling' },
  { icon: Sparkles,         category: 'Creative Design',      desc: 'Visual distinctiveness, layout originality, premium feel' },
  { icon: Target,           category: 'Customer Acquisition', desc: 'Lead gen potential, CTA strategy, funnel entry points' },
  { icon: Gem,              category: 'Retention',            desc: 'Customer lifecycle, follow-up systems, loyalty signals' },
  { icon: Share2,           category: 'Referral Readiness',   desc: 'Word-of-mouth potential, referral mechanics' },
  { icon: BarChart2,        category: 'Analytics Readiness',  desc: 'Tracking infrastructure, goals, KPI clarity' },
];

const LOADING_STEPS = [
  'Analyzing brand identity and positioning signals...',
  'Scoring SEO and digital presence foundations...',
  'Evaluating local SEO and map search readiness...',
  'Auditing GEO and AEO optimization potential...',
  'Assessing technical performance indicators...',
  'Scoring mobile UX and accessibility readiness...',
  'Evaluating conversion architecture...',
  'Analyzing trust signals and credibility...',
  'Scoring storytelling and atmosphere depth...',
  'Evaluating creative design distinctiveness...',
  'Scoring acquisition, retention, and referral potential...',
  'Auditing analytics and measurement readiness...',
  'Calculating overall score and group averages...',
  'Compiling improvement plan and quick wins...',
];

interface Props { intake: BusinessIntake; }

export default function ScoringTab({ intake }: Props) {
  const [state, setState] = useState<ScoringState>({ status: 'idle', report: null, error: null });
  const [loadStep, setLoadStep] = useState(0);
  const { registerAIData } = useExport();

  const generate = async () => {
    setState({ status: 'loading', report: null, error: null });
    setLoadStep(0);

    const interval = setInterval(() => {
      setLoadStep(prev => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 1600);

    try {
      const res = await fetch('/api/scoring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intake),
      });
      clearInterval(interval);

      if (!res.ok) {
        const err = await res.json();
        setState({ status: 'error', report: null, error: err.error || 'Generation failed' });
        return;
      }

      const report: WebsiteScoreReport = await res.json();
      setState({ status: 'complete', report, error: null });
      registerAIData('scoring', report);
    } catch (err) {
      clearInterval(interval);
      setState({ status: 'error', report: null, error: err instanceof Error ? err.message : 'Unexpected error' });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {state.status === 'idle' && (
        <motion.div key="idle" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/20 mb-4">
              <Gauge className="w-7 h-7 text-sky-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Website Scoring Engine</h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Score your website blueprint across 17 dimensions from 1–10.
              Every score includes why it received that number, what’s missing, and exactly what to do to reach 10/10.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-8">
            {SCORE_CATEGORIES.map(({ icon: Icon, category, desc }) => (
              <div key={category} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                  <span className="text-xs font-semibold text-white truncate">{category}</span>
                </div>
                <p className="text-gray-500 text-[10px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={generate}
              className="px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-sky-900/30">
              Score This Website
            </button>
            <p className="text-gray-500 text-xs mt-3">Powered by Claude Opus · ~25 seconds</p>
          </div>
        </motion.div>
      )}

      {state.status === 'loading' && (
        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center py-16 gap-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-sky-500/20" />
            <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-t-sky-400 animate-spin" />
            <Gauge className="absolute inset-0 m-auto w-6 h-6 text-sky-400" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-white font-medium">Scoring 17 Dimensions</p>
            <AnimatePresence mode="wait">
              <motion.p key={loadStep} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                className="text-sky-400 text-sm">
                {LOADING_STEPS[loadStep]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="w-64 bg-white/5 rounded-full h-1.5 overflow-hidden">
            <motion.div className="h-full bg-sky-500 rounded-full"
              animate={{ width: `${((loadStep + 1) / LOADING_STEPS.length) * 100}%` }}
              transition={{ duration: 0.4 }} />
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-md">
            {LOADING_STEPS.slice(0, loadStep + 1).map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 text-xs text-gray-400">
                <CheckCircle2 className="w-3 h-3 text-sky-400 flex-shrink-0" />
                <span className="truncate">{step.split('...')[0]}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {state.status === 'error' && (
        <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <AlertCircle className="w-12 h-12 text-red-400" />
          <div>
            <p className="text-white font-semibold">Scoring Failed</p>
            <p className="text-gray-400 text-sm mt-1">{state.error}</p>
          </div>
          <button onClick={generate}
            className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium rounded-lg transition-all">
            Try Again
          </button>
        </motion.div>
      )}

      {state.status === 'complete' && state.report && (
        <motion.div key="complete" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Score Report Ready</p>
                <p className="text-gray-400 text-xs">{state.report.scorePersonality}</p>
              </div>
            </div>
            <button onClick={() => setState({ status: 'idle', report: null, error: null })}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 text-xs rounded-lg transition-all">
              <Loader2 className="w-3 h-3" /> Re-score
            </button>
          </div>
          <ScoringReport report={state.report} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
