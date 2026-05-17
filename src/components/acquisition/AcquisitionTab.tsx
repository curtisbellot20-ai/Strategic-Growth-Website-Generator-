'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Loader2, CheckCircle2, AlertCircle,
  MousePointerClick, Gift, Megaphone, Mail, MessageSquare,
  RefreshCw, Share2, TrendingUp, Star,
} from 'lucide-react';
import type { BusinessIntake } from '@/types';
import type { AcquisitionState, ConversionAcquisitionReport } from '@/types/acquisition';
import AcquisitionReport from './AcquisitionReport';
import { useExport } from '@/lib/export/ExportContext';

const IDLE_CARDS = [
  { icon: MousePointerClick, label: 'Hero & CTA System',       desc: 'High-converting hero copy, sticky CTAs, and micro-copy that drives clicks' },
  { icon: Star,              label: 'Trust Architecture',       desc: 'Trust bars, testimonial strategy, and social proof placement' },
  { icon: TrendingUp,        label: 'Before & After Engine',   desc: 'Transformation storytelling that shows the journey from pain to outcome' },
  { icon: Gift,              label: 'Lead Magnet Library',      desc: 'Free guides, checklists, and irresistible offers to capture emails' },
  { icon: Target,            label: 'Consultation Funnel',      desc: 'Step-by-step funnel from landing to booked call to closed deal' },
  { icon: Mail,              label: 'Email Capture Strategy',   desc: 'Placement zones, welcome sequences, and segmentation playbook' },
  { icon: MessageSquare,     label: 'SMS Capture System',       desc: 'Keyword opt-in, compliance-safe flows, and immediate value delivery' },
  { icon: RefreshCw,         label: 'Retargeting Plan',         desc: 'Audience segments, platform strategy, and re-engagement messaging' },
  { icon: Megaphone,         label: 'Social Content Engine',    desc: 'Platform-specific content pillars, post ideas, and viral hooks' },
  { icon: Share2,            label: 'Referral Campaigns',       desc: 'Word-of-mouth systems with built-in incentives and tracking' },
];

const LOADING_STEPS = [
  'Analyzing customer psychology and buying triggers...',
  'Engineering hero CTA and conversion copy...',
  'Building trust architecture and proof strategy...',
  'Designing before & after transformation section...',
  'Crafting FAQ and objection handling copy...',
  'Creating lead magnet and free guide concepts...',
  'Designing consultation funnel steps...',
  'Building email capture and welcome sequence...',
  'Structuring SMS capture and compliance flow...',
  'Planning retargeting audiences and messaging...',
  'Building social content strategy by platform...',
  'Creating referral campaign mechanics...',
  'Finalizing 30-day acquisition playbook...',
  'Compiling conversion principles and priority actions...',
];

interface Props { intake: BusinessIntake; }

export default function AcquisitionTab({ intake }: Props) {
  const [state, setState] = useState<AcquisitionState>({ status: 'idle', report: null, error: null });
  const [loadStep, setLoadStep] = useState(0);
  const { registerAIData } = useExport();

  const generate = async () => {
    setState({ status: 'loading', report: null, error: null });
    setLoadStep(0);

    const interval = setInterval(() => {
      setLoadStep(prev => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 1800);

    try {
      const res = await fetch('/api/acquisition', {
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

      const report: ConversionAcquisitionReport = await res.json();
      setState({ status: 'complete', report, error: null });
      registerAIData('acquisition', report);
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
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/20 mb-4">
              <Target className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Conversion & Customer Acquisition Engine</h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Generate a complete conversion system — every CTA, trust signal, lead magnet, funnel step, email sequence,
              retargeting plan, and referral campaign tailored to your business and customer psychology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
            {IDLE_CARDS.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-sm font-semibold text-white">{label}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={generate}
              className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-amber-900/30">
              Generate Acquisition Engine
            </button>
            <p className="text-gray-500 text-xs mt-3">Powered by Claude Opus · ~30 seconds</p>
          </div>
        </motion.div>
      )}

      {state.status === 'loading' && (
        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center py-16 gap-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-amber-500/20" />
            <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-t-amber-400 animate-spin" />
            <Target className="absolute inset-0 m-auto w-6 h-6 text-amber-400" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-white font-medium">Building Your Acquisition Engine</p>
            <AnimatePresence mode="wait">
              <motion.p key={loadStep} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                className="text-amber-400 text-sm">
                {LOADING_STEPS[loadStep]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="w-64 bg-white/5 rounded-full h-1.5 overflow-hidden">
            <motion.div className="h-full bg-amber-500 rounded-full"
              animate={{ width: `${((loadStep + 1) / LOADING_STEPS.length) * 100}%` }}
              transition={{ duration: 0.4 }} />
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
            {LOADING_STEPS.slice(0, loadStep + 1).map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 text-xs text-gray-400">
                <CheckCircle2 className="w-3 h-3 text-amber-400 flex-shrink-0" />
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
            className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-lg transition-all">
            Try Again
          </button>
        </motion.div>
      )}

      {state.status === 'complete' && state.report && (
        <motion.div key="complete" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Acquisition Engine Ready</p>
                <p className="text-gray-400 text-xs">{state.report.acquisitionPersonality}</p>
              </div>
            </div>
            <button onClick={() => setState({ status: 'idle', report: null, error: null })}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 text-xs rounded-lg transition-all">
              <Loader2 className="w-3 h-3" /> Regenerate
            </button>
          </div>
          <AcquisitionReport report={state.report} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
