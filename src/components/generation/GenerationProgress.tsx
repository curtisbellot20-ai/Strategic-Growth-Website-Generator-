'use client';
import { motion } from 'framer-motion';
import { Brain, Palette, PenTool, BarChart3, CheckCircle2, Loader2 } from 'lucide-react';
import type { GenerationStep } from '@/types';

const STEPS: { id: GenerationStep; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'analyzing', label: 'Analyzing Business', icon: <Brain className="w-5 h-5" />, description: 'Studying your industry, audience, and competitive landscape' },
  { id: 'strategizing', label: 'Building Strategy', icon: <BarChart3 className="w-5 h-5" />, description: 'Crafting SEO, GEO, AEO, persuasion, and growth frameworks' },
  { id: 'designing', label: 'Designing Experience', icon: <Palette className="w-5 h-5" />, description: 'Selecting colors, typography, atmosphere, and design direction' },
  { id: 'writing', label: 'Writing Blueprint', icon: <PenTool className="w-5 h-5" />, description: 'Generating page blueprints, copy angles, and CTAs' },
  { id: 'scoring', label: 'Scoring & Ranking', icon: <CheckCircle2 className="w-5 h-5" />, description: 'Producing your growth score and improvement checklist' },
];

const ORDER: GenerationStep[] = ['analyzing', 'strategizing', 'designing', 'writing', 'scoring'];

interface Props {
  currentStep: GenerationStep;
  message: string;
}

export default function GenerationProgress({ currentStep, message }: Props) {
  const currentIndex = ORDER.indexOf(currentStep);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="inline-flex w-16 h-16 rounded-full gradient-brand items-center justify-center mb-4 shadow-xl shadow-blue-900/40"
        >
          <Brain className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2">Building Your Growth Blueprint</h2>
        <p className="text-gray-400 text-sm">{message}</p>
      </div>

      <div className="space-y-4">
        {STEPS.map((step, i) => {
          const isDone = i < currentIndex;
          const isCurrent = step.id === currentStep;
          const isPending = i > currentIndex;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-sky-500/10 border-sky-500/40'
                  : isDone
                  ? 'bg-green-500/5 border-green-500/20'
                  : 'bg-white/2 border-white/5'
              }`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                isCurrent ? 'bg-sky-500 text-white' : isDone ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-600'
              }`}>
                {isCurrent ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isDone ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  step.icon
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${ isCurrent ? 'text-sky-300' : isDone ? 'text-green-300' : 'text-gray-600' }`}>
                  {step.label}
                </p>
                {(isCurrent || isDone) && (
                  <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                )}
              </div>
              {isPending && <div className="w-2 h-2 rounded-full bg-gray-700 mt-2" />}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-brand rounded-full shimmer"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.max(5, ((currentIndex + 1) / STEPS.length) * 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-right text-xs text-gray-600 mt-1">
          {Math.round(((currentIndex + 1) / STEPS.length) * 100)}% complete
        </p>
      </div>
    </div>
  );
}
