'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Globe, TrendingUp, Shield, Star, ArrowRight, FolderOpen, Wand2, Loader2, ClipboardList } from 'lucide-react';
import IntakeForm from '@/components/intake/IntakeForm';
import GenerationProgress from '@/components/generation/GenerationProgress';
import OutputDashboard from '@/components/dashboard/OutputDashboard';
import ProjectsPanel from '@/components/projects/ProjectsPanel';
import type { BusinessIntake, GenerationState, GenerationStep } from '@/types';
import { SAMPLE_BUSINESSES, type SampleBusiness } from '@/lib/presets/sampleBusinesses';
import type { SavedProject } from '@/lib/projects/projectTypes';

const GENERATION_STEPS: { step: GenerationStep; message: string; duration: number }[] = [
  { step: 'analyzing',   message: 'Analyzing your business, industry, and competitive landscape…',  duration: 3000 },
  { step: 'strategizing',message: 'Building SEO, GEO, AEO, and persuasion frameworks…',            duration: 4000 },
  { step: 'designing',   message: 'Selecting color psychology, typography, and atmosphere…',        duration: 3000 },
  { step: 'writing',     message: 'Writing page blueprints, copy angles, and CTAs…',               duration: 5000 },
  { step: 'scoring',     message: 'Scoring your growth potential and building action plan…',        duration: 2000 },
];

const FEATURES = [
  { icon: Globe,     label: 'SEO / GEO / AEO',    desc: 'Rank everywhere: Google, Maps, AI search' },
  { icon: TrendingUp,label: 'Growth Engines',      desc: 'Acquisition, retention, and referral systems' },
  { icon: Shield,    label: 'Ethical Persuasion',  desc: 'Psychology-backed copywriting that converts' },
  { icon: Star,      label: 'Premium Design',      desc: 'Color science, atmosphere, and brand direction' },
];

