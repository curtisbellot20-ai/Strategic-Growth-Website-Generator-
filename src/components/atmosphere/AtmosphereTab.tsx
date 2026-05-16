'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Zap, AlertCircle, RotateCcw } from 'lucide-react';
import type { BusinessIntake } from '@/types';
import type { AtmosphereState, AtmosphereIntelligence } from '@/types/atmosphere';
import AtmosphereReport from './AtmosphereReport';

const ATMOSPHERE_TYPES = [
  { value: 'luxury',             label: 'Luxury',            emoji: '✨' },
  { value: 'romantic',           label: 'Romantic',          emoji: '🌹' },
  { value: 'corporate',          label: 'Corporate',         emoji: '🏛️' },
  { value: 'cinematic',          label: 'Cinematic',         emoji: '🎞️' },
  { value: 'urban_premium',      label: 'Urban Premium',     emoji: '🌆' },
  { value: 'family_friendly',    label: 'Family-Friendly',   emoji: '🏠' },
  { value: 'high_energy',        label: 'High Energy',       emoji: '⚡' },
  { value: 'wellness',           label: 'Wellness',          emoji: '🌿' },
  { value: 'minimal',            label: 'Minimal',           emoji: '□' },
  { value: 'elegant',            label: 'Elegant',           emoji: '🎩' },
  { value: 'futuristic',         label: 'Futuristic',        emoji: '🚀' },
  { value: 'trustworthy',        label: 'Trustworthy',       emoji: '🛡️' },
  { value: 'exclusive',          label: 'Exclusive',         emoji: '🔑' },
  { value: 'creative',           label: 'Creative',          emoji: '🎨' },
  { value: 'performance_driven', label: 'Performance',       emoji: '🏆' },
  { value: 'relaxing',           label: 'Relaxing',          emoji: '🌊' },
  { value: 'nightlife',          label: 'Nightlife',         emoji: '🌙' },
  { value: 'high_status',        label: 'High Status',       emoji: '👑' },
];

interface Props {
  intake: BusinessIntake;
}

export default function AtmosphereTab({ intake }: Props) {
  const [state, setState] = useState<AtmosphereState>({
    status: 'idle',
    data:   null,
    error:  null,
  });

  const generate = async () => {
    setState({ status: 'loading', data: null, error: null });
    try {
      const res  = await fetch('/api/atmosphere', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(intake),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Generation failed');
      setState({ status: 'complete', data: json as AtmosphereIntelligence, error: null });
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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="py-12"
        >
          <div className="text-center mb-12">
            <div className="w-20 h-20 gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-900/30">
              <Wind className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Atmosphere Intelligence System</h3>
            <p className="text-gray-400 max-w-lg mx-auto mb-2">
              Our AI analyzes your brand vision and customer psychology to select the perfect
              atmosphere type and generate hyper-specific recommendations across 11 design dimensions.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['Emotional Tone','Color System','Typography','Spacing','Imagery','Layout Pacing',
                'CTA Language','Animation Style','Visual Density','Trust Signals','Storytelling Tone'].map((tag) => (
                <span key={tag} className="badge-blue text-xs">{tag}</span>
              ))}
            </div>
            <button onClick={generate} className="btn-primary flex items-center gap-2 px-8 py-4 text-base mx-auto">
              <Zap className="w-5 h-5" />
              Generate Atmosphere Report
            </button>
            <p className="text-xs text-gray-600 mt-3">Takes ~15–30 seconds · Selects from 18 atmosphere types</p>
          </div>

          {/* 18 Atmosphere Types Preview */}
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-4 text-center">18 Atmosphere Types</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {ATMOSPHERE_TYPES.map((a) => (
                <div key={a.value} className="card p-3 text-center hover:border-sky-500/30 transition-all cursor-default">
                  <div className="text-2xl mb-1">{a.emoji}</div>
                  <p className="text-[10px] text-gray-400 font-medium">{a.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ---- Loading ---- */}
      {state.status === 'loading' && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 gradient-brand rounded-full flex items-center justify-center mb-6 shadow-lg"
          >
            <Wind className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">Crafting Your Atmosphere</h3>
          <p className="text-gray-400 text-sm max-w-md">
            Analyzing brand vision, customer psychology, and industry patterns
            to select and design the perfect atmosphere…
          </p>
          <div className="mt-8 space-y-2 text-left max-w-xs w-full">
            {[
              'Reading customer psychology…',
              'Evaluating brand vision…',
              'Selecting atmosphere type…',
              'Generating color system…',
              'Defining typography…',
              'Crafting CTA language…',
              'Designing trust signals…',
            ].map((step, i) => (
              <motion.p
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.35 }}
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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center"
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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="flex justify-end mb-4">
            <button onClick={generate} className="btn-secondary flex items-center gap-2 text-sm">
              <RotateCcw className="w-4 h-4" /> Regenerate
            </button>
          </div>
          <AtmosphereReport data={state.data} />
        </motion.div>
      )}

    </AnimatePresence>
  );
}
