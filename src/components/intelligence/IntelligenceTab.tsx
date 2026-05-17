'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, AlertCircle, RotateCcw } from 'lucide-react';
import type { BusinessIntake } from '@/types';
import type { IntelligenceState, IndustryIntelligence } from '@/types/intelligence';
import IntelligenceReport from './IntelligenceReport';

interface Props {
  intake: BusinessIntake;
}

export default function IntelligenceTab({ intake }: Props) {
  const [state, setState] = useState<IntelligenceState>({
    status: 'idle',
    data: null,
    error: null,
  });

  const generate = async () => {
    setState({ status: 'loading', data: null, error: null });
    try {
      const res  = await fetch('/api/intelligence', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(intake),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Generation failed');
      setState({ status: 'complete', data: json as IndustryIntelligence, error: null });
    } catch (err) {
      setState({
        status: 'error',
        data:   null,
        error:  err instanceof Error ? err.message : 'Unknown error',
      });
    }
  };

  return (
    <AnimatePresence mode="wait">

      {/* ---- Idle ---- */}
      {state.status === 'idle' && (
        <motion.div
          key="idle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center py-24 px-4 text-center"
        >
          <div className="w-20 h-20 gradient-brand rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-900/30">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-black text-white mb-3">Strategic Intelligence Report</h3>
          <p className="text-gray-400 max-w-lg mb-2">
            Our AI cross-references the top 20% of successful {intake.industry} businesses and extracts
            the exact patterns, psychology, and strategies that separate winners from the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              'Customer Psychology','Emotional Triggers','Trust Signals',
              'Common Objections','Converting Offers','Industry Patterns',
              'Premium Positioning','Retention Drivers','Referral Systems',
              'Content Strategy','SEO Structure','CTA Strategy','Atmosphere',
            ].map((tag) => (
              <span key={tag} className="badge-blue text-xs">{tag}</span>
            ))}
          </div>
          <button onClick={generate} className="btn-primary flex items-center gap-2 px-8 py-4 text-base">
            <Zap className="w-5 h-5" />
            Generate Intelligence Report
          </button>
          <p className="text-xs text-gray-600 mt-3">Takes ~15–30 seconds · Powered by Claude Opus</p>
        </motion.div>
      )}

      {/* ---- Loading ---- */}
      {state.status === 'loading' && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center py-24 px-4 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 gradient-brand rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-900/30"
          >
            <Brain className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">Analyzing Your Industry</h3>
          <p className="text-gray-400 text-sm max-w-md">
            Cross-referencing top {intake.industry} businesses, extracting patterns,
            building your complete intelligence report…
          </p>
          <div className="mt-8 space-y-2 text-left max-w-xs w-full">
            {[
              'Customer psychology profiling…',
              'Trust signal analysis…',
              'Objection mapping…',
              'Industry pattern extraction…',
              'Growth opportunity scanning…',
            ].map((step, i) => (
              <motion.p
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.4 }}
                className="text-xs text-gray-500 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                {step}
              </motion.p>
            ))}
          </div>
        </motion.div>
      )}

      {/* ---- Error ---- */}
      {state.status === 'error' && (
        <motion.div
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center py-24 px-4 text-center"
        >
          <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Generation Failed</h3>
          <p className="text-gray-400 text-sm mb-6">{state.error}</p>
          <button onClick={generate} className="btn-primary flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        </motion.div>
      )}

      {/* ---- Complete ---- */}
      {state.status === 'complete' && state.data && (
        <motion.div
          key="complete"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex justify-end mb-4">
            <button
              onClick={generate}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" /> Regenerate
            </button>
          </div>
          <IntelligenceReport data={state.data} />
        </motion.div>
      )}

    </AnimatePresence>
  );
}