export default function Home() {
  const [state, setState] = useState<GenerationState>({
    step: 'idle', progress: 0, message: '', blueprint: null, error: null,
  });
  const [sampleKey,    setSampleKey]    = useState(0);
  const [initialData,  setInitialData]  = useState<Record<string, unknown> | null>(null);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [fillMode,      setFillMode]      = useState<'url' | 'paste'>('url');
  const [urlInput,      setUrlInput]      = useState('');
  const [pasteInput,    setPasteInput]    = useState('');
  const [fillLoading,   setFillLoading]   = useState(false);
  const [fillError,     setFillError]     = useState<string | null>(null);

  const scrollToForm = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleSampleClick = useCallback((sample: SampleBusiness) => {
    setSampleKey((k) => k + 1);
    setInitialData(sample.data);
    setState({ step: 'idle', progress: 0, message: '', blueprint: null, error: null });
    scrollToForm();
  }, []);

  const handleLoadProject = useCallback((project: SavedProject) => {
    setSampleKey((k) => k + 1);
    setInitialData(project.intakeData as Record<string, unknown>);
    setState({ step: 'idle', progress: 0, message: '', blueprint: null, error: null });
    setProjectsOpen(false);
    scrollToForm();
  }, []);

  const handleAutoFill = useCallback(async () => {
    setFillError(null);
    setFillLoading(true);
    try {
      const body = fillMode === 'url'
        ? { url: urlInput.trim() }
        : { text: pasteInput.trim() };
      const res  = await fetch('/api/scrape', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setFillError(data.error || 'Failed to analyze content.');
        return;
      }
      setSampleKey((k) => k + 1);
      setInitialData(data);
      setState({ step: 'idle', progress: 0, message: '', blueprint: null, error: null });
      scrollToForm();
    } catch {
      setFillError('Network error. Please try again.');
    } finally {
      setFillLoading(false);
    }
  }, [fillMode, urlInput, pasteInput, scrollToForm]);

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

    simulateProgress(() => { simulationDone = true; tryFinalize(); });

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
        ...s, step: 'error',
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
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-gray-500">Powered by Claude Opus</span>
            {state.step === 'idle' && (
              <button
                onClick={() => setProjectsOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-medium border border-white/10 transition-all"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">My Projects</span>
              </button>
            )}
            <span className="badge-blue">MVP</span>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {/* ─── IDLE: Hero + Samples + Form ─── */}
        {state.step === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {/* Hero */}
            <div className="relative overflow-hidden py-20 px-4">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-blue-900/10 to-indigo-900/20" />
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />
              <div className="relative max-w-4xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
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
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
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

            {/* Sample Businesses */}
            <motion.div
              className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center mb-5">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">Try a Sample Business</p>
                <p className="text-gray-600 text-sm">Click any card to auto-fill the form and see a real output</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {SAMPLE_BUSINESSES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSampleClick(sample)}
                    className="glass rounded-xl p-4 text-center hover:bg-white/8 transition-all group hover:border-sky-500/30 cursor-pointer"
                  >
                    <div className="text-2xl mb-2">{sample.emoji}</div>
                    <p className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors leading-tight">{sample.name}</p>
                    <p className="text-[10px] text-gray-600 mt-1">{sample.city}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-white/5 rounded text-[9px] text-gray-500">{sample.priceLabel}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-8">
                <div className="flex-1 h-px bg-white/5" />
                <p className="text-xs text-gray-600 whitespace-nowrap">or enter your own business below</p>
                <div className="flex-1 h-px bg-white/5" />
              </div>
            </motion.div>

            {/* Auto-fill */}
            <motion.div
              className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Wand2 className="w-4 h-4 text-violet-400" />
                  <p className="text-sm font-semibold text-white">Auto-Fill From Your Existing Content</p>
                  <span className="badge-blue text-[10px]">NEW</span>
                </div>

                {/* Mode tabs */}
                <div className="flex gap-2 mb-4">
                  {(['url', 'paste'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => { setFillMode(mode); setFillError(null); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                        fillMode === mode
                          ? 'bg-violet-500/15 text-violet-300 border-violet-500/30'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/8'
                      }`}
                    >
                      {mode === 'url'
                        ? <><Globe className="w-3.5 h-3.5" /> Website URL</>
                        : <><ClipboardList className="w-3.5 h-3.5" /> Paste Text</>}
                    </button>
                  ))}
                </div>

                {fillMode === 'url' ? (
                  <div className="flex gap-3">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !fillLoading && urlInput.trim() && handleAutoFill()}
                      placeholder="https://yourbusiness.com"
                      className="input flex-1 text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAutoFill}
                      disabled={fillLoading || !urlInput.trim()}
                      className="btn-primary flex items-center gap-2 px-4 disabled:opacity-50 whitespace-nowrap"
                    >
                      {fillLoading
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing…</>
                        : <><Wand2 className="w-4 h-4" /> Auto-Fill</>}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <textarea
                      value={pasteInput}
                      onChange={(e) => setPasteInput(e.target.value)}
                      rows={4}
                      placeholder="Paste anything: your website text, Instagram bio, Google Business description, Facebook About section, Yelp listing, brochure copy — Claude will extract what it can."
                      className="input resize-none w-full text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAutoFill}
                      disabled={fillLoading || !pasteInput.trim()}
                      className="btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                      {fillLoading
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing…</>
                        : <><Wand2 className="w-4 h-4" /> Auto-Fill Form</>}
                    </button>
                  </div>
                )}

                {fillError && (
                  <p className="text-red-400 text-xs mt-3 flex items-center gap-1.5">
                    <span className="flex-shrink-0">⚠</span> {fillError}
                  </p>
                )}

                <p className="text-[10px] text-gray-600 mt-3 leading-relaxed">
                  Claude reads your content and pre-fills the form. Review everything before generating — you can edit any field.
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <div ref={formRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 scroll-mt-20">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-white">Tell Us About Your Business</h2>
                <p className="text-gray-400 text-sm mt-1">Complete all 6 steps for the most accurate blueprint</p>
              </div>
              <IntakeForm
                key={sampleKey}
                onSubmit={handleGenerate}
                isGenerating={false}
                initialData={initialData ?? undefined}
              />
            </div>
          </motion.div>
        )}

        {/* ─── GENERATING ─── */}
        {(state.step !== 'idle' && state.step !== 'complete' && state.step !== 'error') && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center px-4 py-20"
          >
            <GenerationProgress currentStep={state.step} message={state.message} />
          </motion.div>
        )}

        {/* ─── ERROR ─── */}
        {state.step === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          >
            <OutputDashboard blueprint={state.blueprint} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Panel */}
      {projectsOpen && (
        <ProjectsPanel
          onLoad={handleLoadProject}
          onClose={() => setProjectsOpen(false)}
        />
      )}
    </main>
  );
}
