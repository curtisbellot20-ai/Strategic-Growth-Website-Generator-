'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gem, Loader2, CheckCircle2, AlertCircle,
  Mail, Crown, RotateCcw, Star, Users,
  Cake, Share2, MessageSquare, BookOpen,
} from 'lucide-react';
import type { BusinessIntake } from '@/types';
import type { RetentionState, RetentionReferralReport } from '@/types/retention';
import RetentionReport from './RetentionReport';
import { useExport } from '@/lib/export/ExportContext';

const IDLE_CARDS = [
  { icon: Mail,          label: 'Follow-Up Sequence',       desc: 'Day 1, 3, 5, 7, 14 email series adapted to your industry — from trust-building to educational value' },
  { icon: BookOpen,      label: 'Newsletter Strategy',       desc: 'Branded newsletter with content pillars, subject formulas, and 4 sample issues' },
  { icon: Gem,           label: 'Loyalty Program',           desc: 'Tiered rewards system with earn/redeem mechanics and launch copy' },
  { icon: Crown,         label: 'VIP Program',               desc: 'Exclusive VIP tier with invitation copy, perks, and offers that make customers feel chosen' },
  { icon: RotateCcw,     label: 'Reactivation Campaigns',   desc: '3-touch win-back sequence for lapsed customers, plus a graceful sunset policy' },
  { icon: Cake,          label: 'Anniversary Campaigns',     desc: '5 milestone touchpoints: 1-month, 6-month, 1-year, 2-year, and birthday surprises' },
  { icon: Users,         label: 'Customer Spotlight System', desc: 'Framework for turning loyal customers into featured brand stories' },
  { icon: Star,          label: 'Review Request Flow',       desc: '3-touch review request sequence with bad review protocol and amplification strategy' },
  { icon: Share2,        label: 'Referral System',           desc: 'Word-of-mouth engine with ask copy, rewards, touchpoints, and tracking' },
];

const LOADING_STEPS = [
  'Analyzing customer lifecycle and retention gaps...',
  'Building Day 1 trust-building email...',
  'Writing Day 3 transformation case study...',
  'Crafting Day 5 testimonial proof email...',
  'Writing Day 7 CTA reminder email...',
  'Building Day 14 educational value email...',
  'Designing newsletter strategy and content pillars...',
  'Creating loyalty program tiers and rewards...',
  'Building VIP invitation and offer system...',
  'Writing reactivation and win-back campaigns...',
  'Designing anniversary and milestone touchpoints...',
  'Creating customer spotlight system...',
  'Building review request flow and response templates...',
  'Designing referral system and ask copy...',
  'Finalizing retention principles and 30-day plan...',
];

interface Props { intake: BusinessIntake; }

export default function RetentionTab({ intake }: Props) {
  const [state, setState] = useState<RetentionState>({ status: 'idle', report: null, error: null });
  const [loadStep, setLoadStep] = useState(0);
  const { registerAIData } = useExport();

  const generate = async () => {
    setState({ status: 'loading', report: null, error: null });
    setLoadStep(0);

    const interval = setInterval(() => {
      setLoadStep(prev => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 2000);

    try {
      const res = await fetch('/api/retention', {
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

      const report: RetentionReferralReport = await res.json();
      setState({ status: 'complete', report, error: null });
      registerAIData('retention', report);
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
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/20 mb-4">
              <Gem className="w-7 h-7 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Retention & Referral Engine</h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Generate a complete retention system — a 5-email follow-up sequence, loyalty program, VIP offers,
              reactivation campaigns, anniversary touchpoints, review flows, and a referral engine, all adapted to your industry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {IDLE_CARDS.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="text-sm font-semibold text-white">{label}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={generate}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-900/30">
              Generate Retention Engine
            </button>
            <p className="text-gray-500 text-xs mt-3">Powered by Claude Opus · ~35 seconds</p>
          </div>
        </motion.div>
      )}

      {state.status === 'loading' && (
        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center py-16 gap-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-indigo-500/20" />
            <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-t-indigo-400 animate-spin" />
            <Gem className="absolute inset-0 m-auto w-6 h-6 text-indigo-400" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-white font-medium">Building Your Retention Engine</p>
            <AnimatePresence mode="wait">
              <motion.p key={loadStep} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                className="text-indigo-400 text-sm">
                {LOADING_STEPS[loadStep]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="w-64 bg-white/5 rounded-full h-1.5 overflow-hidden">
            <motion.div className="h-full bg-indigo-500 rounded-full"
              animate={{ width: `${((loadStep + 1) / LOADING_STEPS.length) * 100}%` }}
              transition={{ duration: 0.4 }} />
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
            {LOADING_STEPS.slice(0, loadStep + 1).map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 text-xs text-gray-400">
                <CheckCircle2 className="w-3 h-3 text-indigo-400 flex-shrink-0" />
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
            <p className="text-white font-semibold">Generation Failed</p>
            <p className="text-gray-400 text-sm mt-1">{state.error}</p>
          </div>
          <button onClick={generate}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-all">
            Try Again
          </button>
        </motion.div>
      )}

      {state.status === 'complete' && state.report && (
        <motion.div key="complete" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Retention Engine Ready</p>
                <p className="text-gray-400 text-xs">{state.report.retentionPersonality}</p>
              </div>
            </div>
            <button onClick={() => setState({ status: 'idle', report: null, error: null })}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 text-xs rounded-lg transition-all">
              <Loader2 className="w-3 h-3" /> Regenerate
            </button>
          </div>
          <RetentionReport report={state.report} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
