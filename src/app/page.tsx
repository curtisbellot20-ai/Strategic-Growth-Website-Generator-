'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Globe, TrendingUp, Shield, Star, ArrowRight } from 'lucide-react';
import IntakeForm from '@/components/intake/IntakeForm';
import GenerationProgress from '@/components/generation/GenerationProgress';
import OutputDashboard from '@/components/dashboard/OutputDashboard';
import type { BusinessIntake, GenerationState, GenerationStep } from '@/types';

const GENERATION_STEPS: { step: GenerationStep; message: string; duration: number }[] = [
  { step: 'analyzing', message: 'Analyzing your business, industry, and competitive landscape…', duration: 3000 },
  { step: 'strategizing', message: 'Building SEO, GEO, AEO, and persuasion frameworks…', duration: 4000 },
  { step: 'designing', message: 'Selecting color psychology, typography, and atmosphere…', duration: 3000 },
  { step: 'writing', message: 'Writing page blueprints, copy angles, and CTAs…', duration: 5000 },
  { step: 'scoring', message: 'Scoring your growth potential and building action plan…', duration: 2000 },
];

const FEATURES = [
  { icon: Globe, label: 'SEO / GEO / AEO', desc: 'Rank everywhere: Google, Maps, AI search' },
  { icon: TrendingUp, label: 'Growth Engines', desc: 'Acquisition, retention, and referral systems' },
  { icon: Shield, label: 'Ethical Persuasion', desc: 'Psychology-backed copywriting that converts' },
  { icon: Star, label: 'Premium Design', desc: 'Color science, atmosphere, and brand direction' },
];

export default function Home() {
  const [state, setState] = useState<GenerationState>({
    step: 'idle',
    progress: 0,
    message: '',
    blueprint: null,
    error: null,
  });

  const simulateProgress = useCallback((onComplete: () => void) => {
    let i = 0;
    const run = () => {
      if (i >= GENERATION_STEPS.length) return;
      const { step, message, duration } = GENERATION_STEPS[i];
      setState((s) => ({ ...s, step, message, progress: ((i + 1) / GENERATION_STEPS.length) * 90 }));
      i++;
      setTimeout(run, duration);
    };
    run();
    // Signal readiness after all simulated steps
    const total = GENERATION_STEPS.reduce((a, s) => a + s.duration, 0);
    setTimeout(onComplete, total);
  }, []);

  const handleGenerate = useCallback(async (intake: BusinessIntake) => {
    setState({ step: 'analyzing', progress: 5, message: 'Starting analysis…', blueprint: null, error: null });

    let apiDone = false;
    let simulationDone = false;
    let blueprintResult: unknown = null;

    const tryFinalize = () => {
      if (apiDone && simulationDone && blueprintResult) {
        setState((s) => ({ ...s, step: 'complete', progress: 100, message: 'Blueprint ready!', blueprint: blueprintResult as GenerationState['blueprint'] }));
      }
    };

    simulateProgress(() => {
      simulationDone = true;
      tryFinalize();
    });

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intake),
      });

      const data = await res.json();

      if (!res.ok) {
        setState((s) => ({ ...s, step: 'error', error: data.error || 'Generation failed. Please try again.' }));
        return;
      }

      blueprintResult = data;
      apiDone = true;
      tryFinalize();
    } catch (err) {
      setState((s) => ({
        ...s,
        step: 'error',
        error: err instanceof Error ? err.message : 'Network error. Please try again.',
      }));
    }
  }, [simulateProgress]);

  const handleReset = () => {
    setState({ step: 'idle', progress: 0, message: '', blueprint: null, error: null });
  };

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">Strategic Growth Generator</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">Powered by Claude Opus</span>
            <span className="badge-blue">MVP</span>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {/* ─── IDLE: Hero + Form ─── */}
        {state.step === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hero */}
            <div className="relative overflow-hidden py-20 px-4">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-blue-900/10 to-indigo-900/20" />
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />

              <div className="relative max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="badge-blue mb-4 inline-flex">⚡ AI-Powered Business Growth System</span>
                  <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                    Your Complete
                    <span className="gradient-text"> Growth Blueprint</span>
                    <br />In Minutes
                  </h1>
                  <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
                    Enter your business details. Our AI team of 10 elite strategists generates your full
                    website blueprint, SEO/GEO/AEO strategy, persuasion framework, and growth engines.
                  </p>
                </motion.div>

                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {FEATURES.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div key={f.label} className="glass rounded-xl p-4 text-center">
                        <Icon className="w-6 h-6 text-sky-400 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-white">{f.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>

            {/* Form */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-white">Tell Us About Your Business</h2>
                <p className="text-gray-400 text-sm mt-1">Complete all 6 steps for the most accurate blueprint</p>
              </div>
              <IntakeForm onSubmit={handleGenerate} isGenerating={false} />
            </div>
          </motion.div>
        )}

        {/* ─── GENERATING ─── */}
        {(state.step !== 'idle' && state.step !== 'complete' && state.step !== 'error') && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center px-4 py-20"
          >
            <GenerationProgress currentStep={state.step} message={state.message} />
          </motion.div>
        )}

        {/* ─── ERROR ─── */}
        {state.step === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <div className="card max-w-md w-full text-center">
              <div className="text-4xl mb-4">❌</div>
              <h2 className="text-xl font-bold text-white mb-2">Generation Failed</h2>
              <p className="text-gray-400 text-sm mb-6">{state.error}</p>
              <button onClick={handleReset} className="btn-primary w-full flex items-center justify-center gap-2">
                <ArrowRight className="w-4 h-4" /> Try Again
              </button>
            </div>
          </motion.div>
        )}

        {/* ─── COMPLETE ─── */}
        {state.step === 'complete' && state.blueprint && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          >
            <OutputDashboard blueprint={state.blueprint} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
