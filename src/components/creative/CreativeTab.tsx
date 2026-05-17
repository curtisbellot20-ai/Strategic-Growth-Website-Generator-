'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, Loader2, AlertCircle, RefreshCw,
  Layout, Type, Palette, Image, Video, Zap, Layers,
  MousePointer, Grid, Shield, Smartphone, Frame,
} from 'lucide-react';
import type { BusinessIntake } from '@/types';
import type { CreativeDirectionIntelligence, CreativeStatus } from '@/types/creative';
import CreativeReport from './CreativeReport';

const DIMENSIONS = [
  { icon: Layout,       label: 'Layout Style',        desc: 'Grid system, whitespace, scroll behavior' },
  { icon: Type,         label: 'Typography',           desc: '3-font pairing with scale ratio & effects' },
  { icon: Palette,      label: 'Color Direction',      desc: 'Primary palette, accents, gradients + CSS' },
  { icon: Image,        label: 'Image Style',          desc: 'Composition, lighting, color grading' },
  { icon: Video,        label: 'Video Style',          desc: 'Pacing, shot types, hero video approach' },
  { icon: Zap,          label: 'Animation Style',      desc: 'Entry, scroll, hover, micro-interactions' },
  { icon: Layers,       label: 'Section Rhythm',       desc: 'Pattern, alternation, breathing room' },
  { icon: Frame,        label: 'Hero Style',           desc: 'Layout, background, visual element, mood' },
  { icon: MousePointer, label: 'CTA Style',            desc: 'Shape, color, copy, hover behavior' },
  { icon: Grid,         label: 'Gallery Style',        desc: 'Layout, hover, lightbox, spacing' },
  { icon: Shield,       label: 'Trust Section',        desc: 'Social proof, authority signals' },
  { icon: Smartphone,   label: 'Mobile Direction',     desc: 'Navigation, stacking, touch targets' },
];

const LOADING_STEPS = [
  'Analyzing business type and conversion goal...',
  'Cross-referencing target audience psychology...',
  'Mapping emotional atmosphere to visual language...',
  'Selecting typography system for brand personality...',
  'Engineering color palette for maximum conversion impact...',
  'Directing image composition and color grading...',
  'Choreographing animation and motion intensity...',
  'Designing section rhythm and page flow...',
  'Crafting hero layout and mood architecture...',
  'Engineering CTA system and urgency signals...',
  'Building gallery and trust section frameworks...',
  'Optimizing mobile experience and touch interactions...',
];

interface Props {
  intake: BusinessIntake;
}

export default function CreativeTab({ intake }: Props) {
  const [status, setStatus]           = useState<CreativeStatus>('idle');
  const [data, setData]               = useState<CreativeDirectionIntelligence | null>(null);
  const [error, setError]             = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const generate = async () => {
    setStatus('loading');
    setError(null);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 1800);

    try {
      const res = await fetch('/api/creative', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intake),
      });

      clearInterval(interval);

      if (!res.ok) throw new Error('Generation failed');

      const result = await res.json();
      setData(result);
      setStatus('complete');
    } catch {
      clearInterval(interval);
      setError('Failed to generate creative direction. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div>
      {/* ── IDLE ── */}
      {status === 'idle' && (
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400 flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-1">Creative Direction Intelligence</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Generate a visually striking, custom creative direction system for{' '}
                  <strong className="text-white">{intake.businessName}</strong>. This system thinks
                  like a world-class creative director — crafting a design language that feels
                  premium, emotionally immersive, and impossible to confuse with a competitor.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {DIMENSIONS.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="glass rounded-xl p-4">
                <Icon className="w-5 h-5 text-orange-400 mb-2" />
                <div className="text-white text-sm font-medium mb-1">{label}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={generate}
              className="btn-primary px-10 py-4 text-base inline-flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Generate Creative Direction
            </button>
            <p className="text-gray-500 text-xs mt-3">Powered by Claude Opus · ~30 seconds</p>
          </div>
        </div>
      )}

      {/* ── LOADING ── */}
      {status === 'loading' && (
        <div className="glass rounded-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-orange-500/30 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-orange-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-orange-400 border-t-transparent animate-spin" />
            </div>
            <h3 className="text-white font-semibold text-lg">Designing Your Creative Direction</h3>
            <p className="text-gray-400 text-sm mt-1">This takes about 30 seconds</p>
          </div>

          <div className="max-w-md mx-auto space-y-2">
            {LOADING_STEPS.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: i <= loadingStep ? 1 : 0.3, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-center gap-3 text-sm py-1.5 ${
                  i < loadingStep
                    ? 'text-gray-600'
                    : i === loadingStep
                    ? 'text-orange-300 font-medium'
                    : 'text-gray-700'
                }`}
              >
                {i < loadingStep ? (
                  <div className="w-4 h-4 rounded-full bg-green-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-[8px] text-green-300">✓</span>
                  </div>
                ) : i === loadingStep ? (
                  <Loader2 className="w-4 h-4 animate-spin flex-shrink-0 text-orange-400" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-white/10 flex-shrink-0" />
                )}
                {step}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── COMPLETE ── */}
      {status === 'complete' && data && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span className="text-white font-semibold">Creative Direction Complete</span>
            </div>
            <button onClick={generate} className="btn-secondary flex items-center gap-2 text-sm">
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </button>
          </div>
          <CreativeReport data={data} />
        </div>
      )}

      {/* ── ERROR ── */}
      {status === 'error' && (
        <div className="glass rounded-2xl p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-2">Generation Failed</h3>
          <p className="text-gray-400 text-sm mb-4">{error}</p>
          <button onClick={generate} className="btn-primary inline-flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
